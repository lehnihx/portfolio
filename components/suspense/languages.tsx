import { cache } from "@/lib/cache"
import { CartesianGrid, XAxis, YAxis, Bar, BarChart, Tooltip } from "recharts"

export const SuspenseLangs = async () => {
  const insights = await cache.insights()
  return (
    <BarChart data={insights.langsBytes ?? []} layout="vertical">
      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
      <XAxis type="number" tickFormatter={v => `${v} bytes`} stroke="var(--muted-foreground)" axisLine={false} tickLine={false} />
      <YAxis type="category" dataKey="name" stroke="var(--muted-foreground)" axisLine={false} tickLine={false} width={80} />
      <Tooltip formatter={(v: number | undefined) => v ? `${v} bytes` : ''} contentStyle={{ backgroundColor: 'var(--popover)', borderColor: 'var(--border)' }} />
      <Bar dataKey="bytes" fill="var(--foreground)" radius={[0, 4, 4, 0]} />
    </BarChart>
  )
}