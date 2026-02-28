"use client"
import FuzzyText from "@/stock/FuzzyText"
import { useTheme } from "next-themes"

export const Error = () => {
  const { resolvedTheme } = useTheme()
  return (
    <article className='h-screen bg-background flex items-center justify-center'>
      <FuzzyText 
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover
        fontSize={100}
        color={resolvedTheme === "dark" ? "white" : "black"}
      >
        404
      </FuzzyText>
    </article>
  )
}