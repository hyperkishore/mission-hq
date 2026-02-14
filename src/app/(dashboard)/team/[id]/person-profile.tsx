"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Mail, MapPin, Clock, Lightbulb, Star } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FeedCard } from "@/components/feed/feed-card"
import { people, shoutouts, funFacts } from "@/data/mock-data"
import { useFeedStore } from "@/stores/feed-store"

const statusColors: Record<string, string> = {
  active: "bg-green-500",
  away: "bg-yellow-500",
  busy: "bg-red-500",
  offline: "bg-gray-400",
}

const statusLabels: Record<string, string> = {
  active: "Active",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
}

export function PersonProfile({ id }: { id: string }) {
  const person = people.find((p) => p.id === id)
  const feedItems = useFeedStore((s) => s.items)

  if (!person) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Person not found</p>
        <Button asChild variant="ghost" className="mt-4">
          <Link href="/team">Back to Team</Link>
        </Button>
      </div>
    )
  }

  const funFact = funFacts[person.id]
  const personShoutoutsReceived = shoutouts.filter(
    (s) => s.to.name === person.name
  )
  const personShoutoutsGiven = shoutouts.filter(
    (s) => s.from.name === person.name
  )

  // Filter feed items by author name
  const recentActivity = feedItems
    .filter((item) => {
      if (item.type === "social" || item.type === "standup")
        return item.author.name === person.name
      if (item.type === "activity") return item.author === person.name
      if (item.type === "shoutout")
        return item.from.name === person.name || item.to.name === person.name
      return false
    })
    .slice(0, 5)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-3xl"
    >
      <PageHeader title={person.name} description={person.role}>
        <Button asChild variant="ghost" size="sm">
          <Link href="/team">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back
          </Link>
        </Button>
      </PageHeader>

      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={person.avatar} alt={person.name} />
              <AvatarFallback className="text-2xl">
                {person.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span
              className={`absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-background ${statusColors[person.status]}`}
            />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div>
              <h2 className="text-xl font-bold">{person.name}</h2>
              <p className="text-sm text-muted-foreground">{person.role}</p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <Badge variant="secondary">{person.department}</Badge>
              <Badge variant="outline" className="gap-1">
                <span
                  className={`h-2 w-2 rounded-full ${statusColors[person.status]}`}
                />
                {statusLabels[person.status]}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{person.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{person.timezone}</span>
              </div>
            </div>

            <a
              href={`mailto:${person.email}`}
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <Mail className="h-4 w-4" />
              {person.email}
            </a>
          </div>
        </div>
      </Card>

      {/* Skills */}
      <Card className="p-6">
        <h3 className="text-sm font-semibold mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {person.skills.map((skill, idx) => (
            <Badge key={idx} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Fun Fact */}
      {funFact && (
        <Card className="p-5 bg-muted/30">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-1">
                Fun Fact
              </h4>
              <p className="text-sm">{funFact}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Shoutouts */}
      {(personShoutoutsReceived.length > 0 ||
        personShoutoutsGiven.length > 0) && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-4 w-4 text-yellow-500" />
            <h3 className="text-sm font-semibold">Shoutouts</h3>
          </div>

          {personShoutoutsReceived.length > 0 && (
            <div className="space-y-2 mb-4">
              <p className="text-xs font-medium text-muted-foreground">
                Received
              </p>
              {personShoutoutsReceived.map((s) => (
                <div
                  key={s.id}
                  className="text-sm bg-muted/50 rounded-lg p-3"
                >
                  <span className="mr-1.5">{s.emoji}</span>
                  &ldquo;{s.message}&rdquo;
                  <span className="block mt-1 text-xs font-medium text-muted-foreground">
                    &mdash; {s.from.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {personShoutoutsGiven.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Given</p>
              {personShoutoutsGiven.map((s) => (
                <div
                  key={s.id}
                  className="text-sm bg-muted/50 rounded-lg p-3"
                >
                  <span className="mr-1.5">{s.emoji}</span>
                  &ldquo;{s.message}&rdquo;
                  <span className="block mt-1 text-xs font-medium text-muted-foreground">
                    to {s.to.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <FeedCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
