"use client"
import { FlipWords } from "@/components/ui/flip-words"
import { useDict } from "@/hooks/useDict"
import { ANIMATION } from "@/lib/utils"
import { LayoutTextFlip } from "@/components/ui/layout-text-flip"
import { motion } from "motion/react"

export default function Experience() {
  const { services } = useDict()
  return (
    <motion.div {...ANIMATION} className="relative flex-1/3 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
      <LayoutTextFlip
        text="Did you know that Lenix is "
        words={["Web Developer", "FiveM Scripter"]}
        duration={3000}
      />
      <div style={{ fontSize: 'var(--font-size-fluid-xl)' }} className="transition duration-500 ease-in-out mx-auto font-normal dark:text-neutral-400">
        and he used to be<FlipWords words={services} />
      </div>
    </motion.div>
  )
}
