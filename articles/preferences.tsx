"use client"
import { useDict } from "@/hooks/useDict"
import { SocialDock } from "./dock"
import { Clock } from "./clock"
import { useIsInView } from "@/hooks/useIsInView"

export const Preferences = () => {
  const { ref, height, visible } = useIsInView()
  const dict = useDict()
  
  return (
    <div ref={ref} style={{ minHeight: height }}>
      {visible && (
        <article className="flex w-full items-center justify-evenly portrait:flex-col-reverse portrait:gap-5">
          <p className="text-center flex-1/3 text-ring text-xs">© {new Date().getFullYear()} {dict.lenix}. {dict.rights}.</p>
          <Clock />
          <SocialDock/>
        </article>
      )}
    </div>
  )
}