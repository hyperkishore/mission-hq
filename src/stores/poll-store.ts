import { create } from 'zustand'
import type { Poll } from '@/types'
import { activePoll } from '@/data/mock-data'

interface PollStore {
  poll: Poll
  hasVoted: boolean
  vote: (optionId: string) => void
}

export const usePollStore = create<PollStore>((set) => ({
  poll: activePoll,
  hasVoted: false,

  vote: (optionId) =>
    set((state) => ({
      poll: {
        ...state.poll,
        options: state.poll.options.map((option) =>
          option.id === optionId
            ? { ...option, votes: option.votes + 1 }
            : option
        ),
        totalVotes: state.poll.totalVotes + 1,
        voted: optionId,
      },
      hasVoted: true,
    })),
}))
