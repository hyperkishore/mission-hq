import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { currentUser } from '@/data/mock-data'

interface UserProfile {
  name: string
  email: string
  role: string
  avatar: string
}

interface UserStore {
  profile: UserProfile
  updateProfile: (partial: Partial<UserProfile>) => void
  firstName: () => string
}

function avatarFromName(name: string): string {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.split(' ')[0]}`
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      profile: {
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
        avatar: avatarFromName(currentUser.name),
      },

      updateProfile: (partial) =>
        set((state) => {
          const updated = { ...state.profile, ...partial }
          if (partial.name) {
            updated.avatar = avatarFromName(partial.name)
          }
          return { profile: updated }
        }),

      firstName: () => get().profile.name.split(' ')[0],
    }),
    { name: 'mission-hq-user' }
  )
)
