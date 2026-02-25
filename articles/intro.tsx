"use client"
import { TypingAnimation } from "@/components/ui/typing-animation"
import { useDict } from "@/hooks/useDict"

export const Intro = () => {
  const dict = useDict()
  return (
    <>
      <TypingAnimation
        words={[dict.introA, dict.introB]}
        cursorStyle="line"
        typeSpeed={50}
        loop
        deleteSpeed={50}
        className="text-4xl font-bold z-10 "
      />
    </>
  )
}