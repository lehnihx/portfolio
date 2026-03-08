"use client"
import { PointerHighlight } from "./ui/pointer-highlight"

export const Header = ({
  left, center, right,
}: { left: string, center: string, right?: string }) => (
  <h2 style={{ fontSize: "var(--font-size-fluid-2xl)" }} className="font-bold whitespace-nowrap flex justify-center">
    <span>{left} &nbsp;</span>
    <PointerHighlight pointerClassName="text-accent">{center}</PointerHighlight>
    {right && <span>&nbsp; {right}</span>}
  </h2>
)