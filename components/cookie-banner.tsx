"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cookie, Settings, Shield } from "lucide-react"
import { useCookieConsent } from "./cookie-consent-manager"
import Link from "next/link"

export function CookieBanner() {
  const { hasConsented, acceptAll, rejectAll, setShowPreferenceCenter } = useCookieConsent()

  // Don't render if user has already consented
  if (hasConsented) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-lg">
      <Card className="border-emerald-200 shadow-xl bg-white/95 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Cookie className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">We Value Your Privacy</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use cookies to enhance your browsing experience, analyze our traffic, and provide personalized
                  content. By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>

              {/* B Corp Badge */}
              <div className="flex items-center text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg">
                <span className="mr-2 text-xs font-bold bg-emerald-600 text-white px-1.5 py-0.5 rounded">B</span>
                <span>As a B Corp, we're committed to transparency and your data rights</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={acceptAll}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                    size="sm"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Accept All
                  </Button>
                  <Button
                    onClick={rejectAll}
                    variant="outline"
                    className="flex-1 border-gray-300 hover:bg-gray-50"
                    size="sm"
                  >
                    Reject Non-Essential
                  </Button>
                </div>
                <Button
                  onClick={() => setShowPreferenceCenter(true)}
                  variant="ghost"
                  className="w-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                  size="sm"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Customize Preferences
                </Button>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap gap-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
                <Link href="/privacy" className="hover:text-emerald-600 underline transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/cookies" className="hover:text-emerald-600 underline transition-colors">
                  Cookie Policy
                </Link>
                <Link href="/terms" className="hover:text-emerald-600 underline transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
