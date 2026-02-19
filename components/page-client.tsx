"use client"

import { Button } from "@/components/ui/button"
import { Expand } from "lucide-react"
import { ShowNav } from "@/components/nav"
import { useState } from "react"
import { Hero } from "@/components/sections/hero"
import { Footer } from "@/components/sections/footer"

const Home = () => {
  const [states, setStates] = useState({
    nav: false
  })

  return (
    <main>
      <Button {...{
        className: "bg-transparent hover:bg-transparent hover:scale-140 absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2",
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