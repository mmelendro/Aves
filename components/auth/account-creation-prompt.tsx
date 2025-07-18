"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AuthModal } from "./auth-modal"
import { User, Star, Shield, Calendar, Heart, CheckCircle, Sparkles } from "lucide-react"

interface AccountCreationPromptProps {
  contactInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    experienceLevel: string
  }
  onAccountCreated: (user: any) => void
  className?: string
}

export function AccountCreationPrompt({ contactInfo, onAccountCreated, className }: AccountCreationPromptProps) {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const benefits = [
    {
      icon: Calendar,
      title: "Save & Track Bookings",
      description: "Keep all your birding adventures organized in one place",
    },
    {
      icon: Heart,
      title: "Personalized Recommendations",
      description: "Get tour suggestions based on your experience and interests",
    },
    {
      icon: Star,
      title: "Exclusive Member Benefits",
      description: "Early access to new tours and special member pricing",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security",
    },
  ]

  return (
    <Card className={`border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-blue-50 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">Join the AVES Flock!</h3>
              <p className="text-sm text-gray-600">Create your account in seconds</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDismissed(true)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </Button>
        </div>

        <Alert className="border-emerald-200 bg-emerald-50 mb-4">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <AlertDescription className="text-emerald-800">
            We've pre-filled your information to make account creation quick and easy!
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
              <benefit.icon className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-sm text-gray-900">{benefit.title}</h4>
                <p className="text-xs text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={() => setShowAuthModal(true)} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
            <User className="w-4 h-4 mr-2" />
            Create Account (30 seconds)
          </Button>
          <Button variant="outline" onClick={() => setDismissed(true)} className="flex-1 border-gray-300">
            Continue as Guest
          </Button>
        </div>

        <div className="text-xs text-center text-gray-500 mt-3">Free forever • No spam • Secure with Supabase</div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={onAccountCreated}
          prefilledData={contactInfo}
          mode="signup"
        />
      </CardContent>
    </Card>
  )
}
