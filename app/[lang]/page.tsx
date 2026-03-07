import { Dictionary, hasLang } from "../../lib/dictionaries"
import { notFound } from "next/navigation"
import { DictProvider } from "@/hooks/useDict"
import { DialogProvider } from "@/hooks/useDialog"
import { ContactForm } from "@/articles/form"
import { Intro } from "@/articles/intro"
import { Nav } from "@/articles/nav"
import { Referrals } from "@/articles/referrals"
import TimelineJourney from "@/articles/timeline"
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"
import { Accessibility } from "@/articles/accessibility"
import { BeamToClaude } from "@/articles/beam"
import Experience from "@/articles/experience"
import { Quotes } from "@/articles/quote"
import { Ecosystem } from "@/articles/ecosystem"
import { Location } from "@/articles/location"
import { AboutMeHeader } from "@/components/about-me-header"
import { EcosystemHeader } from "@/components/ecosystem-header"
import { BackgroundLines } from "@/components/ui/background-lines"
import { Particles } from "@/components/ui/particles"
import { Meteors } from "@/components/ui/meteors"
import { Testimonials } from "@/articles/testimonials"
import cachedReviews from "@/lib/reviews"
import { Stats } from "@/articles/stats"
import { cachedInsights } from "@/lib/insights"

export interface Review {
  name: string
  username: string
  body: string
  avatar: string
  reviewLink: string
  banner: string | undefined
  color: string | null
  locale: string | undefined
  verified: boolean | undefined
  avatar_decoration: string | undefined
  tag: string | null | undefined
  badge: string | undefined
  date: string
}

const Page = async ({ params }: PageProps<'/[lang]'>) => {
  const { lang } = await params
  if (!hasLang(lang)) notFound()
  const reviews = await cachedReviews(lang)
  const insights = await cachedInsights()

  return (
    <DictProvider dict={await Dictionary(lang)}>
      <DialogProvider>
        <header>
          <Nav/>
        </header>
        <main className="w-full">
          <section id="hero" className="min-h-screen w-full relative text-foreground flex flex-col items-center justify-center">
            <BackgroundRippleEffect />
            <Intro/>
          </section>

          <section id="about" className="relative overflow-hidden min-h-screen w-full px-6 md:px-12 py-16 md:py-24 flex items-center">
            <Particles className="absolute inset-0 -z-10"/>
            <div className="relative z-10 w-full flex flex-col items-center justify-center gap-16">
              <AboutMeHeader/>
              <Stats insights={insights}/>
              <Experience />
              <Testimonials reviews={reviews}/>
            </div>
          </section>

          <section className="w-full px-6 md:px-12 py-16 md:py-24">
            <BackgroundLines>
              <EcosystemHeader/>
              <Ecosystem/>
            </BackgroundLines>
          </section>

          <section className="w-full px-6 md:px-12 py-16 md:py-24 flex flex-col items-center justify-center gap-10">
            <Quotes/>
            <BeamToClaude />
          </section>

          <section id="timeline" className="w-full relative overflow-hidden px-6 md:px-12 py-16 md:py-24 flex flex-col items-center justify-center">
            <Meteors/>
            <TimelineJourney/>
          </section>

          <section id="contact" className="w-full px-6 md:px-12 py-16 md:py-24 flex flex-col items-center justify-center">
            <ContactForm/>
          </section>
        </main>

        <footer id="footer" className="w-full min-h-screen relative px-6 md:px-12 py-16 md:py-24 flex flex-col justify-center gap-16">
          <Accessibility/>
          <Location/>
          <Referrals/>
        </footer>
      </DialogProvider>
    </DictProvider>
  )
}

export default Page
