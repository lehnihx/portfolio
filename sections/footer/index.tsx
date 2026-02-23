"use client"

import { useDict } from "@/lib/dict"
import { SocialDock } from "@/sections/footer/social"
import { Clock } from "@/components/clock"

const Footer = () => {
  const Dict = useDict()
  return (
    <footer id="footer" className="relative h-screen w-screen flex flex-col items-center justify-evenly">
      <div className="flex w-full items-center justify-evenly">
        <p className="text-center text-gray-500 text-xs">© {new Date().getFullYear()} {Dict.lenix}. {Dict.rights}.</p>
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

export { Footer }