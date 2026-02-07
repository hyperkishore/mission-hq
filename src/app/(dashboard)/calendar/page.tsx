"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns"

import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { calendarEvents } from "@/data/mock-data"
import { cn } from "@/lib/utils"

const EVENT_COLORS: Record<string, string> = {
  meeting: "#3b82f6",
  deadline: "#ef4444",
  "focus-block": "#8b5cf6",
  social: "#10b981",
  review: "#f59e0b",
}

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Get calendar days for the current month view
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    return calendarEvents.filter(event => event.date === dateStr)
  }

  // Get events for selected date
  const selectedDateEvents = getEventsForDate(selectedDate)

  // Navigation handlers
  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="Calendar"
        description="Your schedule at a glance"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar Grid */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{format(currentMonth, "MMMM yyyy")}</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevMonth}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextMonth}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-muted-foreground py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map(day => {
                const dayEvents = getEventsForDate(day)
                const isCurrentMonth = isSameMonth(day, currentMonth)
                const isSelected = isSameDay(day, selectedDate)
                const isTodayDate = isToday(day)

                return (
                  <button
                    key={day.toString()}
                    onClick={() => handleDateClick(day)}
                    className={cn(
                      "min-h-[80px] p-2 text-left rounded-lg border transition-colors",
                      "hover:bg-accent hover:border-primary/50",
                      isCurrentMonth ? "bg-background" : "bg-muted/50",
                      isSelected && "border-primary bg-accent",
                      isTodayDate && "ring-2 ring-primary"
                    )}
                  >
                    <div className="flex flex-col h-full">
                      <span
                        className={cn(
                          "text-sm font-medium mb-1",
                          !isCurrentMonth && "text-muted-foreground",
                          isTodayDate && "text-primary font-bold"
                        )}
                      >
                        {format(day, "d")}
                      </span>
                      <div className="flex flex-col gap-1 flex-1">
                        {dayEvents.slice(0, 3).map(event => (
                          <div
                            key={event.id}
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: EVENT_COLORS[event.type] }}
                            title={event.title}
                          />
                        ))}
                        {dayEvents.length > 3 && (
                          <span className="text-[10px] text-muted-foreground">
                            +{dayEvents.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Selected Day Events */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>
              {isSameDay(selectedDate, new Date())
                ? "Today's Events"
                : format(selectedDate, "MMM d, yyyy")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No events scheduled
              </p>
            ) : (
              <div className="space-y-4">
                {selectedDateEvents.map(event => (
                  <div
                    key={event.id}
                    className="border-l-4 pl-3 py-2 rounded-r"
                    style={{ borderLeftColor: EVENT_COLORS[event.type] }}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <Badge
                        variant="secondary"
                        className="text-xs"
                        style={{
                          backgroundColor: EVENT_COLORS[event.type] + "20",
                          color: EVENT_COLORS[event.type],
                          borderColor: EVENT_COLORS[event.type],
                        }}
                      >
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {event.startTime} - {event.endTime}
                    </p>
                    {event.description && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {event.description}
                      </p>
                    )}
                    {event.attendees && event.attendees.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        <span className="font-medium">Attendees:</span>{" "}
                        {event.attendees.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
