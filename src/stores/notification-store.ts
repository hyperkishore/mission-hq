import { create } from 'zustand'

interface Notification {
  id: string
  title: string
  description: string
  timestamp: Date
  read: boolean
  type: 'info' | 'success' | 'warning' | 'action'
  actionUrl?: string
}

interface NotificationStore {
  notifications: Notification[]
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  unreadCount: () => number
  markRead: (id: string) => void
  markAllRead: () => void
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
}

const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'New team update',
    description: 'Sarah shipped the auth redesign for the mobile app',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    read: false,
    type: 'info',
    actionUrl: '/team',
  },
  {
    id: 'n2',
    title: 'Achievement unlocked!',
    description: 'You earned "Early Bird" for logging in before 8 AM',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    type: 'success',
  },
  {
    id: 'n3',
    title: 'Calendar reminder',
    description: 'Team standup starts in 15 minutes',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    read: false,
    type: 'warning',
    actionUrl: '/calendar',
  },
  {
    id: 'n4',
    title: 'New poll available',
    description: 'Vote on the next team offsite location',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    type: 'action',
    actionUrl: '/dashboard',
  },
  {
    id: 'n5',
    title: 'Shoutout received!',
    description: 'Maya gave you a shoutout for the Q4 presentation',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: true,
    type: 'success',
  },
  {
    id: 'n6',
    title: 'Focus streak milestone',
    description: 'You completed 5 focus sessions this week',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    read: true,
    type: 'success',
  },
  {
    id: 'n7',
    title: 'New announcement',
    description: 'Company all-hands moved to Friday 3 PM',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
    type: 'info',
  },
]

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: mockNotifications,
  isOpen: false,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),

  unreadCount: () => get().notifications.filter((n) => !n.read).length,

  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: `n${Date.now()}`,
          timestamp: new Date(),
          read: false,
        },
        ...state.notifications,
      ],
    })),
}))
