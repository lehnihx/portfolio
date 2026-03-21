'use client'
import { useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

export const useIsInView = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(undefined)
  const isInView = useInView(ref, { margin: '200px' })

  useEffect(() => {
    if (ref.current) setHeight(ref.current.offsetHeight)
  }, [isInView])

  return { ref, height, visible: isInView }
}