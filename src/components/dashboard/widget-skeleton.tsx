import { Skeleton } from "@/components/ui/skeleton"

type WidgetSkeletonVariant = "list" | "stats" | "chart"

interface WidgetSkeletonProps {
  variant?: WidgetSkeletonVariant
}

export function WidgetSkeleton({ variant = "list" }: WidgetSkeletonProps) {
  return (
    <div className="rounded-xl border bg-card p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Content */}
      {variant === "list" && (
        <div className="space-y-3">
          <Skeleton className="h-14 w-full rounded-lg" />
          <Skeleton className="h-14 w-full rounded-lg" />
          <Skeleton className="h-14 w-full rounded-lg" />
        </div>
      )}

      {variant === "stats" && (
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-20 rounded-lg" />
          <Skeleton className="h-20 rounded-lg" />
          <Skeleton className="h-20 rounded-lg" />
          <Skeleton className="h-20 rounded-lg" />
        </div>
      )}

      {variant === "chart" && (
        <Skeleton className="h-40 w-full rounded-lg" />
      )}
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Greeting skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Bento grid skeleton */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4 row-span-2">
          <WidgetSkeleton variant="list" />
        </div>
        <div className="col-span-4 row-span-2">
          <WidgetSkeleton variant="list" />
        </div>
        <div className="col-span-4">
          <WidgetSkeleton variant="chart" />
        </div>
        <div className="col-span-4">
          <WidgetSkeleton variant="stats" />
        </div>
      </div>
    </div>
  )
}
