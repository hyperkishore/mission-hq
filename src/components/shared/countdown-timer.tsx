"use client"

import { useEffect, useState } from "react"

function getTimeRemaining(deadline: string) {
  const total = new Date(deadline).getTime() - Date.now()
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, expired: true }
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((total / (1000 * 60)) % 60)
  return { days, hours, minutes, expired: false }
}

export function CountdownTimer({ deadline }: { deadline: string }) {
  const [time, setTime] = useState(getTimeRemaining(deadline))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(deadline))
    }, 60000)
    return () => clearInterval(interval)
  }, [deadline])

  if (time.expired) {
    return <span className="text-xs font-medium text-destructive">Expired</span>
  }

  if (time.days > 0) {
    return (
      <span className="text-xs font-medium text-muted-foreground">
        {time.days}d {time.hours}h left
      </span>
    )
  }

  return (
    <span className="text-xs font-medium text-primary">
      {time.hours}h {time.minutes}m left
    </span>
  )
}
