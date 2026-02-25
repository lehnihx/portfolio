"use client"
import { useState, useEffect } from 'react';
import { useDict } from '@/hooks/useDict';
import dynamic from 'next/dynamic';
const TextEffect = dynamic(() => import('@/lib/ui/text-effect').then(m => ({ default: m.TextEffect })), { ssr: false })

export function Quotes() {
  const [trigger, setTrigger] = useState(true);
  const { quotes } = useDict()
  const randomNewNumber = (lastNumber: number | null) => {
    const newRandomNumber = Math.floor(Math.random() * quotes.length)
    if (newRandomNumber === lastNumber) return randomNewNumber(lastNumber)
    return newRandomNumber
  }
  const [quoteIndex, setQuoteIndex] = useState(randomNewNumber(null))
  const [completedTriggers, setCompletedTriggers] = useState(0)
  const triggerCompleted = () => {
    if (completedTriggers %2 === 1) setQuoteIndex(randomNewNumber(quoteIndex))
    setCompletedTriggers(completedTriggers + 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTrigger((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const blurSlideVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.01 },
      },
      exit: {
        transition: { staggerChildren: 0.01, staggerDirection: 1 },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        filter: 'blur(10px) brightness(0%)',
        y: 0,
      },
      visible: {
        opacity: 1,
        y: 30,
        filter: 'blur(0px) brightness(100%)',
        transition: {
          duration: 1,
        },
      },
      exit: {
        opacity: 0,
        y: -30,
        filter: 'blur(10px) brightness(0%)',
        transition: {
          duration: 1,
        },
      },
    },
  };

  return (
    <TextEffect
      className='absolute bottom-1/4 inline-flex text-ring italic font-light text-lg z-10'
      per='char'
      variants={blurSlideVariants}
      trigger={trigger}
      speedSegment={0.2}
      onAnimationComplete={() => triggerCompleted()}
    >
      {'"' + quotes[quoteIndex] + '"'}
    </TextEffect>
  );
}
