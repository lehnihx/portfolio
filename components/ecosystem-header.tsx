"use client"
import { useDict } from "@/hooks/useDict";
import { PointerHighlight } from "./ui/pointer-highlight";

export const EcosystemHeader = () => {
  const { lenixs, ecosystem } = useDict()
  return (
    <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }} className="font-bold whitespace-nowrap flex justify-center">
      <span>{lenixs} &nbsp;</span>
      <PointerHighlight duration={2} pointerClassName="text-accent">{ecosystem}</PointerHighlight>
    </h2>
  )
}