"use client"
import React, { forwardRef, useRef } from "react"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/animated-beam"
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
      className="relative flex w-full max-w-[500px] items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex size-full flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row justify-between">
          <Circle ref={div1Ref} className="p-0">
            <Lenix className="text-black size-full" />
          </Circle>
          <Circle ref={div2Ref}>
            <SiClaude size={50} className="text-[#D97757]"/>
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        gradientStartColor="var(--foreground)"
        gradientStopColor="var(--foreground)"
        duration={3}
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
      />
    </div>
  )
}