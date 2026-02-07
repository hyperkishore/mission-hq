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

// GamificationProfile
export interface GamificationProfile {
  level: number;
  xp: number;
  xpToNextLevel: number;
  title: string;
  achievements: Achievement[];
  weeklyXP: number;
  streak: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
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
