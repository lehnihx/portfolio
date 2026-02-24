import { useDict } from "@/lib/dict"
import { SocialDock } from "@/articles/dock"
import { Referrals } from "../articles/referrals"
import { Clock } from "@/articles/clock"
import { SparklesCore } from "@/components/ui/sparkles"

export const Footer = () => {
  const Dict = useDict()
  return (
    <footer id="footer" className="relative h-screen w-screen flex flex-col items-center justify-between">
      <div className="flex w-full items-center justify-evenly">
        <p className="text-center flex-1/3 text-gray-500 text-xs">© {new Date().getFullYear()} {Dict.lenix}. {Dict.rights}.</p>
        <Clock />
        <SocialDock/>
      </div>
      <article>
        <div className="h-screen w-full bg-background flex flex-col items-center justify-center overflow-hidden rounded-md">
          <span className="text-[30rem] pointer-events-none bg-linear-to-b from-background to-foreground/10 bg-clip-text text-center leading-none font-semibold whitespace-pre-wrap text-transparent">
            {Dict.lenix}
          </span>
          <div className="w-[40rem] h-40 relative">
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />

            <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
      </article>
      <Referrals/>
    </footer>
  )
}