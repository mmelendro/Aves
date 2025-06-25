"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface BrowserFeature {
  name: string
  supported: boolean
  fallbackAvailable: boolean
  description: string
}

export default function BrowserCompatibilityCheck() {
  const [features, setFeatures] = useState<BrowserFeature[]>([])
  const [browserInfo, setBrowserInfo] = useState<string>("")

  useEffect(() => {
    // Detect browser
    const userAgent = navigator.userAgent
    let browser = "Unknown"

    if (userAgent.includes("Chrome")) browser = "Chrome"
    else if (userAgent.includes("Firefox")) browser = "Firefox"
    else if (userAgent.includes("Safari")) browser = "Safari"
    else if (userAgent.includes("Edge")) browser = "Edge"
    else if (userAgent.includes("Opera")) browser = "Opera"

    setBrowserInfo(`${browser} on ${navigator.platform}`)

    // Check browser features
    const featureChecks: BrowserFeature[] = [
      {
        name: "Smooth Scrolling",
        supported: "scrollBehavior" in document.documentElement.style,
        fallbackAvailable: true,
        description: "CSS smooth-scroll behavior support",
      },
      {
        name: "Intersection Observer",
        supported: "IntersectionObserver" in window,
        fallbackAvailable: true,
        description: "For scroll position detection",
      },
      {
        name: "Request Animation Frame",
        supported: "requestAnimationFrame" in window,
        fallbackAvailable: false,
        description: "For smooth scroll polyfill",
      },
      {
        name: "History API",
        supported: "history" in window && "replaceState" in history,
        fallbackAvailable: true,
        description: "For URL hash management",
      },
      {
        name: "Touch Events",
        supported: "ontouchstart" in window,
        fallbackAvailable: true,
        description: "For mobile touch interaction",
      },
      {
        name: "CSS Grid",
        supported: CSS.supports("display", "grid"),
        fallbackAvailable: true,
        description: "For responsive layout",
      },
    ]

    setFeatures(featureChecks)
  }, [])

  const supportedCount = features.filter((f) => f.supported).length
  const compatibilityScore = Math.round((supportedCount / features.length) * 100)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100"
    if (score >= 60) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Browser Compatibility</h3>
            <p className="text-sm text-gray-600">{browserInfo}</p>
          </div>
          <Badge className={`${getScoreColor(compatibilityScore)} font-bold`}>{compatibilityScore}% Compatible</Badge>
        </div>

        <div className="space-y-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${
                feature.supported
                  ? "bg-green-50 border-green-200"
                  : feature.fallbackAvailable
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                {feature.supported ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : feature.fallbackAvailable ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{feature.name}</div>
                  <div className="text-sm text-gray-600">{feature.description}</div>
                  {!feature.supported && feature.fallbackAvailable && (
                    <div className="text-xs text-yellow-700 mt-1">Fallback implementation available</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {compatibilityScore < 80 && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Optimization Notes</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Polyfills are automatically loaded for missing features</li>
              <li>• Fallback navigation methods are implemented</li>
              <li>• All core functionality remains accessible</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
