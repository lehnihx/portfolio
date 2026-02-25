import { ContactForm } from "@/articles/form"
import { Review } from "./[lang]/page"
import { Intro } from "@/articles/intro"
import { Nav } from "@/articles/nav"
import { Preferences } from "@/articles/preferences"
import { Referrals } from "@/articles/referrals"
import { Testimonials } from "@/articles/testimonials"
import { Ask } from "@/articles/ask"
import TimelineJourney from "@/articles/timeline"
import { Location } from "@/articles/location"
import { Lenix } from "@/articles/lenix"
import { Quotes } from "@/articles/quote"
import { BackgroundRippleEffect } from "@/lib/ui/background-ripple-effect"
import { BeamToClaude } from "@/articles/beam"

export default ({ reviews }: { reviews: Review[] }) => (
  <>
    <header>
      <Nav/>
    </header>
    <main>
      <h1></h1>
      <section id="hero" className="relative h-screen text-foreground flex flex-col items-center justify-center text-3xl">
        <h2></h2>
        {/* <BeamToClaude/> */}
        <BackgroundRippleEffect />
        <Intro/>
        <Quotes/>
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
        <Testimonials {...{ reviews }} />
      </section>
    </main>
    <footer id="footer" className="relative flex flex-col justify-between">
      <h2></h2>
      <Preferences/>
      <Lenix/>
      <Referrals/>
    </footer>
  </>
)