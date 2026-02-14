"use client"

import Link from "next/link"
import { useGamificationStore } from "@/stores/gamification-store"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { WidgetCard } from "@/components/dashboard/widget-card"
import { Trophy, Flame, Star, Zap, Lock, Shield } from "lucide-react"

const LEVEL_ICONS = [Trophy, Flame, Star, Zap]

export function GamificationWidget() {
  const { profile, getMultiplier } = useGamificationStore()
  const xpPercentage = (profile.xp / profile.xpToNextLevel) * 100
  const multiplier = getMultiplier()

  return (
    <WidgetCard title="Level & XP" icon={<Trophy className="h-4 w-4" />}>
      <div className="space-y-4">
        {/* Level Header */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white shrink-0">
            <div className="text-center">
              <div className="text-[10px] font-medium">Lv</div>
              <div className="text-lg font-bold leading-none">{profile.level}</div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium">{profile.title}</h3>
            <p className="text-xs text-muted-foreground">
              Keep up the great work!
            </p>
          </div>
        </div>

        {/* XP Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium">Experience</span>
            <span className="text-muted-foreground">
              {profile.xp} / {profile.xpToNextLevel} XP
            </span>
          </div>
          <Progress value={xpPercentage} className="h-2" />
          {multiplier > 1.0 && (
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-[10px] h-4 px-1.5 bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                <Zap className="h-2.5 w-2.5 mr-0.5" />
                {multiplier.toFixed(1)}x XP
              </Badge>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Star className="h-3.5 w-3.5" />
              <span>Weekly XP</span>
            </div>
            <div className="text-xl font-bold">{profile.weeklyXP}</div>
          </div>

          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Flame className="h-3.5 w-3.5" />
              <span>Streak</span>
            </div>
            <div className="text-xl font-bold">{profile.streak} days</div>
            {profile.streakFreezes > 0 && (
              <div className="flex items-center gap-1 text-[10px] text-blue-500 mt-0.5">
                <Shield className="h-2.5 w-2.5" />
                {profile.streakFreezes} freeze{profile.streakFreezes !== 1 ? "s" : ""}
              </div>
            )}
          </div>
        </div>

        {/* View Leaderboard */}
        <Link
          href="/leaderboard"
          className="block text-center text-xs font-medium text-primary hover:text-primary/80 transition-colors py-1"
        >
          View Leaderboard
        </Link>

        {/* Achievements Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-medium text-muted-foreground">
              Achievements
            </h4>
            <Link
              href="/achievements"
              className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {profile.achievements.slice(0, 4).map((achievement, index) => {
              const Icon = LEVEL_ICONS[index % LEVEL_ICONS.length]
              return (
                <div
                  key={achievement.id}
                  className={`relative p-2.5 bg-muted/50 rounded-lg border transition-all ${
                    achievement.earned
                      ? "border-primary/50 bg-primary/5"
                      : "opacity-50"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="text-xl">{achievement.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">
                        {achievement.title}
                      </div>
                      {achievement.earned && (
                        <Badge
                          variant="secondary"
                          className="mt-1 text-[10px] h-4 px-1"
                        >
                          <Icon className="h-2.5 w-2.5 mr-0.5" />
                          Earned
                        </Badge>
                      )}
                    </div>
                  </div>

                  {!achievement.earned && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-lg">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </WidgetCard>
  )
}
