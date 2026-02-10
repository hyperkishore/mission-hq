import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FeedItem, FeedItemType, SocialFeedItem } from '@/types'
import { generateFeedItems } from '@/data/feed-data'
import { currentUser } from '@/data/mock-data'

interface FeedStore {
  items: FeedItem[]
  filter: FeedItemType | 'all'
  setFilter: (filter: FeedItemType | 'all') => void
  filteredItems: () => FeedItem[]
  addPost: (content: string) => void
  toggleLike: (itemId: string) => void
}

export const useFeedStore = create<FeedStore>()(
  persist(
    (set, get) => ({
      items: generateFeedItems(),
      filter: 'all',

      setFilter: (filter) => set({ filter }),

      filteredItems: () => {
        const { items, filter } = get()
        if (filter === 'all') return items
        return items.filter((item) => item.type === filter)
      },

      addPost: (content) =>
        set((state) => {
          const newItem: SocialFeedItem = {
            id: `feed-social-sp${Date.now()}`,
            type: 'social',
            createdAt: new Date().toISOString(),
            author: currentUser,
            content,
            likes: 0,
            liked: false,
            comments: 0,
          }
          return { items: [newItem, ...state.items] }
        }),

      toggleLike: (itemId) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === itemId && item.type === 'social') {
              const socialItem = item as SocialFeedItem
              return {
                ...socialItem,
                liked: !socialItem.liked,
                likes: socialItem.liked ? socialItem.likes - 1 : socialItem.likes + 1,
              }
            }
            return item
          }),
        })),
    }),
    { name: 'mission-hq-feed' }
  )
)
