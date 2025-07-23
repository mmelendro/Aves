"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthModal } from "./auth-modal"
import { bookingService } from "@/lib/booking-service"
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
  Loader2,
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
  currentBookingId?: string
  onBookingLoaded?: (booking: any) => void
}

export function UserAccountPanel({
  user,
  onSignOut,
  bookingData,
  currentBookingId,
  onBookingLoaded,
}: UserAccountPanelProps) {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"signup" | "signin">("signin")
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [savedBookings, setSavedBookings] = useState<any[]>([])
  const [currentDraftBooking, setCurrentDraftBooking] = useState<any>(null)
  const [loadingBookings, setLoadingBookings] = useState(false)

  // Fetch user bookings when user is available
  useEffect(() => {
    if (user) {
      fetchUserBookings()
      fetchCurrentDraftBooking()
    } else {
      setSavedBookings([])
      setCurrentDraftBooking(null)
    }
  }, [user])

  const fetchUserBookings = async () => {
    if (!user) return

    setLoadingBookings(true)
    try {
      const result = await bookingService.getUserBookings()
      if (result.success && result.bookings) {
        setSavedBookings(result.bookings)
      }
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setLoadingBookings(false)
    }
  }

  const fetchCurrentDraftBooking = async () => {
    if (!user) return

    try {
      const result = await bookingService.getCurrentDraftBooking()
      if (result.success && result.booking) {
        setCurrentDraftBooking(result.booking)
        // If there's a callback to load the booking data into the form
        if (onBookingLoaded) {
          onBookingLoaded(result.booking)
        }
      }
    } catch (error) {
      console.error("Error fetching current draft booking:", error)
    }
  }

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await onSignOut()
      setSavedBookings([])
      setCurrentDraftBooking(null)
    } finally {
      setIsSigningOut(false)
    }
  }

  const handleAuthSuccess = (newUser: any) => {
    setShowAuthModal(false)
    // Refresh bookings after successful auth
    if (newUser) {
      fetchUserBookings()
      fetchCurrentDraftBooking()
    }
  }

  const openAuthModal = (mode: "signup" | "signin") => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  // If user is logged in
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

    // Calculate total saved bookings cost
    const totalSavedBookingsCost = savedBookings.reduce((sum, booking) => sum + (booking.total_price || 0), 0)
    const totalBookings = savedBookings.length

    // Use current booking data if available, otherwise use draft booking from database
    const displayBookingData =
      bookingData ||
      (currentDraftBooking
        ? {
            tours: currentDraftBooking.tour_selections || [],
            totalCost: currentDraftBooking.total_price || 0,
          }
        : null)

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
            {/* User Info */}
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

            {/* Account Benefits */}
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

            {/* Current Booking Status */}
            {displayBookingData && displayBookingData.tours.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Current Booking
                  {currentDraftBooking && (
                    <Badge variant="outline" className="text-xs ml-2">
                      Saved to Database
                    </Badge>
                  )}
                </h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <div>
                    {displayBookingData.tours.length} tour{displayBookingData.tours.length > 1 ? "s" : ""} selected
                  </div>
                  <div className="font-medium">${displayBookingData.totalCost.toLocaleString()} total</div>
                  {currentDraftBooking && (
                    <div className="text-xs text-gray-600 mt-1">
                      Last saved: {new Date(currentDraftBooking.updated_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Saved Bookings Summary */}
            {totalBookings > 0 && (
              <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Booking History
                  {loadingBookings && <Loader2 className="w-3 h-3 animate-spin" />}
                </h4>
                <div className="text-xs text-purple-700 space-y-1">
                  <div>
                    {totalBookings} booking{totalBookings > 1 ? "s" : ""} saved
                  </div>
                  <div className="font-medium">${totalSavedBookingsCost.toLocaleString()} total value</div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-gray-600 hover:text-gray-700 bg-transparent"
                onClick={() => (window.location.href = "/settings")}
              >
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

  // If user is not logged in
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
          {/* Benefits Preview */}
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

          {/* Dynamic Auth Buttons */}
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

      {/* Enhanced Auth Modal */}
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
