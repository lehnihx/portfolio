'use client'
import { useInView } from 'motion/react'
import { useRef, useState, useEffect } from 'react'

export const useIsInView = (margin: `${number}%` = '33%') => {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(undefined)
  const isInView = useInView(ref, { margin })
  const [hasBeenInView, setHasBeenInView] = useState(false)

  useEffect(() => {
    if (isInView && !hasBeenInView) setHasBeenInView(true)
    if (ref.current) setHeight(ref.current.offsetHeight)
  }, [isInView])

  return { ref, height, visible: isInView || hasBeenInView }
}