"use client"

import Link from "next/link"
import { CheckCircle, Timer, Flame, Zap, Bell } from "lucide-react"
import { useTaskStore } from "@/stores/task-store"
import { useFocusStore } from "@/stores/focus-store"
import { useGamificationStore } from "@/stores/gamification-store"
import { useNotificationStore } from "@/stores/notification-store"

export function KpiBar() {
  const { tasks } = useTaskStore()
  const { sessionsCompleted, totalFocusTime } = useFocusStore()
  const { profile } = useGamificationStore()
  const { unreadCount } = useNotificationStore()

  const completedToday = tasks.filter((t) => t.completed).length
  const focusMinutes = Math.floor(totalFocusTime / 60)
  const xpPercentage = Math.round((profile.xp / profile.xpToNextLevel) * 100)
  const notifications = unreadCount()

  const stats = [
    {
      label: "Tasks done",
      value: completedToday,
      icon: CheckCircle,
      href: "/dashboard",
      color: "text-green-500",
    },
    {
      label: "Focus time",
      value: `${focusMinutes}m`,
      icon: Timer,
      href: "/analytics",
      color: "text-blue-500",
    },
    {
      label: "Streak",
      value: `${profile.streak}d`,
      icon: Flame,
      href: "/dashboard",
      color: "text-orange-500",
    },
    {
      label: `Lv ${profile.level}`,
      value: `${xpPercentage}%`,
      icon: Zap,
      href: "/leaderboard",
      color: "text-yellow-500",
    },
    {
      label: "Unread",
      value: notifications,
      icon: Bell,
      href: "/dashboard",
      color: "text-red-500",
    },
  ]

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {stats.map((stat) => (
        <Link
          key={stat.label}
          href={stat.href}
          className="flex items-center gap-2.5 rounded-lg border bg-card px-3.5 py-2.5 hover:bg-accent/50 transition-colors shrink-0"
        >
          <stat.icon className={`h-4 w-4 ${stat.color}`} />
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold leading-none">{stat.value}</span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {stat.label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
