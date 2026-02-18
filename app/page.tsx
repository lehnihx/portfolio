"use client"
import { Button } from "@/components/ui/button"
import { Expand } from "lucide-react"
import { ShowNav } from "@/components/nav"
import { useState } from "react"
import { Hero } from "@/components/sections/hero"
import { Footer } from "@/components/sections/footer"

const Home = () => {
  const initStates = {
    nav: false
  }
  const [states, setStates] = useState(initStates)
  return (
    <main>
      <Button {...{
        className: "bg-foreground text-background absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2",
        onClick: () => setStates(prev => ({ ...prev, nav: !prev.nav }))
      }}>
        <Expand/>
      </Button>
      {states.nav && <ShowNav {...{ states, setStates }} />}
      <Hero/>
      <Footer/>
    </main>
  )
}

export default Home