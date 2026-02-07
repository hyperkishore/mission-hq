import { create } from 'zustand'
import type { GamificationProfile } from '@/types'
import { gamificationProfile as initialProfile } from '@/data/mock-data'

interface GamificationStore {
  profile: GamificationProfile
  addXP: (amount: number) => void
  unlockAchievement: (id: string) => void
}

export const useGamificationStore = create<GamificationStore>((set) => ({
  profile: initialProfile,

  addXP: (amount) =>
    set((state) => {
      let { xp, level, xpToNextLevel } = state.profile
      const { weeklyXP } = state.profile

      xp += amount
      const newWeeklyXP = weeklyXP + amount

      // Handle level up(s)
      while (xp >= xpToNextLevel) {
        xp -= xpToNextLevel
        level += 1
        xpToNextLevel = Math.floor(xpToNextLevel * 1.2)
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
}))
