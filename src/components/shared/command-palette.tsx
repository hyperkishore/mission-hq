"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useCommandStore } from "@/stores/command-store"
import { useNotificationStore } from "@/stores/notification-store"
import { useFocusStore } from "@/stores/focus-store"
import {
  Home,
  BarChart3,
  Calendar,
  Users,
  Trophy,
  Heart,
  Settings,
  Timer,
  Sun,
  Moon,
  Zap,
  Bell,
} from "lucide-react"
import { useTheme } from "next-themes"

const pages = [
  { name: "Home", icon: Home, url: "/dashboard" },
  { name: "Analytics", icon: BarChart3, url: "/analytics" },
  { name: "Calendar", icon: Calendar, url: "/calendar" },
  { name: "Team", icon: Users, url: "/team" },
  { name: "Wellness", icon: Heart, url: "/wellness" },
  { name: "Settings", icon: Settings, url: "/settings" },
]

export function CommandPalette() {
  const router = useRouter()
  const { isOpen, close, toggle } = useCommandStore()
  const { toggle: toggleNotifications } = useNotificationStore()
  const { start, status } = useFocusStore()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggle()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [toggle])

  const runCommand = (command: () => void) => {
    close()
    command()
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={(open) => !open && close()} showCloseButton={false}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Pages">
          {pages.map((page) => (
            <CommandItem
              key={page.url}
              onSelect={() => runCommand(() => router.push(page.url))}
            >
              <page.icon className="mr-2 h-4 w-4" />
              <span>{page.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                if (status === "idle") start()
              })
            }
          >
            <Timer className="mr-2 h-4 w-4" />
            <span>Start focus timer</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => setTheme("light"))}
          >
            <Sun className="mr-2 h-4 w-4" />
            <span>Theme: Light</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => setTheme("dark"))}
          >
            <Moon className="mr-2 h-4 w-4" />
            <span>Theme: Dark</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => setTheme("unusual"))}
          >
            <Zap className="mr-2 h-4 w-4" />
            <span>Theme: Unusual</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/leaderboard"))}
          >
            <Trophy className="mr-2 h-4 w-4" />
            <span>View Leaderboard</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => toggleNotifications())}
          >
            <Bell className="mr-2 h-4 w-4" />
            <span>Open notifications</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
