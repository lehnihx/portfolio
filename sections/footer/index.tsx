"use client"

import { useDict } from "@/lib/dict"
import { DockDemo } from "@/sections/footer/social"

const Footer = () => {
  const Dict = useDict()
  return (
    <footer id="footer" className="h-screen flex flex-col items-center justify-evenly">
      <DockDemo/>
      <p className="text-center text-gray-500 text-xs">© {new Date().getFullYear()} {Dict.lenix}. {Dict.rights}.</p>
      <span className="pointer-events-none bg-linear-to-b from-black to-gray-300/10 bg-clip-text text-center text-9xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
        {Dict.lenix}
      </span>
    </footer>
  )
}

export { Footer }