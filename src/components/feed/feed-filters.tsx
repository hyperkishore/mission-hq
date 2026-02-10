"use client"

import { Button } from "@/components/ui/button"
import { useFeedStore } from "@/stores/feed-store"
import type { FeedItemType } from "@/types"

const filters: { label: string; value: FeedItemType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Posts", value: "social" },
  { label: "Activity", value: "activity" },
  { label: "Announcements", value: "announcement" },
  { label: "Shoutouts", value: "shoutout" },
]

export function FeedFilters() {
  const { filter, setFilter } = useFeedStore()

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
      {filters.map((f) => (
        <Button
          key={f.value}
          variant={filter === f.value ? "default" : "ghost"}
          size="sm"
          onClick={() => setFilter(f.value)}
          className="shrink-0 text-xs h-8"
        >
          {f.label}
        </Button>
      ))}
    </div>
  )
}
