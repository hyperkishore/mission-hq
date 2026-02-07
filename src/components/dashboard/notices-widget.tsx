"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { PriorityBadge } from "@/components/shared/priority-badge"
import { CountdownTimer } from "@/components/shared/countdown-timer"
import { WidgetCard } from "@/components/dashboard/widget-card"
import { notices } from "@/data/mock-data"
import { priorityBorderColors } from "@/lib/colors"
import { AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export function NoticesWidget() {
  return (
    <WidgetCard title="Notices" icon={<AlertTriangle className="h-4 w-4" />}>
      <ScrollArea className="h-full">
        <div className="space-y-3 pr-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className={cn(
                "rounded-lg border border-l-4 bg-card p-3 space-y-2 hover:bg-accent/50 transition-colors",
                priorityBorderColors[notice.priority]
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <PriorityBadge priority={notice.priority} />
                <CountdownTimer deadline={notice.deadline} />
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium leading-tight">{notice.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {notice.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </WidgetCard>
  )
}
