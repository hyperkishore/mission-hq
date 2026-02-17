"use client"

import { useEffect, useState } from "react"
import { useGamificationStore } from "@/stores/gamification-store"
import { useTaskStore } from "@/stores/task-store"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Flame, Target, CheckCircle, Zap, Shield } from "lucide-react"
import { generateInsight } from "@/lib/insights"
import { useUserStore } from "@/stores/user-store"

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

export function DailyCheckin() {
  const { profile, markCheckedIn, checkDailyReset, checkWeeklyReset, checkMonthlyReset } =
    useGamificationStore()
  const tasks = useTaskStore((s) => s.tasks)
  const firstName = useUserStore((s) => s.firstName())
  const [open, setOpen] = useState(false)

  const today = new Date().toISOString().split("T")[0]
  const pendingTasks = tasks.filter((t) => !t.completed)
  const highPriorityCount = pendingTasks.filter(
    (t) => t.priority === "high"
  ).length

  useEffect(() => {
    // Run daily/weekly/monthly resets
    checkDailyReset()
    checkWeeklyReset()
    checkMonthlyReset()

    // Show check-in if not done today
    if (profile.lastCheckinDate !== today) {
      const timer = setTimeout(() => setOpen(true), 800) // slight delay for mount
      return () => clearTimeout(timer)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleCheckin = () => {
    markCheckedIn()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleCheckin()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {getGreeting()}, {firstName}!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Streak — subtle display */}
          {profile.streak > 0 && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Flame className="h-4 w-4 text-muted-foreground" />
              <span>{profile.streak}-day streak</span>
              {profile.streakFreezes > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Shield className="h-3 w-3 text-muted-foreground" />
                  {profile.streakFreezes}
                </span>
              )}
            </div>
          )}

          {/* Today's overview */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-muted/50">
              <Target className="h-5 w-5 text-muted-foreground shrink-0" />
              <div>
                <div className="text-lg font-bold">{pendingTasks.length}</div>
                <div className="text-xs text-muted-foreground">Tasks today</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-muted/50">
              <CheckCircle className="h-5 w-5 text-destructive shrink-0" />
              <div>
                <div className="text-lg font-bold">{highPriorityCount}</div>
                <div className="text-xs text-muted-foreground">High priority</div>
              </div>
            </div>
          </div>

          {/* XP multiplier hint */}
          {new Date().getHours() < 9 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-accent border border-border">
              <Zap className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm font-medium">
                Early Bird bonus active! 1.5x XP until 9 AM
              </span>
            </div>
          )}

          {/* Multiplier info */}
          {profile.streak >= 7 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-accent border border-border">
              <Flame className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm font-medium">
                {profile.streak >= 30
                  ? "2x"
                  : profile.streak >= 14
                  ? "1.75x"
                  : "1.5x"}{" "}
                streak multiplier active
              </span>
            </div>
          )}

          {/* Personalized insight */}
          <div className="text-center py-2">
            <p className="text-sm text-muted-foreground">
              {generateInsight(profile)}
            </p>
          </div>

          {/* Level badge */}
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary">Level {profile.level}</Badge>
            <Badge variant="outline">
              {profile.xp} / {profile.xpToNextLevel} XP
            </Badge>
          </div>
        </div>

        <Button onClick={handleCheckin} className="w-full" size="lg">
          Start my day
        </Button>
      </DialogContent>
    </Dialog>
  )
}
