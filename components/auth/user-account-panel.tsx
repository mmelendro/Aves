"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthModal } from "./auth-modal"
import { BookingService } from "@/lib/booking-service"
import {
  User,
  LogOut,
  Settings,
  BookOpen,
  Calendar,
  Mail,
  Phone,
  Star,
  ChevronDown,
  ChevronUp,
  UserPlus,
  LogIn,
  Save,
} from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface UserAccountPanelProps {
  user: SupabaseUser | null
  onSignOut: () => Promise<void>
  bookingData?: {
    tours: any[]
    contactInfo: any
    totalCost: number
  }
}

export function UserAccountPanel({ user, onSignOut, bookingData }: UserAccountPanelProps) {
  const router = useRouter()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"signup" | "signin">("signin")
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [isSavingBooking, setIsSavingBooking] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await onSignOut()
    } finally {
      setIsSigningOut(false)
    }
  }

  const handleAuthSuccess = (newUser: any) => {
    setShowAuthModal(false)
  }

  const openAuthModal = (mode: "signup" | "signin") => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const handleSaveBooking = async () => {
    if (!user || !bookingData || bookingData.tours.length === 0) return

    setIsSavingBooking(true)
    setSaveError(null)

    try {
      console.log("[v0] Starting booking save process")
      console.log("[v0] User ID:", user.id)
      console.log("[v0] Booking data:", bookingData)

      const { data, error } = await BookingService.createBooking({
        user_id: user.id,
        tour_selections: bookingData.tours,
        contact_info: bookingData.contactInfo,
        total_cost: bookingData.totalCost,
        booking_data: {
          timestamp: new Date().toISOString(),
          source: "shopping_page",
        },
      })

      console.log("[v0] Booking service response:", { data, error })

      if (error) {
        throw new Error(error)
      }

      if (data) {
        console.log("[v0] Booking saved successfully, clearing localStorage")
        BookingService.clearPendingBooking()
        console.log("[v0] Redirecting to confirmation page")
        router.push(`/booking/confirmation?id=${data.id}`)
      }
    } catch (error: any) {
      console.error("[v0] Error saving booking:", error)
      setSaveError(error.message || "Failed to save booking")
    } finally {
      setIsSavingBooking(false)
    }
  }

  if (user) {
    const userMetadata = user.user_metadata || {}
    const fullName = userMetadata.full_name || userMetadata.name || "AVES Member"
    const firstName = userMetadata.first_name || fullName.split(" ")[0] || "Member"
    const initials = fullName
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

    return (
      <Card className="border-2 border-emerald-200 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={userMetadata.avatar_url || "/placeholder.svg"} alt={fullName} />
                <AvatarFallback className="bg-emerald-100 text-emerald-700 font-medium">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg text-gray-900">Welcome back!</CardTitle>
                <p className="text-sm text-gray-600">{firstName}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 hover:text-gray-700"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              {userMetadata.phone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{userMetadata.phone}</span>
                </div>
              )}
              {userMetadata.experience_level && (
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-emerald-600" />
                  <Badge variant="outline" className="text-xs">
                    {userMetadata.experience_level}
                  </Badge>
                </div>
              )}
            </div>

            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
              <h4 className="font-medium text-emerald-800 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Account Benefits
              </h4>
              <ul className="text-xs text-emerald-700 space-y-1">
                <li>• Saved booking preferences</li>
                <li>• Priority customer support</li>
                <li>• Exclusive member updates</li>
                <li>• Quick rebooking options</li>
              </ul>
            </div>

            {bookingData && bookingData.tours.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Current Booking
                </h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <div>
                    {bookingData.tours.length} tour{bookingData.tours.length > 1 ? "s" : ""} selected
                  </div>
                  <div className="font-medium">${bookingData.totalCost.toLocaleString()} total</div>
                </div>
                <Button
                  onClick={handleSaveBooking}
                  disabled={isSavingBooking}
                  className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSavingBooking ? "Saving..." : "Save Booking to Account"}
                </Button>
                {saveError && <p className="text-xs text-red-600 mt-2">{saveError}</p>}
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 text-gray-600 hover:text-gray-700 bg-transparent">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {isSigningOut ? "Signing out..." : "Sign Out"}
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    )
  }

  return (
    <>
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Your Account
          </CardTitle>
          <p className="text-sm text-gray-600">Sign in to save your booking and access exclusive benefits</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-3">Member Benefits</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center gap-2 text-blue-700">
                <BookOpen className="w-4 h-4" />
                <span>Save booking preferences</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <Calendar className="w-4 h-4" />
                <span>Quick rebooking options</span>
              </div>
              <div className="flex items-center gap-2 text-purple-700">
                <Mail className="w-4 h-4" />
                <span>Exclusive member updates</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => openAuthModal("signin")}
              className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button
              onClick={() => openAuthModal("signup")}
              variant="outline"
              className="w-full h-11 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Create Account
            </Button>
          </div>

          <p className="text-xs text-center text-gray-600">Join thousands of birders exploring Colombia</p>
        </CardContent>
      </Card>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        mode={authMode}
        prefilledData={bookingData?.contactInfo}
      />
    </>
  )
}
