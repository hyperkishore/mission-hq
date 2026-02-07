import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AvatarGroupProps {
  avatars: { name: string; image: string }[]
  max?: number
  size?: "sm" | "md"
}

export function AvatarGroup({ avatars, max = 3, size = "sm" }: AvatarGroupProps) {
  const shown = avatars.slice(0, max)
  const remaining = avatars.length - max

  const sizeClasses = size === "sm" ? "h-6 w-6" : "h-8 w-8"

  return (
    <div className="flex -space-x-2">
      {shown.map((a) => (
        <Avatar key={a.name} className={`${sizeClasses} border-2 border-background`}>
          <AvatarImage src={a.image} alt={a.name} />
          <AvatarFallback className="text-xs">
            {a.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
      ))}
      {remaining > 0 && (
        <div
          className={`${sizeClasses} flex items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium text-muted-foreground`}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}
