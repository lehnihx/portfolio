import { fade } from "@/lib/constants"
import { motion } from "motion/react"
import { Referrals } from "./referrals"

export const Hero = () => (
  <motion.div {...fade(0)} className="mb-16 flex flex-col gap-2">
    <p className="text-[11px] tracking-[3px] text-zinc-500 uppercase mb-5">
      Full Stack Developer - Senior FiveM Scripting Engineer
    </p>
    <h1 className="text-5xl font-semibold tracking-tight text-white mb-3">
      Lenix
    </h1>
    <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
      Self-taught developer. Started with Lua scripting,
      moved into TypeScript, React, Rust and systems programming.
      Building real products — desktop apps, web platforms, dev tools.
    </p>
    <p>
      Full Stack Is Just Where I Started
      Going From Pixels To Silicon
      I Build The Tools Others Build With
      The Stack Was Never The Destination
      I Write Code That Writes Code

      'College is one path, but not the only one ;)'
      'Show, don't tell'
      'Your portfolio speaks louder than your diploma'
      'The best teacher is doing'
      'Certifications prove you passed a test, projects prove you can build'
      'It's not about where you start, it's where you finish'
      'Skills pay the bills, not degrees'
      'Backend engineering is easy only at the beginning'
      'Focus on what you can do, not what paper says you can do'

      Rockstar Filming
      Trailer & Journey Production
      Scenarios Video Editing
      Tailored Scripts Programming
      FiveM Servers Consultation
      Problem Solving
      End-to-end FiveM Server Building
    </p>
    {/* <Referrals /> */}
  </motion.div>
)