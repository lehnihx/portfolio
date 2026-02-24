"use client"

import AuroraBackgroundDemo from "@/components/aurora-background-demo"
import { BackgroundRippleEffectDemo } from "@/components/background-ripple-effect-demo"
import { AnimatedBeamDemo } from "@/components/beam"
import FlipWordsDemo from "@/components/flip-words-demo"
import PlaceholdersAndVanishInputDemo from "@/components/placeholders-and-vanish-input-demo"
import { TextEffectWithExit } from "@/components/textEffectWithExit"
import { TypingAnimation } from "@/components/ui/typing-animation"
import { useDict } from "@/lib/dict"

const Hero = () => {
  const Dict = useDict()
  return (
    <section id="hero" className="h-screen text-foreground flex flex-col items-center justify-center text-3xl">
      <TypingAnimation
        words={[Dict.introA, Dict.introB]}
        cursorStyle="line"
        typeSpeed={50}
        loop
        deleteSpeed={50}
        className="text-4xl font-bold"
      />
      {/* <h2>{Dict.intro}</h2> */}
      {/* <TextEffectWithExit>{Dict.intro}</TextEffectWithExit> */}
      <FlipWordsDemo/>
      <BackgroundRippleEffectDemo/>
      {/* <AnimatedBeamDemo/> */}
      {/* <AuroraBackgroundDemo/> */}
    </section>
  )
}

export { Hero }