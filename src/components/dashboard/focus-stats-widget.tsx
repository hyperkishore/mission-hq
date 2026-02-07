"use client"

import { Progress } from "@/components/ui/progress"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import { WidgetCard } from "@/components/dashboard/widget-card"
import { useFocusStore } from "@/stores/focus-store"
import { Timer, Clock, Target, Flame, Activity } from "lucide-react"

export function FocusStatsWidget() {
  const { sessionsCompleted, totalFocusTime, dailyGoal } = useFocusStore()

  const hours = Math.floor(totalFocusTime / 3600)
  const minutes = Math.floor((totalFocusTime % 3600) / 60)
  const focusTimeDisplay = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`

  const goalProgress = Math.min((sessionsCompleted / dailyGoal) * 100, 100)
  const streak = sessionsCompleted

  const stats = [
    {
      icon: Timer,
      label: "Sessions Today",
      value: sessionsCompleted,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Clock,
      label: "Focus Time",
      value: focusTimeDisplay,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      isString: true,
    },
    {
      icon: Target,
      label: "Daily Goal",
      value: `${sessionsCompleted}/${dailyGoal}`,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      progress: goalProgress,
      isString: true,
    },
    {
      icon: Flame,
      label: "Streak",
      value: streak,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  return (
    <WidgetCard title="Today's Stats" icon={<Activity className="h-4 w-4" />}>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-start justify-between mb-2">
                <div className={`p-1.5 rounded-md ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>

              <div className="space-y-0.5">
                <p className="text-xl font-bold">
                  {stat.isString ? (
                    stat.value
                  ) : (
                    <AnimatedCounter value={stat.value as number} />
                  )}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>

              {stat.progress !== undefined && (
                <div className="mt-2">
                  <Progress value={stat.progress} className="h-1.5" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </WidgetCard>
  )
}
