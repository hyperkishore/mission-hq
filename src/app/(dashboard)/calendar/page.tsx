"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
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
} from "date-fns"

import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { calendarEvents as initialCalendarEvents } from "@/data/mock-data"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import type { CalendarEvent } from "@/types"

const EVENT_COLORS: Record<string, string> = {
  meeting: "var(--chart-1)",
  deadline: "var(--chart-3)",
  "focus-block": "var(--chart-2)",
  social: "var(--chart-5)",
  review: "var(--chart-4)",
}

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [localEvents, setLocalEvents] = useState<CalendarEvent[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newStartTime, setNewStartTime] = useState("09:00")
  const [newEndTime, setNewEndTime] = useState("10:00")
  const [newType, setNewType] = useState<CalendarEvent["type"]>("focus-block")

  const calendarEvents = [...initialCalendarEvents, ...localEvents]

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

  const handleAddEvent = () => {
    if (!newTitle.trim()) {
      toast.error("Please enter a title")
      return
    }
    const event: CalendarEvent = {
      id: `local-${Date.now()}`,
      title: newTitle.trim(),
      date: format(selectedDate, "yyyy-MM-dd"),
      startTime: newStartTime,
      endTime: newEndTime,
      type: newType,
      color: EVENT_COLORS[newType] || "var(--chart-2)",
    }
    setLocalEvents((prev) => [...prev, event])
    setNewTitle("")
    setNewStartTime("09:00")
    setNewEndTime("10:00")
    setNewType("focus-block")
    setShowAddForm(false)
    toast.success("Event added!")
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
            <div className="flex items-center justify-between">
              <CardTitle>
                {isSameDay(selectedDate, new Date())
                  ? "Today's Events"
                  : format(selectedDate, "MMM d, yyyy")}
              </CardTitle>
              <Button
                size="sm"
                variant={showAddForm ? "secondary" : "default"}
                onClick={() => setShowAddForm(!showAddForm)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showAddForm && (
              <div className="space-y-3 mb-4 p-3 rounded-lg border bg-muted/50">
                <Input
                  placeholder="Event title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Start</label>
                    <Input
                      type="time"
                      value={newStartTime}
                      onChange={(e) => setNewStartTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">End</label>
                    <Input
                      type="time"
                      value={newEndTime}
                      onChange={(e) => setNewEndTime(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={newType} onValueChange={(v) => setNewType(v as CalendarEvent["type"])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="focus-block">Focus Block</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleAddEvent} className="w-full" size="sm">
                  Add Event
                </Button>
              </div>
            )}

            {selectedDateEvents.length === 0 && !showAddForm ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No events scheduled
              </p>
            ) : selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map(event => (
                  <div
                    key={event.id}
                    className="border-l-4 pl-3 py-2 rounded-r"
                    style={{ borderLeftColor: EVENT_COLORS[event.type] }}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <Badge variant="secondary" className="text-xs">
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
            ) : null}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
