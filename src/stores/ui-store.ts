import { create } from 'zustand'

type CelebrationType = 'task' | 'focus' | 'levelup' | null

interface UIStore {
  showCelebration: boolean
  celebrationType: CelebrationType
  sidebarOpen: boolean
  triggerCelebration: (type: Exclude<CelebrationType, null>) => void
  toggleSidebar: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  showCelebration: false,
  celebrationType: null,
  sidebarOpen: true,

  triggerCelebration: (type) => {
    set({ showCelebration: true, celebrationType: type })
    setTimeout(() => {
      set({ showCelebration: false, celebrationType: null })
    }, 3000)
  },

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}))
