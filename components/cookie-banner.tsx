"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Cookie, Settings } from "lucide-react"
import { useCookieConsent } from "./cookie-consent-manager"

export function CookieBanner() {
  const { hasConsented, acceptAll, rejectAll, setShowPreferenceCenter } = useCookieConsent()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show banner only if user hasn't consented yet
    if (!hasConsented) {
      // Small delay to ensure smooth page load
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [hasConsented])

  const handleAcceptAll = () => {
    console.log("Banner: Accept All clicked") // Debug log
    acceptAll()
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    console.log("Banner: Reject All clicked") // Debug log
    rejectAll()
    setIsVisible(false)
  }

  const handleCustomize = () => {
    console.log("Banner: Customize clicked") // Debug log
    setShowPreferenceCenter(true)
    setIsVisible(false)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible || hasConsented) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/20 backdrop-blur-sm">
      <Card className="max-w-4xl mx-auto shadow-2xl border-0">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <Cookie className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">We Value Your Privacy</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our
                  traffic. By clicking "Accept All", you consent to our use of cookies. You can customize your
                  preferences or learn more in our{" "}
                  <a href="/cookies" className="text-emerald-600 hover:text-emerald-700 underline">
                    Cookie Policy
                  </a>
                  .
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 p-1"
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleAcceptAll} className="bg-emerald-600 hover:bg-emerald-700 text-white" type="button">
              Accept All Cookies
            </Button>
            <Button
              onClick={handleRejectAll}
              variant="outline"
              className="border-gray-300 text-gray-900 hover:bg-gray-50 bg-transparent"
              type="button"
            >
              Reject Non-Essential
            </Button>
            <Button
              onClick={handleCustomize}
              variant="outline"
              className="border-gray-300 text-gray-900 hover:bg-gray-50 bg-transparent"
              type="button"
            >
              <Settings className="w-4 h-4 mr-2" />
              Customize
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
