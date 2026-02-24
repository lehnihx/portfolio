import { useDict } from "@/lib/dict"
import { SocialDock } from "@/articles/dock"
import { Referrals } from "../articles/referrals"
import { Clock } from "@/articles/clock"

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
        <div className="w-full flex justify-center text-[30rem]">
          <span className="pointer-events-none bg-linear-to-b from-border to-background/10 bg-clip-text text-center leading-none font-semibold whitespace-pre-wrap text-transparent">
            {Dict.lenix}
          </span>
        </div>
      </article>
      <Referrals/>
    </footer>
  )
}