"use client"

import { formatDistanceToNow } from "date-fns"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { updateTypeConfig } from "@/lib/colors"
import { Rocket, Check, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ActivityFeedItem } from "@/types"

const typeIcons: Record<string, typeof Rocket> = {
  shipped: Rocket,
  decided: Check,
  "needs-input": MessageCircle,
}

export function ActivityCard({ item }: { item: ActivityFeedItem }) {
  const config = updateTypeConfig[item.activityType]
  const Icon = typeIcons[item.activityType]

  return (
    <Card className={cn("p-5 hover:bg-accent/30 transition-colors border-l-3", config.borderColor)}>
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs bg-muted/50">
            {item.team}
          </Badge>
          <Badge variant="outline" className={cn("text-xs", config.color)}>
            {item.activityType === "needs-input" && (
              <span className="relative mr-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
            )}
            <Icon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{item.title}</h4>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{item.author}</span>
          <span>
            {formatDistanceToNow(new Date(item.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </Card>
  )
}
