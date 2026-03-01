"use client"
import { TypingAnimation } from "@/components/ui/typing-animation"
import { useDict } from "@/hooks/useDict"
import { SparklesCore } from "@/components/ui/sparkles"
import { useTheme } from "next-themes"

export const Intro = () => {
  const dict = useDict()
  const { resolvedTheme } = useTheme()
  return (
    <div className="h-full w-full relative flex items-center justify-center">
      <div className="absolute bottom-1/4 flex items-center gap-5 flex-col z-10">
        <TypingAnimation
          as="div"
          words={dict.intro}
          cursorStyle="line"
          typeSpeed={50}
          loop
          deleteSpeed={50}
          className="w-full max-w-4xl mx-auto px-4 text-center text-fluid-sm leading-none font-bold"
        />
        <div className="w-full h-40 relative">
          <div className="absolute inset-x-40 portrait:inset-x-12.5 top-0 bg-linear-to-r from-transparent via-foreground to-transparent h-1.25 w-3/4 blur-sm" />
          <div className="absolute inset-x-40 portrait:inset-x-12.5 top-0 bg-linear-to-r from-transparent via-foreground to-transparent h-px w-3/4" />

          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={300}
            className="w-full h-full"
            particleColor={resolvedTheme === "dark" ? "#ffffff" : "#000000"}
          />
          <div className="absolute inset-0 w-full h-full bg-background mask-[radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
    </div>
  )
}
