"use client"

import { useGamificationStore } from "@/stores/gamification-store"
import { useConfetti } from "@/hooks/use-confetti"
import { useEffect, useRef } from "react"
import { WidgetCard } from "@/components/dashboard/widget-card"
import { Target, Settings } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface RingProps {
  progress: number // 0-1
  color: string
  size: number
  strokeWidth: number
}

function Ring({ progress, color, size, strokeWidth }: RingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - Math.min(progress, 1) * circumference

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-muted/20"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
    </svg>
  )
}

const COLORS = {
  tasks: "var(--chart-1)",
  focus: "var(--chart-2)",
  social: "var(--chart-3)",
} as const

function GoalStepper({ label, value, onChange, min = 1, max = 20 }: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs font-medium min-w-[48px]">{label}</span>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-xs"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
        >
          -
        </Button>
        <span className="text-xs font-medium w-5 text-center">{value}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-xs"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
        >
          +
        </Button>
      </div>
    </div>
  )
}

export function ProgressRings() {
  const { profile, addXP, updatePersonalGoals } = useGamificationStore()
  const { fire } = useConfetti()
  const prevAllComplete = useRef(false)

  const goals = profile.personalGoals

  const taskProgress = profile.dailyTasksCompleted / goals.tasks
  const focusProgress = profile.dailyFocusSessions / goals.focusSessions
  const socialProgress = profile.dailySocialEngagements / goals.socialEngagements

  const allComplete = taskProgress >= 1 && focusProgress >= 1 && socialProgress >= 1

  useEffect(() => {
    if (allComplete && !prevAllComplete.current) {
      fire()
      addXP(100, 'All daily goals completed!')
    }
    prevAllComplete.current = allComplete
  }, [allComplete]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetCard
      title="Daily Goals"
      icon={<Target className="h-4 w-4" />}
      headerAction={
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Settings className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-52" align="end">
            <div className="space-y-3">
              <p className="text-xs font-medium text-muted-foreground">Daily targets</p>
              <GoalStepper
                label="Tasks"
                value={goals.tasks}
                onChange={(v) => updatePersonalGoals({ tasks: v })}
              />
              <GoalStepper
                label="Focus"
                value={goals.focusSessions}
                onChange={(v) => updatePersonalGoals({ focusSessions: v })}
              />
              <GoalStepper
                label="Social"
                value={goals.socialEngagements}
                onChange={(v) => updatePersonalGoals({ socialEngagements: v })}
              />
            </div>
          </PopoverContent>
        </Popover>
      }
    >
      <div className="flex items-center justify-center gap-6 py-2">
        {/* Stacked rings */}
        <div className="relative" style={{ width: 120, height: 120 }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Ring
              progress={taskProgress}
              color={COLORS.tasks}
              size={120}
              strokeWidth={8}
            />
          </div>
          <div
            className="absolute flex items-center justify-center"
            style={{ top: 10, left: 10, width: 100, height: 100 }}
          >
            <Ring
              progress={focusProgress}
              color={COLORS.focus}
              size={100}
              strokeWidth={8}
            />
          </div>
          <div
            className="absolute flex items-center justify-center"
            style={{ top: 20, left: 20, width: 80, height: 80 }}
          >
            <Ring
              progress={socialProgress}
              color={COLORS.social}
              size={80}
              strokeWidth={8}
            />
          </div>
          {allComplete && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🎉</span>
            </div>
          )}
        </div>

        {/* Labels */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: COLORS.tasks }}
            />
            <div className="text-xs">
              <span className="font-medium">Tasks</span>
              <span className="text-muted-foreground ml-1">
                {profile.dailyTasksCompleted}/{goals.tasks}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: COLORS.focus }}
            />
            <div className="text-xs">
              <span className="font-medium">Focus</span>
              <span className="text-muted-foreground ml-1">
                {profile.dailyFocusSessions}/{goals.focusSessions}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: COLORS.social }}
            />
            <div className="text-xs">
              <span className="font-medium">Social</span>
              <span className="text-muted-foreground ml-1">
                {profile.dailySocialEngagements}/{goals.socialEngagements}
              </span>
            </div>
          </div>
          {allComplete && (
            <div className="text-xs font-medium text-primary">
              +100 XP bonus!
            </div>
          )}
        </div>
      </div>
    </WidgetCard>
  )
}
