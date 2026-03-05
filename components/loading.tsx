"use client"
import { useEffect, useState } from 'react'
import { Squircle } from 'ldrs/react'
import 'ldrs/react/Squircle.css'

export const LoadingProvider = ({ children }: { children?: React.ReactNode }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (document.readyState === 'complete') {
      queueMicrotask(() => setLoaded(true))
      return
    }
    const handler = () => setLoaded(true)
    window.addEventListener('load', handler)
    return () => window.removeEventListener('load', handler)
  }, [])

  return (
    <>
      <div className={`fixed inset-0 z-9999 bg-background flex items-center justify-center transition-opacity duration-500 opacity-0 pointer-events-none`}>
        <Squircle size="37" stroke="2" strokeLength="0.15" bgOpacity="0.1" speed="2" color="var(--foreground)" />
      </div>
      {children}
    </>
  )
}