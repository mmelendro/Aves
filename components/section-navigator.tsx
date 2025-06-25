"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

interface SectionNavigatorProps {
  sections: Array<{
    id: string
    label: string
  }>
}

export default function SectionNavigator({ sections }: SectionNavigatorProps) {
  const [activeSection, setActiveSection] = useState<string>("")
  const [isVisible, setIsVisible] = useState(false)
  const { scrollToSection } = useSmoothScroll()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      // Show/hide navigator based on scroll position
      setIsVisible(scrollPosition > 300)

      // Determine active section
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2">
      {/* Back to top button */}
      <Button
        onClick={scrollToTop}
        size="icon"
        className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Back to top"
      >
        <ChevronUp className="w-4 h-4" />
      </Button>

      {/* Section navigation */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 max-w-xs">
        <div className="text-xs font-medium text-gray-500 mb-2 px-2">Quick Navigation</div>
        <div className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                activeSection === section.id
                  ? "bg-emerald-100 text-emerald-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
