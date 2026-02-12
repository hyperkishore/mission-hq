"use client"

import { useGamificationStore } from "@/stores/gamification-store"
import { useConfetti } from "@/hooks/use-confetti"
import { useEffect, useRef } from "react"
import { WidgetCard } from "@/components/dashboard/widget-card"
import { Target } from "lucide-react"

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

const GOALS = {
  tasks: { target: 5, label: "Tasks", color: "#10b981" },
  focus: { target: 4, label: "Focus", color: "#3b82f6" },
  social: { target: 3, label: "Social", color: "#f59e0b" },
} as const

export function ProgressRings() {
  const { profile, addXP } = useGamificationStore()
  const { fire } = useConfetti()
  const prevAllComplete = useRef(false)

  const taskProgress = profile.dailyTasksCompleted / GOALS.tasks.target
  const focusProgress = profile.dailyFocusSessions / GOALS.focus.target
  const socialProgress =
    profile.dailySocialEngagements / GOALS.social.target

  const allComplete = taskProgress >= 1 && focusProgress >= 1 && socialProgress >= 1

  useEffect(() => {
    if (allComplete && !prevAllComplete.current) {
      fire()
      addXP(100, 'All daily goals completed!')
    }
    prevAllComplete.current = allComplete
  }, [allComplete]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetCard title="Daily Goals" icon={<Target className="h-4 w-4" />}>
      <div className="flex items-center justify-center gap-6 py-2">
        {/* Stacked rings */}
        <div className="relative" style={{ width: 120, height: 120 }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Ring
              progress={taskProgress}
              color={GOALS.tasks.color}
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
              color={GOALS.focus.color}
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
              color={GOALS.social.color}
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
              style={{ backgroundColor: GOALS.tasks.color }}
            />
            <div className="text-xs">
              <span className="font-medium">Tasks</span>
              <span className="text-muted-foreground ml-1">
                {profile.dailyTasksCompleted}/{GOALS.tasks.target}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: GOALS.focus.color }}
            />
            <div className="text-xs">
              <span className="font-medium">Focus</span>
              <span className="text-muted-foreground ml-1">
                {profile.dailyFocusSessions}/{GOALS.focus.target}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: GOALS.social.color }}
            />
            <div className="text-xs">
              <span className="font-medium">Social</span>
              <span className="text-muted-foreground ml-1">
                {profile.dailySocialEngagements}/{GOALS.social.target}
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
