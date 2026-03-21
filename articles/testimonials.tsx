"use client"
import { ANIMATION } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import { motion } from "motion/react"
import { Header } from "@/components/header"
import { useDict } from "@/hooks/useDict"

const Testimonials = ({ children }: { children: React.ReactNode }) => {
  const { testimonials } = useDict()
  return (
    <motion.article {...ANIMATION} className="w-full my-16 flex flex-col items-center justify-evenly overflow-hidden">
      <Header left={testimonials[0]} center={testimonials[1]} right={testimonials[2]} />
      <div className="w-full relative overflow-hidden">
        <Marquee reverse pauseOnHover className="[--duration:90s]">
          {children}
        </Marquee>
        <ProgressiveBlur direction='left' blurIntensity={0.5} blurLayers={5}
          className='pointer-events-none absolute top-0 left-0 h-full w-1/5'
        />
        <ProgressiveBlur direction='right' blurIntensity={0.5} blurLayers={5}
          className='pointer-events-none absolute top-0 right-0 h-full w-1/5'
        />
      </div>
    </motion.article>
  )
}

export { Testimonials }