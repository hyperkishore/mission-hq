import type { AnalyticsDataPoint } from '@/types'

export type DateRange = 'week' | 'month' | '30days'

export function filterByDateRange(
  data: AnalyticsDataPoint[],
  range: DateRange
): AnalyticsDataPoint[] {
  const now = new Date()
  let cutoff: Date

  switch (range) {
    case 'week':
      cutoff = new Date(now.getTime() - 7 * 86400000)
      break
    case 'month':
      cutoff = new Date(now.getFullYear(), now.getMonth(), 1)
      break
    case '30days':
    default:
      cutoff = new Date(now.getTime() - 30 * 86400000)
      break
  }

  const cutoffStr = cutoff.toISOString().split('T')[0]
  return data.filter((d) => d.date >= cutoffStr)
}

export function getPreviousPeriodData(
  allData: AnalyticsDataPoint[],
  range: DateRange
): AnalyticsDataPoint[] {
  const now = new Date()
  let start: Date
  let end: Date

  switch (range) {
    case 'week':
      end = new Date(now.getTime() - 7 * 86400000)
      start = new Date(now.getTime() - 14 * 86400000)
      break
    case 'month': {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      start = prevMonthStart
      end = monthStart
      break
    }
    case '30days':
    default:
      end = new Date(now.getTime() - 30 * 86400000)
      start = new Date(now.getTime() - 60 * 86400000)
      break
  }

  const startStr = start.toISOString().split('T')[0]
  const endStr = end.toISOString().split('T')[0]
  return allData.filter((d) => d.date >= startStr && d.date < endStr)
}

export function computeStats(
  currentData: AnalyticsDataPoint[],
  previousData: AnalyticsDataPoint[]
) {
  if (currentData.length === 0) {
    return { avgFocus: 0, totalTasks: 0, totalMeetings: 0, avgProductivity: 0, deltas: { focus: 0, tasks: 0, meetings: 0, productivity: 0 } }
  }

  const avgFocus = parseFloat(
    (currentData.reduce((s, d) => s + d.focusMinutes, 0) / currentData.length / 60).toFixed(1)
  )
  const totalTasks = currentData.reduce((s, d) => s + d.tasksCompleted, 0)
  const totalMeetings = currentData.reduce((s, d) => s + d.meetings, 0)
  const avgProductivity = Math.round(
    currentData.reduce((s, d) => s + d.productivity, 0) / currentData.length
  )

  // Compute deltas vs previous period
  const prevAvgFocus =
    previousData.length > 0
      ? previousData.reduce((s, d) => s + d.focusMinutes, 0) / previousData.length / 60
      : avgFocus
  const prevTotalTasks =
    previousData.length > 0
      ? previousData.reduce((s, d) => s + d.tasksCompleted, 0)
      : totalTasks
  const prevTotalMeetings =
    previousData.length > 0
      ? previousData.reduce((s, d) => s + d.meetings, 0)
      : totalMeetings
  const prevAvgProductivity =
    previousData.length > 0
      ? previousData.reduce((s, d) => s + d.productivity, 0) / previousData.length
      : avgProductivity

  const pctDelta = (curr: number, prev: number) =>
    prev === 0 ? 0 : Math.round(((curr - prev) / prev) * 100)

  return {
    avgFocus,
    totalTasks,
    totalMeetings,
    avgProductivity,
    deltas: {
      focus: pctDelta(avgFocus, prevAvgFocus),
      tasks: pctDelta(totalTasks, prevTotalTasks),
      meetings: pctDelta(totalMeetings, prevTotalMeetings),
      productivity: pctDelta(avgProductivity, prevAvgProductivity),
    },
  }
}

export function computeFocusDistribution(data: AnalyticsDataPoint[]) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const buckets: Record<string, number> = {}
  dayNames.forEach((d) => (buckets[d] = 0))

  data.forEach((point) => {
    const dayOfWeek = new Date(point.date).getDay()
    buckets[dayNames[dayOfWeek]] += point.focusMinutes
  })

  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899']

  return dayNames.map((name, i) => ({
    name,
    value: buckets[name],
    fill: colors[i],
  }))
}
