"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/page-header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useGamificationStore, THEME_UNLOCK_LEVELS } from "@/stores/gamification-store"
import { CheckCircle, Lock, Palette } from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function AchievementsPage() {
  const { profile } = useGamificationStore()
  const earned = profile.achievements.filter((a) => a.earned)
  const inProgress = profile.achievements.filter((a) => !a.earned)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <PageHeader
        title="Achievements"
        description="Track your progress and unlock rewards"
      />

      {/* Summary Banner */}
      <Card className="p-6 bg-muted">
        <div className="flex items-center gap-6">
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <span className="text-2xl font-bold text-primary">
              {earned.length}
            </span>
          </div>
          <div>
            <p className="text-lg font-semibold">
              {earned.length} of {profile.achievements.length} achievements earned
            </p>
            <p className="text-sm text-muted-foreground">
              Level {profile.level} &mdash; {profile.title}
            </p>
          </div>
        </div>
      </Card>

      {/* Earned Achievements */}
      {earned.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Earned
          </h3>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {earned.map((achievement) => (
              <motion.div key={achievement.id} variants={item}>
                <Card className="p-5 border-primary/30 bg-primary/5 relative overflow-hidden">
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{achievement.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {achievement.description}
                      </p>
                      {achievement.earnedAt && (
                        <p className="text-[11px] text-muted-foreground mt-2">
                          Earned{" "}
                          {new Date(achievement.earnedAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" }
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* In Progress */}
      {inProgress.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            In Progress
          </h3>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {inProgress.map((achievement) => (
              <motion.div key={achievement.id} variants={item}>
                <Card className="p-5 opacity-80">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl grayscale-[30%]">
                      {achievement.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {achievement.description}
                      </p>
                      {achievement.target != null &&
                        achievement.current != null && (
                          <div className="mt-3 space-y-1">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>
                                {achievement.current} / {achievement.target}
                              </span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <Progress
                              value={achievement.progress}
                              className="h-1.5"
                            />
                          </div>
                        )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Theme Unlocks */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Theme Unlocks
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {Object.entries(THEME_UNLOCK_LEVELS).map(([theme, level]) => {
            const unlocked = profile.unlockedThemes.includes(theme)
            return (
              <Card
                key={theme}
                className={`p-4 relative overflow-hidden ${
                  unlocked ? "border-primary/30" : "opacity-60"
                }`}
              >
                <div className="absolute inset-0 bg-muted opacity-20" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold capitalize">
                      {theme}
                    </span>
                    {unlocked ? (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <Badge variant={unlocked ? "secondary" : "outline"} className="text-xs">
                    {unlocked
                      ? "Unlocked"
                      : `Level ${level} (You: ${profile.level})`}
                  </Badge>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
