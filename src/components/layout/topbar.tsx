"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { Bell, ChevronRight } from "lucide-react"
import { useNotificationStore } from "@/stores/notification-store"
import { useUserStore } from "@/stores/user-store"

import { people } from "@/data/mock-data"

const pageTitles: Record<string, string> = {
  "/dashboard": "Home",
  "/analytics": "Analytics",
  "/achievements": "Achievements",
  "/calendar": "Calendar",
  "/team": "Team",
  "/leaderboard": "Leaderboard",
  "/wellness": "Wellness",
  "/settings": "Settings",
}

export function Topbar() {
  const pathname = usePathname()
  const title = (() => {
    if (pageTitles[pathname]) return pageTitles[pathname]
    const teamMatch = pathname.match(/^\/team\/(.+)$/)
    if (teamMatch) {
      const person = people.find((p) => p.id === teamMatch[1])
      return person ? person.name : "Team Member"
    }
    return "Dashboard"
  })()
  const { open: openNotifications, unreadCount } = useNotificationStore()
  const count = unreadCount()
  const { profile: userProfile } = useUserStore()
  const userInitials = userProfile.name.split(' ').map((n) => n[0]).join('').slice(0, 2)

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <span>Overview</span>
        {pathname.match(/^\/team\/.+/) && (
          <>
            <ChevronRight className="h-3 w-3" />
            <span>Team</span>
          </>
        )}
        <ChevronRight className="h-3 w-3" />
        <span className="font-semibold text-foreground">{title}</span>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8"
          onClick={openNotifications}
        >
          <Bell className="h-4 w-4" />
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {count > 9 ? "9+" : count}
            </span>
          )}
        </Button>
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  )
}
