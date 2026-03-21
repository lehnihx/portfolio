import { Dictionary, hasLang } from "../../lib/dictionaries"
import { notFound } from "next/navigation"
import { DictProvider } from "@/hooks/useDict"
import { DialogProvider } from "@/hooks/useDialog"
import { ContactForm } from "@/articles/form"
import { Intro } from "@/articles/intro"
import { Referrals } from "@/articles/referrals"
import TimelineJourney from "@/articles/timeline"
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"
import { Accessibility } from "@/articles/accessibility"
import Experience from "@/articles/experience"
import { Quotes } from "@/articles/quote"
import { Ecosystem } from "@/articles/ecosystem"
import { Location } from "@/articles/location"
import { Header } from "@/components/header"
import { BackgroundLines } from "@/components/ui/background-lines"
import { Particles } from "@/components/ui/particles"
import { Meteors } from "@/components/ui/meteors"
import { Testimonials } from "@/articles/testimonials"
import { Commits } from "@/articles/commits"
import { LanguagesChart } from "@/articles/languages"
import { LOC } from "@/articles/loc"
import { cache } from "@/lib/cache"

export interface Review {
  name: string
  username: string
  body: string
  translation: string
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

  const reviews = cache.reviews(lang)
  const insights = cache.insights()
  const dict = await Dictionary(lang)

  return (
    <DictProvider dict={dict}>
      <DialogProvider>
        <main>
          <h1></h1>
          <section id="hero" className="h-screen w-full relative min-h-screen text-foreground flex flex-col items-center justify-evenly text-3xl">
            <BackgroundRippleEffect />
            <Intro/>
          </section>
          <section id="about" className="relative overflow-hidden min-h-screen w-full flex items-center">
            <Particles className="absolute inset-0 -z-10"/>
            <div className="relative w-full flex flex-col items-center justify-evenly">
              <Header left={dict.get_to_know_more} center={dict.about_lenix} />
              <Experience />
              <Quotes/>
            </div>
          </section>
          <section id="timeline" className="flex relative mb-16 flex-col items-center justify-between">
            <TimelineJourney/>
          </section>
          <section className="min-h-screen w-full flex justify-center">
            <Testimonials reviews={reviews}/>
          </section>
          <section className="relative min-h-screen w-full flex items-center justify-center overflow-clip">
            <Meteors/>
            <LOC insights={insights}/>
          </section>
          {/* your code onSubmit={handleSubmit} my code onSubmit={(event) => { handleSubmit(event).catch(() => undefined) }}*/}
          <section className="h-screen w-full flex items-center justify-center">
            <LanguagesChart insights={insights}/>
          </section>
          <section className="min-h-screen w-full flex justify-center">
            <Commits insights={insights}/>
          </section>
          <section className="w-full">
            <BackgroundLines className="flex flex-col items-center justify-evenly">
              <Header left={dict.lenixs} center={dict.ecosystem} />
              <Ecosystem/>
            </BackgroundLines>
          </section>
          <section id="contact" className="w-screen flex flex-col items-center justify-evenly">
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
