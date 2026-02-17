"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, CheckCircle, Video, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { format } from "date-fns"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import { analyticsData, dailyXPData } from "@/data/mock-data"
import { useGamificationStore } from "@/stores/gamification-store"
import {
  filterByDateRange,
  getPreviousPeriodData,
  computeStats,
  computeFocusDistribution,
  type DateRange,
} from "@/lib/analytics-utils"

const rangeLabels: Record<DateRange, string> = {
  week: "This Week",
  month: "This Month",
  "30days": "Last 30 Days",
}

const comparisonLabels: Record<DateRange, string> = {
  week: "vs last week",
  month: "vs last month",
  "30days": "vs previous period",
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function AnalyticsPage() {
  const [range, setRange] = useState<DateRange>("week")
  const { profile } = useGamificationStore()

  const currentData = filterByDateRange(analyticsData, range)
  const previousData = getPreviousPeriodData(analyticsData, range)
  const { avgFocus, totalTasks, totalMeetings, avgProductivity, deltas } = computeStats(
    currentData,
    previousData
  )

  const xAxisFormat = range === "week" ? "EEE" : "MMM dd"
  const chartData = currentData.map((day) => ({
    ...day,
    dateFormatted: format(new Date(day.date), xAxisFormat),
  }))

  // Filter XP data to match range
  const filteredXPData = (() => {
    const now = new Date()
    let cutoff: Date
    switch (range) {
      case "week":
        cutoff = new Date(now.getTime() - 7 * 86400000)
        break
      case "month":
        cutoff = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      default:
        cutoff = new Date(now.getTime() - 30 * 86400000)
    }
    const cutoffStr = cutoff.toISOString().split("T")[0]
    return dailyXPData
      .filter((d) => d.date >= cutoffStr)
      .map((d) => ({
        ...d,
        dateFormatted: format(new Date(d.date), xAxisFormat),
      }))
  })()

  // Focus distribution for donut
  const focusDistribution = computeFocusDistribution(currentData)

  // Radar chart data: today's goal completion %
  const goals = profile.personalGoals
  const radarData = [
    {
      axis: "Tasks",
      value: Math.min(100, Math.round((profile.dailyTasksCompleted / goals.tasks) * 100)),
    },
    {
      axis: "Focus",
      value: Math.min(100, Math.round((profile.dailyFocusSessions / goals.focusSessions) * 100)),
    },
    {
      axis: "Social",
      value: Math.min(
        100,
        Math.round((profile.dailySocialEngagements / goals.socialEngagements) * 100)
      ),
    },
  ]

  const comparisonText = comparisonLabels[range]

  const focusChartConfig = {
    focusMinutes: { label: "Focus Time (min)", color: "var(--chart-1)" },
  }

  const tasksChartConfig = {
    tasksCompleted: { label: "Tasks", color: "var(--chart-2)" },
    meetings: { label: "Meetings", color: "var(--chart-1)" },
  }

  const productivityChartConfig = {
    productivity: { label: "Productivity", color: "var(--chart-3)" },
  }

  const xpChartConfig = {
    xp: { label: "XP Earned", color: "var(--chart-4)" },
  }

  const radarChartConfig = {
    value: { label: "Completion %", color: "var(--chart-3)" },
  }

  const donutChartConfig = Object.fromEntries(
    focusDistribution.map((d) => [d.name, { label: d.name, color: d.fill }])
  )

  const stats = [
    {
      label: "Avg Focus Time",
      value: avgFocus,
      suffix: "h",
      icon: Brain,
      delta: deltas.focus,
    },
    {
      label: "Tasks Completed",
      value: totalTasks,
      suffix: "",
      icon: CheckCircle,
      delta: deltas.tasks,
    },
    {
      label: "Total Meetings",
      value: totalMeetings,
      suffix: "",
      icon: Video,
      delta: deltas.meetings,
    },
    {
      label: "Productivity Score",
      value: avgProductivity,
      suffix: "%",
      icon: TrendingUp,
      delta: deltas.productivity,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader title="Analytics" description="Your productivity trends and insights">
        <div className="bg-muted rounded-lg p-1 flex gap-1">
          {(Object.keys(rangeLabels) as DateRange[]).map((r) => (
            <Button
              key={r}
              variant={range === r ? "secondary" : "ghost"}
              size="sm"
              className="text-xs h-7"
              onClick={() => setRange(r)}
            >
              {rangeLabels[r]}
            </Button>
          ))}
        </div>
      </PageHeader>

      {/* Summary Stats */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={item}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        duration={800}
                      />
                    </p>
                    <div
                      className={`flex items-center gap-1 text-xs ${
                        stat.delta >= 0 ? "text-primary" : "text-destructive"
                      }`}
                    >
                      {stat.delta >= 0 ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      <span>
                        {Math.abs(stat.delta)}% {comparisonText}
                      </span>
                    </div>
                  </div>
                  <stat.icon className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row 1: Focus + Tasks */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Focus Time Trend</CardTitle>
            <CardDescription>Daily focus minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={focusChartConfig} className="h-[300px]">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dateFormatted" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="focusMinutes"
                  stroke="var(--chart-1)"
                  fill="var(--chart-1)"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tasks & Meetings</CardTitle>
            <CardDescription>Daily tasks completed and meetings attended</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={tasksChartConfig} className="h-[300px]">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dateFormatted" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="tasksCompleted" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="meetings" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2: XP + Radar + Donut */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>XP Trend</CardTitle>
            <CardDescription>Daily XP earned</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={xpChartConfig} className="h-[250px]">
              <BarChart data={filteredXPData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dateFormatted" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="xp" fill="var(--chart-4)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goal Completion</CardTitle>
            <CardDescription>Today&apos;s progress vs personal goals</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={radarChartConfig} className="h-[250px]">
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid />
                <PolarAngleAxis dataKey="axis" className="text-xs" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                <Radar
                  name="Completion"
                  dataKey="value"
                  stroke="var(--chart-3)"
                  fill="var(--chart-3)"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Focus Distribution</CardTitle>
            <CardDescription>Minutes by day of week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={donutChartConfig} className="h-[250px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={focusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {focusDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 3: Full-width Productivity */}
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Productivity Score</CardTitle>
            <CardDescription>Your productivity trend over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={productivityChartConfig} className="h-[300px]">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dateFormatted" />
                <YAxis domain={[0, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="productivity"
                  stroke="var(--chart-3)"
                  strokeWidth={2}
                  dot={{ fill: "var(--chart-3)", r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
