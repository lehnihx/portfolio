"use client"

import { Nav } from "@/components/nav"
import { Hero } from "@/sections/hero"
import { Footer } from "@/sections/footer"
import { Review } from "./[lang]/page"
import AuroraBackgroundDemo from "@/components/aurora-background-demo"
import { BackgroundRippleEffectDemo } from "@/components/background-ripple-effect-demo"
import FlipWordsDemo from "@/components/flip-words-demo"
import SparklesPreview from "@/components/sparkles-demo"
import { About } from "@/sections/about"

export default ({ reviews }: { reviews: Review[] }) => (
  <main>
    <Nav/>
    <Hero/>
    <About reviews={reviews}/>
    {/* <BackgroundRippleEffectDemo/> */}
    {/* <FlipWordsDemo/> */}
    {/* <SparklesPreview/> */}
    {/* <AuroraBackgroundDemo/> */}
    <Footer/>
  </main>
)