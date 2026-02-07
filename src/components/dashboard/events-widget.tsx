"use client"

import { useMemo } from "react"
import { companyEvents } from "@/data/mock-data"
import type { CompanyEvent } from "@/types"
import { WidgetCard } from "@/components/dashboard/widget-card"
import { eventTypeColors } from "@/lib/colors"
import { CalendarDays, MapPin } from "lucide-react"
import { differenceInDays, differenceInHours } from "date-fns"
import { Badge } from "@/components/ui/badge"

export function EventsWidget() {
  const sortedEvents = useMemo(() => {
    return [...companyEvents].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  }, [])

  const nextEvent = sortedEvents[0]
  const upcomingEvents = sortedEvents.slice(1, 4)

  const getCountdown = (dateString: string) => {
    const eventDate = new Date(dateString)
    const days = differenceInDays(eventDate, new Date())
    const hours = differenceInHours(eventDate, new Date())

    if (days > 0) {
      return `${days}d`
    } else if (hours > 0) {
      return `${hours}h`
    } else {
      return "Soon"
    }
  }

  return (
    <WidgetCard title="Upcoming Events" icon={<CalendarDays className="h-4 w-4" />}>
      <div className="space-y-4">
        {/* Featured Next Event */}
        <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium leading-tight">{nextEvent.title}</h3>
            <Badge className={eventTypeColors[nextEvent.type]}>
              {nextEvent.type}
            </Badge>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>
              {new Date(nextEvent.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
              {" \u00B7 "}
              {nextEvent.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {nextEvent.location}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-border/50">
            <span className="text-xs text-muted-foreground">Starts in</span>
            <span className="text-lg font-bold text-primary">
              {getCountdown(nextEvent.date)}
            </span>
          </div>
        </div>

        {/* Other Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start justify-between gap-3 hover:bg-accent/50 rounded-lg p-2 -mx-2 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{event.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                    {" \u00B7 "}
                    {event.time}
                  </div>
                </div>
                <Badge className={`${eventTypeColors[event.type]} shrink-0`}>
                  {event.type}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </WidgetCard>
  )
}
