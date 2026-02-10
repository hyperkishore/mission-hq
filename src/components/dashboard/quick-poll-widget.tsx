"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { WidgetCard } from "@/components/dashboard/widget-card"
import { usePollStore } from "@/stores/poll-store"
import { useGamificationStore } from "@/stores/gamification-store"
import { Check, BarChart } from "lucide-react"
import { toast } from "sonner"

export function QuickPollWidget() {
  const { poll, hasVoted, vote } = usePollStore()

  const handleVote = (optionId: string) => {
    vote(optionId)
    useGamificationStore.getState().addXP(10)
    toast.success("Vote recorded! +10 XP")
  }

  const getPercentage = (votes: number) => {
    return poll.totalVotes > 0 ? Math.round((votes / poll.totalVotes) * 100) : 0
  }

  return (
    <WidgetCard title="Quick Poll" icon={<BarChart className="h-4 w-4" />}>
      <div className="space-y-4">
        <h3 className="text-sm font-medium">{poll.question}</h3>

        {!hasVoted ? (
          <div className="space-y-2">
            {poll.options.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                className="w-full justify-start text-left h-auto py-2.5 px-4 text-sm"
                onClick={() => handleVote(option.id)}
              >
                <span className="flex-1">{option.label}</span>
              </Button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {poll.options.map((option) => {
              const percentage = getPercentage(option.votes)
              const isUserVote = poll.voted === option.id

              return (
                <div key={option.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={isUserVote ? "font-medium" : ""}>
                        {option.label}
                      </span>
                      {isUserVote && (
                        <Check className="h-3.5 w-3.5 text-primary" />
                      )}
                    </div>
                    <span className="text-xs font-medium">{percentage}%</span>
                  </div>

                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className={`h-full ${
                        isUserVote ? "bg-primary" : "bg-primary/60"
                      }`}
                    />
                  </div>
                </div>
              )
            })}

            <div className="pt-2 text-xs text-muted-foreground border-t">
              {poll.totalVotes} votes &middot; +10 XP earned
            </div>
          </div>
        )}
      </div>
    </WidgetCard>
  )
}
