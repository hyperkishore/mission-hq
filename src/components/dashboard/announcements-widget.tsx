"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { WidgetCard } from "@/components/dashboard/widget-card"
import { announcements } from "@/data/mock-data"
import { categoryColors } from "@/lib/colors"
import { formatDistanceToNow } from "date-fns"
import { Megaphone, Pin } from "lucide-react"
import { cn } from "@/lib/utils"

export function AnnouncementsWidget() {
  return (
    <WidgetCard title="Announcements" icon={<Megaphone className="h-4 w-4" />}>
      <ScrollArea className="h-full">
        <div className="space-y-3 pr-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="rounded-lg border bg-card p-3 space-y-2 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn("text-xs", categoryColors[announcement.category])}
                  >
                    {announcement.category}
                  </Badge>
                  {announcement.pinned && (
                    <Pin className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium leading-tight">
                  {announcement.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {announcement.content}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={announcement.author.avatar} />
                  <AvatarFallback className="text-[10px]">
                    {announcement.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium truncate">
                  {announcement.author.name}
                </span>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-auto">
                  {formatDistanceToNow(new Date(announcement.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </WidgetCard>
  )
}
