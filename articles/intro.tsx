"use client"
import { TypingAnimation } from "@/components/ui/typing-animation"
import { useDict } from "@/hooks/useDict"
import { SparklesCore } from "@/components/ui/sparkles"
import { useTheme } from "next-themes"
import { motion } from "motion/react"
import { animate } from "motion/react"
import { ChevronDown } from "lucide-react"

export const Intro = () => {
  const { intro } = useDict()
  const { resolvedTheme } = useTheme()

  const scrollToAbout = () => {
    animate(window.scrollY, document.getElementById("about")?.offsetTop ?? 0, {
      duration: 2,
      ease: "easeInOut",
      onUpdate: v => window.scrollTo(0, v)
    })
  }

  return (
    <article className="absolute bottom-1/4 flex items-center gap-5 flex-col z-10">
      <div className="w-full h-40 relative">
        <TypingAnimation
          as="div"
          words={intro}
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
      <motion.button
          onClick={scrollToAbout}
          className="text-muted-foreground hover:text-foreground transition-colors mt-4"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-6" />
        </motion.button>
    </article>
  )
}