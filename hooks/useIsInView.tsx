'use client'
import { useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const margin = (typeof window !== 'undefined'
  ? `${Math.round(window.innerHeight * 0.25)}px`
  : '200px') as `${number}px`

export const useIsInView = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(undefined)
  const isInView = useInView(ref, { margin })

  useEffect(() => {
    if (ref.current) setHeight(ref.current.offsetHeight)
  }, [isInView])

  return { ref, height, visible: isInView }
}