"use client"

import type { FeedItem } from "@/types"
import { SocialCard } from "./social-card"
import { ActivityCard } from "./activity-card"
import { AnnouncementCard } from "./announcement-card"
import { ShoutoutCard } from "./shoutout-card"

export function FeedCard({ item }: { item: FeedItem }) {
  switch (item.type) {
    case "social":
      return <SocialCard item={item} />
    case "activity":
      return <ActivityCard item={item} />
    case "announcement":
      return <AnnouncementCard item={item} />
    case "shoutout":
      return <ShoutoutCard item={item} />
  }
}
