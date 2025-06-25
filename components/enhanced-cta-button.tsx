"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { TrendingUp } from "lucide-react"
import { useState } from "react"

interface EnhancedCTAButtonProps {
  targetSection: string
  children: React.ReactNode
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  icon?: React.ReactNode
  trackingEvent?: string
}

export default function EnhancedCTAButton({
  targetSection,
  children,
  variant = "outline",
  size = "lg",
  className = "",
  icon,
  trackingEvent,
}: EnhancedCTAButtonProps) {
  const { scrollToSection } = useSmoothScroll()
  const [isScrolling, setIsScrolling] = useState(false)

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      setIsScrolling(true)

      // Track the click event for analytics
      if (trackingEvent && typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("event", "click", {
          event_category: "CTA",
          event_label: trackingEvent,
          value: 1,
        })
      }

      // Attempt to scroll to the section
      const success = scrollToSection(targetSection)

      if (!success) {
        // Fallback: try to find the section and scroll manually
        console.warn(`Failed to scroll to ${targetSection}, attempting fallback`)
        const element = document.querySelector(`#${targetSection.replace("#", "")}`)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        } else {
          // Last resort: reload page with hash
          window.location.hash = targetSection
        }
      }

      // Add a small delay to show loading state
      setTimeout(() => setIsScrolling(false), 1000)
    } catch (error) {
      console.error("Error handling CTA click:", error)
      setIsScrolling(false)

      // Fallback to hash navigation
      window.location.hash = targetSection
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={`transition-all duration-300 ${isScrolling ? "opacity-75 cursor-wait" : ""} ${className}`}
      disabled={isScrolling}
    >
      {icon || <TrendingUp className="mr-2 w-4 h-4" />}
      {children}
      {isScrolling && (
        <div className="ml-2 w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
    </Button>
  )
}
