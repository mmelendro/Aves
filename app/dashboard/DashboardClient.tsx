"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Bird,
  Settings,
  Plus,
  MessageCircle,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/hooks/use-auth-enhanced"
import { useBookings, useBookingStats } from "@/hooks/use-bookings"
import type { UserProfile } from "@/lib/supabase-client"

interface DashboardClientProps {
  initialProfile: UserProfile | null
}

export default function DashboardClient({ initialProfile }: DashboardClientProps) {
  const { user, profile } = useAuth()
  const { bookings: savedBookings } = useBookings("saved")
  const { bookings: purchasedBookings } = useBookings("purchased")
  const { bookings: pastBookings } = useBookings("past")
  const { stats } = useBookingStats()

  const userProfile = profile || initialProfile
  const userName = userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : "AVES Member"
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  // Quick stats for dashboard cards
  const quickStats = [
    {
      title: "Saved Trips",
      value: savedBookings?.length || 0,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/dashboard/bookings?tab=saved",
    },
    {
      title: "Upcoming Trips",
      value: purchasedBookings?.length || 0,
      icon: Calendar,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      href: "/dashboard/bookings?tab=purchased",
    },
    {
      title: "Completed Trips",
      value: pastBookings?.length || 0,
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      href: "/dashboard/bookings?tab=past",
    },
    {
      title: "Total Spent",
      value: `$${stats?.totalSpent?.toLocaleString() || "0"}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/dashboard/bookings",
    },
  ]

  // Recent activity items
  const recentActivity = [
    ...(savedBookings?.slice(0, 3).map((booking) => ({
      id: booking.id,
      type: "booking_saved",
      title: `Saved ${booking.tour_type} in ${booking.bioregion}`,
      time: new Date(booking.created_at).toLocaleDateString(),
      icon: Clock,
      color: "text-blue-600",
    })) || []),
    ...(purchasedBookings?.slice(0, 2).map((booking) => ({
      id: booking.id,
      type: "booking_confirmed",
      title: `Confirmed ${booking.tour_type} trip`,
      time: new Date(booking.confirmed_at || booking.created_at).toLocaleDateString(),
      icon: CheckCircle,
      color: "text-emerald-600",
    })) || []),
  ]
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader currentPage="/dashboard" />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={userProfile?.profile_image_url || undefined} />
                <AvatarFallback className="bg-emerald-100 text-emerald-700 text-lg font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {userProfile?.first_name || "Explorer"}!
                </h1>
                <p className="text-gray-600">Ready for your next Colombian birding adventure?</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/shopping">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Plan New Trip
                </Button>
              </Link>
              <Link href="/dashboard/settings">
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Link key={index} href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recent Bookings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Bookings */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  Recent Bookings
                </CardTitle>
                <Link href="/dashboard/bookings">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {savedBookings && savedBookings.length > 0 ? (
                  <div className="space-y-4">
                    {savedBookings.slice(0, 3).map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-2 rounded-full ${
                              booking.booking_status === "confirmed"
                                ? "bg-emerald-100"
                                : booking.booking_status === "saved"
                                  ? "bg-blue-100"
                                  : "bg-gray-100"
                            }`}
                          >
                            <Bird
                              className={`w-4 h-4 ${
                                booking.booking_status === "confirmed"
                                  ? "text-emerald-600"
                                  : booking.booking_status === "saved"
                                    ? "text-blue-600"
                                    : "text-gray-600"
                              }`}
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {booking.tour_type} - {booking.bioregion}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {booking.duration_days} days
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {booking.participants} people
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />${booking.total_cost.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              booking.booking_status === "confirmed"
                                ? "default"
                                : booking.booking_status === "saved"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {booking.booking_status}
                          </Badge>
                          <Link href={`/dashboard/trips/${booking.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bird className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                    <p className="text-gray-600 mb-4">Start planning your Colombian birding adventure!</p>
                    <Link href="/shopping">
                      <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Plan Your First Trip
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/shopping">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                    >
                      <Plus className="w-6 h-6" />
                      <span className="text-sm">New Trip</span>
                    </Button>
                  </Link>
                  <Link href="/aves-explorer">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                    >
                      <MapPin className="w-6 h-6" />
                      <span className="text-sm">Explore</span>
                    </Button>
                  </Link>
                  <Link href="/species">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                    >
                      <Bird className="w-6 h-6" />
                      <span className="text-sm">Species</span>
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                    >
                      <MessageCircle className="w-6 h-6" />
                      <span className="text-sm">Support</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity & Profile */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Profile Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Profile completeness</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-600 w-3/4"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
