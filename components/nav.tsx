import { State } from "@/lib/types"
import { Button } from "./ui/button"
import { X } from "lucide-react"

const ShowNav = ({ setStates }: State<{ nav: boolean }>) =>
<header className="fixed w-screen h-screen bg-background">
  <Button {...{
    className: "hover:bg-transparent bg-transparent hover:scale-140 text-foreground absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2",
    onClick: () => {setStates(prev => ({ ...prev, nav: !prev.nav }))}
  }}>
    <X/>
  </Button>
  <nav className="h-screen flex flex-col items-center justify-center text-foreground text-8xl [&>a]:cursor-default!">
    <a href="#">Home</a>
    <a href="#about">About</a>
    <a href="#projects">Projects</a>
    <a href="#contact">Contact</a>
  </nav>
</header>

export { ShowNav }