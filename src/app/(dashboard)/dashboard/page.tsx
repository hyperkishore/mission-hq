"use client"

import { motion } from "framer-motion"
import { UnifiedTimeline } from "@/components/feed/unified-timeline"

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

function getFormattedDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
}

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          {getGreeting()}, Alex
        </h2>
        <p className="text-sm text-muted-foreground">
          {getFormattedDate()} &mdash; Here&apos;s what&apos;s happening at Acme Corp
        </p>
      </div>

      <UnifiedTimeline />
    </motion.div>
  )
}
