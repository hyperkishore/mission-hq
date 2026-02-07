import { create } from 'zustand'
import type { Task } from '@/types'
import { tasks as initialTasks } from '@/data/mock-data'

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

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: initialTasks,
  filter: 'today',
  setFilter: (filter) => set({ filter }),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    })),
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
}))
