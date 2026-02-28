"use client"
import { useIsInView } from "@/hooks/useIsInView"
import { Globe } from "@/components/ui/globe"
import { ANIMATION } from "@/lib/utils"
import { motion } from "motion/react"

export const Location = () => {
  const { ref, height, visible } = useIsInView()
  return (
    <motion.div {...ANIMATION} ref={ref} style={{ minHeight: height }} className="w-full">
      {visible && <Globe config={{
        width: 600,
        height: 600,
        onRender: () => {},
        devicePixelRatio: 2,
        phi: 3,
        theta: 0.3,
        dark: 0,
        diffuse: 0.4,
        mapSamples: 8000,
        mapBrightness: 1,
        baseColor: [1, 1, 1],
        markerColor: [0, 0, 0],
        glowColor: [1, 1, 1],
        markers: [{ location: [36, 3], size: 0.15 }],
      }}/>}
    </motion.div>
  )
}