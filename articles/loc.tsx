"use client"
import { Header } from "@/components/header"
import { NumberTicker } from "@/components/ui/number-ticker"
import { useDict } from "@/hooks/useDict"
import { useIsInView } from "@/hooks/useIsInView"
import { Insights } from "@/lib/types"
import { ANIMATION } from "@/lib/utils"
import { motion } from "motion/react"

export const LOC = ({ insights }: Insights) => {
  const { ref, visible, height } = useIsInView()
  const { loc } = useDict()
  return (
    <div ref={ref} style={{ minHeight: height }} className="h-full">
      {visible && (
        <motion.div {...ANIMATION} className="flex h-full flex-col items-center justify-evenly">
          <Header left={loc[0]} center={loc[1]} right={loc[2]} />
          <NumberTicker value={insights.loc || 0} className="text-8xl font-medium tracking-tighter whitespace-pre-wrap text-foreground" />
        </motion.div>
      )}
    </div>
  )
} 