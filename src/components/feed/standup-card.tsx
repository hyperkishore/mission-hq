"use client"

import { formatDistanceToNow } from "date-fns"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { StandupFeedItem } from "@/types"

export function StandupCard({ item }: { item: StandupFeedItem }) {
  return (
    <Card className="p-4 border-l-3 border-l-green-500">
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={item.author.avatar} alt={item.author.name} />
          <AvatarFallback>
            {item.author.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{item.author.name}</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm mt-1 leading-relaxed">{item.content}</p>
        </div>
      </div>
    </Card>
  )
}
