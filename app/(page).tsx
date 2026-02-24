import { ContactForm } from "@/articles/form"
import { Review } from "./[lang]/page"
import { Intro } from "@/articles/intro"
import { Nav } from "@/articles/nav"
import { Preferences } from "@/articles/preferences"
import { Referrals } from "@/articles/referrals"
import { Testimonials } from "@/articles/testimonials"
import Ask from "@/components/placeholders-and-vanish-input-demo"
import TimelineJourney from "@/articles/timeline"
import { Lenix } from "@/lib/icons"
import { Globe } from "@/lib/ui/globe"

export default ({ reviews }: { reviews: Review[] }) => (
  <>
    <header>
      <Nav/>
    </header>
    <main>
      <section id="hero" className="h-screen text-foreground flex flex-col items-center justify-center text-3xl">
        <Intro/>
        {/* <h2>{Dict.intro}</h2> */}
      </section>
      <section className="flex flex-col items-center justify-between">
        <TimelineJourney/>
        <Testimonials {...{ reviews }} />
        <Globe config={{width: 800,height: 800,onRender: () => {},devicePixelRatio: 2,phi: 3,theta: 0.3,dark: 0,diffuse: 0.4,mapSamples: 16000,mapBrightness: 1,baseColor: [1, 1, 1],markerColor: [0, 0, 0],glowColor: [1, 1, 1],markers: [{ location: [36, 3], size: 0.15 },],}}/>
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