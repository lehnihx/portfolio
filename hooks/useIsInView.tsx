'use client'
import { useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const getMargin = () =>
  typeof window !== 'undefined'
    ? (`${Math.round(window.innerHeight * 0.25)}px` as `${number}px`)
    : '200px'

export const useIsInView = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(undefined)
  const [margin] = useState<`${number}px`>(getMargin)
  const isInView = useInView(ref, { margin })

  useEffect(() => {
    if (ref.current) setHeight(ref.current.offsetHeight)
  }, [isInView])

  return { ref, height, visible: isInView }
}