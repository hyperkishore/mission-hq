"use client"

import { useEffect, useState } from "react"

export function AnimatedCounter({
  value,
  duration = 1000,
  suffix = "",
}: {
  value: number
  duration?: number
  suffix?: string
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = value / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [value, duration])

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}
