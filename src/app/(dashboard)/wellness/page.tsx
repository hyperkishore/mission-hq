"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Wind, Dumbbell, Droplets, Footprints, Brain, ChevronLeft, ChevronRight } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { wellnessChallenges } from "@/data/mock-data"

const stretches = [
  {
    name: "Neck Roll",
    desc: "Slowly roll your head in circles",
    duration: 30,
  },
  {
    name: "Shoulder Shrug",
    desc: "Raise shoulders to ears, hold, release",
    duration: 30,
  },
  {
    name: "Wrist Circles",
    desc: "Rotate wrists slowly in both directions",
    duration: 30,
  },
  {
    name: "Standing Stretch",
    desc: "Reach arms overhead and lean side to side",
    duration: 30,
  },
]

const iconMap = {
  breathing: Wind,
  stretching: Dumbbell,
  hydration: Droplets,
  walking: Footprints,
  meditation: Brain,
}

export default function WellnessPage() {
  const [breathingActive, setBreathingActive] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState<"in" | "hold" | "out">("in")
  const [stretchIndex, setStretchIndex] = useState(0)
  const [stretchTimer, setStretchTimer] = useState(30)
  const [stretchActive, setStretchActive] = useState(false)

  // Breathing animation cycle
  useEffect(() => {
    if (!breathingActive) return

    const cycle = [
      { phase: "in" as const, duration: 4000 },
      { phase: "hold" as const, duration: 2000 },
      { phase: "out" as const, duration: 4000 },
    ]

    let currentIndex = 0

    const runCycle = () => {
      const current = cycle[currentIndex]
      setBreathingPhase(current.phase)

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % cycle.length
        runCycle()
      }, current.duration)
    }

    runCycle()
  }, [breathingActive])

  // Stretch timer countdown
  useEffect(() => {
    if (!stretchActive || stretchTimer === 0) return

    const interval = setInterval(() => {
      setStretchTimer((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [stretchActive, stretchTimer])

  const handleNextStretch = () => {
    setStretchIndex((prev) => (prev + 1) % stretches.length)
    setStretchTimer(30)
  }

  const handlePrevStretch = () => {
    setStretchIndex((prev) => (prev - 1 + stretches.length) % stretches.length)
    setStretchTimer(30)
  }

  const toggleStretchTimer = () => {
    if (stretchTimer === 0) {
      setStretchTimer(30)
    }
    setStretchActive(!stretchActive)
  }

  const currentStretch = stretches[stretchIndex]

  const breathingPhaseText = {
    in: "Breathe in...",
    hold: "Hold...",
    out: "Breathe out...",
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <PageHeader
        title="Wellness"
        description="Take care of yourself"
      />

      {/* Breathing Exercise */}
      <Card className="p-8">
        <h3 className="text-xl font-semibold mb-6 text-center">Breathing Exercise</h3>
        <div className="flex flex-col items-center space-y-6">
          <motion.div
            animate={
              breathingActive
                ? {
                    scale: breathingPhase === "in" ? 1.5 : breathingPhase === "hold" ? 1.5 : 1,
                  }
                : { scale: 1 }
            }
            transition={{
              duration: breathingPhase === "in" ? 4 : breathingPhase === "out" ? 4 : 2,
              ease: "easeInOut",
            }}
            className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"
          />
          <p className="text-lg font-medium h-8">
            {breathingActive ? breathingPhaseText[breathingPhase] : "Click Start to begin"}
          </p>
          <Button
            onClick={() => setBreathingActive(!breathingActive)}
            size="lg"
          >
            {breathingActive ? "Stop" : "Start"}
          </Button>
        </div>
      </Card>

      {/* Stretch Timer */}
      <Card className="p-8">
        <h3 className="text-xl font-semibold mb-6 text-center">Stretch Timer</h3>
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <h4 className="text-2xl font-bold mb-2">{currentStretch.name}</h4>
            <p className="text-muted-foreground mb-4">{currentStretch.desc}</p>
            <div className="text-4xl font-bold text-primary">{stretchTimer}s</div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevStretch}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button onClick={toggleStretchTimer} size="lg">
              {stretchActive ? "Pause" : stretchTimer === 30 ? "Start" : "Resume"}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextStretch}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Stretch {stretchIndex + 1} of {stretches.length}
          </div>
        </div>
      </Card>

      {/* Wellness Challenges */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Wellness Challenges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wellnessChallenges.map((challenge) => {
            const Icon = iconMap[challenge.type]
            return (
              <Card key={challenge.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className="font-semibold">{challenge.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {challenge.description}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} />
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="secondary">
                        {challenge.streak} day streak
                      </Badge>
                      <span className="text-muted-foreground">
                        {challenge.participants} participants
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
