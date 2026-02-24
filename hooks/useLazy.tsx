'use client'
import { useInView } from 'motion/react'
import { useRef, useState, useEffect } from 'react'

export const LazyProvider = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(undefined)
  const isInView = useInView(ref, { margin: '25%' })

  useEffect(() => {
    if (ref.current && !height) {
      setHeight(ref.current.offsetHeight)
    }
  }, [isInView])

  return (
    <div ref={ref}>
      <div style={{ display: isInView ? 'block' : 'none' }}>
        {children}
      </div>
      {!isInView && <div style={{ height }} />}
    </div>
  )
}