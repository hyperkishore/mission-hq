import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'
import type { GamificationProfile, WeeklyRecap, PersonalGoals, MonthlyStats } from '@/types'
import { gamificationProfile as initialProfile } from '@/data/mock-data'

function getToday(): string {
  return new Date().toISOString().split('T')[0]
}

function getWeekStart(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1) // Monday
  const monday = new Date(now.setDate(diff))
  return monday.toISOString().split('T')[0]
}

function isBeforeNineAM(): boolean {
  return new Date().getHours() < 9
}

// Compute XP multiplier based on streak, combo, and time of day
function computeMultiplier(streak: number, comboCount: number, earlyBird: boolean): number {
  let multiplier = 1.0

  // Streak multiplier: 7+ days = 1.5x, 30+ days = 2x
  if (streak >= 30) multiplier *= 2.0
  else if (streak >= 14) multiplier *= 1.75
  else if (streak >= 7) multiplier *= 1.5

  // Combo multiplier: consecutive actions within 5 minutes
  if (comboCount >= 5) multiplier *= 1.5
  else if (comboCount >= 3) multiplier *= 1.25

  // Early bird bonus: before 9 AM
  if (earlyBird) multiplier *= 1.5

  return multiplier
}

// Theme unlock requirements
export const THEME_UNLOCK_LEVELS: Record<string, number> = {
  midnight: 5,
  forest: 10,
  sunset: 15,
  ocean: 20,
  aurora: 25,
}

interface GamificationStore {
  profile: GamificationProfile
  addXP: (amount: number, source?: string) => void
  unlockAchievement: (id: string) => void
  checkAchievements: () => void
  checkDailyReset: () => void
  checkWeeklyReset: () => void
  updateStreak: () => void
  useStreakFreeze: () => boolean
  recordDailyAction: (type: 'task' | 'focus' | 'shoutout' | 'social') => void
  markCheckedIn: () => void
  getMultiplier: () => number
  dismissWeeklyRecap: () => void
  updatePersonalGoals: (goals: Partial<PersonalGoals>) => void
  setLastCompletedTask: (taskName: string | null) => void
  checkMonthlyReset: () => void
  dismissMonthlyWrapped: () => void
}

export const useGamificationStore = create<GamificationStore>()(
  persist(
    (set, get) => ({
      profile: initialProfile,

      getMultiplier: () => {
        const { profile } = get()
        return computeMultiplier(profile.streak, profile.comboCount, isBeforeNineAM())
      },

      checkDailyReset: () => {
        const { profile } = get()
        const today = getToday()
        if (profile.lastDailyReset !== today) {
          set({
            profile: {
              ...profile,
              dailyTasksCompleted: 0,
              dailyFocusSessions: 0,
              dailyShoutoutsGiven: 0,
              dailySocialEngagements: 0,
              comboCount: 0,
              lastDailyReset: today,
            },
          })
        }
      },

      checkWeeklyReset: () => {
        const { profile } = get()
        const weekStart = getWeekStart()
        if (profile.lastWeeklyReset !== weekStart) {
          // Save recap of last week
          const recap: WeeklyRecap = {
            weekStart: profile.lastWeeklyReset || weekStart,
            xpEarned: profile.weeklyXP,
            tasksCompleted: profile.dailyTasksCompleted, // approximation
            focusSessions: profile.dailyFocusSessions,
            shoutoutsGiven: profile.dailyShoutoutsGiven,
            streakDays: profile.streak,
            levelUps: 0,
          }
          set({
            profile: {
              ...profile,
              weeklyXP: 0,
              lastWeeklyReset: weekStart,
              weeklyRecap: recap,
            },
          })
        }
      },

      updateStreak: () => {
        const { profile, useStreakFreeze } = get()
        const today = getToday()

        if (profile.lastActivityDate === today) return // Already active today

        if (profile.lastActivityDate) {
          const lastDate = new Date(profile.lastActivityDate)
          const todayDate = new Date(today)
          const diffDays = Math.floor(
            (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
          )

          if (diffDays === 1) {
            // Consecutive day — increment streak
            set({
              profile: {
                ...get().profile,
                streak: profile.streak + 1,
                lastActivityDate: today,
              },
            })
          } else if (diffDays > 1) {
            // Missed day(s) — try to use streak freeze
            const frozeUsed = useStreakFreeze()
            if (!frozeUsed) {
              // Streak broken
              if (profile.streak >= 3) {
                toast('Streak reset', { description: 'Start fresh — every day is a new opportunity.' })
              }
              set({
                profile: {
                  ...get().profile,
                  streak: 1,
                  lastActivityDate: today,
                },
              })
            } else {
              // Freeze used — keep streak
              set({
                profile: {
                  ...get().profile,
                  streak: profile.streak + 1,
                  lastActivityDate: today,
                },
              })
            }
          }
        } else {
          // First ever activity
          set({
            profile: {
              ...get().profile,
              streak: 1,
              lastActivityDate: today,
            },
          })
        }
      },

      useStreakFreeze: () => {
        const { profile } = get()
        if (profile.streakFreezes > 0) {
          toast.info('Streak freeze used! Your streak is safe.')
          set({
            profile: {
              ...get().profile,
              streakFreezes: profile.streakFreezes - 1,
            },
          })
          return true
        }
        return false
      },

      recordDailyAction: (type: 'task' | 'focus' | 'shoutout' | 'social') => {
        const { profile } = get()
        const updates: Partial<GamificationProfile> = {}

        switch (type) {
          case 'task':
            updates.dailyTasksCompleted = profile.dailyTasksCompleted + 1
            break
          case 'focus':
            updates.dailyFocusSessions = profile.dailyFocusSessions + 1
            break
          case 'shoutout':
            updates.dailyShoutoutsGiven = profile.dailyShoutoutsGiven + 1
            break
          case 'social':
            updates.dailySocialEngagements = profile.dailySocialEngagements + 1
            break
        }

        set({ profile: { ...profile, ...updates } })
      },

      addXP: (amount: number, source?: string) => {
        const { profile, updateStreak, checkAchievements } = get()

        // Update streak on any XP-earning action
        updateStreak()

        // Compute combo
        const now = new Date().toISOString()
        let comboCount = profile.comboCount
        if (profile.lastXPActionAt) {
          const timeSinceLastAction =
            Date.now() - new Date(profile.lastXPActionAt).getTime()
          if (timeSinceLastAction < 5 * 60 * 1000) {
            // Within 5 minutes
            comboCount += 1
          } else {
            comboCount = 1
          }
        } else {
          comboCount = 1
        }

        // Compute multiplier
        const multiplier = computeMultiplier(
          get().profile.streak,
          comboCount,
          isBeforeNineAM()
        )
        const actualAmount = Math.round(amount * multiplier)

        let { xp, level, xpToNextLevel } = profile
        const prevLevel = level

        xp += actualAmount
        const newWeeklyXP = profile.weeklyXP + actualAmount

        // Handle level up(s)
        let levelUps = 0
        while (xp >= xpToNextLevel) {
          xp -= xpToNextLevel
          level += 1
          levelUps += 1
          xpToNextLevel = Math.floor(xpToNextLevel * 1.2)
        }

        // Check for new theme unlocks on level up
        let unlockedThemes = [...profile.unlockedThemes]
        if (level > prevLevel) {
          for (const [theme, requiredLevel] of Object.entries(THEME_UNLOCK_LEVELS)) {
            if (level >= requiredLevel && !unlockedThemes.includes(theme)) {
              unlockedThemes.push(theme)
              toast.success(`Theme unlocked: "${theme}" (Level ${requiredLevel})!`)
            }
          }
          toast.success(`Level up! You're now Level ${level}`)
        }

        // Award streak freeze every 500 XP milestone
        let streakFreezes = profile.streakFreezes
        const totalXPBefore = profile.weeklyXP
        const milestonesBefore = Math.floor(totalXPBefore / 500)
        const milestonesAfter = Math.floor(newWeeklyXP / 500)
        if (milestonesAfter > milestonesBefore) {
          streakFreezes += milestonesAfter - milestonesBefore
          toast.info(`Streak freeze earned! You now have ${streakFreezes}.`)
        }

        // Show multiplier toast if > 1x
        if (multiplier > 1.0 && source) {
          toast(`${actualAmount} XP earned (${multiplier.toFixed(1)}x multiplier)`, {
            description: source,
          })
        }

        set({
          profile: {
            ...get().profile,
            xp,
            level,
            xpToNextLevel,
            weeklyXP: newWeeklyXP,
            comboCount,
            lastXPActionAt: now,
            streakFreezes,
            unlockedThemes,
          },
        })

        // Check achievements after state update
        setTimeout(() => checkAchievements(), 0)
      },

      checkAchievements: () => {
        const { profile, unlockAchievement } = get()
        const earned = (id: string) =>
          profile.achievements.find((a: { id: string; earned: boolean }) => a.id === id)?.earned

        // Focus Master: 25 sessions (check focus store total)
        // We can't directly access focus store, but we track daily
        // Achievement checks are approximations based on available data

        // Streak Legend: 30-day streak
        if (!earned('a4') && profile.streak >= 30) {
          unlockAchievement('a4')
          toast.success('Achievement unlocked: Streak Legend! 🔥')
        }

        // Check all daily goals met (Progress Rings)
        const goals = profile.personalGoals
        const allGoalsMet =
          profile.dailyTasksCompleted >= goals.tasks &&
          profile.dailyFocusSessions >= goals.focusSessions &&
          profile.dailySocialEngagements >= goals.socialEngagements
        if (allGoalsMet && !earned('a6')) {
          unlockAchievement('a6')
          toast.success('Achievement unlocked: Wellness Warrior! 💪')
        }
      },

      unlockAchievement: (id: string) =>
        set((state: GamificationStore) => ({
          profile: {
            ...state.profile,
            achievements: state.profile.achievements.map((achievement: { id: string; earned: boolean; earnedAt?: string }) =>
              achievement.id === id
                ? { ...achievement, earned: true, earnedAt: new Date().toISOString() }
                : achievement
            ),
          },
        })),

      markCheckedIn: () =>
        set((state: GamificationStore) => ({
          profile: {
            ...state.profile,
            lastCheckinDate: getToday(),
          },
        })),

      dismissWeeklyRecap: () =>
        set((state: GamificationStore) => ({
          profile: {
            ...state.profile,
            weeklyRecap: null,
          },
        })),

      updatePersonalGoals: (goals: Partial<PersonalGoals>) =>
        set((state: GamificationStore) => ({
          profile: {
            ...state.profile,
            personalGoals: { ...state.profile.personalGoals, ...goals },
          },
        })),

      setLastCompletedTask: (taskName: string | null) =>
        set((state: GamificationStore) => ({
          profile: {
            ...state.profile,
            lastCompletedTask: taskName,
          },
        })),

      checkMonthlyReset: () => {
        const { profile } = get()
        const currentMonth = new Date().toISOString().slice(0, 7) // "YYYY-MM"
        if (profile.lastMonthlyReset !== currentMonth && profile.lastMonthlyReset !== null) {
          // New month — generate wrapped stats from available data
          const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          const mostProductiveDay = dayNames[new Date().getDay() === 0 ? 2 : new Date().getDay()] // approximate
          const stats: MonthlyStats = {
            tasksCompleted: Math.max(profile.dailyTasksCompleted * 20, 40), // approximation
            tasksTrend: Math.floor(Math.random() * 30) - 10,
            focusMinutes: Math.max(profile.dailyFocusSessions * 25 * 20, 800),
            focusTrend: Math.floor(Math.random() * 20) - 5,
            shoutoutsGiven: Math.max(profile.dailyShoutoutsGiven * 20, 8),
            shoutoutsReceived: Math.floor(Math.random() * 12) + 3,
            mostProductiveDay,
            topStreak: profile.streak,
            totalXP: profile.weeklyXP * 4,
          }
          set({
            profile: {
              ...get().profile,
              monthlyStats: stats,
              lastMonthlyReset: currentMonth,
            },
          })
        } else if (profile.lastMonthlyReset === null) {
          // First time — just set the marker, no wrapped
          set({
            profile: {
              ...get().profile,
              lastMonthlyReset: currentMonth,
            },
          })
        }
      },

      dismissMonthlyWrapped: () =>
        set((state: GamificationStore) => ({
          profile: {
            ...state.profile,
            monthlyStats: null,
          },
        })),
    }),
    {
      name: 'mission-hq-gamification',
      merge: (persisted: any, current: any) => {
        // Deep merge profile so new fields get defaults from initialProfile
        const persistedProfile = persisted?.profile || {}
        return {
          ...current,
          ...persisted,
          profile: {
            ...current.profile,
            ...persistedProfile,
            // Ensure arrays aren't lost
            achievements: persistedProfile.achievements || current.profile.achievements,
            unlockedThemes: persistedProfile.unlockedThemes || current.profile.unlockedThemes,
            personalGoals: { ...current.profile.personalGoals, ...(persistedProfile.personalGoals || {}) },
          },
        }
      },
    }
  )
)
