import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Task } from '@/types'
import { tasks as initialTasks } from '@/data/mock-data'
import { useGamificationStore } from '@/stores/gamification-store'

type TaskFilter = 'today' | 'high' | 'all' | 'completed'

interface TaskStore {
  tasks: Task[]
  filter: TaskFilter
  setFilter: (filter: TaskFilter) => void
  toggleTask: (id: string) => void
  addTask: (task: Task) => void
  deleteTask: (id: string) => void
  filteredTasks: () => Task[]
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: initialTasks,
      filter: 'today',
      setFilter: (filter) => set({ filter }),
      toggleTask: (id) => {
        const task = get().tasks.find((t) => t.id === id)
        if (task && !task.completed) {
          // Task being completed — trigger smart recognition
          useGamificationStore.getState().setLastCompletedTask(task.title)
        }
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        }))
      },
      addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
      deleteTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
      filteredTasks: () => {
        const { tasks, filter } = get()
        switch (filter) {
          case 'today':
            return tasks.filter((t) => !t.completed)
          case 'high':
            return tasks.filter((t) => t.priority === 'high' && !t.completed)
          case 'completed':
            return tasks.filter((t) => t.completed)
          case 'all':
          default:
            return tasks
        }
      },
    }),
    { name: 'mission-hq-tasks' }
  )
)
