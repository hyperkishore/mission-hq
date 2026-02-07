# Dashboard Widgets Documentation

This document describes the 6 new dashboard widget components created for Mission HQ v4.

## Components Created

### 1. AnnouncementsWidget (`announcements-widget.tsx`)
**Purpose**: Displays pinned company announcements with author avatars and category badges.

**Features**:
- Color-coded category badges (product=blue, company=purple, engineering=green, design=pink, hr=orange)
- Author avatar, name, and role
- Time ago formatting using date-fns
- Pin icon for pinned announcements
- Content truncated to 2 lines with line-clamp
- ScrollArea for overflow

**Data Source**: `announcements` from `@/data/mock-data`

---

### 2. NoticesWidget (`notices-widget.tsx`)
**Purpose**: Shows priority-colored notices with countdown timers.

**Features**:
- Left border colored by priority (critical=red, high=orange, medium=yellow, low=green) using `border-l-4`
- PriorityBadge component integration
- CountdownTimer component showing time remaining until deadline
- ScrollArea for overflow

**Data Source**: `notices` from `@/data/mock-data`

---

### 3. TeamUpdatesWidget (`team-updates-widget.tsx`)
**Purpose**: Displays team updates grouped by team with type badges.

**Features**:
- Grouped visually by team name
- Type badges with icons:
  - shipped: green with rocket icon
  - decided: blue with check icon
  - needs-input: amber with message-circle icon
- Author name and time ago
- Separators between team groups
- ScrollArea for overflow

**Data Source**: `teamUpdates` from `@/data/mock-data`

---

### 4. TasksWidget (`tasks-widget.tsx`)
**Purpose**: Interactive task list with filters and gamification.

**Features**:
- Filter tabs: Today, High Priority, All, Completed
- Interactive checkboxes (shadcn Checkbox component)
- Line-through styling for completed tasks
- Priority badges (high=red, medium=yellow, low=green)
- Time estimate badges (e.g., "30m")
- **Gamification Integration**:
  - On task completion: fires confetti using `useConfetti` hook
  - Adds 25 XP using `useGamificationStore.getState().addXP(25)`
- Task count in header

**Data Source**: `useTaskStore` from `@/stores/task-store`

---

### 5. FocusTimerWidget (`focus-timer-widget.tsx`)
**Purpose**: Circular pomodoro timer with session tracking.

**Features**:
- Large circular SVG progress indicator (280x280px)
- Animated stroke-dashoffset for progress animation
- Digital time display (MM:SS) in center
- Status-based coloring:
  - Focus: blue
  - Break: green
  - Paused/Idle: muted
- Control buttons with framer-motion transitions:
  - Start (when idle)
  - Pause/Resume (when running)
  - Reset (when not idle)
- **Gamification Integration**:
  - On session completion (status changes to break): fires confetti and adds 50 XP
- Auto-ticking timer (1 second intervals)

**Data Source**: `useFocusStore` from `@/stores/focus-store`

---

### 6. FocusStatsWidget (`focus-stats-widget.tsx`)
**Purpose**: Displays 4 stat cards showing focus session statistics.

**Features**:
- Grid layout (2x2)
- Four stat cards:
  1. **Sessions Today**: Count of completed sessions (Timer icon, blue)
  2. **Focus Time**: Total focus time formatted as "Xh Ym" (Clock icon, purple)
  3. **Daily Goal**: Progress towards daily goal with progress bar (Target icon, green)
  4. **Streak**: Current session streak (Flame icon, orange)
- AnimatedCounter component for numeric values
- Icons from lucide-react
- Color-coded backgrounds and icons

**Data Source**: `useFocusStore` from `@/stores/focus-store`

---

## Dependencies

All widgets use:
- **UI Components**: shadcn/ui (card, badge, avatar, progress, tabs, checkbox, scroll-area, button, separator)
- **Animations**: framer-motion
- **State Management**: Zustand stores
- **Utilities**: date-fns, lucide-react icons
- **Types**: TypeScript interfaces from `@/types`

## Integration

Widgets are integrated in the dashboard layout at:
`/Users/kishore/Desktop/Claude-experiments/mission-hq-v4/src/app/(dashboard)/dashboard/page.tsx`

Using the BentoGrid layout system with responsive column/row spans.

## Mock Data Extensions

Added to `/Users/kishore/Desktop/Claude-experiments/mission-hq-v4/src/data/mock-data.ts`:
- `announcements: Announcement[]` (5 items)
- `notices: Notice[]` (4 items)
- `teamUpdates: TeamUpdate[]` (6 items)

## Barrel Export

Created `/Users/kishore/Desktop/Claude-experiments/mission-hq-v4/src/components/dashboard/index.ts` for convenient imports:

```typescript
export { AnnouncementsWidget } from "./announcements-widget"
export { NoticesWidget } from "./notices-widget"
export { TeamUpdatesWidget } from "./team-updates-widget"
export { TasksWidget } from "./tasks-widget"
export { FocusTimerWidget } from "./focus-timer-widget"
export { FocusStatsWidget } from "./focus-stats-widget"
```

## TypeScript Compilation

All components pass TypeScript compilation with no errors (`npx tsc --noEmit`).
