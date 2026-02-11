export const categoryColors: Record<string, string> = {
  product: "bg-blue-500/15 text-blue-500 border-blue-500/20",
  company: "bg-purple-500/15 text-purple-500 border-purple-500/20",
  engineering: "bg-green-500/15 text-green-500 border-green-500/20",
  design: "bg-pink-500/15 text-pink-500 border-pink-500/20",
  hr: "bg-orange-500/15 text-orange-500 border-orange-500/20",
}

export const priorityColors: Record<string, string> = {
  critical: "bg-red-500/15 text-red-500 border-red-500/20",
  high: "bg-orange-500/15 text-orange-500 border-orange-500/20",
  medium: "bg-yellow-500/15 text-yellow-500 border-yellow-500/20",
  low: "bg-green-500/15 text-green-500 border-green-500/20",
}

export const priorityBorderColors: Record<string, string> = {
  critical: "border-l-red-500",
  high: "border-l-orange-500",
  medium: "border-l-yellow-500",
  low: "border-l-green-500",
}

export const eventTypeColors: Record<string, string> = {
  "all-hands": "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  social: "bg-green-500/10 text-green-700 dark:text-green-400",
  workshop: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  deadline: "bg-red-500/10 text-red-700 dark:text-red-400",
  launch: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
}

export const updateTypeConfig: Record<
  string,
  { color: string; label: string; borderColor: string }
> = {
  shipped: {
    color: "bg-green-500/15 text-green-500 border-green-500/20",
    label: "Shipped",
    borderColor: "border-l-green-500",
  },
  decided: {
    color: "bg-blue-500/15 text-blue-500 border-blue-500/20",
    label: "Decided",
    borderColor: "border-l-blue-500",
  },
  "needs-input": {
    color: "bg-amber-500/15 text-amber-500 border-amber-500/20",
    label: "Needs Input",
    borderColor: "border-l-amber-500",
  },
}

export const feedTypeBorderColors: Record<string, string> = {
  social: "border-l-blue-500",
  shoutout: "border-l-amber-400",
  announcement: "border-l-purple-500",
}
