"use client"
import { useDict } from "@/hooks/useDict"
import { Clock } from "lucide-react"
import { SocialDock } from "./dock"

export const Preferences = () => {
  const dict = useDict()
  return (
    <div className="flex w-full items-center justify-evenly">
      <p className="text-center flex-1/3 text-gray-500 text-xs">© {new Date().getFullYear()} {dict.lenix}. {dict.rights}.</p>
      <Clock />
      <SocialDock/>
    </div>
  )
}