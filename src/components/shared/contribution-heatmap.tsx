"use client"

import { useState } from "react"
import type { ContributionDay } from "@/types"

const CELL_SIZE = 13
const GAP = 3
const ROWS = 7 // days of week
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""]

function getColor(count: number, isDark: boolean): string {
  if (count === 0) return isDark ? "rgb(30, 30, 30)" : "rgb(235, 235, 235)"
  if (count === 1) return isDark ? "rgb(14, 68, 41)" : "rgb(155, 233, 168)"
  if (count === 2) return isDark ? "rgb(0, 109, 50)" : "rgb(64, 196, 99)"
  if (count === 3) return isDark ? "rgb(38, 166, 65)" : "rgb(48, 161, 78)"
  return isDark ? "rgb(57, 211, 83)" : "rgb(33, 110, 57)"
}

interface ContributionHeatmapProps {
  data: ContributionDay[]
  className?: string
}

export function ContributionHeatmap({ data, className }: ContributionHeatmapProps) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null)

  // Detect dark mode from document
  const isDark = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark")
    : true

  // Organize into weeks (columns)
  const weeks: ContributionDay[][] = []
  let currentWeek: ContributionDay[] = []

  // Pad start to align with day of week
  if (data.length > 0) {
    const firstDay = new Date(data[0].date).getDay()
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push({ date: "", count: -1 }) // placeholder
    }
  }

  for (const day of data) {
    currentWeek.push(day)
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  const totalDays = data.reduce((sum, d) => sum + (d.count > 0 ? 1 : 0), 0)
  const totalActivities = data.reduce((sum, d) => sum + d.count, 0)

  const svgWidth = weeks.length * (CELL_SIZE + GAP) + 30
  const svgHeight = ROWS * (CELL_SIZE + GAP) + 4

  return (
    <div className={className}>
      <div className="overflow-x-auto">
        <svg
          width={svgWidth}
          height={svgHeight}
          className="block"
          onMouseLeave={() => setTooltip(null)}
        >
          {/* Day labels */}
          {DAY_LABELS.map((label, i) =>
            label ? (
              <text
                key={i}
                x={0}
                y={i * (CELL_SIZE + GAP) + CELL_SIZE - 2}
                className="fill-muted-foreground"
                fontSize={9}
              >
                {label}
              </text>
            ) : null
          )}

          {/* Cells */}
          {weeks.map((week, weekIdx) =>
            week.map((day, dayIdx) => {
              if (day.count < 0) return null
              const x = weekIdx * (CELL_SIZE + GAP) + 28
              const y = dayIdx * (CELL_SIZE + GAP)
              return (
                <rect
                  key={`${weekIdx}-${dayIdx}`}
                  x={x}
                  y={y}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  rx={2}
                  fill={getColor(day.count, isDark)}
                  className="transition-opacity hover:opacity-80 cursor-default"
                  onMouseEnter={(e) => {
                    if (day.date) {
                      const d = new Date(day.date)
                      const label = d.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                      const activities = day.count === 0 ? "No activity" : `${day.count} activities`
                      setTooltip({ text: `${label}: ${activities}`, x: x + CELL_SIZE / 2, y: y - 8 })
                    }
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              )
            })
          )}

          {/* Tooltip */}
          {tooltip && (
            <g>
              <rect
                x={tooltip.x - 50}
                y={tooltip.y - 18}
                width={100}
                height={20}
                rx={4}
                className="fill-foreground"
              />
              <text
                x={tooltip.x}
                y={tooltip.y - 5}
                textAnchor="middle"
                className="fill-background"
                fontSize={10}
                fontWeight={500}
              >
                {tooltip.text}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
        <span>{totalDays} active days, {totalActivities} activities</span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="rounded-sm"
              style={{
                width: 10,
                height: 10,
                backgroundColor: getColor(level, isDark),
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
