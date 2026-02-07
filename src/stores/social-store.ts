import { create } from 'zustand'
import type { SocialPost } from '@/types'
import { posts as initialPosts, currentUser } from '@/data/mock-data'

interface SocialStore {
  posts: SocialPost[]
  addPost: (content: string) => void
  toggleLike: (postId: string) => void
}

export const useSocialStore = create<SocialStore>((set) => ({
  posts: initialPosts,

  addPost: (content) =>
    set((state) => {
      const newPost: SocialPost = {
        id: `sp${Date.now()}`,
        author: currentUser,
        content,
        likes: 0,
        liked: false,
        comments: 0,
        createdAt: new Date().toISOString(),
      }
      return { posts: [newPost, ...state.posts] }
    }),

  toggleLike: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      ),
    })),
}))
