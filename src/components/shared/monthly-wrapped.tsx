"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGamificationStore } from "@/stores/gamification-store"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, ChevronRight } from "lucide-react"

function TrendBadge({ value, suffix = "%" }: { value: number; suffix?: string }) {
  if (value > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-primary text-sm font-medium">
        <TrendingUp className="h-3.5 w-3.5" />
        +{value}{suffix}
      </span>
    )
  }
  if (value < 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-destructive text-sm font-medium">
        <TrendingDown className="h-3.5 w-3.5" />
        {value}{suffix}
      </span>
    )
  }
  return <span className="text-sm text-muted-foreground">same</span>
}

const SLIDES = [
  "intro",
  "tasks",
  "focus",
  "shoutouts",
  "highlight",
  "summary",
] as const

type Slide = typeof SLIDES[number]

export function MonthlyWrapped() {
  const { profile, dismissMonthlyWrapped } = useGamificationStore()
  const stats = profile.monthlyStats
  const [slideIndex, setSlideIndex] = useState(0)

  if (!stats) return null

  const currentSlide = SLIDES[slideIndex]
  const isLast = slideIndex === SLIDES.length - 1

  const next = () => {
    if (isLast) {
      dismissMonthlyWrapped()
    } else {
      setSlideIndex((i) => i + 1)
    }
  }

  const slideVariants = {
    enter: { opacity: 0, y: 40, scale: 0.95 },
    center: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -40, scale: 0.95 },
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mb-6">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${
                i <= slideIndex ? "bg-primary w-6" : "bg-muted w-4"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center space-y-6"
          >
            {currentSlide === "intro" && (
              <>
                <p className="text-sm uppercase tracking-widest text-muted-foreground">
                  Your Month in Review
                </p>
                <h1 className="text-4xl font-bold">
                  {new Date(Date.now() - 30 * 86400000).toLocaleDateString("en-US", { month: "long" })}
                </h1>
                <p className="text-muted-foreground">
                  Let&apos;s see what you accomplished.
                </p>
              </>
            )}

            {currentSlide === "tasks" && (
              <>
                <p className="text-sm uppercase tracking-widest text-muted-foreground">
                  Task Completion
                </p>
                <p className="text-6xl font-bold">{stats.tasksCompleted}</p>
                <p className="text-lg text-muted-foreground">tasks completed</p>
                <TrendBadge value={stats.tasksTrend} suffix="% vs last month" />
              </>
            )}

            {currentSlide === "focus" && (
              <>
                <p className="text-sm uppercase tracking-widest text-muted-foreground">
                  Deep Focus
                </p>
                <p className="text-6xl font-bold">
                  {Math.round(stats.focusMinutes / 60)}
                  <span className="text-2xl font-normal text-muted-foreground ml-1">hrs</span>
                </p>
                <p className="text-lg text-muted-foreground">of focused work</p>
                <TrendBadge value={stats.focusTrend} suffix="% vs last month" />
              </>
            )}

            {currentSlide === "shoutouts" && (
              <>
                <p className="text-sm uppercase tracking-widest text-muted-foreground">
                  Recognition
                </p>
                <div className="flex justify-center gap-8">
                  <div>
                    <p className="text-5xl font-bold">{stats.shoutoutsGiven}</p>
                    <p className="text-sm text-muted-foreground mt-1">given</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold">{stats.shoutoutsReceived}</p>
                    <p className="text-sm text-muted-foreground mt-1">received</p>
                  </div>
                </div>
              </>
            )}

            {currentSlide === "highlight" && (
              <>
                <p className="text-sm uppercase tracking-widest text-muted-foreground">
                  Your Power Day
                </p>
                <p className="text-5xl font-bold">{stats.mostProductiveDay}</p>
                <p className="text-muted-foreground">
                  was your most productive day of the week
                </p>
                <p className="text-sm text-muted-foreground">
                  Top streak: {stats.topStreak} days
                </p>
              </>
            )}

            {currentSlide === "summary" && (
              <>
                <p className="text-sm uppercase tracking-widest text-muted-foreground">
                  Total XP This Month
                </p>
                <p className="text-6xl font-bold text-primary">{stats.totalXP}</p>
                <p className="text-muted-foreground">
                  Keep building. Every day counts.
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center">
          <Button onClick={next} size="lg" className="gap-2">
            {isLast ? "Done" : "Next"}
            {!isLast && <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
