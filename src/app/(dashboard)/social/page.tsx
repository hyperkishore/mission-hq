"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, MessageCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { PageHeader } from "@/components/shared/page-header"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useSocialStore } from "@/stores/social-store"
import { currentUser } from "@/data/mock-data"

export default function SocialPage() {
  const [newPostContent, setNewPostContent] = useState("")
  const { posts, addPost, toggleLike } = useSocialStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPostContent.trim()) {
      addPost(newPostContent)
      setNewPostContent("")
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageHeader
        title="Social Feed"
        description="What's happening at Acme Corp"
      />

      {/* Create Post Composer */}
      <Card className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="What's on your mind?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={!newPostContent.trim()}>
              Post
            </Button>
          </div>
        </form>
      </Card>

      {/* Feed */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {posts.map((post) => (
          <motion.div key={post.id} variants={item}>
            <Card className="p-6">
              <div className="space-y-4">
                {/* Post Header */}
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{post.author.name}</h4>
                      <span className="text-sm text-muted-foreground">
                        {post.author.role}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-sm leading-relaxed">{post.content}</p>

                {/* Post Image */}
                {post.image && (
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt="Post content"
                      className="w-full h-auto"
                    />
                  </div>
                )}

                {/* Post Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center gap-6 pt-2">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        post.liked ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span>{post.comments}</span>
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
