import { ContactForm } from "@/articles/form"
import { Review } from "./[lang]/page"
import { Intro } from "@/articles/intro"
import { Nav } from "@/articles/nav"
import { Accessibility } from "@/articles/preferences"
import { Referrals } from "@/articles/referrals"
import { Testimonials } from "@/articles/testimonials"
import { Ask } from "@/articles/ask"
import TimelineJourney from "@/articles/timeline"
import { Location } from "@/articles/location"
import { Quotes } from "@/articles/quote"
import { BackgroundRippleEffect } from "@/lib/ui/background-ripple-effect"
import { BeamToClaude } from "@/articles/beam"
import Services from "@/articles/services"
import { cachedInsights } from "@/lib/insights"
import CountUp from "@/lib/ui/CountUp"

const Page = async ({ reviews }: { reviews: Review[] }) => (
   <>
    <header>
      <Nav/>
    </header>
    <main>
      <h1></h1>
      <section id="hero" className="relative h-screen text-foreground flex flex-col items-center justify-center text-3xl">
        <h2></h2>
        <BackgroundRippleEffect />
        <Intro/>
        {(async () => {
          const loc = await cachedInsights()
          return <CountUp from={0} to={loc || 0} separator="," direction="up" duration={3} className="count-up-text"/>
        })()}
        {/* <BeamToClaude/> */}
        {/* <Services/> */}
        {/* <Quotes/> */}
      </section>
      <section className="flex flex-col items-center justify-between">
        <h2></h2>
        <TimelineJourney/>
        {/* <Location/> */}
      </section>
      <section className="flex flex-col items-center justify-center">
        <h2></h2>
        <Ask/>
        <ContactForm/>
        {/* <Testimonials {...{ reviews }} /> */}
      </section>
    </main>
    <footer id="footer" className="relative flex flex-col justify-between">
      <h2></h2>
      <Accessibility/>
      <Referrals/>
    </footer>
  </>
)

export default Page