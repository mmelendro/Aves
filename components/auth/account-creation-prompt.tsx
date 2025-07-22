"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AuthModal } from "./auth-modal"
import { User, Sparkles, X, CheckCircle, Save, Shield, Clock } from "lucide-react"

interface AccountCreationPromptProps {
  contactInfo: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    experienceLevel?: string
  }
  onAccountCreated: (user: any) => void
  onDismiss?: () => void
}

export function AccountCreationPrompt({ contactInfo, onAccountCreated, onDismiss }: AccountCreationPromptProps) {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  const handleDismiss = () => {
    setIsDismissed(true)
    onDismiss?.()
  }

  const handleAccountCreated = (user: any) => {
    setShowAuthModal(false)
    onAccountCreated(user)
  }

  if (isDismissed) return null

  return (
    <>
      <Card className="border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-blue-50 shadow-lg animate-in slide-in-from-bottom-4 duration-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-full">
                <Sparkles className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-lg text-emerald-800">Save Your Progress</CardTitle>
                <p className="text-sm text-emerald-700 mt-1">
                  Create an account to save your booking and get exclusive benefits
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Save className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">Save bookings</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">Secure data</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="text-gray-700">Quick rebooking</span>
            </div>
          </div>

          {/* Pre-filled Info Preview */}
          <div className="bg-white/70 rounded-lg p-3 border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-800">Your info is ready:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
              <div>
                <span className="font-medium">
                  {contactInfo.firstName} {contactInfo.lastName}
                </span>
              </div>
              <div>{contactInfo.email}</div>
              {contactInfo.phone && <div>{contactInfo.phone}</div>}
              {contactInfo.experienceLevel && (
                <div>
                  <Badge variant="outline" className="text-xs">
                    {contactInfo.experienceLevel}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => setShowAuthModal(true)}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-11"
            >
              <User className="w-4 h-4 mr-2" />
              Create Account
            </Button>
            <Button
              variant="outline"
              onClick={handleDismiss}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 h-11 bg-transparent"
            >
              Maybe Later
            </Button>
          </div>

          <p className="text-xs text-center text-gray-600">Account creation takes less than 30 seconds</p>
        </CardContent>
      </Card>

      {/* Enhanced Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAccountCreated}
        prefilledData={contactInfo}
        mode="signup"
        title="Complete Your Account"
        subtitle="Your information is already filled in - just add a password to continue"
      />
    </>
  )
}
