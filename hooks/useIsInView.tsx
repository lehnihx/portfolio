'use client'
import { useInView } from 'motion/react'
import { useRef, useState } from 'react'

export const useIsInView = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(undefined)
  const margin = useRef<`${number}px`>(
    typeof window !== 'undefined'
      ? `${Math.round(window.innerHeight * 0.33)}px`
      : '300px'
  )
  const isInView = useInView(ref, { margin: margin.current })

  return { ref, height, visible: isInView }
}