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
          <section id="hero" className="relative min-h-screen text-foreground flex flex-col items-center justify-evenly text-3xl">
            <h2></h2>
            <article className="h-screen w-full">
              <BackgroundRippleEffect />
              <Intro/>
            </article>
            {/* <Particles/> */}
            {/* <AuroraBackgroundDemo/> */}
            {/* <Meteors/> */}
            {/* {(async () => <NumberTicker value={await cachedInsights() || 0} className="text-8xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white"/>)()} */}
          </section>
          <section className="min-h-screen flex flex-col items-center justify-evenly">
            <article className="h-screen w-full flex flex-col items-center justify-evenly">
              <AboutMeHeader/>
              <Experience />
            </article>
            <article className="w-full">
              <BackgroundLines>
                <EcosystemHeader/>
                <Ecosystem/>
              </BackgroundLines>
            </article>
            <article className="flex flex-col items-center justify-between gap-10 w-screen">
              <Quotes/>
              <BeamToClaude />
            </article>
          </section>
          <section className="flex flex-col items-center justify-between">
            <h2></h2>
            <article className="relative overflow-clip mb-16">
              <TimelineJourney/>
            </article>
          </section>
          <section className="flex flex-col items-center justify-evenly">
            <h2></h2>
            <article>
              <Ask/>
            </article>
            <article>
              <ContactForm/>
            </article>
          </section>
        </main>
        <footer id="footer" className="min-h-screen relative flex flex-col justify-evenly">
          <h2></h2>
          <article>
            <Accessibility/>
          </article>
          <article>
            <Location/>
          </article>
          <article>
            <Referrals/>
          </article>
        </footer>
      </DialogProvider>
    </DictProvider>
  )
}

export default Page