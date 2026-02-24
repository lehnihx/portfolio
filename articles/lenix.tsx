"use client"
import { SparklesCore } from "@/components/ui/sparkles"
import { useDict } from "@/hooks/useDict"
import { useTheme } from "next-themes"

export const Lenix = () => {
  const dict = useDict()
  const { resolvedTheme } = useTheme()
  return (
    <article>
      <div className="h-screen w-full bg-background flex flex-col items-center justify-center overflow-hidden rounded-md">
        <p className="w-full text-[39.5vw] font-bold leading-none whitespace-nowrap bg-linear-to-b from-foreground/50 to-background bg-clip-text text-transparent">
          {dict.lenix}
        </p>
        <div className="w-full h-40 relative">
          <div className="absolute inset-x-40 top-0 bg-linear-to-r from-transparent via-foreground to-transparent h-1.25 w-3/4 blur-sm" />
          <div className="absolute inset-x-40 top-0 bg-linear-to-r from-transparent via-foreground to-transparent h-px w-3/4" />

          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={2200}
            className="w-full h-full"
            particleColor={resolvedTheme === "dark" ? "#ffffff" : "#000000"}
          />

          <div className="absolute inset-0 w-full h-full bg-background mask-[radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
    </article>
  )
}