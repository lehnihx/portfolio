import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Commits } from "@/components/commits"
import { Langs } from "@/components/langs"
import { Stack } from "@/components/stack"
import { Footer } from "@/components/footer"

export const App = () => (
  <div className="min-h-screen w-full flex justify-evenly bg-zinc-950 text-zinc-100">
    <div className="w-2/3 h-full mx-auto px-6 py-20">
      <div className="min-h-screen flex flex-col justify-center gap-10">
        <Hero />
        <Stack />
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