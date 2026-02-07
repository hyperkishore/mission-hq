import { Badge } from "@/components/ui/badge"
import { priorityColors } from "@/lib/colors"
import { cn } from "@/lib/utils"

export function PriorityBadge({
  priority,
}: {
  priority: "critical" | "high" | "medium" | "low"
}) {
  return (
    <Badge variant="outline" className={cn("text-xs", priorityColors[priority])}>
      {priority}
    </Badge>
  )
}
