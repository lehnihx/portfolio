"use client"
import { Header } from "@/components/header"
import { useDict } from "@/hooks/useDict"
import { useIsInView } from "@/hooks/useIsInView"
import { ANIMATION } from "@/lib/utils"
import { motion } from "motion/react"

export const LOC = ({ children }: { children: React.ReactNode  }) => {
  const { ref, visible, height } = useIsInView()
  const { loc } = useDict()
  return (
    <div ref={ref} style={{ minHeight: height }} className="h-full">
      {visible && (
        <motion.div {...ANIMATION} className="flex h-full flex-col items-center justify-evenly">
          <Header left={loc[0]} center={loc[1]} right={loc[2]} />
          {children}
        </motion.div>
      )}
    </div>
  )
}