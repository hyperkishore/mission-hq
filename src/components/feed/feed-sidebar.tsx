"use client"

import { FocusTimerWidget } from "@/components/dashboard/focus-timer-widget"
import { TasksWidget } from "@/components/dashboard/tasks-widget"
import { QuickPollWidget } from "@/components/dashboard/quick-poll-widget"
import { GamificationWidget } from "@/components/dashboard/gamification-widget"

export function FeedSidebar() {
  return (
    <div className="space-y-4 hidden lg:block">
      <div className="rounded-lg border bg-card p-1">
        <FocusTimerWidget />
      </div>
      <div className="rounded-lg border bg-card p-1">
        <TasksWidget />
      </div>
      <div className="rounded-lg border bg-card p-1">
        <QuickPollWidget />
      </div>
      <div className="rounded-lg border bg-card p-1">
        <GamificationWidget />
      </div>
    </div>
  )
}
