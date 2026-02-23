import { useDict } from "@/lib/dict"
import { SocialDock } from "@/sections/footer/dock"
import { Clock } from "@/sections/footer/clock"
import { Copyright } from "lucide-react"
import { Referrals } from "./referrals"

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
          <span className="pointer-events-none bg-linear-to-b from-background to-background/10 bg-clip-text text-center leading-none font-semibold whitespace-pre-wrap text-transparent">
            {Dict.lenix}
          </span>
        </div>
      </div>
      <Referrals/>
    </footer>
  )
}