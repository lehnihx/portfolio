"use client"
import { useDict } from "@/hooks/useDict"
import { Button } from "@/components/ui/button"
import { Route } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export const Nav = () => {
  const { home, about, timeline, contact } = useDict()
  const [state, setState] = useState(false)
  return (
    <>
      <Button {...{
        className: "z-10 text-foreground bg-transparent hover:bg-transparent hover:scale-140 absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2",
        onClick: () => setState(prev => !prev)
      }}>
        <Route/>
      </Button>
      {state && (
        <div className="fixed w-screen h-screen bg-foreground z-100">
          <Button {...{
            className: "hover:bg-transparent bg-transparent hover:scale-140 text-background absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2",
            onClick: () => setState(prev => !prev)
          }}>
            <Route/>
          </Button>
          <nav className="h-screen flex flex-col items-center justify-center text-background text-7xl [&>a]:cursor-default!">
            <Link href="#">{home}</Link>
            <Link href="#about">{about}</Link>
            <Link href="#timeline">{timeline}</Link>
            <Link href="#contact">{contact}</Link>
          </nav>
        </div>
      )}
    </>
  )
}