"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { PageHeader } from "@/components/shared/page-header"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Sun, Moon, Monitor, Zap, Keyboard, Command } from "lucide-react"
import { cn } from "@/lib/utils"

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "unusual", label: "Unusual", icon: Zap },
] as const

const shortcuts = [
  { keys: ["Cmd", "K"], description: "Open command palette" },
  { keys: ["Cmd", "B"], description: "Toggle sidebar" },
  { keys: ["N"], description: "Open notifications" },
]

function useNotificationPreferences() {
  const [prefs, setPrefs] = useState({
    teamUpdates: true,
    achievements: true,
    reminders: true,
    social: false,
  })

  useEffect(() => {
    const stored = localStorage.getItem("mission-hq-notification-prefs")
    if (stored) {
      setPrefs(JSON.parse(stored))
    }
  }, [])

  const toggle = (key: keyof typeof prefs) => {
    setPrefs((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      localStorage.setItem("mission-hq-notification-prefs", JSON.stringify(next))
      return next
    })
  }

  return { prefs, toggle }
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { prefs, toggle } = useNotificationPreferences()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-2xl"
    >
      <PageHeader
        title="Settings"
        description="Manage your preferences"
      />

      {/* Profile */}
      <Card className="p-6">
        <h3 className="text-sm font-semibold mb-4">Profile</h3>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
              alt="Alex Chen"
            />
            <AvatarFallback className="text-lg">AC</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Alex Chen</p>
            <p className="text-sm text-muted-foreground">alex.chen@acme.corp</p>
            <Badge variant="secondary" className="mt-1">Sr. Product Designer</Badge>
          </div>
        </div>
      </Card>

      {/* Appearance */}
      <Card className="p-6">
        <h3 className="text-sm font-semibold mb-4">Appearance</h3>
        <div className="flex gap-2">
          {themes.map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              variant={theme === value ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme(value)}
              className={cn(
                "flex-1 gap-2",
                theme === value && "pointer-events-none"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <h3 className="text-sm font-semibold mb-4">Notifications</h3>
        <div className="space-y-4">
          {[
            { key: "teamUpdates" as const, label: "Team updates", desc: "New posts, shipped features, and decisions" },
            { key: "achievements" as const, label: "Achievements", desc: "Level ups, streaks, and unlocked badges" },
            { key: "reminders" as const, label: "Calendar reminders", desc: "Upcoming events and meetings" },
            { key: "social" as const, label: "Social activity", desc: "Likes and comments on your posts" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch
                checked={prefs[item.key]}
                onCheckedChange={() => toggle(item.key)}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Keyboard Shortcuts */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Keyboard className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Keyboard Shortcuts</h3>
        </div>
        <div className="space-y-3">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.description}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-muted-foreground">
                {shortcut.description}
              </span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key) => (
                  <kbd
                    key={key}
                    className="inline-flex h-6 items-center justify-center rounded border bg-muted px-2 text-xs font-medium text-muted-foreground"
                  >
                    {key === "Cmd" ? (
                      <span className="flex items-center gap-0.5">
                        <Command className="h-3 w-3" />
                      </span>
                    ) : (
                      key
                    )}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
