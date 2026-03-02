"use client"
import React, { forwardRef, useRef } from "react"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { SiClaude } from "react-icons/si"
import { Lenix } from "@/lib/icons"

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  )
})

Circle.displayName = "Circle"

export function BeamToClaude() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative mx-auto flex-1/2 flex w-full max-w-4xl items-center justify-center overflow-hidden px-14"
      ref={containerRef}
    >
      <div className="flex w-full flex-col items-center justify-center gap-10">
        <div className="flex w-full flex-row items-center justify-between">
          <Circle ref={div1Ref} className="p-0">
            <Lenix className="text-black size-full" />
          </Circle>
          <Circle ref={div2Ref}>
            <SiClaude size={50} className="text-[#D97757]"/>
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        className="top-0 left-0"
        duration={3}
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
      />
    </div>
  )
}
