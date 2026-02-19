"use client"

import { State } from "@/lib/types"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import { useDict } from "@/lib/dict-context"

const ShowNav = ({ setStates }: State<{ nav: boolean }>) => {
  const Dict = useDict()
  return (
    <header className="fixed w-screen h-screen bg-background">
      <Button {...{
        className: "hover:bg-transparent bg-transparent hover:scale-140 text-foreground absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2",
        onClick: () => {setStates(prev => ({ ...prev, nav: !prev.nav }))}
      }}>
        <X/>
      </Button>
      <nav className="h-screen flex flex-col items-center justify-center text-foreground text-8xl [&>a]:cursor-default!">
        <a href="#">{Dict.home}</a>
        <a href="#about">{Dict.about}</a>
        <a href="#projects">{Dict.projects}</a>
        <a href="#contact">{Dict.contact}</a>
      </nav>
    </header>
  )
}

export { ShowNav }