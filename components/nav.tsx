"use client"

import { Button } from "./ui/button"
import { Expand, X } from "lucide-react"
import { useDict } from "@/lib/dict"
import { useState } from "react"

const Nav = () => {
  const Dict = useDict()
  const [states, setStates] = useState({ nav: false })
  return (
    <>
      <Button {...{
        className: "text-foreground bg-transparent hover:bg-transparent hover:scale-140 absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2",
        onClick: () => setStates(prev => ({ ...prev, nav: !prev.nav }))
      }}>
        <Expand/>
      </Button>
      {states.nav && (
        <header className="fixed w-screen h-screen bg-background z-50">
          <Button {...{
            className: "hover:bg-transparent bg-transparent hover:scale-140 text-foreground absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2",
            onClick: () => setStates(prev => ({ ...prev, nav: !prev.nav }))
          }}>
            <X/>
          </Button>
          <nav className="h-screen flex flex-col items-center justify-center text-foreground text-7xl [&>a]:cursor-default!">
            <a href="#">{Dict.home}</a>
            <a href="#about">{Dict.about}</a>
            <a href="#projects">{Dict.projects}</a>
            <a href="#contact">{Dict.contact}</a>
          </nav>
        </header>
      )}
    </>
  )
}

export { Nav }