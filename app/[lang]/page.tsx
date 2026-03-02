import { Dictionary, hasLang } from "../../lib/dictionaries"
import { notFound } from "next/navigation"
import { DictProvider } from "@/hooks/useDict"
import { DialogProvider } from "@/hooks/useDialog"
import { Ask } from "@/articles/ask"
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
import { Particles } from "@/stock/particles"
import { Meteors } from "@/stock/meteors"

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

  const dict = await Dictionary(lang)

  return (
    <DictProvider dict={dict}>
      <DialogProvider>
        <header>
          <Nav/>
        </header>
        <main>
          <h1></h1>
          <section id="hero" className="h-screen w-full relative min-h-screen text-foreground flex flex-col items-center justify-evenly text-3xl">
            <BackgroundRippleEffect />
            <Intro/>
            {/* <AuroraBackgroundDemo/> */}
            {/* {(async () => <NumberTicker value={await cachedInsights() || 0} className="text-8xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white"/>)()} */}
          </section>
          <section className="min-h-screen flex flex-col items-center justify-evenly">
            <div className="relative overflow-hidden h-screen w-full flex items-center">
              <Particles className="absolute inset-0 -z-10"/>
              <div className="relative z-10 w-full flex flex-col items-center justify-evenly">
                <AboutMeHeader/>
                <Experience />
              </div>
            </div>
            <div className="w-full">
              <BackgroundLines>
                <EcosystemHeader/>
                <Ecosystem/>
              </BackgroundLines>
            </div>
            <div className="flex flex-col items-center justify-between gap-10 w-screen">
              <Quotes/>
              <BeamToClaude />
            </div>
          </section>
          <section className="flex relative overflow-clip mb-16 flex-col items-center justify-between">
            <Meteors/>
            <TimelineJourney/>
          </section>
          <section className="w-screen flex flex-col items-center justify-evenly">
            <Ask/>
            <ContactForm/>
          </section>
        </main>
        <footer id="footer" className="min-h-screen relative flex flex-col justify-evenly">
          <Accessibility/>
          <Location/>
          <Referrals/>
        </footer>
      </DialogProvider>
    </DictProvider>
  )
}

export default Page