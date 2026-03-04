"use client"
import { Insights } from "@/lib/insights"
import { useState, useCallback } from "react"
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Line, LineChart, MouseHandlerDataParam, ReferenceArea, ResponsiveContainer } from "recharts"

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
  top2: 'dataMax+20',
  bottom2: 'dataMin-20',
  animation: true,
}

const getAxisYDomain = (
  commitsData: {
    name: number
    commits: number
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
  const grouped = Object.groupBy(
    (insights.commits ?? []).filter((d): d is string => d !== undefined),
    date => date
  )
  const commitsData = Object.entries(grouped).map(([, commits], index) => ({
    name: index + 1,
    commits: commits?.length ?? 0
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

      // const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'cost', 1)
      const [bottom2, top2] = getAxisYDomain(commitsData, refAreaLeft, refAreaRight, 'commits', 50)

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

  const { refAreaLeft, refAreaRight, left, right, top, bottom, top2, bottom2 } = zoomGraph

  return (
    <div style={{ userSelect: 'none', width: '100%' }}>
      <button type="button" className="mb-4 px-3 py-1 border border-border rounded-md text-sm text-foreground" onClick={zoomOut}>
        Zoom Out
      </button>

      <LineChart style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }} responsive data={commitsData} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={zoom} >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis allowDataOverflow dataKey="name" domain={[left, right]} type="number" stroke="var(--muted-foreground)" />
        <YAxis allowDataOverflow domain={[bottom, top]} type="number" yAxisId="1" width="auto" stroke="var(--muted-foreground)" />
        <YAxis orientation="right" allowDataOverflow domain={[bottom2, top2]} type="number" yAxisId="2" width="auto" stroke="var(--muted-foreground)"/>
        <Tooltip
          cursor={{ stroke: 'var(--border)' }}
          contentStyle={{ backgroundColor: 'var(--popover)', borderColor: 'var(--border)' }}
        />
        {/* <Line yAxisId="1" type="natural" dataKey="cost" stroke="var(--chart-1)" animationDuration={300} dot={{ fill: 'var(--background)' }} activeDot={{ stroke: 'var(--background)' }}/> */}
        <Line yAxisId="2" type="natural" dataKey="commits" stroke="var(--chart-2)" animationDuration={300} dot={{ fill: 'var(--background)' }} activeDot={{ stroke: 'var(--background)' }}/>

        {refAreaLeft && refAreaRight && (
          <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} stroke="var(--border)" fill="var(--muted)"/>
        )}
      </LineChart>
    </div>
  )
}

export const Stats = ({ insights }: { insights: Insights }) => (
  <>
    <HighlightAndZoomLineChart insights={insights} />
    <Demo />
  </>
)


const data = [
  { name: "Product A", uv: 4000, pv: 2400 },
  { name: "Product B", uv: 3000, pv: 1398 },
  { name: "Product C", uv: -1000, pv: 9800 },
  { name: "Product D", uv: 500, pv: 3908 },
  { name: "Product E", uv: -2000, pv: 4800 },
  { name: "Product F", uv: -250, pv: 3800 },
  { name: "Product G", uv: 3490, pv: 4300 },
]

const offset = (() => {
  const max = Math.max(...data.map(i => i.uv))
  const min = Math.min(...data.map(i => i.uv))
  if (max <= 0) return 0
  if (min >= 0) return 1
  return max / (max - min)
})()

const Demo = () => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="uv-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset={offset} stopColor="#0d9488" stopOpacity={1} />
          <stop offset={offset} stopColor="#ef4444" stopOpacity={1} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" tickFormatter={v => v.replace("Product ", "")} axisLine={false} tickLine={false} />
      <YAxis axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
      <Tooltip />
      <Area type="monotone" dataKey="uv" fill="url(#uv-gradient)" fillOpacity={0.2} stroke="#6b7280" isAnimationActive={false} />
    </AreaChart>
  </ResponsiveContainer>
)