"use client"
import ClickSpark from "@/stock/ClickSpark"
import { useTheme } from "next-themes"

export const ClickProvider = ({ children }: { children: Readonly<React.ReactNode> }) => {
  const { resolvedTheme } = useTheme()
  return (
    <ClickSpark
      sparkColor={resolvedTheme === "dark" ? "white" : "black"}
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={1000}
    >
      {children}
    </ClickSpark>
  )
}