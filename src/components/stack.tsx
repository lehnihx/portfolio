import { ECO_SYSTEMS, fade, STACK } from "@/lib/constants"
import { motion } from "motion/react"

export const Stack = () => (
  <div className="flex flex-col gap-4">
    <motion.div {...fade(0.25)} className="flex flex-col items-center">
      <p className="text-[11px] tracking-[3px] text-zinc-500 uppercase mb-5">Stack</p>
      <div className="flex flex-wrap gap-2">
        {STACK.map(tech => (
          <span key={tech} className="border border-zinc-800 text-zinc-400 text-[11px] tracking-wide px-3 py-1.5 rounded-md">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
    <motion.div {...fade(0.25)} className="flex flex-col items-center">
      <p className="text-[11px] tracking-[3px] text-zinc-500 uppercase mb-5">Ecosystem</p>
      <div className="flex flex-wrap gap-2">
        {ECO_SYSTEMS.map(eco => (
          <span key={eco} className="border border-zinc-800 text-zinc-400 text-[11px] tracking-wide px-3 py-1.5 rounded-md">
            {eco}
          </span>
        ))}
      </div>
    </motion.div>
  </div>
)