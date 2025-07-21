"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/lib/supabase"
import { User, Settings, BookOpen, Heart, LogOut, Phone, Mail, Award } from "lucide-react"
import { AuthModal } from "./auth-modal"

interface UserAccountPanelProps {
  user: any
  onSignOut: () => void
  bookingData?: {
    tours: any[]
    contactInfo: any
    totalCost: number
  }
}

export function UserAccountPanel({ user, onSignOut, bookingData }: UserAccountPanelProps) {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchProfile()
      fetchBookings()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching profile:", error)
      } else if (data) {
        setProfile(data)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching bookings:", error)
      } else {
        setBookings(data || [])
      }
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveCurrentBooking = async () => {
    if (!bookingData || !user) return

    try {
      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        booking_data: bookingData,
        status: "draft",
        total_cost: bookingData.totalCost,
        contact_info: bookingData.contactInfo,
        tour_selections: bookingData.tours,
        created_at: new Date().toISOString(),
      })

      if (error) throw error

      // Refresh bookings
      fetchBookings()
    } catch (error) {
      console.error("Error saving booking:", error)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    onSignOut()
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (!user) {
    return (
      <Card className="border-2 border-emerald-200">
        <CardContent className="p-6 text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Join the AVES Flock</h3>
          <p className="text-sm text-gray-600 mb-4">
            Create an account to save your bookings, track your birding adventures, and get personalized
            recommendations.
          </p>
          <Button onClick={() => setShowAuthModal(true)} className="w-full">
            <User className="w-4 h-4 mr-2" />
            Create Account
          </Button>

          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            onSuccess={() => {}}
            mode="signup"
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-emerald-200">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
            <AvatarFallback className="bg-emerald-100 text-emerald-700">
              {getInitials(profile?.full_name || user.email)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">
              {profile?.full_name || user.user_metadata?.full_name || "AVES Member"}
            </CardTitle>
            <p className="text-sm text-gray-600">{user.email}</p>
            <Badge variant="secondary" className="mt-1 text-xs">
              {profile?.experience_level || "Birder"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Account Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-emerald-600">{bookings.length}</div>
            <div className="text-xs text-gray-600">Bookings</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-xs text-gray-600">Trips</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-xs text-gray-600">Species</div>
          </div>
        </div>

        <Separator />

        {/* Profile Info */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile Information
          </h4>
          <div className="space-y-1 text-sm">
            {profile?.phone && (
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-3 h-3" />
                {profile.phone}
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-3 h-3" />
              {user.email}
            </div>
            {profile?.experience_level && (
              <div className="flex items-center gap-2 text-gray-600">
                <Award className="w-3 h-3" />
                {profile.experience_level}
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Recent Bookings */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Recent Bookings
          </h4>
          {loading ? (
            <div className="text-sm text-gray-600">Loading...</div>
          ) : bookings.length > 0 ? (
            <div className="space-y-2">
              {bookings.slice(0, 2).map((booking) => (
                <div key={booking.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">
                        {booking.tour_selections?.length || 0} Tour{booking.tour_selections?.length !== 1 ? "s" : ""}
                      </div>
                      <div className="text-xs text-gray-600">{new Date(booking.created_at).toLocaleDateString()}</div>
                    </div>
                    <Badge variant={booking.status === "confirmed" ? "default" : "secondary"} className="text-xs">
                      {booking.status}
                    </Badge>
                  </div>
                  {booking.total_cost && (
                    <div className="text-sm font-medium text-emerald-600 mt-1">
                      ${booking.total_cost.toLocaleString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-600">No bookings yet</div>
          )}
        </div>

        {/* Save Current Booking */}
        {bookingData && (
          <>
            <Separator />
            <Button
              onClick={saveCurrentBooking}
              variant="outline"
              className="w-full text-emerald-600 border-emerald-300 hover:bg-emerald-50 bg-transparent"
            >
              <Heart className="w-4 h-4 mr-2" />
              Save Current Booking
            </Button>
          </>
        )}

        <Separator />

        {/* Account Actions */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Account Settings
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
            <BookOpen className="w-4 h-4 mr-2" />
            My Bookings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            size="sm"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
