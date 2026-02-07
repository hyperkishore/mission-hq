"use client"

import { useCallback } from "react"
import confetti from "canvas-confetti"

export function useConfetti() {
  const fire = useCallback(
    (options?: { particleCount?: number; spread?: number; origin?: { x: number; y: number } }) => {
      confetti({
        particleCount: options?.particleCount ?? 100,
        spread: options?.spread ?? 70,
        origin: options?.origin ?? { y: 0.6 },
      })
    },
    []
  )

  return { fire }
}
