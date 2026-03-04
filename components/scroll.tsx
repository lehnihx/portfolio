"use client"
import Lenis from "lenis"
import { useEffect } from "react"

export const SlowScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({ duration: 6 })
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return <>{children}</>
}