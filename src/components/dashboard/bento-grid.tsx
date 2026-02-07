import { cn } from "@/lib/utils"

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12",
        className
      )}
    >
      {children}
    </div>
  )
}

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  colSpan?: number
  rowSpan?: number
}

export function BentoCard({
  children,
  className,
  colSpan = 4,
  rowSpan = 1,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "bento-card rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200",
        className
      )}
      style={
        {
          "--col-span": colSpan,
          "--row-span": rowSpan,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}
