"use client"
import { Header } from "@/components/header"
import { SkeletonLOC } from "@/components/skeletons/loc"
import { SuspenseLOC } from "@/components/suspense/loc"
import { useDict } from "@/hooks/useDict"
import { useIsInView } from "@/hooks/useIsInView"
import { ANIMATION } from "@/lib/utils"
import { motion } from "motion/react"
import { Suspense } from "react"

export const LOC = () => {
  const { ref, visible, height } = useIsInView()
  const { loc } = useDict()
  return (
    <div ref={ref} style={{ minHeight: height }} className="h-full">
      {visible && (
        <motion.div {...ANIMATION} className="flex h-full flex-col items-center justify-evenly">
          <Header left={loc[0]} center={loc[1]} right={loc[2]} />
          <Suspense fallback={<SkeletonLOC />}>
            <SuspenseLOC />
          </Suspense>
        </motion.div>
      )}
    </div>
  )
}