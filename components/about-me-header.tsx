"use client"
import { useDict } from "@/hooks/useDict"
import { PointerHighlight } from "./ui/pointer-highlight"

export const AboutMeHeader = () => {
  const { get_to_know_more, about_lenix } = useDict()
  return (
    <h2 style={{ fontSize: "var(--font-size-fluid-xl)" }} className="font-bold whitespace-nowrap flex">
      <span>{get_to_know_more} &nbsp;</span>
      <PointerHighlight pointerClassName="text-accent">{about_lenix}</PointerHighlight>
    </h2>
  )
}