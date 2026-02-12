// Announcement - company-wide announcements
export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: { name: string; avatar: string; role: string };
  category: "product" | "company" | "engineering" | "design" | "hr";
  pinned: boolean;
  createdAt: string; // ISO date
}

// Notice - time-sensitive notices with priority
export interface Notice {
  id: string;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  deadline: string; // ISO date
  category: string;
}

// TeamUpdate - updates from various teams
export interface TeamUpdate {
  id: string;
  team: string;
  type: "shipped" | "decided" | "needs-input";
  title: string;
  description: string;
  author: string;
  createdAt: string;
}

// Task - user's tasks
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  estimatedMinutes: number;
  dueDate?: string;
  category: string;
}

// FocusSession - pomodoro session tracking
export interface FocusSession {
  id: string;
  startedAt: string;
  duration: number; // in seconds
  completed: boolean;
  type: "focus" | "break";
}

// Shoutout - peer recognition
export interface Shoutout {
  id: string;
  from: { name: string; avatar: string };
  to: { name: string; avatar: string };
  message: string;
  emoji: string;
  createdAt: string;
}

// Poll - quick polls
export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  endsAt: string;
  voted?: string; // option id user voted for
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

// CompanyEvent - upcoming events
export interface CompanyEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "all-hands" | "social" | "workshop" | "deadline" | "launch";
  attendees: number;
}

// FeaturedVideo - embedded video content
export interface FeaturedVideo {
  id: string;
  title: string;
  description: string;
  url: string; // YouTube embed URL
  thumbnail: string;
  duration: string;
  author: string;
}

// Person - team member
export interface Person {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  email: string;
  status: "active" | "away" | "busy" | "offline";
  location: string;
  timezone: string;
  skills: string[];
}

// SocialPost - social feed post
export interface SocialPost {
  id: string;
  author: { name: string; avatar: string; role: string };
  content: string;
  image?: string;
  likes: number;
  liked: boolean;
  comments: number;
  createdAt: string;
  tags?: string[];
}

// WellnessChallenge
export interface WellnessChallenge {
  id: string;
  title: string;
  description: string;
  type: "breathing" | "stretching" | "hydration" | "walking" | "meditation";
  duration: number; // minutes
  progress: number; // 0-100
  streak: number;
  participants: number;
}

// CalendarEvent
export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  type: "meeting" | "deadline" | "focus-block" | "social" | "review";
  color: string;
  description?: string;
  attendees?: string[];
}

// Personal daily goals — user-configurable
export interface PersonalGoals {
  tasks: number
  focusSessions: number
  socialEngagements: number
}

// GamificationProfile
export interface GamificationProfile {
  level: number;
  xp: number;
  xpToNextLevel: number;
  title: string;
  achievements: Achievement[];
  weeklyXP: number;
  streak: number;
  // Streak tracking
  lastActivityDate: string | null; // ISO date (date only, e.g. "2026-02-12")
  streakFreezes: number;
  // XP multiplier
  comboCount: number; // consecutive actions within 5 min
  lastXPActionAt: string | null; // ISO timestamp
  // Daily tracking
  dailyTasksCompleted: number;
  dailyFocusSessions: number;
  dailyShoutoutsGiven: number;
  dailySocialEngagements: number; // likes + posts
  lastDailyReset: string | null; // ISO date
  // Weekly tracking
  lastWeeklyReset: string | null; // ISO date
  weeklyRecap: WeeklyRecap | null;
  // Daily check-in
  lastCheckinDate: string | null; // ISO date
  // Unlockable themes
  unlockedThemes: string[];
  // Personal goals
  personalGoals: PersonalGoals;
  // Last completed task name (for smart recognition)
  lastCompletedTask: string | null;
  // Monthly wrapped
  monthlyStats: MonthlyStats | null;
  lastMonthlyReset: string | null; // "YYYY-MM"
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
  progress?: number; // 0-100
  target?: number; // e.g. 25 for "Complete 25 sessions"
  current?: number; // e.g. 18 sessions done
}

export interface WeeklyRecap {
  weekStart: string; // ISO date
  xpEarned: number;
  tasksCompleted: number;
  focusSessions: number;
  shoutoutsGiven: number;
  streakDays: number;
  levelUps: number;
}

// Contribution heatmap day
export interface ContributionDay {
  date: string // ISO date
  count: number // activity count (0-4 scale: none, low, medium, high, intense)
}

// Monthly stats for Wrapped feature
export interface MonthlyStats {
  tasksCompleted: number
  tasksTrend: number // percentage vs last month
  focusMinutes: number
  focusTrend: number
  shoutoutsGiven: number
  shoutoutsReceived: number
  mostProductiveDay: string // e.g. "Tuesday"
  topStreak: number
  totalXP: number
}

// AnalyticsDataPoint for charts
export interface AnalyticsDataPoint {
  date: string;
  focusMinutes: number;
  tasksCompleted: number;
  meetings: number;
  productivity: number; // 0-100 score
}

// User
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  joinDate: string;
}

// Feed Item Types (Unified Timeline)
export type FeedItemType = "social" | "activity" | "announcement" | "shoutout" | "standup"

export interface FeedItemBase {
  id: string
  type: FeedItemType
  createdAt: string // ISO date
  pinned?: boolean
}

export interface SocialFeedItem extends FeedItemBase {
  type: "social"
  author: { name: string; avatar: string; role: string }
  content: string
  image?: string
  likes: number
  liked: boolean
  comments: number
  tags?: string[]
}

export interface ActivityFeedItem extends FeedItemBase {
  type: "activity"
  team: string
  activityType: "shipped" | "decided" | "needs-input"
  title: string
  description: string
  author: string
}

export interface AnnouncementFeedItem extends FeedItemBase {
  type: "announcement"
  title: string
  content: string
  author: { name: string; avatar: string; role: string }
  category: "product" | "company" | "engineering" | "design" | "hr"
  priority?: "critical" | "high" | "medium" | "low"
  deadline?: string
}

export interface ShoutoutFeedItem extends FeedItemBase {
  type: "shoutout"
  from: { name: string; avatar: string }
  to: { name: string; avatar: string }
  message: string
  emoji: string
}

export interface StandupFeedItem extends FeedItemBase {
  type: "standup"
  author: { name: string; avatar: string; role: string }
  content: string // 280 char max
}

export type FeedItem = SocialFeedItem | ActivityFeedItem | AnnouncementFeedItem | ShoutoutFeedItem | StandupFeedItem
