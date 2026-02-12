"use client"

import { useState } from "react"
import { Heart, MessageCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useFeedStore } from "@/stores/feed-store"
import { useGamificationStore } from "@/stores/gamification-store"
import { toast } from "sonner"
import type { SocialFeedItem } from "@/types"

export function SocialCard({ item }: { item: SocialFeedItem }) {
  const { toggleLike } = useFeedStore()
  const { recordDailyAction, addXP } = useGamificationStore()
  const [animateLike, setAnimateLike] = useState(false)

  return (
    <Card className="p-5 hover:bg-accent/30 transition-colors border-l-3 border-l-blue-500">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={item.author.avatar} alt={item.author.name} />
            <AvatarFallback>
              {item.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold">{item.author.name}</h4>
              <span className="text-xs text-muted-foreground">
                {item.author.role}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(item.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed">{item.content}</p>

        {item.image && (
          <div className="rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt="Post content"
              className="w-full h-auto"
            />
          </div>
        )}

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center gap-6 pt-1">
          <button
            onClick={() => {
              toggleLike(item.id)
              if (!item.liked) {
                setAnimateLike(true)
                recordDailyAction('social')
                addXP(5, 'Liked a post')
              }
            }}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <motion.div
              animate={animateLike ? { scale: [1, 1.3, 1] } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onAnimationComplete={() => setAnimateLike(false)}
              whileTap={{ scale: 0.8 }}
            >
              <Heart
                className={`h-4 w-4 ${
                  item.liked ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </motion.div>
            <span>{item.likes}</span>
          </button>
          <button
            onClick={() => toast("Comments coming soon!")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{item.comments}</span>
          </button>
        </div>
      </div>
    </Card>
  )
}
