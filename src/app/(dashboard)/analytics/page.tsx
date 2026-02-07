"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, CheckCircle, Video, TrendingUp } from "lucide-react"
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
  ResponsiveContainer,
} from "recharts"

import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { analyticsData } from "@/data/mock-data"

export default function AnalyticsPage() {
  // Calculate summary statistics
  const avgFocusTime = (
    analyticsData.reduce((sum, day) => sum + day.focusMinutes, 0) / analyticsData.length / 60
  ).toFixed(1)

  const totalTasks = analyticsData.reduce((sum, day) => sum + day.tasksCompleted, 0)

  const totalMeetings = analyticsData.reduce((sum, day) => sum + day.meetings, 0)

  const avgProductivity = (
    analyticsData.reduce((sum, day) => sum + day.productivity, 0) / analyticsData.length
  ).toFixed(0)

  // Format data for charts
  const chartData = analyticsData.map(day => ({
    ...day,
    dateFormatted: format(new Date(day.date), "MMM dd"),
  }))

  // Chart configurations
  const focusChartConfig = {
    focusMinutes: {
      label: "Focus Time (min)",
      color: "#3b82f6",
    },
  }

  const tasksChartConfig = {
    tasksCompleted: {
      label: "Tasks",
      color: "#10b981",
    },
    meetings: {
      label: "Meetings",
      color: "#3b82f6",
    },
  }

  const productivityChartConfig = {
    productivity: {
      label: "Productivity",
      color: "#8b5cf6",
    },
  }

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
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Focus Time</p>
                <p className="text-2xl font-bold">{avgFocusTime}h</p>
              </div>
              <Brain className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasks Completed</p>
                <p className="text-2xl font-bold">{totalTasks}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Meetings</p>
                <p className="text-2xl font-bold">{totalMeetings}</p>
              </div>
              <Video className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Productivity Score</p>
                <p className="text-2xl font-bold">{avgProductivity}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* Focus Time Trend */}
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

        {/* Tasks & Meetings */}
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
        {/* Productivity Score */}
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
