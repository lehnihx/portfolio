"use client"
import { useDict } from "@/hooks/useDict"
import { Clock } from "./clock"
import { useIsInView } from "@/hooks/useIsInView"
import { ANIMATION } from "@/lib/utils"
import { motion } from "motion/react"
import { Preferences } from "./preferences"

export const Accessibility = () => {
  const { ref, height, visible } = useIsInView()
  const dict = useDict()

  return (
    <div ref={ref} style={{ minHeight: height }}>
      {visible && <motion.div {...ANIMATION} className="my-16 flex items-center justify-evenly portrait:flex-col-reverse portrait:gap-5">
        <p className="text-center flex-1/3 text-ring text-xs">© {new Date().getFullYear()} {dict.lenix}. {dict.rights}.</p>
        <Clock />
        <Preferences/>
      </motion.div>}
    </div>
  )
}