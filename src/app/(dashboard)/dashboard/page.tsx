"use client"

import { motion } from "framer-motion"
import { BentoGrid, BentoCard } from "@/components/dashboard/bento-grid"
import { AnnouncementsWidget } from "@/components/dashboard/announcements-widget"
import { TasksWidget } from "@/components/dashboard/tasks-widget"
import { FocusTimerWidget } from "@/components/dashboard/focus-timer-widget"
import { FocusStatsWidget } from "@/components/dashboard/focus-stats-widget"
import { NoticesWidget } from "@/components/dashboard/notices-widget"
import { TeamUpdatesWidget } from "@/components/dashboard/team-updates-widget"
import { ShoutoutsWidget } from "@/components/dashboard/shoutouts-widget"
import { EventsWidget } from "@/components/dashboard/events-widget"
import { QuickPollWidget } from "@/components/dashboard/quick-poll-widget"
import { FeaturedVideoWidget } from "@/components/dashboard/featured-video-widget"
import { GamificationWidget } from "@/components/dashboard/gamification-widget"

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

      <BentoGrid>
        <BentoCard colSpan={4} rowSpan={2}>
          <AnnouncementsWidget />
        </BentoCard>
        <BentoCard colSpan={4} rowSpan={2}>
          <TasksWidget />
        </BentoCard>
        <BentoCard colSpan={4} rowSpan={1}>
          <FocusTimerWidget />
        </BentoCard>
        <BentoCard colSpan={4} rowSpan={1}>
          <FocusStatsWidget />
        </BentoCard>

        <BentoCard colSpan={3} rowSpan={1}>
          <NoticesWidget />
        </BentoCard>
        <BentoCard colSpan={3} rowSpan={1}>
          <TeamUpdatesWidget />
        </BentoCard>
        <BentoCard colSpan={3} rowSpan={1}>
          <ShoutoutsWidget />
        </BentoCard>
        <BentoCard colSpan={3} rowSpan={1}>
          <EventsWidget />
        </BentoCard>

        <BentoCard colSpan={4} rowSpan={1}>
          <QuickPollWidget />
        </BentoCard>
        <BentoCard colSpan={4} rowSpan={1}>
          <FeaturedVideoWidget />
        </BentoCard>
        <BentoCard colSpan={4} rowSpan={1}>
          <GamificationWidget />
        </BentoCard>
      </BentoGrid>
    </motion.div>
  )
}
