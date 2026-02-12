"use client"

import { useEffect, useRef } from "react"
import { useGamificationStore } from "@/stores/gamification-store"
import { useNotificationStore } from "@/stores/notification-store"

export function useProactiveNudges() {
  const profile = useGamificationStore((s) => s.profile)
  const addNotification = useNotificationStore((s) => s.addNotification)
  const hasNudged = useRef<Set<string>>(new Set())

  useEffect(() => {
    const nudge = (key: string, notification: Parameters<typeof addNotification>[0]) => {
      if (hasNudged.current.has(key)) return
      hasNudged.current.add(key)
      addNotification(notification)
    }

    // Streak at risk: if last activity was yesterday and it's after 6 PM
    const hour = new Date().getHours()
    const today = new Date().toISOString().split('T')[0]

    if (profile.lastActivityDate && profile.lastActivityDate !== today && hour >= 18) {
      nudge('streak-risk', {
        title: 'Streak at risk!',
        description: `Your ${profile.streak}-day streak will reset at midnight. Do any activity to keep it alive!`,
        type: 'warning',
      })
    }

    // Achievement close: Task Slayer at 80%+
    if (profile.dailyTasksCompleted >= 4 && profile.dailyTasksCompleted < 5) {
      nudge('almost-tasks', {
        title: 'Almost there!',
        description: 'Complete 1 more task to hit your daily goal!',
        type: 'info',
      })
    }

    // Focus goal close
    if (profile.dailyFocusSessions >= 3 && profile.dailyFocusSessions < 4) {
      nudge('almost-focus', {
        title: 'One more session!',
        description: 'Complete 1 more focus session to hit your daily goal!',
        type: 'info',
      })
    }

    // All goals complete
    if (
      profile.dailyTasksCompleted >= 5 &&
      profile.dailyFocusSessions >= 4 &&
      profile.dailySocialEngagements >= 3
    ) {
      nudge('all-goals', {
        title: 'All daily goals complete!',
        description: 'Amazing work today. You earned a bonus 100 XP!',
        type: 'success',
      })
    }

    // Streak milestone
    if (profile.streak === 7 || profile.streak === 14 || profile.streak === 30) {
      nudge(`streak-${profile.streak}`, {
        title: `${profile.streak}-day streak!`,
        description: `Incredible! Your XP multiplier just increased.`,
        type: 'success',
      })
    }

    // Early bird reminder
    if (hour < 9 && profile.lastActivityDate !== today) {
      nudge('early-bird', {
        title: 'Early bird bonus active!',
        description: 'Complete tasks before 9 AM for 1.5x XP.',
        type: 'info',
      })
    }

    // Combo encouragement
    if (profile.comboCount >= 3) {
      nudge('combo', {
        title: `${profile.comboCount}x combo!`,
        description: 'Keep going! Your XP multiplier increases with consecutive actions.',
        type: 'success',
      })
    }
  }, [
    profile.lastActivityDate,
    profile.streak,
    profile.dailyTasksCompleted,
    profile.dailyFocusSessions,
    profile.dailySocialEngagements,
    profile.comboCount,
    addNotification,
  ])
}
