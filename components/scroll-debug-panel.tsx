"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Target, MousePointer, Smartphone } from "lucide-react"

interface ScrollDebugInfo {
  currentSection: string
  scrollPosition: number
  windowHeight: number
  documentHeight: number
  comparisonSectionTop: number
  comparisonSectionVisible: boolean
  isMobile: boolean
  userAgent: string
}

export default function ScrollDebugPanel() {
  const [debugInfo, setDebugInfo] = useState<ScrollDebugInfo>({
    currentSection: "",
    scrollPosition: 0,
    windowHeight: 0,
    documentHeight: 0,
    comparisonSectionTop: 0,
    comparisonSectionVisible: false,
    isMobile: false,
    userAgent: "",
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateDebugInfo = () => {
      const comparisonElement = document.getElementById("comparison")
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

      let comparisonTop = 0
      let comparisonVisible = false

      if (comparisonElement) {
        const rect = comparisonElement.getBoundingClientRect()
        comparisonTop = rect.top + window.pageYOffset
        comparisonVisible = rect.top < window.innerHeight && rect.bottom > 0
      }

      setDebugInfo({
        currentSection: getCurrentSection(),
        scrollPosition: window.pageYOffset,
        windowHeight: window.innerHeight,
        documentHeight: document.documentElement.scrollHeight,
        comparisonSectionTop: comparisonTop,
        comparisonSectionVisible: comparisonVisible,
        isMobile,
        userAgent: navigator.userAgent,
      })
    }

    const getCurrentSection = (): string => {
      const sections = ["tours", "comparison", "conservation", "contact"]
      const scrollPos = window.pageYOffset + 100

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            return sectionId
          }
        }
      }
      return "top"
    }

    updateDebugInfo()
    window.addEventListener("scroll", updateDebugInfo, { passive: true })
    window.addEventListener("resize", updateDebugInfo)

    return () => {
      window.removeEventListener("scroll", updateDebugInfo)
      window.removeEventListener("resize", updateDebugInfo)
    }
  }, [])

  const testScrollToComparison = () => {
    const element = document.getElementById("comparison")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      alert("Comparison section not found!")
    }
  }

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-20 right-6 z-50 bg-gray-800 hover:bg-gray-900 text-white"
        size="sm"
      >
        <Eye className="w-4 h-4 mr-1" />
        Debug
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-80 max-h-96 overflow-y-auto">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm">Scroll Debug Panel</h3>
          <Button onClick={() => setIsVisible(false)} variant="ghost" size="sm" className="h-6 w-6 p-0">
            ×
          </Button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Current Section:</span>
            <Badge variant="outline">{debugInfo.currentSection}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Scroll Position:</span>
            <span className="font-mono">{Math.round(debugInfo.scrollPosition)}px</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Window Height:</span>
            <span className="font-mono">{debugInfo.windowHeight}px</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Comparison Top:</span>
            <span className="font-mono">{Math.round(debugInfo.comparisonSectionTop)}px</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Comparison Visible:</span>
            <Badge
              className={debugInfo.comparisonSectionVisible ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
            >
              {debugInfo.comparisonSectionVisible ? "Yes" : "No"}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Device:</span>
            <div className="flex items-center space-x-1">
              {debugInfo.isMobile ? <Smartphone className="w-3 h-3" /> : <MousePointer className="w-3 h-3" />}
              <span>{debugInfo.isMobile ? "Mobile" : "Desktop"}</span>
            </div>
          </div>

          <div className="pt-2 border-t">
            <Button onClick={testScrollToComparison} size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Target className="w-3 h-3 mr-1" />
              Test Scroll to Comparison
            </Button>
          </div>

          <div className="text-xs text-gray-500 break-all">
            <strong>User Agent:</strong>
            <br />
            {debugInfo.userAgent.substring(0, 100)}...
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
