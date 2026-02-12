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

const MOTIVATIONAL_QUOTES = [
  "Small daily improvements are the key to staggering long-term results.",
  "The secret of getting ahead is getting started.",
  "Focus on being productive instead of busy.",
  "Your only limit is your mind.",
  "Success is the sum of small efforts repeated day in and day out.",
  "Don't watch the clock; do what it does — keep going.",
  "The way to get started is to quit talking and begin doing.",
  "It's not about having time. It's about making time.",
  "You don't have to be great to start, but you have to start to be great.",
  "Productivity is never an accident. It is the result of commitment.",
]

function getTodayQuote(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  )
  return MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length]
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

export function DailyCheckin() {
  const { profile, markCheckedIn, checkDailyReset, checkWeeklyReset } =
    useGamificationStore()
  const tasks = useTaskStore((s) => s.tasks)
  const [open, setOpen] = useState(false)

  const today = new Date().toISOString().split("T")[0]
  const pendingTasks = tasks.filter((t) => !t.completed)
  const highPriorityCount = pendingTasks.filter(
    (t) => t.priority === "high"
  ).length

  useEffect(() => {
    // Run daily/weekly resets
    checkDailyReset()
    checkWeeklyReset()

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
            {getGreeting()}, Alex!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Streak */}
          <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10">
            <Flame className="h-8 w-8 text-orange-500" />
            <div>
              <div className="text-2xl font-bold">{profile.streak}-day streak</div>
              <div className="text-xs text-muted-foreground">
                {profile.streakFreezes > 0 && (
                  <span className="inline-flex items-center gap-1">
                    <Shield className="h-3 w-3 text-blue-500" />
                    {profile.streakFreezes} freeze{profile.streakFreezes !== 1 ? "s" : ""} available
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Today's overview */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-muted/50">
              <Target className="h-5 w-5 text-blue-500 shrink-0" />
              <div>
                <div className="text-lg font-bold">{pendingTasks.length}</div>
                <div className="text-xs text-muted-foreground">Tasks today</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-muted/50">
              <CheckCircle className="h-5 w-5 text-red-500 shrink-0" />
              <div>
                <div className="text-lg font-bold">{highPriorityCount}</div>
                <div className="text-xs text-muted-foreground">High priority</div>
              </div>
            </div>
          </div>

          {/* XP multiplier hint */}
          {new Date().getHours() < 9 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <Zap className="h-4 w-4 text-yellow-500 shrink-0" />
              <span className="text-sm font-medium">
                Early Bird bonus active! 1.5x XP until 9 AM
              </span>
            </div>
          )}

          {/* Multiplier info */}
          {profile.streak >= 7 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Flame className="h-4 w-4 text-purple-500 shrink-0" />
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

          {/* Quote */}
          <div className="text-center py-2">
            <p className="text-sm italic text-muted-foreground">
              &ldquo;{getTodayQuote()}&rdquo;
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
