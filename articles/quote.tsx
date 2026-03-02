"use client"
import { useState, useEffect } from 'react'
import { useDict } from '@/hooks/useDict'
import dynamic from 'next/dynamic'
import { useIsInView } from '@/hooks/useIsInView'

const TextEffect = dynamic(() => import('@/components/ui/text-effect').then(m => ({ default: m.TextEffect })), { ssr: false })

const randomNewNumber = (lastNumber: number | null, length: number): number => {
  const n = Math.floor(Math.random() * length)
  return n === lastNumber ? randomNewNumber(lastNumber, length) : n
}

const blurSlideVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.01 } },
    exit: { transition: { staggerChildren: 0.01, staggerDirection: 1 } },
  },
  item: {
    hidden: { opacity: 0, filter: 'blur(10px) brightness(0%)', y: 0 },
    visible: { opacity: 1, y: 30, filter: 'blur(0px) brightness(100%)', transition: { duration: 1 } },
    exit: { opacity: 0, y: -30, filter: 'blur(10px) brightness(0%)', transition: { duration: 1 } },
  },
}

export function Quotes() {
  const { quotes } = useDict()
  const [trigger, setTrigger] = useState(true)
  const [quoteIndex, setQuoteIndex] = useState(() => randomNewNumber(null, quotes.length))
  const [completedTriggers, setCompletedTriggers] = useState(0)
  const { ref, height, visible } = useIsInView()

  useEffect(() => {
    const interval = setInterval(() => setTrigger(prev => !prev), 5000)
    return () => clearInterval(interval)
  }, [])

  const triggerCompleted = () => {
    if (completedTriggers % 2 === 1) setQuoteIndex(randomNewNumber(quoteIndex, quotes.length))
    setCompletedTriggers(prev => prev + 1)
  }

  return (
    <article ref={ref} style={{ minHeight: height }} className='w-full flex-1/2 flex justify-center'>
      {visible && (
        <TextEffect
          className='inline-flex text-ring italic font-light'
          per='char'
          variants={blurSlideVariants}
          trigger={trigger}
          speedSegment={0.2}
          onAnimationComplete={triggerCompleted}
          style={{ fontSize: 'var(--font-size-fluid-sm)' }}
        >
          {'"' + quotes[quoteIndex] + '"'}
        </TextEffect>
      )}
    </article>
  )
}