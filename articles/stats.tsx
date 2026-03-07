"use client"
import { NumberTicker } from "@/components/ui/number-ticker"
import { Insights } from "@/lib/insights"
import { Languages } from "@/lib/types"
import { useState, useCallback, useMemo } from "react"
import { CartesianGrid, XAxis, YAxis, Tooltip, Line, LineChart, ReferenceArea, Legend, BarChart, ResponsiveContainer, Bar } from "recharts"

type ZoomState = {
  left: string | number
  right: string | number
  refAreaLeft: string | number | undefined
  refAreaRight: string | number | undefined
  top: string | number
  bottom: string | number
}

const initialState: ZoomState = {
  left: 'dataMin',
  right: 'dataMax',
  refAreaLeft: undefined,
  refAreaRight: undefined,
  top: 'dataMax+1',
  bottom: 'dataMin-1',
}

const getAxisYDomain = (
  data: { name: number; commits: number; average: number }[],
  from: string | number | undefined,
  to: string | number | undefined,
  offset: number,
): [number | string, number | string] => {
  if (!data.length || from == null || to == null) return [initialState.bottom, initialState.top]
  const slice = data.slice(Number(from) - 1, Number(to))
  if (!slice.length) return [initialState.bottom, initialState.top]
  let bottom = Math.min(slice[0].commits, slice[0].average)
  let top = Math.max(slice[0].commits, slice[0].average)
  for (const d of slice) {
    const lo = Math.min(d.commits, d.average)
    const hi = Math.max(d.commits, d.average)
    if (hi > top) top = hi
    if (lo < bottom) bottom = lo
  }
  return [(bottom | 0) - offset, (top | 0) + offset]
}

const HighlightAndZoomLineChart = ({ insights }: { insights: Insights }) => {
  const [zoom, setZoom] = useState<ZoomState>(initialState)

  const commitsData = useMemo(() => {
    const valid = (insights.commits ?? []).filter((d): d is string => d !== undefined)
    const grouped = Object.groupBy(valid, d => d)
    const sorted = Object.entries(grouped).sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    return sorted.map(([date, commits], index) => ({
      name: index + 1,
      day: date,
      commits: commits?.length ?? 0,
      average: Math.round(
        sorted.slice(0, index + 1).reduce((acc, [, c]) => acc + (c?.length ?? 0), 0) / (index + 1)
      ),
    }))
  }, [insights.commits])

  const handleZoomOut = useCallback(() => setZoom(initialState), [])

  const handleMouseDown = useCallback((e: { activeLabel?: string | number }) => {
    if (!e.activeLabel) return
    setZoom(prev => ({ ...prev, refAreaLeft: e.activeLabel }))
  }, [])

  const handleMouseMove = useCallback((e: { activeLabel?: string | number }) => {
    setZoom(prev => {
      if (!prev.refAreaLeft || !e.activeLabel) return prev
      return { ...prev, refAreaRight: e.activeLabel }
    })
  }, [])

  const handleMouseUp = useCallback(() => {
    setZoom(prev => {
      let { refAreaLeft, refAreaRight } = prev
      if (refAreaLeft == null || refAreaRight == null || refAreaLeft === refAreaRight)
        return { ...prev, refAreaLeft: undefined, refAreaRight: undefined }

      if (refAreaLeft > refAreaRight)
        [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft]

      const [bottom, top] = getAxisYDomain(commitsData, refAreaLeft, refAreaRight, 1)

      return {
        ...prev,
        refAreaLeft: undefined,
        refAreaRight: undefined,
        left: refAreaLeft,
        right: refAreaRight,
        bottom,
        top,
      }
    })
  }, [commitsData])

  const { left, right, top, bottom, refAreaLeft, refAreaRight } = zoom

  return (
    <div style={{ userSelect: 'none', width: '50%' }}>
      <button type="button" className="mb-4 px-3 py-1 border border-border rounded-md text-sm text-foreground" onClick={handleZoomOut}>
        Zoom Out
      </button>
      <h2>Total commits: {insights.commits.length}</h2>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={commitsData}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis allowDataOverflow dataKey="name" domain={[left, right]} type="number" stroke="var(--muted-foreground)" />
          <YAxis allowDataOverflow domain={[bottom, top]} type="number" yAxisId="1" width={40} stroke="var(--muted-foreground)" />
          <Tooltip
            labelFormatter={label => commitsData[Number(label) - 1]?.day ?? label}
            cursor={{ stroke: 'var(--border)' }}
            contentStyle={{ backgroundColor: 'var(--popover)', borderColor: 'var(--border)' }}
          />
          <Legend verticalAlign="bottom" />
          <Line yAxisId="1" type="monotone" dataKey="commits" stroke="var(--chart-2)" animationDuration={300} dot={{ fill: 'var(--background)' }} activeDot={{ stroke: 'var(--background)' }} />
          <Line yAxisId="1" type="monotone" dataKey="average" stroke="var(--chart-1)" strokeDasharray="3 3" dot={false} animationDuration={300} />
          {refAreaLeft != null && refAreaRight != null && (
            <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} stroke="var(--border)" fill="var(--muted)" fillOpacity={0.25} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const LanguagesChart = ({ languages }: { languages: Languages | undefined }) => (
  <ResponsiveContainer width="50%" height={500}>
    <BarChart data={languages} layout="vertical">
      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
      <XAxis type="number" tickFormatter={v => `${v}b`} stroke="var(--muted-foreground)" axisLine={false} tickLine={false} />
      <YAxis type="category" dataKey="name" stroke="var(--muted-foreground)" axisLine={false} tickLine={false} width={80} />
      <Tooltip formatter={(v: number | undefined) => v ? `${v} bytes` : ''} contentStyle={{ backgroundColor: 'var(--popover)', borderColor: 'var(--border)' }} />
      <Bar dataKey="bytes" fill="var(--foreground)" radius={[0, 4, 4, 0]} />
    </BarChart>
  </ResponsiveContainer>
)

export const Stats = ({ insights }: { insights: Insights }) => (
  <div className="w-full flex flex-col items-center justify-center gap-4">
    <h2>Lines of code written so far</h2>
    <NumberTicker value={insights.loc || 0} className="text-8xl font-medium tracking-tighter whitespace-pre-wrap text-foreground" />
    <HighlightAndZoomLineChart insights={insights} />
    <LanguagesChart languages={insights.langsBytes} />
  </div>
)