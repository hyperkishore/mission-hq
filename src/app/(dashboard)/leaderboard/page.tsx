"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Medal, Trophy, Award } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { people } from "@/data/mock-data"

type TabType = "overall" | "focus" | "tasks" | "recognition"

const tabLabels: Record<TabType, { scoreLabel: string }> = {
  overall: { scoreLabel: "points" },
  focus: { scoreLabel: "hours" },
  tasks: { scoreLabel: "completed" },
  recognition: { scoreLabel: "shoutouts" },
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overall")

  // Seed-based deterministic scoring per person per tab
  const allData = useMemo(() => {
    const seed = (str: string) => {
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i)
        hash |= 0
      }
      return Math.abs(hash)
    }

    const tabs: TabType[] = ["overall", "focus", "tasks", "recognition"]
    const result: Record<TabType, typeof people extends (infer T)[] ? (T & { score: number; achievements: number; trend: "up" | "down" })[] : never> = {} as any

    for (const tab of tabs) {
      const scored = people.map((p, i) => {
        const s = seed(p.id + tab)
        const base = tab === "focus" ? 40 : tab === "tasks" ? 80 : tab === "recognition" ? 15 : 500
        const range = tab === "focus" ? 30 : tab === "tasks" ? 60 : tab === "recognition" ? 20 : 500
        return {
          ...p,
          score: base + (s % range) - i * (tab === "recognition" ? 1 : tab === "focus" ? 2 : 3),
          achievements: (s % 8) + 1,
          trend: (s % 10 > 3 ? "up" : "down") as "up" | "down",
        }
      })
      result[tab] = scored.sort((a, b) => b.score - a.score)
    }
    return result
  }, [])

  const leaderboardData = allData[activeTab]
  const top3 = leaderboardData.slice(0, 3)
  const rest = leaderboardData.slice(3, 12)
  const { scoreLabel } = tabLabels[activeTab]

  const medalColors = {
    1: "text-yellow-500",
    2: "text-gray-400",
    3: "text-amber-600",
  }

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Trophy className={`h-8 w-8 ${medalColors[1]}`} />
    if (rank === 2) return <Medal className={`h-8 w-8 ${medalColors[2]}`} />
    if (rank === 3) return <Award className={`h-8 w-8 ${medalColors[3]}`} />
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageHeader
        title="Leaderboard"
        description="Top contributors this month"
      />

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabType)}>
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="overall">Overall</TabsTrigger>
          <TabsTrigger value="focus">Focus Time</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="recognition">Recognition</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-8 mt-6">
          {/* Podium Section - Top 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 2nd Place */}
            {top3[1] && (
              <motion.div
                key={`${activeTab}-2nd`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="order-2 md:order-1"
              >
                <Card className="p-6 text-center space-y-4">
                  <div className="flex justify-center">{getMedalIcon(2)}</div>
                  <Avatar className="h-20 w-20 mx-auto">
                    <AvatarImage src={top3[1].avatar} alt={top3[1].name} />
                    <AvatarFallback>{top3[1].name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{top3[1].name}</h3>
                    <p className="text-sm text-muted-foreground">{top3[1].role}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary">{top3[1].score}</p>
                    <p className="text-xs text-muted-foreground">{scoreLabel}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {top3[1].trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm text-muted-foreground">vs last month</span>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* 1st Place */}
            {top3[0] && (
              <motion.div
                key={`${activeTab}-1st`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
                className="order-1 md:order-2"
              >
                <Card className="p-8 text-center space-y-4 border-2 border-primary shadow-lg">
                  <div className="flex justify-center">{getMedalIcon(1)}</div>
                  <Avatar className="h-24 w-24 mx-auto ring-4 ring-primary/20">
                    <AvatarImage src={top3[0].avatar} alt={top3[0].name} />
                    <AvatarFallback>{top3[0].name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-xl">{top3[0].name}</h3>
                    <p className="text-sm text-muted-foreground">{top3[0].role}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-4xl font-bold text-primary">{top3[0].score}</p>
                    <p className="text-xs text-muted-foreground">{scoreLabel}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {top3[0].trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm text-muted-foreground">vs last month</span>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* 3rd Place */}
            {top3[2] && (
              <motion.div
                key={`${activeTab}-3rd`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="order-3"
              >
                <Card className="p-6 text-center space-y-4">
                  <div className="flex justify-center">{getMedalIcon(3)}</div>
                  <Avatar className="h-20 w-20 mx-auto">
                    <AvatarImage src={top3[2].avatar} alt={top3[2].name} />
                    <AvatarFallback>{top3[2].name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{top3[2].name}</h3>
                    <p className="text-sm text-muted-foreground">{top3[2].role}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary">{top3[2].score}</p>
                    <p className="text-xs text-muted-foreground">{scoreLabel}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {top3[2].trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm text-muted-foreground">vs last month</span>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Positions 4-12 Table */}
          <Card>
            <div className="divide-y">
              <div className="grid grid-cols-12 gap-4 p-4 text-sm font-semibold text-muted-foreground">
                <div className="col-span-1">Rank</div>
                <div className="col-span-4">Person</div>
                <div className="col-span-2">Department</div>
                <div className="col-span-2 text-right">Score</div>
                <div className="col-span-2 text-center">Achievements</div>
                <div className="col-span-1 text-center">Trend</div>
              </div>

              {rest.map((person, idx) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/50 transition-colors"
                >
                  <div className="col-span-1 font-semibold text-lg">{idx + 4}</div>
                  <div className="col-span-4 flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback>{person.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.role}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Badge variant="secondary">{person.department}</Badge>
                  </div>
                  <div className="col-span-2 text-right font-semibold text-lg">{person.score}</div>
                  <div className="col-span-2 text-center">
                    <Badge variant="outline">{person.achievements} earned</Badge>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    {person.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
