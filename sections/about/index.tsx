import { Testimonials } from "./testimonials"
import { Globe } from "@/lib/ui/globe"
import { Review } from "@/app/[lang]/page"
import TimelineJourney from "@/components/timeline-demo"
import { ContactForm } from "@/sections/contact"

export const About = ({ reviews }: { reviews: Review[] }) => {
  return (
    <section className="flex flex-col items-center justify-between">
      <TimelineJourney/>
      <Testimonials {...{ reviews }} />
      <Globe config={{width: 800,height: 800,onRender: () => {},devicePixelRatio: 2,phi: 3,theta: 0.3,dark: 0,diffuse: 0.4,mapSamples: 16000,mapBrightness: 1,baseColor: [1, 1, 1],markerColor: [0, 0, 0],glowColor: [1, 1, 1],markers: [{ location: [36.73906, 3.34893], size: 0.15 },],}}/>
      <ContactForm/>
    </section>
  )
}