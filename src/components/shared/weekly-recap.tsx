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
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { generateWeeklyNarrative } from "@/lib/insights"

function TrendIcon({ value }: { value: number }) {
  if (value > 0) return <TrendingUp className="h-3.5 w-3.5 text-green-500" />
  if (value < 0) return <TrendingDown className="h-3.5 w-3.5 text-red-500" />
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" />
}

export function WeeklyRecap() {
  const { profile, dismissWeeklyRecap } = useGamificationStore()
  const recap = profile.weeklyRecap

  if (!recap) return null

  const narrative = generateWeeklyNarrative(recap, profile)

  return (
    <Dialog open={!!recap} onOpenChange={(open) => !open && dismissWeeklyRecap()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Your Week in Review
          </DialogTitle>
          <DialogDescription className="text-center">
            Here&apos;s how last week went
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Narrative sentences */}
          <div className="space-y-2">
            {narrative.map((sentence, i) => (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                {sentence}
              </p>
            ))}
          </div>

          {/* Compact stat row with trend arrows */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-lg font-bold">{recap.xpEarned}</span>
                <TrendIcon value={recap.xpEarned > 300 ? 1 : -1} />
              </div>
              <p className="text-[10px] text-muted-foreground">XP</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-lg font-bold">{recap.tasksCompleted}</span>
                <TrendIcon value={recap.tasksCompleted > 5 ? 1 : 0} />
              </div>
              <p className="text-[10px] text-muted-foreground">Tasks</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-lg font-bold">{recap.focusSessions}</span>
                <TrendIcon value={recap.focusSessions > 3 ? 1 : -1} />
              </div>
              <p className="text-[10px] text-muted-foreground">Focus</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-lg font-bold">{recap.streakDays}</span>
                <TrendIcon value={recap.streakDays > 7 ? 1 : 0} />
              </div>
              <p className="text-[10px] text-muted-foreground">Streak</p>
            </div>
          </div>
        </div>

        <Button onClick={dismissWeeklyRecap} className="w-full">
          Start the week
        </Button>
      </DialogContent>
    </Dialog>
  )
}
