import { useDict } from "@/lib/dict"
import { SocialDock } from "@/sections/footer/dock"
import { Clock } from "@/sections/footer/clock"
import { Copyright } from "lucide-react"

export const Footer = () => {
  const Dict = useDict()
  return (
    <footer id="footer" className="relative h-screen w-screen flex flex-col items-center justify-evenly">
      <div className="flex w-full items-center justify-evenly">
        <Copyright/>
        <Clock />
        <SocialDock/>
      </div>
      <div>
        <div className="w-full flex justify-center text-[30rem]">
          <span className="pointer-events-none bg-linear-to-b from-black to-gray-300/10 bg-clip-text text-center leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
            {Dict.lenix}
          </span>
        </div>
      </div>
    </footer>
  )
}