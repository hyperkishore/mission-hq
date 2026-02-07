"use client"

import { featuredVideo } from "@/data/mock-data"
import { WidgetCard } from "@/components/dashboard/widget-card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, Play } from "lucide-react"

export function FeaturedVideoWidget() {
  return (
    <WidgetCard title="Featured Video" icon={<Play className="h-4 w-4" />}>
      <div className="space-y-3">
        <div className="relative aspect-video w-full rounded-lg overflow-hidden">
          <iframe
            src={featuredVideo.url}
            title={featuredVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-sm font-medium leading-tight">
            {featuredVideo.title}
          </h3>

          <p className="text-xs text-muted-foreground line-clamp-2">
            {featuredVideo.description}
          </p>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {featuredVideo.author}
            </span>
            <Badge variant="secondary" className="text-xs h-5 px-1.5">
              <Clock className="h-3 w-3 mr-1" />
              {featuredVideo.duration}
            </Badge>
          </div>
        </div>
      </div>
    </WidgetCard>
  )
}
