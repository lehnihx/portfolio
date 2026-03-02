"use client"
import { FlipWords } from "@/components/ui/flip-words"
import { useDict } from "@/hooks/useDict"
import { ANIMATION } from "@/lib/utils"
import { motion } from "motion/react"
import RotatingText from "@/components/ui/RotatingText"

export default function Experience() {
  const { services, experiences, did_u_know, used_to_provide, service } = useDict()
  return (
    <motion.article {...ANIMATION} className="relative w-full max-w-full overflow-hidden text-center p-6">
      <span className="inline leading-relaxed" style={{ fontSize: "var(--font-size-fluid-base)" }}>
        {did_u_know}{" "}
        <strong>
          <RotatingText
            texts={experiences}
            mainClassName="inline-flex flex-wrap whitespace-normal align-baseline"
          />
        </strong>
        {" "}{used_to_provide}{" "}
        <strong>
          <FlipWords words={services} className="px-0" />
        </strong>
        {" "}{service}
      </span>
    </motion.article>
  )
}