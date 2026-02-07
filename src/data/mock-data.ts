import type {
  User,
  Task,
  Poll,
  SocialPost,
  GamificationProfile,
  Announcement,
  Notice,
  TeamUpdate,
  Shoutout,
  CompanyEvent,
  FeaturedVideo,
  AnalyticsDataPoint,
  CalendarEvent,
  Person,
  WellnessChallenge,
} from '@/types'

// Mock Tasks
export const tasks: Task[] = [
  {
    id: 't1',
    title: 'Review Q4 roadmap document',
    completed: false,
    priority: 'high',
    estimatedMinutes: 45,
    dueDate: new Date().toISOString(),
    category: 'Product',
  },
  {
    id: 't2',
    title: 'Prepare design critique for homepage redesign',
    completed: false,
    priority: 'high',
    estimatedMinutes: 30,
    dueDate: new Date().toISOString(),
    category: 'Design',
  },
  {
    id: 't3',
    title: 'Update team wiki with onboarding docs',
    completed: false,
    priority: 'medium',
    estimatedMinutes: 60,
    category: 'Documentation',
  },
  {
    id: 't4',
    title: 'Schedule 1:1s with new team members',
    completed: true,
    priority: 'low',
    estimatedMinutes: 15,
    category: 'Management',
  },
  {
    id: 't5',
    title: 'Fix authentication bug in production',
    completed: false,
    priority: 'high',
    estimatedMinutes: 90,
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    category: 'Engineering',
  },
]

// Mock Poll
export const activePoll: Poll = {
  id: 'p1',
  question: 'What should we focus on next sprint?',
  options: [
    { id: 'o1', label: 'Performance optimization', votes: 23 },
    { id: 'o2', label: 'New dashboard features', votes: 45 },
    { id: 'o3', label: 'Mobile app improvements', votes: 32 },
    { id: 'o4', label: 'Bug fixes and polish', votes: 18 },
  ],
  totalVotes: 118,
  endsAt: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
}

// Mock Social Posts
export const posts: SocialPost[] = [
  {
    id: 'sp1',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      role: 'Product Designer',
    },
    content:
      'Just finished the new onboarding flow designs! Really excited about the personalized experience we\'re building. Check out the Figma link in #design-reviews 🎨',
    likes: 24,
    liked: false,
    comments: 8,
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    tags: ['design', 'onboarding'],
  },
  {
    id: 'sp2',
    author: {
      name: 'Marcus Thompson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
      role: 'Engineering Lead',
    },
    content:
      'Our API response times improved by 40% after the database optimization! Huge props to the backend team for making this happen. 🚀',
    likes: 56,
    liked: true,
    comments: 12,
    createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    tags: ['engineering', 'performance'],
  },
  {
    id: 'sp3',
    author: {
      name: 'Emily Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      role: 'Marketing Manager',
    },
    content:
      'We hit 10K users today! 🎉 Thank you to everyone who made this milestone possible. Let\'s keep the momentum going!',
    image: 'https://placehold.co/600x400/6366f1/ffffff?text=10K+Users',
    likes: 89,
    liked: true,
    comments: 24,
    createdAt: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
    tags: ['milestone', 'growth'],
  },
]

// Mock Gamification Profile
export const gamificationProfile: GamificationProfile = {
  level: 12,
  xp: 2850,
  xpToNextLevel: 3500,
  title: 'Productivity Wizard',
  achievements: [
    {
      id: 'a1',
      title: 'Early Bird',
      description: 'Complete 10 tasks before 9 AM',
      icon: '🌅',
      earned: true,
      earnedAt: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
    },
    {
      id: 'a2',
      title: 'Focus Master',
      description: 'Complete 25 Pomodoro sessions',
      icon: '🎯',
      earned: true,
      earnedAt: new Date(Date.now() - 1209600000).toISOString(), // 2 weeks ago
    },
    {
      id: 'a3',
      title: 'Team Player',
      description: 'Give 50 shoutouts to teammates',
      icon: '🤝',
      earned: true,
      earnedAt: new Date(Date.now() - 1814400000).toISOString(), // 3 weeks ago
    },
    {
      id: 'a4',
      title: 'Streak Legend',
      description: 'Maintain a 30-day productivity streak',
      icon: '🔥',
      earned: false,
    },
    {
      id: 'a5',
      title: 'Task Slayer',
      description: 'Complete 100 high-priority tasks',
      icon: '⚔️',
      earned: false,
    },
    {
      id: 'a6',
      title: 'Wellness Warrior',
      description: 'Complete all wellness challenges for a month',
      icon: '💪',
      earned: false,
    },
  ],
  weeklyXP: 850,
  streak: 12,
}

// Current User
export const currentUser: User = {
  id: 'user-001',
  name: 'Alex Chen',
  email: 'alex.chen@acme.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  role: 'Senior Product Designer',
  department: 'Design',
  joinDate: '2022-03-15',
}

// Mock People
export const people: Person[] = [
  {
    id: 'p1',
    name: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'Product Designer',
    department: 'Design',
    email: 'sarah.chen@acme.com',
    status: 'active',
    location: 'San Francisco, CA',
    timezone: 'PST (UTC-8)',
    skills: ['UI/UX', 'Figma', 'User Research', 'Prototyping'],
  },
  {
    id: 'p2',
    name: 'Marcus Thompson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    role: 'Engineering Lead',
    department: 'Engineering',
    email: 'marcus.thompson@acme.com',
    status: 'active',
    location: 'Austin, TX',
    timezone: 'CST (UTC-6)',
    skills: ['Node.js', 'React', 'Architecture', 'Mentoring'],
  },
  {
    id: 'p3',
    name: 'Emily Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    role: 'Marketing Manager',
    department: 'Marketing',
    email: 'emily.rodriguez@acme.com',
    status: 'away',
    location: 'New York, NY',
    timezone: 'EST (UTC-5)',
    skills: ['Content Strategy', 'SEO', 'Analytics', 'Campaign Management'],
  },
  {
    id: 'p4',
    name: 'David Kim',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    role: 'Senior Backend Engineer',
    department: 'Engineering',
    email: 'david.kim@acme.com',
    status: 'active',
    location: 'Seattle, WA',
    timezone: 'PST (UTC-8)',
    skills: ['Python', 'PostgreSQL', 'AWS', 'API Design'],
  },
  {
    id: 'p5',
    name: 'Jessica Martinez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    role: 'Product Manager',
    department: 'Product',
    email: 'jessica.martinez@acme.com',
    status: 'busy',
    location: 'Los Angeles, CA',
    timezone: 'PST (UTC-8)',
    skills: ['Product Strategy', 'Roadmapping', 'Stakeholder Management', 'Analytics'],
  },
  {
    id: 'p6',
    name: 'Alex Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    role: 'Frontend Developer',
    department: 'Engineering',
    email: 'alex.johnson@acme.com',
    status: 'active',
    location: 'Portland, OR',
    timezone: 'PST (UTC-8)',
    skills: ['TypeScript', 'React', 'CSS', 'Accessibility'],
  },
  {
    id: 'p7',
    name: 'Priya Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    role: 'Data Scientist',
    department: 'Data',
    email: 'priya.patel@acme.com',
    status: 'active',
    location: 'Chicago, IL',
    timezone: 'CST (UTC-6)',
    skills: ['Machine Learning', 'Python', 'SQL', 'Data Visualization'],
  },
  {
    id: 'p8',
    name: 'James Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    role: 'UX Researcher',
    department: 'Design',
    email: 'james.wilson@acme.com',
    status: 'offline',
    location: 'Boston, MA',
    timezone: 'EST (UTC-5)',
    skills: ['User Testing', 'Qualitative Research', 'Survey Design', 'Analytics'],
  },
  {
    id: 'p9',
    name: 'Lisa Anderson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    role: 'DevOps Engineer',
    department: 'Engineering',
    email: 'lisa.anderson@acme.com',
    status: 'active',
    location: 'Denver, CO',
    timezone: 'MST (UTC-7)',
    skills: ['Kubernetes', 'Docker', 'CI/CD', 'AWS'],
  },
  {
    id: 'p10',
    name: 'Ryan Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan',
    role: 'Content Designer',
    department: 'Design',
    email: 'ryan.chen@acme.com',
    status: 'active',
    location: 'San Francisco, CA',
    timezone: 'PST (UTC-8)',
    skills: ['UX Writing', 'Content Strategy', 'Microcopy', 'Voice & Tone'],
  },
  {
    id: 'p11',
    name: 'Aisha Mohammed',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha',
    role: 'QA Engineer',
    department: 'Engineering',
    email: 'aisha.mohammed@acme.com',
    status: 'away',
    location: 'Miami, FL',
    timezone: 'EST (UTC-5)',
    skills: ['Test Automation', 'Selenium', 'Jest', 'QA Strategy'],
  },
  {
    id: 'p12',
    name: 'Carlos Silva',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    role: 'Customer Success Lead',
    department: 'Customer Success',
    email: 'carlos.silva@acme.com',
    status: 'active',
    location: 'Atlanta, GA',
    timezone: 'EST (UTC-5)',
    skills: ['Customer Relations', 'Onboarding', 'Support Strategy', 'Communication'],
  },
  {
    id: 'p13',
    name: 'Nina Gupta',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nina',
    role: 'HR Manager',
    department: 'People',
    email: 'nina.gupta@acme.com',
    status: 'active',
    location: 'San Francisco, CA',
    timezone: 'PST (UTC-8)',
    skills: ['Recruiting', 'Employee Experience', 'Compensation', 'Culture'],
  },
  {
    id: 'p14',
    name: 'Tom Harris',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom',
    role: 'Sales Director',
    department: 'Sales',
    email: 'tom.harris@acme.com',
    status: 'busy',
    location: 'New York, NY',
    timezone: 'EST (UTC-5)',
    skills: ['Enterprise Sales', 'Negotiation', 'CRM', 'Team Leadership'],
  },
  {
    id: 'p15',
    name: 'Maya Jackson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
    role: 'Security Engineer',
    department: 'Engineering',
    email: 'maya.jackson@acme.com',
    status: 'active',
    location: 'Washington, DC',
    timezone: 'EST (UTC-5)',
    skills: ['Security Audits', 'Penetration Testing', 'Compliance', 'Incident Response'],
  },
]

// Mock Wellness Challenges
export const wellnessChallenges: WellnessChallenge[] = [
  {
    id: 'w1',
    title: '30-Day Breathing Challenge',
    description: 'Practice deep breathing exercises for 5 minutes daily',
    type: 'breathing',
    duration: 5,
    progress: 73,
    streak: 22,
    participants: 156,
  },
  {
    id: 'w2',
    title: 'Desk Stretch Routine',
    description: 'Complete a full-body stretch routine every 2 hours',
    type: 'stretching',
    duration: 10,
    progress: 45,
    streak: 8,
    participants: 203,
  },
  {
    id: 'w3',
    title: 'Hydration Goal',
    description: 'Drink 8 glasses of water throughout the workday',
    type: 'hydration',
    duration: 0,
    progress: 62,
    streak: 15,
    participants: 289,
  },
  {
    id: 'w4',
    title: 'Walking Meetings',
    description: 'Take at least one meeting as a walking meeting daily',
    type: 'walking',
    duration: 30,
    progress: 38,
    streak: 5,
    participants: 127,
  },
  {
    id: 'w5',
    title: 'Mindful Minutes',
    description: 'Practice meditation or mindfulness for 10 minutes',
    type: 'meditation',
    duration: 10,
    progress: 81,
    streak: 18,
    participants: 178,
  },
  {
    id: 'w6',
    title: 'Eye Rest Break',
    description: 'Follow the 20-20-20 rule to reduce eye strain',
    type: 'stretching',
    duration: 1,
    progress: 55,
    streak: 12,
    participants: 241,
  },
]

// Mock Analytics Data (last 7 days)
export const analyticsData: AnalyticsDataPoint[] = [
  {
    date: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0],
    focusMinutes: 180,
    tasksCompleted: 8,
    meetings: 3,
    productivity: 85,
  },
  {
    date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
    focusMinutes: 210,
    tasksCompleted: 12,
    meetings: 2,
    productivity: 92,
  },
  {
    date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
    focusMinutes: 150,
    tasksCompleted: 6,
    meetings: 5,
    productivity: 68,
  },
  {
    date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    focusMinutes: 240,
    tasksCompleted: 15,
    meetings: 1,
    productivity: 96,
  },
  {
    date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    focusMinutes: 195,
    tasksCompleted: 10,
    meetings: 4,
    productivity: 78,
  },
  {
    date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    focusMinutes: 165,
    tasksCompleted: 7,
    meetings: 3,
    productivity: 72,
  },
  {
    date: new Date().toISOString().split('T')[0],
    focusMinutes: 220,
    tasksCompleted: 11,
    meetings: 2,
    productivity: 88,
  },
]

// Mock Calendar Events
export const calendarEvents: CalendarEvent[] = [
  {
    id: 'ce1',
    title: 'Team Standup',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '09:30',
    type: 'meeting',
    color: '#3b82f6',
    description: 'Daily team sync to discuss progress and blockers',
    attendees: ['Team'],
  },
  {
    id: 'ce2',
    title: 'Deep Work Session',
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '12:00',
    type: 'focus-block',
    color: '#8b5cf6',
    description: 'Focused time for the authentication feature',
  },
  {
    id: 'ce3',
    title: 'Q4 Planning Review',
    date: new Date().toISOString().split('T')[0],
    startTime: '14:00',
    endTime: '15:30',
    type: 'meeting',
    color: '#3b82f6',
    description: 'Review and finalize Q4 roadmap with stakeholders',
    attendees: ['Product Team', 'Engineering Leads'],
  },
  {
    id: 'ce4',
    title: 'Product Launch Deadline',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    startTime: '17:00',
    endTime: '17:00',
    type: 'deadline',
    color: '#ef4444',
    description: 'Final deployment of v2.0 to production',
  },
  {
    id: 'ce5',
    title: 'Design Critique',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    startTime: '11:00',
    endTime: '12:00',
    type: 'review',
    color: '#f59e0b',
    description: 'Review homepage redesign mockups',
    attendees: ['Design Team', 'Product'],
  },
  {
    id: 'ce6',
    title: 'Team Lunch',
    date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
    startTime: '12:30',
    endTime: '13:30',
    type: 'social',
    color: '#10b981',
    description: 'Monthly team bonding lunch at the new Italian place',
    attendees: ['Entire Team'],
  },
  {
    id: 'ce7',
    title: '1:1 with Manager',
    date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
    startTime: '15:00',
    endTime: '15:30',
    type: 'meeting',
    color: '#3b82f6',
    description: 'Bi-weekly check-in and career development discussion',
  },
  {
    id: 'ce8',
    title: 'Code Review Session',
    date: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '11:00',
    type: 'review',
    color: '#f59e0b',
    description: 'Review PRs for the authentication feature',
  },
  {
    id: 'ce9',
    title: 'Sprint Planning',
    date: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '11:00',
    type: 'meeting',
    color: '#3b82f6',
    description: 'Plan work for the upcoming sprint',
    attendees: ['Engineering Team'],
  },
  {
    id: 'ce10',
    title: 'Focus Time',
    date: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
    startTime: '14:00',
    endTime: '16:00',
    type: 'focus-block',
    color: '#8b5cf6',
    description: 'No meetings - deep work time',
  },
]

// Mock Shoutouts
export const shoutouts: Shoutout[] = [
  {
    id: 's1',
    from: {
      name: 'Alex Morgan',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
    to: {
      name: 'Jordan Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    },
    message: 'Incredible work on the API refactor! You made our entire stack faster and more maintainable.',
    emoji: '🚀',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 's2',
    from: {
      name: 'Sam Rivera',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
    },
    to: {
      name: 'Taylor Brooks',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor',
    },
    message: 'Your mentorship has been invaluable. Thanks for always making time to help me grow!',
    emoji: '🌟',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 's3',
    from: {
      name: 'Casey Wu',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey',
    },
    to: {
      name: 'Riley Quinn',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riley',
    },
    message: 'The design system you built is absolutely beautiful and so easy to use. Game changer!',
    emoji: '🎨',
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: 's4',
    from: {
      name: 'Morgan Park',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan',
    },
    to: {
      name: 'Jamie Fox',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie',
    },
    message: 'You crushed that client demo! Your presentation skills are top-notch.',
    emoji: '👏',
    createdAt: new Date(Date.now() - 14400000).toISOString(),
  },
]

// Mock Company Events
export const companyEvents: CompanyEvent[] = [
  {
    id: 'e1',
    title: 'Q1 All-Hands Meeting',
    description: 'Join us for our quarterly review and roadmap reveal',
    date: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
    time: '2:00 PM - 3:30 PM',
    location: 'Main Auditorium / Zoom',
    type: 'all-hands',
    attendees: 147,
  },
  {
    id: 'e2',
    title: 'Team Happy Hour',
    description: 'Casual drinks and snacks to celebrate this month\'s wins',
    date: new Date(Date.now() + 432000000).toISOString(), // 5 days from now
    time: '5:00 PM - 7:00 PM',
    location: 'Office Rooftop',
    type: 'social',
    attendees: 68,
  },
  {
    id: 'e3',
    title: 'Design Workshop: Accessibility',
    description: 'Learn best practices for inclusive design',
    date: new Date(Date.now() + 604800000).toISOString(), // 7 days from now
    time: '10:00 AM - 12:00 PM',
    location: 'Conference Room B',
    type: 'workshop',
    attendees: 32,
  },
  {
    id: 'e4',
    title: 'Product Launch: Mobile 2.0',
    description: 'Launch event for our new mobile app',
    date: new Date(Date.now() + 1209600000).toISOString(), // 14 days from now
    time: '9:00 AM - 10:00 AM',
    location: 'Virtual Event',
    type: 'launch',
    attendees: 203,
  },
  {
    id: 'e5',
    title: 'Sprint Planning Deadline',
    description: 'All teams submit sprint commitments',
    date: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
    time: '5:00 PM',
    location: 'Async',
    type: 'deadline',
    attendees: 89,
  },
]

// Mock Featured Video
export const featuredVideo: FeaturedVideo = {
  id: 'v1',
  title: 'CEO Update: Our Vision for 2024',
  description: 'Join our CEO as she shares exciting updates about our product roadmap, new initiatives, and what\'s ahead for the company this year.',
  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  thumbnail: 'https://placehold.co/640x360/6366f1/ffffff?text=CEO+Update',
  duration: '12:34',
  author: 'Jennifer Martinez, CEO',
}

// Mock Announcements
export const announcements: Announcement[] = [
  {
    id: 'ann1',
    title: 'New Product Feature: Real-time Collaboration',
    content:
      'We are excited to announce the launch of real-time collaboration features! Teams can now work together seamlessly on documents, see live cursors, and chat in context. This has been our most requested feature and we cannot wait for you to try it.',
    author: {
      name: 'Alex Morgan',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      role: 'VP of Product',
    },
    category: 'product',
    pinned: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: 'ann2',
    title: 'Company All-Hands: Q1 Results & Q2 Planning',
    content:
      'Join us this Friday at 2 PM for our quarterly all-hands meeting. We will review Q1 achievements, share Q2 roadmap, and celebrate team wins. Pizza will be served!',
    author: {
      name: 'Jordan Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
      role: 'CEO',
    },
    category: 'company',
    pinned: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    id: 'ann3',
    title: 'Engineering: New CI/CD Pipeline Deployed',
    content:
      'Our new CI/CD pipeline is now live! Build times reduced by 60%, and deployments are now automated. Check the engineering wiki for the updated workflow documentation.',
    author: {
      name: 'Priya Patel',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      role: 'Engineering Manager',
    },
    category: 'engineering',
    pinned: false,
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  },
  {
    id: 'ann4',
    title: 'Design System v2.0 Released',
    content:
      'The design team has shipped version 2.0 of our design system! New components, improved accessibility, dark mode support, and comprehensive Figma library updates.',
    author: {
      name: 'Taylor Swift',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor',
      role: 'Design Lead',
    },
    category: 'design',
    pinned: false,
    createdAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
  },
  {
    id: 'ann5',
    title: 'Updated PTO Policy & Benefits',
    content:
      'We have enhanced our benefits package! Unlimited PTO, increased wellness stipend, and new parental leave policy. Review the updated handbook in the HR portal.',
    author: {
      name: 'Sam Rivera',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
      role: 'Head of People',
    },
    category: 'hr',
    pinned: false,
    createdAt: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
  },
]

// Mock Notices
export const notices: Notice[] = [
  {
    id: 'not1',
    title: 'URGENT: Security Patch Required',
    description:
      'Critical security update must be applied to all systems by EOD. Please run the update script immediately.',
    priority: 'critical',
    deadline: new Date(Date.now() + 14400000).toISOString(), // 4 hours from now
    category: 'Security',
  },
  {
    id: 'not2',
    title: 'Code Freeze for v3.0 Release',
    description:
      'No new features should be merged until after the v3.0 release. Focus on bug fixes and testing only.',
    priority: 'high',
    deadline: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
    category: 'Engineering',
  },
  {
    id: 'not3',
    title: 'Design Review: Mobile App Redesign',
    description:
      'All designers and product managers please review the mobile redesign proposals and provide feedback.',
    priority: 'medium',
    deadline: new Date(Date.now() + 432000000).toISOString(), // 5 days from now
    category: 'Design',
  },
  {
    id: 'not4',
    title: 'Team Building Event: Sign Up Reminder',
    description:
      'Last chance to sign up for the team building event next month. Limited spots available!',
    priority: 'low',
    deadline: new Date(Date.now() + 604800000).toISOString(), // 7 days from now
    category: 'HR',
  },
]

// Mock Team Updates
export const teamUpdates: TeamUpdate[] = [
  {
    id: 'tu1',
    team: 'Engineering',
    type: 'shipped',
    title: 'API v2 Performance Improvements',
    description:
      'Reduced latency by 40% and improved throughput. Now handling 10K requests/sec.',
    author: 'Marcus Thompson',
    createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    id: 'tu2',
    team: 'Engineering',
    type: 'needs-input',
    title: 'Database Migration Strategy',
    description:
      'Need feedback on the proposed migration approach. Please review the RFC by EOD.',
    author: 'Priya Patel',
    createdAt: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
  },
  {
    id: 'tu3',
    team: 'Product',
    type: 'decided',
    title: 'Pricing Model for Enterprise Tier',
    description:
      'After user research and stakeholder input, we are moving forward with usage-based pricing.',
    author: 'Alex Morgan',
    createdAt: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
  },
  {
    id: 'tu4',
    team: 'Design',
    type: 'shipped',
    title: 'Accessibility Audit Complete',
    description:
      'All critical WCAG violations fixed. Dashboard now fully accessible with keyboard navigation.',
    author: 'Sarah Chen',
    createdAt: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
  },
  {
    id: 'tu5',
    team: 'Design',
    type: 'needs-input',
    title: 'Icon Set Refresh Proposals',
    description:
      'Three icon style options to choose from. Vote in #design-polls by Friday.',
    author: 'Taylor Swift',
    createdAt: new Date(Date.now() - 28800000).toISOString(), // 8 hours ago
  },
  {
    id: 'tu6',
    team: 'Marketing',
    type: 'shipped',
    title: 'New Landing Page Live',
    description:
      'Homepage redesign is now live! Early metrics show 25% increase in conversions.',
    author: 'Emily Rodriguez',
    createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
  },
]

// Alias for backwards compatibility
export const socialPosts = posts
