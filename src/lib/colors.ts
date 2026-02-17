export const categoryColors: Record<string, string> = {
  product: "bg-secondary text-secondary-foreground border-border",
  company: "bg-secondary text-secondary-foreground border-border",
  engineering: "bg-secondary text-secondary-foreground border-border",
  design: "bg-secondary text-secondary-foreground border-border",
  hr: "bg-secondary text-secondary-foreground border-border",
}

export const priorityColors: Record<string, string> = {
  critical: "bg-destructive/15 text-destructive border-destructive/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-secondary text-secondary-foreground border-border",
  low: "bg-muted text-muted-foreground border-border",
}

export const priorityBorderColors: Record<string, string> = {
  critical: "border-l-destructive",
  high: "border-l-destructive",
  medium: "border-l-primary",
  low: "border-l-border",
}

export const eventTypeColors: Record<string, string> = {
  "all-hands": "bg-secondary text-secondary-foreground",
  social: "bg-secondary text-secondary-foreground",
  workshop: "bg-secondary text-secondary-foreground",
  deadline: "bg-secondary text-secondary-foreground",
  launch: "bg-secondary text-secondary-foreground",
}

export const updateTypeConfig: Record<
  string,
  { color: string; label: string; borderColor: string }
> = {
  shipped: {
    color: "bg-secondary text-secondary-foreground border-border",
    label: "Shipped",
    borderColor: "border-l-primary",
  },
  decided: {
    color: "bg-secondary text-secondary-foreground border-border",
    label: "Decided",
    borderColor: "border-l-primary",
  },
  "needs-input": {
    color: "bg-secondary text-secondary-foreground border-border",
    label: "Needs Input",
    borderColor: "border-l-primary",
  },
}

export const feedTypeBorderColors: Record<string, string> = {
  social: "border-l-primary",
  shoutout: "border-l-primary",
  announcement: "border-l-primary",
}
