import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type FocusStatus = 'idle' | 'running' | 'paused' | 'break'

interface FocusStore {
  status: FocusStatus
  timeRemaining: number
  sessionDuration: number
  breakDuration: number
  sessionsCompleted: number
  totalFocusTime: number
  dailyGoal: number
  start: () => void
  pause: () => void
  resume: () => void
  reset: () => void
  tick: () => void
  skipBreak: () => void
}

export const useFocusStore = create<FocusStore>()(
  persist(
    (set, get) => ({
      status: 'idle',
      timeRemaining: 25 * 60,
      sessionDuration: 25 * 60,
      breakDuration: 5 * 60,
      sessionsCompleted: 2,
      totalFocusTime: 50 * 60,
      dailyGoal: 4,

      start: () => {
        const { sessionDuration } = get()
        set({ status: 'running', timeRemaining: sessionDuration })
      },

      pause: () => set({ status: 'paused' }),

      resume: () => set({ status: 'running' }),

      reset: () => {
        const { sessionDuration } = get()
        set({ status: 'idle', timeRemaining: sessionDuration })
      },

      tick: () => {
        const { status, timeRemaining, sessionDuration, breakDuration, sessionsCompleted, totalFocusTime } = get()

        if (status !== 'running' && status !== 'break') return

        if (timeRemaining <= 1) {
          if (status === 'running') {
            set({
              status: 'break',
              timeRemaining: breakDuration,
              sessionsCompleted: sessionsCompleted + 1,
              totalFocusTime: totalFocusTime + sessionDuration,
            })
          } else {
            set({ status: 'idle', timeRemaining: sessionDuration })
          }
        } else {
          set({ timeRemaining: timeRemaining - 1 })
        }
      },

      skipBreak: () => {
        const { sessionDuration } = get()
        set({ status: 'idle', timeRemaining: sessionDuration })
      },
    }),
    {
      name: 'mission-hq-focus',
      partialize: (state) => ({
        sessionsCompleted: state.sessionsCompleted,
        totalFocusTime: state.totalFocusTime,
        dailyGoal: state.dailyGoal,
      }),
    }
  )
)
