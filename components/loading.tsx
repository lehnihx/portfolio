'use client'
import { useEffect, useState } from 'react'

export const LoadingScreen = ({ children }: { children: React.ReactNode }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])
  return (
    <>
      {!loaded && <div className={`fixed inset-0 z-9999 bg-background flex items-center justify-center transition-opacity duration-500 ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
        </div>
      }
      {children}
    </>
  )
}