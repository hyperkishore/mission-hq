"use client"

import { useState } from "react"
import { LayoutGrid } from "lucide-react"
import { FocusTimerWidget } from "@/components/dashboard/focus-timer-widget"
import { TasksWidget } from "@/components/dashboard/tasks-widget"
import { QuickPollWidget } from "@/components/dashboard/quick-poll-widget"
import { GamificationWidget } from "@/components/dashboard/gamification-widget"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

function SidebarWidgets() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card p-1">
        <FocusTimerWidget />
      </div>
      <div className="rounded-lg border bg-card p-1">
        <TasksWidget />
      </div>
      <div className="rounded-lg border bg-card p-1">
        <QuickPollWidget />
      </div>
      <div className="rounded-lg border bg-card p-1">
        <GamificationWidget />
      </div>
    </div>
  )
}

export function FeedSidebar() {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)

  if (isMobile) {
    return (
      <>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full shadow-lg lg:hidden"
          onClick={() => setOpen(true)}
        >
          <LayoutGrid className="h-5 w-5" />
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="bottom" className="h-[80vh] p-0">
            <SheetHeader className="px-4 pt-4 pb-2">
              <SheetTitle>Widgets</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-full px-4 pb-6">
              <SidebarWidgets />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return (
    <div className="space-y-4 hidden lg:block">
      <SidebarWidgets />
    </div>
  )
}
