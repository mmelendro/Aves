/**
 * Utility functions for scroll behavior and navigation
 */

export interface ScrollOptions {
  offset?: number
  duration?: number
  easing?: (t: number) => number
}

/**
 * Smooth scroll to element with cross-browser compatibility
 */
export function scrollToElement(element: HTMLElement, options: ScrollOptions = {}): Promise<void> {
  const { offset = 80, duration = 800, easing = easeInOutCubic } = options

  return new Promise((resolve) => {
    const startPosition = window.pageYOffset
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset
    const distance = targetPosition - startPosition
    let startTime: number | null = null

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)

      const easedProgress = easing(progress)
      const currentPosition = startPosition + distance * easedProgress

      window.scrollTo(0, currentPosition)

      if (progress < 1) {
        requestAnimationFrame(animation)
      } else {
        resolve()
      }
    }

    // Use native smooth scroll if supported, otherwise use polyfill
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
      // Estimate completion time for native smooth scroll
      setTimeout(resolve, duration)
    } else {
      requestAnimationFrame(animation)
    }
  })
}

/**
 * Easing function for smooth animation
 */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

/**
 * Check if element is in viewport
 */
export function isElementInViewport(element: HTMLElement, threshold = 0): boolean {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= windowHeight + threshold &&
    rect.right <= windowWidth + threshold
  )
}

/**
 * Get scroll progress for an element
 */
export function getScrollProgress(element: HTMLElement): number {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight

  if (rect.top > windowHeight) return 0
  if (rect.bottom < 0) return 1

  const elementHeight = rect.height
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)

  return visibleHeight / elementHeight
}

/**
 * Debounce function for scroll events
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for scroll events
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
