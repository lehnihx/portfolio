'use client'
import { useInView } from 'motion/react'
import { useRef, useState, useEffect } from 'react'

export const useIsInView = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(undefined)
  const [margin, setMargin] = useState<`${number}px`>(() =>
    typeof window !== 'undefined'
      ? `${Math.round(window.innerHeight * 0.33)}px`
      : '300px'
  )
  const isInView = useInView(ref, { margin })
  const hasBeenInView = useRef(false)

  useEffect(() => {
    if (isInView && !hasBeenInView.current) hasBeenInView.current = true
    if (ref.current) setHeight(ref.current.offsetHeight)
  }, [isInView])

  return { ref, height, visible: isInView }
}