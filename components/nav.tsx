import { State } from "@/lib/types"
import { Button } from "./ui/button"
import { X } from "lucide-react"

const ShowNav = ({ setStates }: State<{ nav: boolean }>) =>
<header className="fixed w-screen h-screen bg-foreground">
  <Button {...{
    className: "bg-background text-foreground hover:bg-background/80 absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2",
    onClick: () => {setStates(prev => ({ ...prev, nav: !prev.nav }))}
  }}>
    <X/>
  </Button>
  <nav className="h-screen flex flex-col items-center justify-center text-background text-8xl">
    <a>Home</a>
    <a>About</a>
    <a>Projects</a>
    <a>Contact</a>
  </nav>
</header>

export { ShowNav }