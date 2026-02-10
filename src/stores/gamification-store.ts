import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'
import type { GamificationProfile } from '@/types'
import { gamificationProfile as initialProfile } from '@/data/mock-data'

interface GamificationStore {
  profile: GamificationProfile
  addXP: (amount: number) => void
  unlockAchievement: (id: string) => void
}

export const useGamificationStore = create<GamificationStore>()(
  persist(
    (set) => ({
      profile: initialProfile,

      addXP: (amount) =>
        set((state) => {
          let { xp, level, xpToNextLevel } = state.profile
          const { weeklyXP } = state.profile
          const prevLevel = level

          xp += amount
          const newWeeklyXP = weeklyXP + amount

          // Handle level up(s)
          while (xp >= xpToNextLevel) {
            xp -= xpToNextLevel
            level += 1
            xpToNextLevel = Math.floor(xpToNextLevel * 1.2)
          }

          if (level > prevLevel) {
            toast.success(`Level up! You're now Level ${level}`)
          }

          return {
            profile: {
              ...state.profile,
              xp,
              level,
              xpToNextLevel,
              weeklyXP: newWeeklyXP,
            },
          }
        }),

      unlockAchievement: (id) =>
        set((state) => ({
          profile: {
            ...state.profile,
            achievements: state.profile.achievements.map((achievement) =>
              achievement.id === id
                ? { ...achievement, earned: true, earnedAt: new Date().toISOString() }
                : achievement
            ),
          },
        })),
    }),
    { name: 'mission-hq-gamification' }
  )
)
