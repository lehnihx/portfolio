import { fade, STACK } from "@/lib/constants"
import { motion } from "motion/react"

export const Stack = () => (
  <motion.div {...fade(0.25)} className="mb-16">
    <p className="text-[11px] tracking-[3px] text-zinc-500 uppercase mb-5">Stack</p>
    <div className="flex flex-wrap gap-2">
      {STACK.map(tech => (
        <span key={tech} className="border border-zinc-800 text-zinc-400 text-[11px] tracking-wide px-3 py-1.5 rounded-md">
          {tech}
        </span>
      ))}
    </div>
  </motion.div>
)