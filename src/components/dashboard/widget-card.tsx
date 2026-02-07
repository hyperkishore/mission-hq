"use client"

import { cn } from "@/lib/utils"

interface WidgetCardProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
  headerAction?: React.ReactNode
}

export function WidgetCard({
  title,
  icon,
  children,
  className,
  headerAction,
}: WidgetCardProps) {
  return (
    <div className={cn("h-full flex flex-col", className)}>
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          {icon}
          {title}
        </span>
        {headerAction && <span>{headerAction}</span>}
      </div>
      <div className="flex-1 px-5 pb-5 overflow-hidden">{children}</div>
    </div>
  )
}
