"use client"

import { useState, useCallback } from "react"
import { Coffee, Shuffle, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { WidgetCard } from "@/components/dashboard/widget-card"
import { Badge } from "@/components/ui/badge"
import { people, currentUser, funFacts } from "@/data/mock-data"
import { toast } from "sonner"

function getRandomPerson(excludeId?: string) {
  // Filter to different department + exclude current user and optionally a specific person
  const candidates = people.filter(
    (p) => p.name !== currentUser.name && p.department !== currentUser.department && p.id !== excludeId
  )
  if (candidates.length === 0) {
    // Fallback: any person that isn't current user
    const fallback = people.filter((p) => p.name !== currentUser.name && p.id !== excludeId)
    return fallback[Math.floor(Math.random() * fallback.length)]
  }
  return candidates[Math.floor(Math.random() * candidates.length)]
}

export function CoffeeRouletteWidget() {
  const [person, setPerson] = useState(() => getRandomPerson())

  const shuffle = useCallback(() => {
    setPerson((prev) => getRandomPerson(prev.id))
  }, [])

  const scheduleCoffee = () => {
    toast.success(`Coffee chat with ${person.name} added to your calendar!`)
  }

  const funFact = funFacts[person.id]

  return (
    <WidgetCard title="Coffee Roulette" icon={<Coffee className="h-4 w-4" />}>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={person.avatar} alt={person.name} />
            <AvatarFallback>
              {person.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{person.name}</p>
            <p className="text-xs text-muted-foreground truncate">{person.role}</p>
            <Badge variant="secondary" className="text-[10px] mt-0.5 h-4">
              {person.department}
            </Badge>
          </div>
        </div>

        {funFact && (
          <p className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-2">
            {funFact}
          </p>
        )}

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={scheduleCoffee}>
            <Calendar className="h-3 w-3 mr-1" />
            Schedule
          </Button>
          <Button size="sm" variant="ghost" className="text-xs" onClick={shuffle}>
            <Shuffle className="h-3 w-3 mr-1" />
            Skip
          </Button>
        </div>
      </div>
    </WidgetCard>
  )
}
