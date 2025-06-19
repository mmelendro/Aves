"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cookie } from "lucide-react"
import { LegalPopup } from "./legal-popup"

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false)
  const [showCookiePopup, setShowCookiePopup] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookie-consent")
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 z-40 md:left-auto md:right-4 md:max-w-md">
        <Card className="border-emerald-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Cookie className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">We use cookies</h3>
                  <p className="text-xs text-gray-600">
                    We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept",
                    you consent to our use of cookies.
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={acceptCookies} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                      Accept
                    </Button>
                    <Button size="sm" variant="outline" onClick={rejectCookies} className="flex-1">
                      Reject
                    </Button>
                  </div>
                  <div className="flex space-x-2 text-xs">
                    <button
                      onClick={() => setShowCookiePopup(true)}
                      className="text-emerald-600 hover:text-emerald-700 underline"
                    >
                      Cookie Policy
                    </button>
                    <span className="text-gray-400">•</span>
                    <button
                      onClick={() => setShowPrivacyPopup(true)}
                      className="text-emerald-600 hover:text-emerald-700 underline"
                    >
                      Privacy Policy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <LegalPopup type="privacy" isOpen={showPrivacyPopup} onClose={() => setShowPrivacyPopup(false)} />
      <LegalPopup type="cookies" isOpen={showCookiePopup} onClose={() => setShowCookiePopup(false)} />
    </>
  )
}
