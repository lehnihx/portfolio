import { DockDemo } from "../social"

const Footer = () => 
<footer className="h-screen flex flex-col items-center justify-evenly">
  <DockDemo/>
  <p className="text-center text-gray-500 text-xs">© {new Date().getFullYear()} Lenix. All rights reserved.</p>
</footer>

export { Footer }