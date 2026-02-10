"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useFeedStore } from "@/stores/feed-store"
import { currentUser } from "@/data/mock-data"
import { toast } from "sonner"

export function PostComposer() {
  const [content, setContent] = useState("")
  const { addPost } = useFeedStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      addPost(content)
      setContent("")
      toast.success("Post published")
    }
  }

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-3">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[72px] resize-none"
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" size="sm" disabled={!content.trim()}>
            Post
          </Button>
        </div>
      </form>
    </Card>
  )
}
