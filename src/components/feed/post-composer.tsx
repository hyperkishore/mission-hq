"use client"

import { useState, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useFeedStore } from "@/stores/feed-store"
import { currentUser } from "@/data/mock-data"
import { toast } from "sonner"

export function PostComposer() {
  const [content, setContent] = useState("")
  const [expanded, setExpanded] = useState(false)
  const { addPost } = useFeedStore()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      addPost(content)
      setContent("")
      setExpanded(false)
      toast.success("Post published")
    }
  }

  const handleBlur = () => {
    if (!content.trim()) {
      setExpanded(false)
    }
  }

  return (
    <Card className="p-4">
      {!expanded ? (
        <button
          onClick={() => {
            setExpanded(true)
            setTimeout(() => textareaRef.current?.focus(), 50)
          }}
          className="flex items-center gap-3 w-full text-left"
        >
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            What&apos;s on your mind?
          </span>
        </button>
      ) : (
        <AnimatePresence>
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            <div className="flex gap-3">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <Textarea
                ref={textareaRef}
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onBlur={handleBlur}
                className="min-h-[72px] resize-none"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="sm" disabled={!content.trim()}>
                Post
              </Button>
            </div>
          </motion.form>
        </AnimatePresence>
      )}
    </Card>
  )
}
