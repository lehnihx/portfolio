import { commitsData, fade } from "@/lib/constants"
import { motion } from "motion/react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

export const Commits = () => (
  <motion.div {...fade(0.15)} className="mb-16">
    <div className="flex items-center justify-between mb-5">
      <p className="text-[11px] tracking-[3px] text-zinc-500 uppercase">Commit Activity</p>
      <p className="text-[11px] text-zinc-600">last 12 months</p>
    </div>
    <div className="border border-zinc-800 rounded-lg p-4">
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={commitsData}>
          <XAxis dataKey="date" hide />
          <Tooltip
            contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 6, fontSize: 11, padding: '6px 10px' }}
            labelStyle={{ color: '#71717a', marginBottom: 2 }}
            itemStyle={{ color: '#f4f4f5' }}
            cursor={{ stroke: '#3f3f46' }}
          />
          <Line type="monotone" dataKey="count" stroke="#71717a" strokeWidth={1.5} dot={false} activeDot={{ r: 3, fill: '#a1a1aa' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
)