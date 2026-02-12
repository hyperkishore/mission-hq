"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useFeedStore } from "@/stores/feed-store"
import type { FeedItemType } from "@/types"

const filters: { label: string; value: FeedItemType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Posts", value: "social" },
  { label: "Activity", value: "activity" },
  { label: "Announcements", value: "announcement" },
  { label: "Shoutouts", value: "shoutout" },
  { label: "Standups", value: "standup" },
]

export function FeedFilters() {
  const { filter, setFilter, items } = useFeedStore()

  const counts = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1
    return acc
  }, {})

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
      {filters.map((f) => {
        const count = f.value === "all" ? items.length : (counts[f.value] || 0)
        return (
          <Button
            key={f.value}
            variant={filter === f.value ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter(f.value)}
            className="shrink-0 text-xs h-8 gap-1.5"
          >
            {f.label}
            <Badge
              variant="secondary"
              className="h-4.5 min-w-5 px-1 text-[10px] rounded-full"
            >
              {count}
            </Badge>
          </Button>
        )
      })}
    </div>
  )
}
