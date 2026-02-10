import type {
  FeedItem,
  SocialFeedItem,
  ActivityFeedItem,
  AnnouncementFeedItem,
  ShoutoutFeedItem,
} from '@/types'
import {
  posts,
  teamUpdates,
  announcements,
  notices,
  shoutouts,
} from './mock-data'

export function generateFeedItems(): FeedItem[] {
  const socialItems: SocialFeedItem[] = posts.map((post) => ({
    id: `feed-social-${post.id}`,
    type: 'social',
    createdAt: post.createdAt,
    author: post.author,
    content: post.content,
    image: post.image,
    likes: post.likes,
    liked: post.liked,
    comments: post.comments,
    tags: post.tags,
  }))

  const activityItems: ActivityFeedItem[] = teamUpdates.map((update) => ({
    id: `feed-activity-${update.id}`,
    type: 'activity',
    createdAt: update.createdAt,
    team: update.team,
    activityType: update.type,
    title: update.title,
    description: update.description,
    author: update.author,
  }))

  const announcementItems: AnnouncementFeedItem[] = announcements.map((ann) => ({
    id: `feed-announcement-${ann.id}`,
    type: 'announcement',
    createdAt: ann.createdAt,
    pinned: ann.pinned,
    title: ann.title,
    content: ann.content,
    author: ann.author,
    category: ann.category,
  }))

  // Convert notices into announcement feed items with priority/deadline
  const noticeItems: AnnouncementFeedItem[] = notices.map((notice) => ({
    id: `feed-notice-${notice.id}`,
    type: 'announcement',
    createdAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    title: notice.title,
    content: notice.description,
    author: { name: 'System', avatar: '', role: 'Admin' },
    category: 'company' as const,
    priority: notice.priority,
    deadline: notice.deadline,
  }))

  const shoutoutItems: ShoutoutFeedItem[] = shoutouts.map((shoutout) => ({
    id: `feed-shoutout-${shoutout.id}`,
    type: 'shoutout',
    createdAt: shoutout.createdAt,
    from: shoutout.from,
    to: shoutout.to,
    message: shoutout.message,
    emoji: shoutout.emoji,
  }))

  const allItems: FeedItem[] = [
    ...socialItems,
    ...activityItems,
    ...announcementItems,
    ...noticeItems,
    ...shoutoutItems,
  ]

  // Sort by date descending, pinned items first
  return allItems.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}
