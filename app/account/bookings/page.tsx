import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getCurrentUser, getUserProfile } from "@/lib/supabase-server"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, DollarSign, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "My Bookings - AVES Colombia",
  description: "View and manage your AVES Colombia tour bookings.",
}

export default async function BookingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login?redirect=/account/bookings")
  }

  const supabase = createServerSupabaseClient()

  // Get user profile first
  const userProfile = await getUserProfile(user.id)

  if (!userProfile) {
    redirect("/settings?message=Please complete your profile first")
  }

  // Fetch user bookings using profile ID
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", userProfile.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching bookings:", error)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">View and manage your AVES Colombia tour bookings</p>
        </div>

        {bookings && bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{booking.tour_type} Tour</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4" />
                        {booking.booking_reference}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">Start Date</p>
                        <p className="text-sm text-gray-600">{new Date(booking.start_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">End Date</p>
                        <p className="text-sm text-gray-600">{new Date(booking.end_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">Total Cost</p>
                        <p className="text-sm text-gray-600">${booking.total_price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-gray-500">
                      Booked on {new Date(booking.created_at).toLocaleDateString()}
                    </p>
                    {booking.notes && (
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Notes:</strong> {booking.notes}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-4">
                You haven't made any tour bookings yet. Explore our amazing birding tours!
              </p>
              <a
                href="/tours"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                Browse Tours
              </a>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
