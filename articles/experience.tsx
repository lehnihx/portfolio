"use client"
import { ANIMATION } from "@/lib/utils"
import { LayoutTextFlip } from "@/stock/ui/layout-text-flip"
import { motion } from "motion/react"

export default function Experience() {
  return (
    <motion.div {...ANIMATION} className="relative flex-1/4 mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
      <LayoutTextFlip
        text="Did you know that Lenix is "
        words={["Web Developer", "FiveM Scripter"]}
        duration={6000}
      />
    </motion.div>
  )
}
