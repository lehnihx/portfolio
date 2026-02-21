"use client"

import { useDict } from "@/lib/dict"
import { SocialDock } from "@/sections/footer/social"

const Footer = () => {
  const Dict = useDict()
  return (
    <footer id="footer" className="h-screen flex flex-col items-center justify-evenly">
      <SocialDock/>
      <p className="text-center text-gray-500 text-xs">© {new Date().getFullYear()} {Dict.lenix}. {Dict.rights}.</p>
      <div className="w-full flex justify-center text-[30rem]">
        <span className="pointer-events-none bg-linear-to-b from-black to-gray-300/10 bg-clip-text text-center leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
          {Dict.lenix}
        </span>
      </div>
    </footer>
  )
}

export { Footer }