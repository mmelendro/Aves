/**
 * Cookie-choice dialog. Toggle changes are held in tempPreferences until Save;
 * Accept All and Reject All call the shared provider immediately. Category descriptions
 * are explanatory copy, not proof that those services are installed or consent-gated.
 */
"use client"

import { useColombiaHomeCopy } from "@/components/colombia-home-language"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Shield, BarChart3, Target, Settings, Info, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { useCookieConsent, type CookiePreferences } from "./cookie-consent-manager"

export function CookiePreferenceCenter() {
  const localizeHome = useColombiaHomeCopy()

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

  // This editable draft is separate from saved consent until the visitor selects Save.
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
    acceptAll()
  }

  const handleRejectAll = () => {
    rejectAll()
  }

  const handleResetConsent = () => {
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
        "Account session security",
        "Security and fraud prevention",
        "Cookie consent preferences",
        "Consent cookie fallback (up to one year)",
      ],
    },
    {
      key: "functional" as const,
      title: "Functional Cookies",
      description: "Browser settings and selections may use local or session storage independently of tracking categories.",
      icon: Settings,
      color: "blue",
      required: false,
      details: [
        "Language and region preferences",
        "Selected birds and guide settings",
        "Accessibility settings",
        "Clear browser storage to remove local selections",
        "User interface customizations",
      ],
    },
    {
      key: "analytics" as const,
      title: "Analytics Cookies",
      description: "Reserved for future analytics. No analytics loader is currently installed by this app.",
      icon: BarChart3,
      color: "purple",
      required: false,
      details: ["Off by default", "Enabling this preference does not install tracking"],
    },
    {
      key: "marketing" as const,
      title: "Marketing Cookies",
      description: "Reserved for future marketing. No advertising loader is currently installed by this app.",
      icon: Target,
      color: "orange",
      required: false,
      details: ["Off by default", "Enabling this preference does not install advertising"],
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

  return localizeHome((
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
              <Shield className="mr-2 h-5 w-5 text-emerald-700" aria-hidden="true" />
              <h3 className="font-semibold text-emerald-800">Our Privacy Commitment</h3>
            </div>
            <p className="text-emerald-700 text-sm">
              We believe in transparency and user control. You have complete control over
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
  ))
}
