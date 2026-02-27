"use client"
import { useEffect, useState } from 'react'
import { Squircle } from 'ldrs/react'
import 'ldrs/react/Squircle.css'

export const LoadingScreen = ({ children }: { children: React.ReactNode }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (document.readyState === 'complete') {
      setLoaded(true)
    } else {
      window.addEventListener('load', () => setLoaded(true))
      return () => window.removeEventListener('load', () => setLoaded(true))
    }
  }, [])

  return (
    <>
      <div className={`fixed inset-0 z-9999 bg-background flex items-center justify-center transition-opacity duration-500 ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Squircle size="37" stroke="5" strokeLength="0.15" bgOpacity="0.1" speed="0.9" color="var(--foreground)" />
      </div>
      {children}
    </>
  )
}