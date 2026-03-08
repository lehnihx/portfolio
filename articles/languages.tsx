"use client"
import { Header } from "@/components/header"
import { useDict } from "@/hooks/useDict"
import { useIsInView } from "@/hooks/useIsInView"
import { Languages } from "@/lib/types"
import { ANIMATION } from "@/lib/utils"
import { motion } from "motion/react"
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Bar, Tooltip, BarChart } from "recharts"

export const LanguagesChart = ({ languages }: { languages: Languages | undefined }) => {
  const { ref, visible, height } = useIsInView()
  const { languages: lang } = useDict()
  return (
    <div ref={ref} style={{ minHeight: height }} className="portrait:w-full landscape:w-1/2">
      {visible && (
        <motion.div {...ANIMATION} className="mx-10 flex flex-col items-center justify-evenly">
          <Header left={lang[0]} center={lang[1]} right={lang[2]} />
          <ResponsiveContainer width="100%" height={"50%"}>
            <BarChart data={languages} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" tickFormatter={v => `${v} bytes`} stroke="var(--muted-foreground)" axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" stroke="var(--muted-foreground)" axisLine={false} tickLine={false} width={80} />
              <Tooltip formatter={(v: number | undefined) => v ? `${v} bytes` : ''} contentStyle={{ backgroundColor: 'var(--popover)', borderColor: 'var(--border)' }} />
              <Bar dataKey="bytes" fill="var(--foreground)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </div>
  )
}