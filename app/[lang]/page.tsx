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
import { cachedInsights } from "@/lib/insights"
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"
import { Accessibility } from "@/articles/accessibility"
import { NumberTicker } from "@/components/ui/number-ticker"

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
          <section id="hero" className="relative h-screen text-foreground flex flex-col items-center justify-center text-3xl">
            <h2></h2>
            <BackgroundRippleEffect />
            <Intro/>
            {(async () => <NumberTicker value={await cachedInsights() || 0} className="text-8xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white"/>)()}

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
            {/* <Testimonials reviews={await getReviews(lang)} /> */}
          </section>
        </main>
        <footer id="footer" className="relative flex flex-col justify-between">
          <h2></h2>
          <Accessibility/>
          <Referrals/>
        </footer>
      </DialogProvider>
    </DictProvider>
  )
}

export default Page