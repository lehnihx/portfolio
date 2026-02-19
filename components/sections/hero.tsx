import { useDict } from "@/lib/dict-context"

const Hero = () => {
  const Dict = useDict()
  return (
    <section id="hero" className="h-screen bg-foreground text-background flex flex-col items-center justify-center text-3xl">
      <h2>{Dict.intro}</h2>
    </section>
  )
}

export { Hero }