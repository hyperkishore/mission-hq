"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { WidgetCard } from "@/components/dashboard/widget-card"
import { shoutouts } from "@/data/mock-data"
import { ArrowRight, Heart } from "lucide-react"

export function ShoutoutsWidget() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % shoutouts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  const currentShoutout = shoutouts[currentIndex]

  return (
    <WidgetCard title="Shoutouts" icon={<Heart className="h-4 w-4" />}>
      <div
        className="relative h-full flex flex-col"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex-1 flex items-center justify-center px-2 py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-4"
            >
              <div className="text-4xl">{currentShoutout.emoji}</div>

              <blockquote className="text-sm font-medium italic text-foreground/90 max-w-md">
                &ldquo;{currentShoutout.message}&rdquo;
              </blockquote>

              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={currentShoutout.from.avatar} />
                    <AvatarFallback className="text-[10px]">
                      {currentShoutout.from.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium">{currentShoutout.from.name}</span>
                </div>

                <ArrowRight className="h-3 w-3 text-muted-foreground" />

                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={currentShoutout.to.avatar} />
                    <AvatarFallback className="text-[10px]">
                      {currentShoutout.to.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium">{currentShoutout.to.name}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 pb-2">
          {shoutouts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to shoutout ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </WidgetCard>
  )
}
