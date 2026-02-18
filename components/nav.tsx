import { State } from "@/lib/types"
import { Button } from "./ui/button"
import { X } from "lucide-react"

const ShowNav = ({ setStates }: State<{ nav: boolean }>) =>
<div className="absolute w-screen h-screen bg-foreground">
  <Button {...{
    className: "bg-background text-foreground hover:bg-background/80 absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2",
    onClick: () => {setStates(prev => ({ ...prev, nav: !prev.nav }))}
  }}>
    <X/>
  </Button>
  <div className="h-screen flex flex-col items-center justify-center text-background text-8xl">
    <h1>Home</h1>
    <h1>About</h1>
    <h1>Projects</h1>
    <h1>Contact</h1>
  </div>
</div>

export { ShowNav }