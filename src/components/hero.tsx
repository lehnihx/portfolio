import { fade } from "@/constants"
import { motion } from "motion/react"

export const Hero = () => (
  <motion.div {...fade(0)} className="mb-16 flex flex-col gap-2">
    <p className="text-[11px] tracking-[3px] text-zinc-500 uppercase mb-5">
      Full Stack Developer
    </p>
    <h1 className="text-5xl font-semibold tracking-tight text-white mb-3">
      Lenix
    </h1>
    <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
      Self-taught developer from Algeria. Started with Lua scripting,
      moved into TypeScript, React, Rust and systems programming.
      Building real products — desktop apps, web platforms, dev tools.
    </p>
  </motion.div>
)