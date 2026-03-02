"use client"
import { useIsInView } from "@/hooks/useIsInView"
import { Globe } from "@/components/ui/globe"
import { ANIMATION } from "@/lib/utils"
import { motion } from "motion/react"
import { useTheme } from "next-themes"
import { BackgroundDottedMap } from "../components/ui/map"

export const Location = () => {
  const { ref, height, visible } = useIsInView()
  const { resolvedTheme } = useTheme()
  const [dark, baseColor, markerColor, glowColor]: [number, ...[number, number, number][]] = resolvedTheme === "dark"
  ? [1, [1, 1, 1], [1, 1, 1], [0, 0, 0]]
  : [0, [1, 1, 1], [0, 0, 0], [1, 1, 1]]
  return (
    <article ref={ref} style={{ minHeight: height }}>
      {visible && <motion.div {...ANIMATION} className="w-full">
        <BackgroundDottedMap>
          <Globe config={{
            width: 600,
            height: 600,
            onRender: () => {},
            devicePixelRatio: 2,
            phi: 3,
            theta: 0.3,
            diffuse: 3,
            mapSamples: 8000,
            mapBrightness: 2,
            dark,
            baseColor,
            markerColor,
            glowColor,
            markers: [{ location: [36, 3], size: 0.15 }],
          }}/>
        </BackgroundDottedMap>
      </motion.div>}
    </article>
  )
}