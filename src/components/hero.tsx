import { EXPERIENCE, fade, INTRO } from "@/lib/constants"
import { motion } from "motion/react"
import RotatingText from "./ui/swap"
import { Quotes } from "./articles/quote"
import { TypingAnimation } from "./ui/typing"
// import { Referrals } from "./referrals"

export const Hero = () => (
  <motion.div {...fade(0)} className="mb-16 flex flex-col gap-2">
    <p className="text-[11px] tracking-[3px] text-zinc-500 uppercase mb-5">
      Full Stack Developer - Senior FiveM Scripting Engineer
    </p>
    <h1 className="text-5xl font-semibold tracking-tight text-white mb-3">
      Lenix
    </h1>
    <div className="h-10">
      <TypingAnimation
        as="div"
        words={INTRO}
        cursorStyle="line"
        typeSpeed={50}
        loop
        deleteSpeed={10}
        className="w-full max-w-4xl mx-auto px-4 text-left text-sm text-zinc-400 leading-relaxed"
      />
    </div>
    <div className="text-zinc-500">
      <span>I used to do </span>
      <RotatingText
        texts={EXPERIENCE}
        mainClassName="inline-flex flex-wrap whitespace-normal align-baseline"
      />
    </div>
    <div className="h-10">
      <Quotes />
    </div>
    {/* <Referrals /> */}
  </motion.div>
)