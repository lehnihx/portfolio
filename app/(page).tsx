import { ContactForm } from "@/articles/form"
import { Review } from "./[lang]/page"
import { Intro } from "@/articles/intro"
import { Nav } from "@/articles/nav"
import { Preferences } from "@/articles/preferences"
import { Referrals } from "@/articles/referrals"
import { Testimonials } from "@/articles/testimonials"
import Ask from "@/components/ask"
import TimelineJourney from "@/articles/timeline"
import { Location } from "@/articles/location"
import { Lenix } from "@/articles/lenix"

export default ({ reviews }: { reviews: Review[] }) => (
  <>
    <header>
      <Nav/>
    </header>
    <main>
      <section id="hero" className="h-screen text-foreground flex flex-col items-center justify-center text-3xl">
        <Intro/>
      </section>
      <section className="flex flex-col items-center justify-between">
        <TimelineJourney/>
        <Testimonials {...{ reviews }} />
        <Location/>
      </section>
      <section className="w-screen flex flex-col items-center justify-center">
        <Ask/>
        <ContactForm/>
      </section>
    </main>
      <footer id="footer" className="relative h-screen w-screen flex flex-col items-center justify-between">
        <Preferences/>
        <Lenix/>
        <Referrals/>
      </footer>
  </>
)