"use client"
import { Header } from "@/components/header"
import { SkeletonLOC } from "@/components/skeletons/loc"
import { SuspenseLangs } from "@/components/suspense/languages"
import { useDict } from "@/hooks/useDict"
import { useIsInView } from "@/hooks/useIsInView"
import { ANIMATION } from "@/lib/utils"
import { motion } from "motion/react"
import { Suspense } from "react"
import { ResponsiveContainer } from "recharts"

export const LanguagesChart = () => {
  const { ref, visible, height } = useIsInView()
  const { languages: lang } = useDict()
  return (
    <div ref={ref} style={{ minHeight: height }} className="h-full w-1/2 portrait:w-full">
      {visible && (
        <motion.div {...ANIMATION} className="flex h-full flex-col items-center justify-evenly w-full">
          <Header left={lang[0]} center={lang[1]} right={lang[2]} />
          <ResponsiveContainer width="90%" height="50%">
            <Suspense fallback={<SkeletonLOC />}>
              <SuspenseLangs />
            </Suspense>
          </ResponsiveContainer>
        </motion.div>
      )}
    </div>
  )
}
