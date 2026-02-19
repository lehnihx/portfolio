import { DockDemo } from "../social"

const Footer = () => 
<footer className="h-screen flex flex-col items-center justify-evenly">
  <DockDemo/>
  <p className="text-center text-gray-500 text-xs">© {new Date().getFullYear()} Lenix. All rights reserved.</p>
  <span className="pointer-events-none bg-linear-to-b from-black to-gray-300/10 bg-clip-text text-center text-[30rem] leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
    Lenix
  </span>
</footer>

export { Footer }