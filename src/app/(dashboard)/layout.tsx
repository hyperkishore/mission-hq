"use client"

import { useState, useEffect } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Topbar } from "@/components/layout/topbar"
import { CommandPalette } from "@/components/shared/command-palette"
import { NotificationPanel } from "@/components/shared/notification-panel"
import { DailyCheckin } from "@/components/shared/daily-checkin"
import { WeeklyRecap } from "@/components/shared/weekly-recap"
import { DashboardSkeleton } from "@/components/dashboard/widget-skeleton"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { useProactiveNudges } from "@/hooks/use-proactive-nudges"

function DashboardShell({ children }: { children: React.ReactNode }) {
  useKeyboardShortcuts()
  useProactiveNudges()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Topbar />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
      <CommandPalette />
      <NotificationPanel />
      <DailyCheckin />
      <WeeklyRecap />
    </SidebarProvider>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-screen">
        <div className="flex-1 p-4 md:p-6">
          <DashboardSkeleton />
        </div>
      </div>
    )
  }

  return <DashboardShell>{children}</DashboardShell>
}
