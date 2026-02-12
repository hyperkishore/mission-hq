"use client"

import { useState } from "react"
import { X, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useGamificationStore } from "@/stores/gamification-store"
import { GiveShoutoutDialog } from "@/components/shared/give-shoutout-dialog"

export function SmartRecognitionPrompt() {
  const { profile, setLastCompletedTask } = useGamificationStore()
  const [dismissed, setDismissed] = useState(false)

  const taskName = profile.lastCompletedTask

  if (!taskName || dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    setLastCompletedTask(null)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -10, height: 0 }}
        className="mx-auto max-w-4xl px-4"
      >
        <div className="flex items-center gap-3 rounded-lg border bg-card p-3 shadow-sm">
          <div className="flex-1 min-w-0">
            <p className="text-sm">
              You just finished <span className="font-medium">{taskName}</span>.
              Anyone help you get there?
            </p>
          </div>
          <GiveShoutoutDialog>
            <Button size="sm" variant="outline" className="shrink-0">
              <Star className="h-3.5 w-3.5 mr-1" />
              Give Thanks
            </Button>
          </GiveShoutoutDialog>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 shrink-0"
            onClick={handleDismiss}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
