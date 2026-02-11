"use client"

import { motion } from "framer-motion"
import { Brain, CheckCircle, Video, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { format } from "date-fns"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import { analyticsData } from "@/data/mock-data"

export default function AnalyticsPage() {
  const avgFocusTime = parseFloat(
    (analyticsData.reduce((sum, day) => sum + day.focusMinutes, 0) / analyticsData.length / 60).toFixed(1)
  )
  const totalTasks = analyticsData.reduce((sum, day) => sum + day.tasksCompleted, 0)
  const totalMeetings = analyticsData.reduce((sum, day) => sum + day.meetings, 0)
  const avgProductivity = Math.round(
    analyticsData.reduce((sum, day) => sum + day.productivity, 0) / analyticsData.length
  )

  const chartData = analyticsData.map(day => ({
    ...day,
    dateFormatted: format(new Date(day.date), "MMM dd"),
  }))

  const focusChartConfig = {
    focusMinutes: { label: "Focus Time (min)", color: "#3b82f6" },
  }

  const tasksChartConfig = {
    tasksCompleted: { label: "Tasks", color: "#10b981" },
    meetings: { label: "Meetings", color: "#3b82f6" },
  }

  const productivityChartConfig = {
    productivity: { label: "Productivity", color: "#8b5cf6" },
  }

  const stats = [
    {
      label: "Avg Focus Time",
      value: avgFocusTime,
      suffix: "h",
      icon: Brain,
      color: "text-blue-500",
      delta: +12,
    },
    {
      label: "Tasks Completed",
      value: totalTasks,
      suffix: "",
      icon: CheckCircle,
      color: "text-green-500",
      delta: +8,
    },
    {
      label: "Total Meetings",
      value: totalMeetings,
      suffix: "",
      icon: Video,
      color: "text-blue-500",
      delta: -5,
    },
    {
      label: "Productivity Score",
      value: avgProductivity,
      suffix: "%",
      icon: TrendingUp,
      color: "text-purple-500",
      delta: +3,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="Analytics"
        description="Your productivity trends and insights"
      />

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={800} />
                  </p>
                  <div className={`flex items-center gap-1 text-xs ${stat.delta >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {stat.delta >= 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    <span>{Math.abs(stat.delta)}% vs last week</span>
                  </div>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Focus Time Trend</CardTitle>
            <CardDescription>Daily focus minutes over the past week</CardDescription>
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
                  stroke="#3b82f6"
                  fill="#3b82f6"
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
                <Bar dataKey="tasksCompleted" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="meetings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
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
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: "#8b5cf6", r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
