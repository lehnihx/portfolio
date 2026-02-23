"use client"

import { Nav } from "@/components/nav"
import { Hero } from "@/sections/hero"
import { Footer } from "@/sections/footer"
import { Review } from "./[lang]/page"
import AuroraBackgroundDemo from "@/components/aurora-background-demo"
import { BackgroundRippleEffectDemo } from "@/components/background-ripple-effect-demo"
import FlipWordsDemo from "@/components/flip-words-demo"
import SparklesPreview from "@/components/sparkles-demo"
import TimelineJourney from "@/components/timeline-demo"

export default ({ reviews }: { reviews: Review[] }) => (
  <main>
    <Nav/>
    <Hero reviews={reviews}/>
    <TimelineJourney/>
    {/* <BackgroundRippleEffectDemo/> */}
    {/* <FlipWordsDemo/> */}
    {/* <SparklesPreview/> */}
    {/* <AuroraBackgroundDemo/> */}
    <Footer/>
  </main>
)