"use client"

import { useDict } from "@/lib/dict"
import { Reviews } from "@/lib/types"
import { Testimonials } from "./testimonials"
import { Referrals } from "./referrals"

const Hero = ({ reviews }: { reviews: Reviews[] }) => {
  const Dict = useDict()
  return (
    <section id="hero" className="h-screen text-foreground flex flex-col items-center justify-center text-3xl">
      <h2>{Dict.intro}</h2>
      {/* <Testimonials {...{ reviews }} /> */}
      <Referrals/>
    </section>
  )
}

export { Hero }