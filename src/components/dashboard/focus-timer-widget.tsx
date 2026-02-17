"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { WidgetCard } from "@/components/dashboard/widget-card"
import { useFocusStore } from "@/stores/focus-store"
import { useGamificationStore } from "@/stores/gamification-store"
import { useConfetti } from "@/hooks/use-confetti"
import { Play, Pause, RotateCcw, Timer } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

export function FocusTimerWidget() {
  const {
    status,
    timeRemaining,
    sessionDuration,
    start,
    pause,
    resume,
    reset,
    tick,
  } = useFocusStore()

  const { addXP, recordDailyAction } = useGamificationStore()
  const { fire } = useConfetti()
  const [prevStatus, setPrevStatus] = useState(status)

  useEffect(() => {
    if (status === "running" || status === "break") {
      const interval = setInterval(() => {
        tick()
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [status, tick])

  useEffect(() => {
    if (prevStatus !== "break" && status === "break") {
      fire()
      recordDailyAction('focus')
      addXP(50, 'Focus session complete')
    }
    setPrevStatus(status)
  }, [status, prevStatus, fire, addXP])

  const totalDuration = status === "break" ? 5 * 60 : sessionDuration
  const progress = (timeRemaining / totalDuration) * 100
  const circumference = 2 * Math.PI * 90
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const timeDisplay = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

  const statusLabel =
    status === "break"
      ? "Break"
      : status === "paused"
      ? "Paused"
      : status === "running"
      ? "Focus"
      : "Ready"

  const statusColor =
    status === "break"
      ? "text-primary"
      : status === "running"
      ? "text-primary"
      : "text-muted-foreground"

  return (
    <WidgetCard title="Focus Timer" icon={<Timer className="h-4 w-4" />}>
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="relative">
          <svg width="200" height="200" className="transform -rotate-90">
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              className="text-muted/20"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={
                status === "break"
                  ? "text-primary"
                  : status === "running"
                  ? "text-primary"
                  : "text-primary"
              }
              style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold tabular-nums">{timeDisplay}</div>
            <div className={`text-xs font-medium mt-1 ${statusColor}`}>
              {statusLabel}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {status === "idle" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Button onClick={start} size="sm">
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            </motion.div>
          )}

          {(status === "running" || status === "break") && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Button onClick={pause} size="sm" variant="secondary">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            </motion.div>
          )}

          {status === "paused" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Button onClick={resume} size="sm">
                <Play className="h-4 w-4 mr-2" />
                Resume
              </Button>
            </motion.div>
          )}

          {status !== "idle" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Button onClick={reset} size="sm" variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </WidgetCard>
  )
}
