import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Commits } from "@/components/commits"
import { Langs } from "@/components/langs"
import { Stack } from "@/components/stack"
import { Footer } from "@/components/footer"
import { Quotes } from "./components/articles/quote"

export const Layout = () => (
  <div className="min-h-screen w-full flex justify-evenly bg-background text-foreground">
    <div className="landscape:w-2/3 portrait:w-6/7 h-full">
      <div className="h-screen flex flex-col justify-between">
        <div className="min-h-5/10 flex items-end">
          <Hero />
        </div>
        <div className="min-h-4/10 flex flex-col justify-center">
          <Stack />
        </div>
        <div className="min-h-1/10">
          <Quotes />
        </div>
      </div>
      <div className="min-h-screen flex flex-col justify-evenly">
        <Stats />
        <Commits />
        <Langs />
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  </div>
)