"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { useFeedStore } from "@/stores/feed-store"
import { useGamificationStore } from "@/stores/gamification-store"
import { people, currentUser } from "@/data/mock-data"
import { toast } from "sonner"
import type { ShoutoutFeedItem } from "@/types"

const EMOJIS = ["🌟", "🔥", "💪", "🎯", "🚀", "👏", "💡", "🎉", "❤️", "🏆"]

export function GiveShoutoutDialog({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [selectedEmoji, setSelectedEmoji] = useState("🌟")
  const [search, setSearch] = useState("")

  const { addXP, recordDailyAction } = useGamificationStore()

  const filteredPeople = people.filter(
    (p) =>
      p.name !== currentUser.name &&
      (search === "" || p.name.toLowerCase().includes(search.toLowerCase()))
  )

  const person = people.find((p) => p.id === selectedPerson)

  const handleSubmit = () => {
    if (!person || !message.trim()) {
      toast.error("Please select a person and write a message")
      return
    }

    const shoutout: ShoutoutFeedItem = {
      id: `feed-shoutout-${Date.now()}`,
      type: "shoutout",
      createdAt: new Date().toISOString(),
      from: { name: currentUser.name, avatar: currentUser.avatar },
      to: { name: person.name, avatar: person.avatar },
      message: message.trim(),
      emoji: selectedEmoji,
    }

    useFeedStore.setState((state) => ({ items: [shoutout, ...state.items] }))
    recordDailyAction("shoutout")
    addXP(15, "Gave a shoutout")
    toast.success(`Shoutout sent to ${person.name}!`)

    // Reset
    setSelectedPerson(null)
    setMessage("")
    setSelectedEmoji("🌟")
    setSearch("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Star className="h-4 w-4 mr-1.5" />
            Give Shoutout
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Give a Shoutout</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Person selector */}
          {!selectedPerson ? (
            <div className="space-y-2">
              <Input
                placeholder="Search teammates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="max-h-48 overflow-y-auto space-y-1">
                {filteredPeople.slice(0, 8).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPerson(p.id)}
                    className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-accent transition-colors text-left"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={p.avatar} alt={p.name} />
                      <AvatarFallback>
                        {p.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Selected person */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={person?.avatar} alt={person?.name} />
                  <AvatarFallback>
                    {person?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-sm font-medium">{person?.name}</div>
                  <div className="text-xs text-muted-foreground">{person?.role}</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPerson(null)}
                >
                  Change
                </Button>
              </div>

              {/* Emoji picker */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Pick an emoji
                </label>
                <div className="flex flex-wrap gap-2">
                  {EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`text-2xl p-1.5 rounded-lg transition-all ${
                        selectedEmoji === emoji
                          ? "bg-primary/10 ring-2 ring-primary scale-110"
                          : "hover:bg-accent"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Your message
                </label>
                <Input
                  placeholder="What did they do great?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>

              <Button onClick={handleSubmit} className="w-full">
                <Star className="h-4 w-4 mr-1.5" />
                Send Shoutout (+15 XP)
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
