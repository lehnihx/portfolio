"use client"
import { motion } from "motion/react"
import { PointerHighlight } from "./ui/pointer-highlight"
import { ANIMATION } from "@/lib/utils"
import { useIsInView } from "@/hooks/useIsInView"

export const Header = ({
  left, center, right,
}: { left: string, center: string, right?: string }) => {
  const {ref, visible, height } = useIsInView()
    return (
      <div ref={ref} style={{ minHeight: height }}>
        {visible && (
          <motion.h2 {...ANIMATION} style={{ fontSize: "var(--font-size-fluid-2xl)" }} className="whitespace-pre-wrap">
            <div className="font-bold flex flex-wrap justify-center text-center gap-x-1">
              <span>{left} &nbsp;</span>
              <PointerHighlight pointerClassName="text-accent">{center}</PointerHighlight>
              {right && <span>&nbsp;{right}</span>}
            </div>
          </motion.h2>
        )}
      </div>
    )
  }
