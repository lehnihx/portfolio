"use client"
import { TypingAnimation } from "@/components/ui/typing-animation"
import { useDict } from "@/hooks/useDict"
import { SparklesCore } from "@/components/ui/sparkles"
import { useTheme } from "next-themes"

export const Intro = () => {
  const { intro } = useDict()
  const { resolvedTheme } = useTheme()
  return (
    <article className="w-full h-full flex flex-col items-center justify-center gap-8 md:gap-12 px-4">
      {/* Text Section */}
      <div className="flex flex-col items-center justify-center w-full">
        <TypingAnimation
          as="div"
          words={intro}
          cursorStyle="line"
          typeSpeed={50}
          loop
          deleteSpeed={50}
          className="w-full max-w-4xl text-center text-fluid-2xl md:text-fluid-3xl leading-tight font-bold text-foreground"
        />
      </div>

      {/* Sparkles Section */}
      <div className="relative w-full max-w-2xl h-40 md:h-56">
        {/* Glow lines */}
        <div className="absolute inset-x-0 md:inset-x-20 top-0 h-1 bg-gradient-to-r from-transparent via-foreground to-transparent blur-sm" />
        <div className="absolute inset-x-0 md:inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-foreground to-transparent" />

        {/* Sparkles animation */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={300}
          className="w-full h-full"
          particleColor={resolvedTheme === "dark" ? "#ffffff" : "#000000"}
        />

        {/* Radial fade mask */}
        <div className="absolute inset-0 w-full h-full bg-background mask-[radial-gradient(ellipse_80%_60%_at_center,transparent_30%,white)]" />
      </div>
    </article>
  )
}
