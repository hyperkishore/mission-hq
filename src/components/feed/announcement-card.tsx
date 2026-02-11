"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { categoryColors, priorityColors, priorityBorderColors } from "@/lib/colors"
import { Pin, ChevronDown, ChevronUp, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFeedStore } from "@/stores/feed-store"
import type { AnnouncementFeedItem } from "@/types"

export function AnnouncementCard({ item }: { item: AnnouncementFeedItem }) {
  const [expanded, setExpanded] = useState(false)
  const togglePin = useFeedStore((s) => s.togglePin)
  const isLong = item.content.length > 150

  return (
    <Card
      className={cn(
        "p-5 hover:bg-accent/30 transition-colors border-l-3",
        item.priority ? priorityBorderColors[item.priority] : "border-l-purple-500",
        item.pinned && "border-primary/30 bg-primary/[0.02]"
      )}
    >
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="outline"
            className={cn("text-xs", categoryColors[item.category])}
          >
            {item.category}
          </Badge>
          {item.priority && (
            <Badge
              variant="outline"
              className={cn("text-xs", priorityColors[item.priority])}
            >
              {item.priority}
            </Badge>
          )}
          <button
            onClick={() => togglePin(item.id)}
            className={cn(
              "p-0.5 rounded hover:bg-accent transition-colors",
              item.pinned ? "text-primary" : "text-muted-foreground/50 hover:text-muted-foreground"
            )}
            title={item.pinned ? "Unpin" : "Pin"}
          >
            <Pin className="h-3 w-3" />
          </button>
          {item.deadline && (
            <Badge variant="outline" className="text-xs text-muted-foreground ml-auto">
              <Clock className="h-3 w-3 mr-1" />
              Due {formatDistanceToNow(new Date(item.deadline), { addSuffix: true })}
            </Badge>
          )}
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{item.title}</h4>
          <p className={cn("text-sm text-muted-foreground", !expanded && isLong && "line-clamp-2")}>
            {item.content}
          </p>
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
            >
              {expanded ? (
                <>Show less <ChevronUp className="h-3 w-3" /></>
              ) : (
                <>Read more <ChevronDown className="h-3 w-3" /></>
              )}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Avatar className="h-5 w-5">
            <AvatarImage src={item.author.avatar} />
            <AvatarFallback className="text-[10px]">
              {item.author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium truncate">
            {item.author.name}
          </span>
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-auto">
            {formatDistanceToNow(new Date(item.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </Card>
  )
}
