"use client"

import Link from "next/link"
import { CheckCircle, Timer, Flame, Zap, Bell } from "lucide-react"
import { useTaskStore } from "@/stores/task-store"
import { useFocusStore } from "@/stores/focus-store"
import { useGamificationStore } from "@/stores/gamification-store"
import { useNotificationStore } from "@/stores/notification-store"
import { AnimatedCounter } from "@/components/shared/animated-counter"

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
      numericValue: completedToday,
      suffix: "",
      icon: CheckCircle,
      href: "/dashboard",
    },
    {
      label: "Focus time",
      numericValue: focusMinutes,
      suffix: "m",
      icon: Timer,
      href: "/analytics",
    },
    {
      label: "Streak",
      numericValue: profile.streak,
      suffix: "d",
      icon: Flame,
      href: "/dashboard",
    },
    {
      label: `Lv ${profile.level}`,
      numericValue: xpPercentage,
      suffix: "%",
      icon: Zap,
      href: "/leaderboard",
    },
    {
      label: "Unread",
      numericValue: notifications,
      suffix: "",
      icon: Bell,
      href: "/dashboard",
    },
  ]

  return (
    <div className="relative">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="flex items-center gap-2.5 rounded-lg border bg-card px-2.5 py-2 md:px-3.5 md:py-2.5 hover:bg-accent/50 transition-colors shrink-0"
          >
            <stat.icon className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold leading-none">
                <AnimatedCounter value={stat.numericValue} suffix={stat.suffix} duration={800} />
              </span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {stat.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
      {/* Right-edge gradient scroll hint */}
      <div className="absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
    </div>
  )
}
