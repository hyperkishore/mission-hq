"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { WidgetCard } from "@/components/dashboard/widget-card"
import { teamUpdates } from "@/data/mock-data"
import { updateTypeConfig } from "@/lib/colors"
import { formatDistanceToNow } from "date-fns"
import { Rocket, Check, MessageCircle, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const typeIcons: Record<string, typeof Rocket> = {
  shipped: Rocket,
  decided: Check,
  "needs-input": MessageCircle,
}

export function TeamUpdatesWidget() {
  const groupedUpdates = teamUpdates.reduce((acc, update) => {
    if (!acc[update.team]) {
      acc[update.team] = []
    }
    acc[update.team].push(update)
    return acc
  }, {} as Record<string, typeof teamUpdates>)

  return (
    <WidgetCard title="Team Updates" icon={<Users className="h-4 w-4" />}>
      <ScrollArea className="h-full">
        <div className="space-y-4 pr-4">
          {Object.entries(groupedUpdates).map(([team, updates], teamIndex) => (
            <div key={team}>
              {teamIndex > 0 && <Separator className="my-4" />}
              <div className="space-y-3">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {team}
                </h3>
                <div className="space-y-3">
                  {updates.map((update) => {
                    const config = updateTypeConfig[update.type]
                    const Icon = typeIcons[update.type]
                    return (
                      <div
                        key={update.id}
                        className="rounded-lg border bg-card p-3 space-y-2 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          <Badge
                            variant="outline"
                            className={cn("text-xs", config.color)}
                          >
                            <Icon className="h-3 w-3 mr-1" />
                            {config.label}
                          </Badge>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-sm font-medium leading-tight">
                            {update.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {update.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{update.author}</span>
                          <span>
                            {formatDistanceToNow(new Date(update.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </WidgetCard>
  )
}
