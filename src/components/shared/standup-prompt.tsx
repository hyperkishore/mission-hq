"use client"

import { useState, useEffect } from "react"
import { X, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useFeedStore } from "@/stores/feed-store"
import { currentUser } from "@/data/mock-data"
import type { StandupFeedItem } from "@/types"

const STANDUP_KEY = "mission-hq-standup-date"

export function StandupPrompt() {
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState("")

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    const lastStandup = localStorage.getItem(STANDUP_KEY)
    if (lastStandup !== today) {
      const timer = setTimeout(() => setVisible(true), 2000) // show after 2s
      return () => clearTimeout(timer)
    }
  }, [])

  if (!visible) return null

  const handleSubmit = () => {
    if (!text.trim()) return

    const standup: StandupFeedItem = {
      id: `feed-standup-${Date.now()}`,
      type: "standup",
      createdAt: new Date().toISOString(),
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        role: currentUser.role,
      },
      content: text.trim().slice(0, 280),
    }

    useFeedStore.setState((state) => ({ items: [standup, ...state.items] }))
    localStorage.setItem(STANDUP_KEY, new Date().toISOString().split("T")[0])
    setVisible(false)
    setText("")
  }

  const handleDismiss = () => {
    localStorage.setItem(STANDUP_KEY, new Date().toISOString().split("T")[0])
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          className="mx-auto max-w-4xl px-4 pb-2"
        >
          <div className="rounded-lg border bg-card p-3 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">What are you working on right now?</p>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6"
                onClick={handleDismiss}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="flex gap-2">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 280))}
                placeholder="Quick update for your team..."
                className="flex-1 resize-none rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit()
                  }
                }}
              />
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!text.trim()}
                className="self-end"
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-right">
              {text.length}/280
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
