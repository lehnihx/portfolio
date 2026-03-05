"use client"
import { Insights } from "@/lib/insights"
import { useState, useCallback } from "react"
import { CartesianGrid, XAxis, YAxis, Tooltip, Line, LineChart, MouseHandlerDataParam, ReferenceArea, Legend } from "recharts"

type Commits = { name: number, commits: number }

type ZoomAndHighlightState = {
  left: string | number
  right: string | number
  refAreaLeft: string | number | undefined
  refAreaRight: string | number | undefined
  top: string | number
  bottom: string | number
  top2: string | number
  bottom2: string | number
  animation: boolean
}

const initialState: ZoomAndHighlightState = {
  left: 'dataMin',
  right: 'dataMax',
  refAreaLeft: undefined,
  refAreaRight: undefined,
  top: 'dataMax+1',
  bottom: 'dataMin-1',
  top2: 'dataMax+1',
  bottom2: 'dataMin-1',
  animation: true,
}

const getAxisYDomain = (
  commitsData: {
    name: number
    commits: number
    average: number
  }[] | undefined,
  from: string | number | undefined,
  to: string | number | undefined,
  ref: keyof Commits,
  offset: number,
): (number | string)[] => {
  if (commitsData && from != null && to != null) {
    const refData = commitsData.slice(Number(from) - 1, Number(to))
    let [bottom, top] = [refData[0][ref], refData[0][ref]]
    refData.forEach(d => {
      if (d[ref] > top) top = d[ref]
      if (d[ref] < bottom) bottom = d[ref]
    })

    return [(bottom | 0) - offset, (top | 0) + offset]
  }
  return [initialState.bottom, initialState.top]
}

const HighlightAndZoomLineChart = ({ insights }: { insights: Insights }) => {
  const [zoomGraph, setZoomGraph] = useState<ZoomAndHighlightState>(initialState)
  const { refAreaLeft, refAreaRight, left, right, top, bottom, top2, bottom2 } = zoomGraph
  const grouped = Object.groupBy(
    (insights.commits ?? []).filter((d): d is string => d !== undefined),
    date => date
  )
  const sorted = Object.entries(grouped).sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())

  const commitsData = sorted.map(([date, commits], index) => ({
    name: index + 1,
    day: date,
    commits: commits?.length ?? 0,
    average: Math.round(sorted.slice(0, index + 1).reduce((acc, [, c]) => acc + (c?.length ?? 0), 0) / (index + 1))
  }))

  const zoom = useCallback(() => {
    setZoomGraph((prev: ZoomAndHighlightState): ZoomAndHighlightState => {
      let { refAreaLeft, refAreaRight } = prev

      if (refAreaLeft === refAreaRight || refAreaRight === '') {
        return {
          ...prev,
          refAreaLeft: undefined,
          refAreaRight: undefined,
        }
      }

      if (refAreaLeft && refAreaRight && refAreaLeft > refAreaRight)
        [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft]

      const [bottom2, top2] = getAxisYDomain(commitsData, refAreaLeft, refAreaRight, 'commits', 1)

      return {
        ...prev,
        refAreaLeft: undefined,
        refAreaRight: undefined,
        left: refAreaLeft ?? initialState.left,
        right: refAreaRight ?? initialState.right,
        bottom,
        top,
        bottom2,
        top2,
      }
    })
  }, [setZoomGraph])

  const zoomOut = useCallback(() => {
    setZoomGraph(initialState)
  }, [setZoomGraph])

  const onMouseDown = useCallback(
    (e: MouseHandlerDataParam) => {
      setZoomGraph((prev: ZoomAndHighlightState): ZoomAndHighlightState => ({ ...prev, refAreaLeft: e.activeLabel }))
    },
    [setZoomGraph],
  )

  const onMouseMove = useCallback(
    (e: MouseHandlerDataParam) => {
      setZoomGraph(prev => {
        if (prev.refAreaLeft) {
          return { ...prev, refAreaRight: e.activeLabel }
        }
        return prev
      })
    },
    [setZoomGraph],
  )

  return (
    <div style={{ userSelect: 'none', width: '100%' }}>
      <button type="button" className="mb-4 px-3 py-1 border border-border rounded-md text-sm text-foreground" onClick={zoomOut}>
        Zoom Out
      </button>

      <LineChart className="w-full h-full" style={{ aspectRatio: 1.618 }} responsive data={commitsData} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={zoom} >
        <Line yAxisId="2" type="natural" dataKey="average" stroke="var(--chart-1)" strokeDasharray="3 3" dot={false} animationDuration={300} />
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis allowDataOverflow dataKey="name" domain={[left, right]} type="number" stroke="var(--muted-foreground)" />
        <YAxis allowDataOverflow domain={[bottom, top]} type="number" yAxisId="1" width="auto" stroke="var(--muted-foreground)" />
        <YAxis orientation="right" allowDataOverflow domain={[bottom2, top2]} type="number" yAxisId="2" width="auto" stroke="var(--muted-foreground)"/>
        <Tooltip
          labelFormatter={(label) => commitsData[label - 1]?.day ?? label}
          cursor={{ stroke: 'var(--border)' }}
          contentStyle={{ backgroundColor: 'var(--popover)', borderColor: 'var(--border)' }}
        />
        <Line yAxisId="2" type="natural" dataKey="commits" stroke="var(--chart-2)" animationDuration={300} dot={{ fill: 'var(--background)' }} activeDot={{ stroke: 'var(--background)' }}/>

        {refAreaLeft && refAreaRight && (
          <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} stroke="var(--foreground)" fill="var(--muted)"/>
        )}
        <Legend verticalAlign="bottom" />
      </LineChart>
    </div>
  )
}

export const Stats = ({ insights }: { insights: Insights }) => (
  <>
    <HighlightAndZoomLineChart insights={insights} />
  </>
)