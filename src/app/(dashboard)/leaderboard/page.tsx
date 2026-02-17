"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, User, Users, BarChart3, Activity } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useGamificationStore } from "@/stores/gamification-store"
import { people, contributionData, departmentAverages } from "@/data/mock-data"
import { ContributionHeatmap } from "@/components/shared/contribution-heatmap"

export default function LeaderboardPage() {
  const { profile } = useGamificationStore()

  // Simulated "team highlights" — top 5 by deterministic pseudo-score (opt-in)
  const teamHighlights = people.slice(0, 5).map((p, i) => ({
    ...p,
    highlight: [
      "Completed 15 tasks this week",
      "8-hour focus streak",
      "Most shoutouts given",
      "30-day streak milestone",
      "Shipped 3 features",
    ][i],
  }))

  const xpTrend = profile.weeklyXP > 300 ? "up" : "down"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageHeader
        title="Progress"
        description="Your personal growth and team activity"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Your Progress — private stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium text-muted-foreground">Your Progress</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-3xl font-bold">Level {profile.level}</p>
                <p className="text-xs text-muted-foreground">
                  {profile.xp} / {profile.xpToNextLevel} XP
                </p>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(profile.xp / profile.xpToNextLevel) * 100}%` }}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">This week</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold">{profile.weeklyXP} XP</span>
                    {xpTrend === "up" ? (
                      <TrendingUp className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Streak</span>
                  <span className="text-sm font-semibold">{profile.streak} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Achievements</span>
                  <span className="text-sm font-semibold">
                    {profile.achievements.filter((a) => a.earned).length}/{profile.achievements.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Achievement badges */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
              {profile.achievements
                .filter((a) => a.earned)
                .map((a) => (
                  <Badge key={a.id} variant="secondary" className="gap-1">
                    <span>{a.icon}</span>
                    {a.title}
                  </Badge>
                ))}
            </div>
          </Card>
        </motion.div>

        {/* Team Highlights — opt-in, no numeric scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium text-muted-foreground">Team Highlights</h3>
            </div>

            <div className="space-y-3">
              {teamHighlights.map((person) => (
                <div key={person.id} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback>
                      {person.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{person.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{person.highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Department Pulse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium text-muted-foreground">Department Pulse</h3>
            </div>

            <div className="space-y-3">
              {departmentAverages.map((dept) => (
                <div key={dept.department} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{dept.department}</span>
                    <span className="text-muted-foreground">{dept.engagement}% active</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${dept.engagement}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-primary/70 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Contribution Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium text-muted-foreground">Activity — Last 12 Weeks</h3>
            </div>

            <ContributionHeatmap data={contributionData} />
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
