"use client"
import { useDict } from "@/hooks/useDict"
import { Button } from "@/components/ui/button"
import { Route, X } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export const Nav = () => {
  const { home, about, timeline, contact } = useDict()
  const [state, setState] = useState(false)

  // Close menu when clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setState(false)
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  const handleNavClick = () => {
    setState(false)
  }

  return (
    <>
      {/* Menu Button */}
      <Button
        className="fixed top-6 left-6 z-40 text-foreground bg-transparent hover:bg-transparent hover:scale-125 transition-transform duration-200"
        onClick={() => setState(prev => !prev)}
        aria-label="Toggle navigation menu"
      >
        <Route size={24} />
      </Button>

      {/* Mobile Menu Overlay */}
      {state && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 z-30"
            onClick={() => setState(false)}
            aria-hidden="true"
          />

          {/* Menu */}
          <div className="fixed inset-0 z-40 flex flex-col">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-6">
              <h2 className="text-fluid-2xl font-bold text-foreground">Menu</h2>
              <Button
                className="text-foreground bg-transparent hover:bg-transparent hover:scale-125 transition-transform duration-200"
                onClick={() => setState(false)}
                aria-label="Close navigation menu"
              >
                <X size={24} />
              </Button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-8 md:gap-12">
              <Link
                href="#"
                className="text-fluid-3xl md:text-fluid-4xl font-bold text-foreground hover:opacity-70 transition-opacity duration-200"
                onClick={handleNavClick}
              >
                {home}
              </Link>
              <Link
                href="#about"
                className="text-fluid-3xl md:text-fluid-4xl font-bold text-foreground hover:opacity-70 transition-opacity duration-200"
                onClick={handleNavClick}
              >
                {about}
              </Link>
              <Link
                href="#timeline"
                className="text-fluid-3xl md:text-fluid-4xl font-bold text-foreground hover:opacity-70 transition-opacity duration-200"
                onClick={handleNavClick}
              >
                {timeline}
              </Link>
              <Link
                href="#contact"
                className="text-fluid-3xl md:text-fluid-4xl font-bold text-foreground hover:opacity-70 transition-opacity duration-200"
                onClick={handleNavClick}
              >
                {contact}
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
