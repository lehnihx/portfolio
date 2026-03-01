"use client"
import { FlipWords } from "@/components/ui/flip-words"
import { useDict } from "@/hooks/useDict"
import { ANIMATION } from "@/lib/utils"
import { motion } from "motion/react"
import RotatingText from "@/stock/RotatingText"

export default function Experience() {
  const { services, experiences, did_u_know, used_to_provide, service } = useDict()
  return (
    <motion.div {...ANIMATION} className="relative flex-1/3 text-center sm:mx-0 sm:mb-0">
      <span style={{ fontSize: 'var(--font-size-fluid-lg)' }} className="flex">
        {did_u_know}&nbsp;<strong><RotatingText texts={experiences}/></strong>&nbsp;{used_to_provide}<strong><FlipWords words={services} /></strong>{service}
      </span>
    </motion.div>
  )
}