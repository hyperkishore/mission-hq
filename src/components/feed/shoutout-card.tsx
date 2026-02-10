"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight } from "lucide-react"
import type { ShoutoutFeedItem } from "@/types"

export function ShoutoutCard({ item }: { item: ShoutoutFeedItem }) {
  return (
    <Card className="p-5 hover:bg-accent/30 transition-colors">
      <div className="flex items-start gap-4">
        <div className="text-3xl shrink-0">{item.emoji}</div>
        <div className="flex-1 min-w-0 space-y-3">
          <blockquote className="text-sm font-medium italic text-foreground/90">
            &ldquo;{item.message}&rdquo;
          </blockquote>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Avatar className="h-6 w-6">
                <AvatarImage src={item.from.avatar} />
                <AvatarFallback className="text-[10px]">
                  {item.from.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium">{item.from.name}</span>
            </div>

            <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />

            <div className="flex items-center gap-1.5">
              <Avatar className="h-6 w-6">
                <AvatarImage src={item.to.avatar} />
                <AvatarFallback className="text-[10px]">
                  {item.to.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium">{item.to.name}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
