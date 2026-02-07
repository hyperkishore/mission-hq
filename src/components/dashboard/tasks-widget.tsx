"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { WidgetCard } from "@/components/dashboard/widget-card"
import { useTaskStore } from "@/stores/task-store"
import { useGamificationStore } from "@/stores/gamification-store"
import { useConfetti } from "@/hooks/use-confetti"
import { priorityColors } from "@/lib/colors"
import { ListTodo } from "lucide-react"
import { cn } from "@/lib/utils"

export function TasksWidget() {
  const { tasks, filter, setFilter, toggleTask, filteredTasks } = useTaskStore()
  const addXP = useGamificationStore((state) => state.addXP)
  const { fire } = useConfetti()

  const displayTasks = filteredTasks()

  const handleToggle = (id: string) => {
    const task = tasks.find((t) => t.id === id)
    const wasCompleted = task?.completed

    toggleTask(id)

    if (!wasCompleted) {
      fire()
      addXP(25)
    }
  }

  return (
    <WidgetCard title="Tasks" icon={<ListTodo className="h-4 w-4" />}>
      <div className="space-y-3">
        <Tabs value={filter} onValueChange={(value: any) => setFilter(value)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="high">High</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="completed">Done</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-2">
          {displayTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 rounded-lg border bg-card p-3 hover:bg-accent/50 transition-colors"
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => handleToggle(task.id)}
                className="mt-0.5"
              />

              <div className="flex-1 min-w-0 space-y-1.5">
                <p
                  className={cn(
                    "text-sm font-medium leading-tight",
                    task.completed && "line-through text-muted-foreground"
                  )}
                >
                  {task.title}
                </p>

                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className={cn("text-xs", priorityColors[task.priority])}
                  >
                    {task.priority}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {task.estimatedMinutes}m
                  </Badge>
                </div>
              </div>
            </div>
          ))}

          {displayTasks.length === 0 && (
            <div className="text-center py-8 text-sm text-muted-foreground">
              No tasks to show
            </div>
          )}
        </div>
      </div>
    </WidgetCard>
  )
}
