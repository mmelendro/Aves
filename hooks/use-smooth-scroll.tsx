"use client"

import { useCallback } from "react"

export function useSmoothScroll() {
  const scrollToSection = useCallback((sectionId: string, offset = 80) => {
    try {
      // Remove the # if it exists
      const cleanId = sectionId.replace("#", "")
      const element = document.getElementById(cleanId)

      if (element) {
        // Calculate the position with offset for fixed header
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - offset

        // Enhanced smooth scrolling with better browser support
        if ("scrollBehavior" in document.documentElement.style) {
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        } else {
          // Enhanced fallback for browsers that don't support smooth scrolling
          smoothScrollPolyfill(offsetPosition)
        }

        // Update URL hash without triggering scroll
        if (history.replaceState) {
          history.replaceState(null, "", `#${cleanId}`)
        }

        return true
      } else {
        console.warn(`Element with id "${cleanId}" not found`)
        return false
      }
    } catch (error) {
      console.error("Error scrolling to section:", error)
      return false
    }
  }, [])

  return { scrollToSection }
}

// Enhanced polyfill for smooth scrolling with better easing
function smoothScrollPolyfill(targetPosition: number) {
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  const duration = 800
  let start: number | null = null

  function animation(currentTime: number) {
    if (start === null) start = currentTime
    const timeElapsed = currentTime - start
    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration)
    window.scrollTo(0, run)
    if (timeElapsed < duration) requestAnimationFrame(animation)
  }

  function easeInOutCubic(t: number, b: number, c: number, d: number) {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t * t + b
    t -= 2
    return (c / 2) * (t * t * t + 2) + b
  }

  requestAnimationFrame(animation)
}
