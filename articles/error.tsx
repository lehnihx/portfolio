"use client"
import FuzzyText from "@/components/ui/FuzzyText"
import Noise from "@/components/ui/Noise"
import { useTheme } from "next-themes"

export const Error = ({ children }: { children: string }) => {
  const { resolvedTheme } = useTheme()
  return (
    <article className='h-screen bg-background flex items-center justify-center'>
      <Noise/>
      <FuzzyText 
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover
        fontSize={100}
        color={resolvedTheme === "dark" ? "white" : "black"}
      >
        {children}
      </FuzzyText>
    </article>
  )
}