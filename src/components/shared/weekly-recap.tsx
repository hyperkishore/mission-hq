"use client"

import { useGamificationStore } from "@/stores/gamification-store"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trophy, Flame, CheckCircle, Star, Zap } from "lucide-react"

export function WeeklyRecap() {
  const { profile, dismissWeeklyRecap } = useGamificationStore()
  const recap = profile.weeklyRecap

  if (!recap) return null

  return (
    <Dialog open={!!recap} onOpenChange={(open) => !open && dismissWeeklyRecap()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Weekly Recap
          </DialogTitle>
          <DialogDescription className="text-center">
            Here&apos;s how you did last week
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Zap className="h-5 w-5 text-yellow-500 shrink-0" />
              <div>
                <div className="text-lg font-bold">{recap.xpEarned}</div>
                <div className="text-xs text-muted-foreground">XP Earned</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
              <div>
                <div className="text-lg font-bold">{recap.tasksCompleted}</div>
                <div className="text-xs text-muted-foreground">Tasks Done</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Trophy className="h-5 w-5 text-blue-500 shrink-0" />
              <div>
                <div className="text-lg font-bold">{recap.focusSessions}</div>
                <div className="text-xs text-muted-foreground">Focus Sessions</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Star className="h-5 w-5 text-amber-500 shrink-0" />
              <div>
                <div className="text-lg font-bold">{recap.shoutoutsGiven}</div>
                <div className="text-xs text-muted-foreground">Shoutouts</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-primary/10">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-medium">
              {recap.streakDays}-day streak maintained
            </span>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            New week, fresh start. Your weekly XP has been reset — time to climb the leaderboard!
          </p>
        </div>

        <Button onClick={dismissWeeklyRecap} className="w-full">
          Let&apos;s go!
        </Button>
      </DialogContent>
    </Dialog>
  )
}
