import type { GamificationProfile, WeeklyRecap } from '@/types'

export function generateInsight(profile: GamificationProfile): string {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const today = new Date()
  const dayName = dayNames[today.getDay()]
  const hour = today.getHours()

  // Build candidate insights based on actual user data
  const insights: string[] = []

  // Streak-based
  if (profile.streak >= 7) {
    insights.push(`${profile.streak}-day streak and counting. Consistency compounds.`)
  }
  if (profile.streak === 0) {
    insights.push("Fresh start today. One action to begin a new streak.")
  }

  // Day-of-week pattern (simulated — in real app, compare weekly data)
  if (today.getDay() === 2) {
    insights.push(`Tuesdays tend to be productive days. Make this one count.`)
  }
  if (today.getDay() === 5) {
    insights.push("Fridays are for wrapping up. Close out your open tasks.")
  }
  if (today.getDay() === 1) {
    insights.push("Monday energy. Set your top 3 priorities for the week.")
  }

  // Time-of-day
  if (hour < 9) {
    insights.push("Early start today! Morning hours are your highest-focus time.")
  }
  if (hour >= 14 && hour < 16) {
    insights.push("Afternoon slump zone. A short walk or focus session helps.")
  }

  // Level and XP based
  if (profile.xp > profile.xpToNextLevel * 0.8) {
    insights.push(`Almost Level ${profile.level + 1}! ${profile.xpToNextLevel - profile.xp} XP to go.`)
  }

  // Weekly XP momentum
  if (profile.weeklyXP > 400) {
    insights.push("Strong week! Your XP is well above average.")
  }
  if (profile.weeklyXP < 100 && today.getDay() >= 3) {
    insights.push("Midweek check: a couple focus sessions can turn this week around.")
  }

  // Achievement-aware
  const unearned = profile.achievements.filter((a) => !a.earned)
  if (unearned.length > 0) {
    const next = unearned[0]
    insights.push(`Next achievement: "${next.title}" — ${next.description.toLowerCase()}.`)
  }

  // Fallback
  if (insights.length === 0) {
    insights.push("Every completed task is a step forward. What's first today?")
  }

  // Deterministic daily pick based on day-of-year + profile level
  const dayOfYear = Math.floor(
    (Date.now() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  )
  return insights[(dayOfYear + profile.level) % insights.length]
}

export function generateWeeklyNarrative(recap: WeeklyRecap, profile: GamificationProfile): string[] {
  const sentences: string[] = []

  // XP summary
  if (recap.xpEarned > 500) {
    sentences.push(`You earned ${recap.xpEarned} XP last week — that's a strong performance.`)
  } else if (recap.xpEarned > 200) {
    sentences.push(`${recap.xpEarned} XP earned last week. Solid and steady.`)
  } else {
    sentences.push(`${recap.xpEarned} XP earned last week. A lighter week, and that's okay.`)
  }

  // Tasks
  if (recap.tasksCompleted >= 10) {
    sentences.push(`You crushed ${recap.tasksCompleted} tasks. Your task completion is above average.`)
  } else if (recap.tasksCompleted >= 5) {
    sentences.push(`${recap.tasksCompleted} tasks completed. Consistent progress.`)
  } else {
    sentences.push(`${recap.tasksCompleted} tasks done. Quality over quantity.`)
  }

  // Focus
  if (recap.focusSessions >= 4) {
    sentences.push(`${recap.focusSessions} deep focus sessions kept your productivity high.`)
  } else if (recap.focusSessions > 0) {
    sentences.push(`You managed ${recap.focusSessions} focus session${recap.focusSessions > 1 ? 's' : ''}. Try blocking more time this week.`)
  }

  // Streak
  if (recap.streakDays >= 7) {
    sentences.push(`Your ${recap.streakDays}-day streak shows real dedication. Keep it alive!`)
  }

  // Recognition
  if (recap.shoutoutsGiven > 0) {
    sentences.push(`You recognized ${recap.shoutoutsGiven} teammate${recap.shoutoutsGiven > 1 ? 's' : ''} — that matters more than you think.`)
  }

  return sentences
}
