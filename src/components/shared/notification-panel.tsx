"use client"

import { formatDistanceToNow } from "date-fns"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNotificationStore } from "@/stores/notification-store"
import { Info, CheckCircle2, AlertTriangle, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const typeIcons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  action: Zap,
}

export function NotificationPanel() {
  const { notifications, isOpen, close, markRead, markAllRead, unreadCount } =
    useNotificationStore()

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle>Notifications</SheetTitle>
            {unreadCount() > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllRead}>
                Mark all read
              </Button>
            )}
          </div>
          <SheetDescription className="sr-only">
            Your recent notifications
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="divide-y">
            {notifications.map((notification) => {
              const Icon = typeIcons[notification.type]
              return (
                <button
                  key={notification.id}
                  onClick={() => markRead(notification.id)}
                  className={cn(
                    "flex gap-3 p-4 w-full text-left hover:bg-accent/50 transition-colors",
                    !notification.read && "bg-accent/20"
                  )}
                >
                  <div className={cn("mt-0.5 shrink-0 text-muted-foreground")}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start gap-2">
                      <p className="text-sm font-medium leading-tight">
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(notification.timestamp, {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
