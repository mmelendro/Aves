"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp, X } from "lucide-react"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

interface FloatingAVESNavigationProps {
  autoHideDuration?: number
}

export default function FloatingAVESNavigation({ autoHideDuration = 5000 }: FloatingAVESNavigationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const scrollToSection = useSmoothScroll()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, autoHideDuration)

    return () => clearTimeout(timer)
  }, [autoHideDuration])

  const handleNavigation = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsExpanded(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded ? (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 space-y-3 animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Quick Navigation</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded(false)}
              className="h-6 w-6 p-0 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* A - Adventure (Leaf) */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleNavigation("tours")}
              className="flex flex-col items-center p-3 h-auto border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300"
            >
              <img src="/icons/leaf-icon.svg" alt="Adventure" className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium text-emerald-700">Adventure</span>
            </Button>

            {/* V - Vision (Feather) */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleNavigation("tours")}
              className="flex flex-col items-center p-3 h-auto border-purple-200 hover:bg-purple-50 hover:border-purple-300"
            >
              <img src="/icons/feather-icon.svg" alt="Vision" className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium text-purple-700">Vision</span>
            </Button>

            {/* E - Elevate (Petal) */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleNavigation("tours")}
              className="flex flex-col items-center p-3 h-auto border-yellow-200 hover:bg-yellow-50 hover:border-yellow-300"
            >
              <img src="/icons/petal-icon.svg" alt="Elevate" className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium text-yellow-700">Elevate</span>
            </Button>

            {/* S - Souls (Heart) */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleNavigation("tours")}
              className="flex flex-col items-center p-3 h-auto border-red-200 hover:bg-red-50 hover:border-red-300"
            >
              <img src="/icons/heart-icon.svg" alt="Souls" className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium text-red-700">Souls</span>
            </Button>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleNavigation("conservation")}
              className="w-full text-xs hover:bg-emerald-50 border-emerald-200"
            >
              Conservation Impact
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleNavigation("contact")}
              className="w-full text-xs mt-2 hover:bg-emerald-50 border-emerald-200"
            >
              Contact Us
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsExpanded(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full w-14 h-14 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
        >
          <div className="flex flex-col items-center">
            <ChevronUp className="w-5 h-5" />
            <span className="text-xs font-bold">AVES</span>
          </div>
        </Button>
      )}
    </div>
  )
}
