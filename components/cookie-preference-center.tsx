"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Shield, BarChart3, Target, Settings, Info, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { useCookieConsent, type CookiePreferences } from "./cookie-consent-manager"

export function CookiePreferenceCenter() {
  const {
    preferences,
    hasConsented,
    updatePreferences,
    acceptAll,
    rejectAll,
    resetConsent,
    showPreferenceCenter,
    setShowPreferenceCenter,
  } = useCookieConsent()

  const [tempPreferences, setTempPreferences] = useState<CookiePreferences>(
    preferences || {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    },
  )

  // Update temp preferences when actual preferences change
  useEffect(() => {
    if (preferences) {
      setTempPreferences(preferences)
    }
  }, [preferences])

  const handleSavePreferences = () => {
    updatePreferences(tempPreferences)
    setShowPreferenceCenter(false)
  }

  const handleToggle = (key: keyof CookiePreferences, value: boolean) => {
    if (key === "essential") return // Cannot disable essential cookies
    setTempPreferences((prev) => ({ ...prev, [key]: value }))
  }

  const handleAcceptAll = () => {
    console.log("Accept All clicked") // Debug log
    acceptAll()
  }

  const handleRejectAll = () => {
    console.log("Reject All clicked") // Debug log
    rejectAll()
  }

  const handleResetConsent = () => {
    console.log("Reset consent clicked") // Debug log
    resetConsent()
    setShowPreferenceCenter(false)
  }

  const cookieCategories = [
    {
      key: "essential" as const,
      title: "Essential Cookies",
      description: "Required for basic website functionality and security. These cannot be disabled.",
      icon: Shield,
      color: "green",
      required: true,
      details: [
        "Authentication and login sessions",
        "Shopping cart functionality",
        "Security and fraud prevention",
        "Cookie consent preferences",
        "Form submission and validation",
      ],
    },
    {
      key: "functional" as const,
      title: "Functional Cookies",
      description: "Remember your preferences and choices to personalize your experience.",
      icon: Settings,
      color: "blue",
      required: false,
      details: [
        "Language and region preferences",
        "Tour comparison selections",
        "Accessibility settings",
        "Previously viewed content",
        "User interface customizations",
      ],
    },
    {
      key: "analytics" as const,
      title: "Analytics Cookies",
      description: "Help us understand how visitors use our website to improve user experience.",
      icon: BarChart3,
      color: "purple",
      required: false,
      details: [
        "Page views and user journeys",
        "Popular content identification",
        "Site performance monitoring",
        "Error tracking and debugging",
        "A/B testing and optimization",
      ],
    },
    {
      key: "marketing" as const,
      title: "Marketing Cookies",
      description: "Used to deliver relevant advertisements and measure campaign effectiveness.",
      icon: Target,
      color: "orange",
      required: false,
      details: [
        "Personalized tour recommendations",
        "Social media integration",
        "Email campaign tracking",
        "Retargeting advertisements",
        "Conversion measurement",
      ],
    },
  ]

  const getColorClasses = (color: string, enabled: boolean) => {
    const colors = {
      green: enabled ? "bg-green-50 border-green-200 text-green-800" : "bg-gray-50 border-gray-200 text-gray-600",
      blue: enabled ? "bg-blue-50 border-blue-200 text-blue-800" : "bg-gray-50 border-gray-200 text-gray-600",
      purple: enabled ? "bg-purple-50 border-purple-200 text-purple-800" : "bg-gray-50 border-gray-200 text-gray-600",
      orange: enabled ? "bg-orange-50 border-orange-200 text-orange-800" : "bg-gray-50 border-gray-200 text-gray-600",
    }
    return colors[color as keyof typeof colors] || colors.green
  }

  return (
    <Dialog open={showPreferenceCenter} onOpenChange={setShowPreferenceCenter}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <Settings className="w-6 h-6 text-emerald-600 mr-3" />
            Cookie Preferences
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* B Corp Commitment */}
          <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-sm font-bold bg-emerald-600 text-white px-2 py-1 rounded">B</span>
              <h3 className="font-semibold text-emerald-800">Our B Corp Cookie Commitment</h3>
            </div>
            <p className="text-emerald-700 text-sm">
              As a Certified B Corporation, we believe in transparency and user control. You have complete control over
              your cookie preferences, and we'll respect your choices.
            </p>
          </div>

          {/* Current Status */}
          {hasConsented && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-800">Current Status: Preferences Set</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetConsent}
                  className="text-blue-600 border-blue-300 hover:bg-blue-50 hover:text-blue-700 bg-transparent"
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Reset All
                </Button>
              </div>
            </div>
          )}

          {/* Cookie Categories */}
          <div className="space-y-4">
            {cookieCategories.map((category) => {
              const Icon = category.icon
              const isEnabled = tempPreferences[category.key]
              const isRequired = category.required

              return (
                <Card
                  key={category.key}
                  className={`transition-all duration-200 ${getColorClasses(category.color, isEnabled)}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <div>
                          <CardTitle className="text-lg flex items-center">
                            {category.title}
                            {isRequired && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                Required
                              </Badge>
                            )}
                          </CardTitle>
                          <p className="text-sm mt-1 opacity-80">{category.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isEnabled ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-400" />
                        )}
                        <Switch
                          checked={isEnabled}
                          onCheckedChange={(checked) => handleToggle(category.key, checked)}
                          disabled={isRequired}
                          aria-label={`Toggle ${category.title}`}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center text-xs opacity-75">
                        <Info className="w-3 h-3 mr-1" />
                        What this includes:
                      </div>
                      <ul className="text-xs space-y-1 opacity-75">
                        {category.details.map((detail, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button
              onClick={handleAcceptAll}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              type="button"
            >
              Accept All Cookies
            </Button>
            <Button
              onClick={handleRejectAll}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-900 hover:bg-gray-50 bg-transparent"
              type="button"
            >
              Reject Non-Essential
            </Button>
            <Button
              onClick={handleSavePreferences}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-900 hover:bg-gray-50 bg-transparent"
              type="button"
            >
              Save My Preferences
            </Button>
          </div>

          {/* Additional Information */}
          <div className="text-xs text-gray-500 space-y-2 pt-4 border-t">
            <p>
              <strong>Note:</strong> Your preferences are stored locally and will be remembered for future visits.
              Essential cookies cannot be disabled as they are necessary for basic site functionality.
            </p>
            <p>
              You can change these preferences at any time by clicking the "Cookie Preferences" link in our footer or by
              visiting our Cookie Policy page.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
