"use client"

import { useDict } from "@/lib/dict"
import { Testimonials } from "./testimonials"
import { Referrals } from "./referrals"
import { Review } from "@/app/[lang]/page"
import { Clock } from "@/components/clock"
import { Globe } from "@/components/ui/globe"
import { AnimatedBeamDemo } from "@/components/beam"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

const Hero = ({ reviews }: { reviews: Review[] }) => {
  const Dict = useDict()
  return (
    <section id="hero" className="h-screen text-foreground flex flex-col items-center justify-center text-3xl">
      <h2>{Dict.intro}</h2>

      {/* <ContactForm/> */}
      {/* <Globe config={{width: 800,height: 800,onRender: () => {},devicePixelRatio: 2,phi: 3,theta: 0.3,dark: 0,diffuse: 0.4,mapSamples: 16000,mapBrightness: 1,baseColor: [1, 1, 1],markerColor: [0, 0, 0],glowColor: [1, 1, 1],markers: [{ location: [36.73906, 3.34893], size: 0.15 },],}}/> */}
      {/* <AnimatedBeamDemo /> */}
      {/* <AnimatedThemeToggler /> */}
      {/* <Testimonials {...{ reviews }} /> */}
      {/* <Referrals/> */}
    </section>
  )
}

export { Hero }