"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"
import { useBookings } from "@/hooks/use-bookings"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import {
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Download,
  Mail,
  Globe,
  FileText,
  Star,
  Camera,
  Bird,
  ArrowRight,
  BookOpen,
  Heart,
  Award,
} from "lucide-react"

interface Booking {
  id: string
  tour_name: string
  tour_type: string
  start_date: string
  end_date: string
  status: "confirmed" | "pending" | "cancelled"
  participants: number
  total_amount: number
  region: string
  guide_name?: string
  accommodation?: string
  created_at: string
}

interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  phone?: string
  emergency_contact?: string
  dietary_restrictions?: string
  birding_experience?: string
  preferred_regions?: string[]
  created_at: string
}

export default function DashboardClient() {
  const { user, signOut } = useAuth()
  const { bookings, loading: bookingsLoading, error: bookingsError } = useBookings()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock profile data - in real app, this would come from Supabase
  useEffect(() => {
    if (user) {
      setProfile({
        id: user.id,
        email: user.email || "",
        full_name: user.user_metadata?.full_name || "Birding Enthusiast",
        avatar_url: user.user_metadata?.avatar_url,
        phone: user.user_metadata?.phone,
        emergency_contact: user.user_metadata?.emergency_contact,
        dietary_restrictions: user.user_metadata?.dietary_restrictions,
        birding_experience: user.user_metadata?.birding_experience || "Intermediate",
        preferred_regions: user.user_metadata?.preferred_regions || ["Central Andes", "Caribbean Coast"],
        created_at: user.created_at || new Date().toISOString(),
      })
    }
  }, [user])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "cancelled":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Bird className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
            <p className="text-gray-600 mb-4">Please sign in to view your dashboard.</p>
            <Link href="/auth/login">
              <Button className="w-full">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader currentPage="/dashboard" />

      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt={profile?.full_name} />
                <AvatarFallback className="bg-emerald-100 text-emerald-700 text-lg font-semibold">
                  {profile?.full_name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile?.full_name}!</h1>
                <p className="text-gray-600">Manage your birding adventures with AVES Colombia</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/account/settings">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings?.length || 0}</p>
                </div>
                <Calendar className="w-8 h-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Confirmed Tours</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {bookings?.filter((b) => b.status === "confirmed").length || 0}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Regions Visited</p>
                  <p className="text-2xl font-bold text-gray-900">{profile?.preferred_regions?.length || 0}</p>
                </div>
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Experience Level</p>
                  <p className="text-lg font-semibold text-gray-900">{profile?.birding_experience}</p>
                </div>
                <Award className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Recent Bookings
                  </CardTitle>
                  <CardDescription>Your latest birding adventures</CardDescription>
                </CardHeader>
                <CardContent>
                  {bookingsLoading ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : bookings && bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{booking.tour_name}</p>
                            <p className="text-sm text-gray-600">{formatDate(booking.start_date)}</p>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1 capitalize">{booking.status}</span>
                          </Badge>
                        </div>
                      ))}
                      <Link href="#" onClick={() => setActiveTab("bookings")}>
                        <Button variant="outline" className="w-full bg-transparent">
                          View All Bookings
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Bird className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 mb-4">No bookings yet</p>
                      <Link href="/shopping">
                        <Button>Book Your First Tour</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your birding experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/shopping">
                    <Button className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book New Tour
                    </Button>
                  </Link>
                  <Link href="/aves-explorer">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MapPin className="w-4 h-4 mr-2" />
                      Explore Regions
                    </Button>
                  </Link>
                  <Link href="/species">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Bird className="w-4 h-4 mr-2" />
                      Browse Species
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Recommended Tours */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Based on your preferences and experience level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Central Andes Adventure</h4>
                      <Badge variant="secondary">7 days</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Perfect for intermediate birders seeking endemic species
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-emerald-600">$2,800</span>
                      <Link href="/tours/adventure">
                        <Button size="sm">Learn More</Button>
                      </Link>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Caribbean Coast Explorer</h4>
                      <Badge variant="secondary">5 days</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Coastal birding with flamingos and seabirds</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-emerald-600">$2,200</span>
                      <Link href="/regions/caribbean">
                        <Button size="sm">Learn More</Button>
                      </Link>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Photography Workshop</h4>
                      <Badge variant="secondary">10 days</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Capture stunning bird photography</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-emerald-600">$3,500</span>
                      <Link href="/tours/vision">
                        <Button size="sm">Learn More</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>Manage all your tour bookings</CardDescription>
              </CardHeader>
              <CardContent>
                {bookingsLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse border rounded-lg p-4">
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    ))}
                  </div>
                ) : bookings && bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{booking.tour_name}</h3>
                            <p className="text-gray-600">
                              {booking.tour_type} • {booking.region}
                            </p>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1 capitalize">{booking.status}</span>
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Start Date</p>
                            <p className="text-gray-900">{formatDate(booking.start_date)}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">End Date</p>
                            <p className="text-gray-900">{formatDate(booking.end_date)}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Participants</p>
                            <p className="text-gray-900">{booking.participants}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Amount</p>
                            <p className="text-gray-900 font-semibold">{formatCurrency(booking.total_amount)}</p>
                          </div>
                        </div>

                        {booking.guide_name && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-600">Guide</p>
                            <p className="text-gray-900">{booking.guide_name}</p>
                          </div>
                        )}

                        <div className="flex items-center space-x-3">
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download Itinerary
                          </Button>
                          {booking.status === "confirmed" && (
                            <Button size="sm" variant="outline">
                              <Mail className="w-4 h-4 mr-2" />
                              Contact Guide
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
                    <p className="text-gray-600 mb-6">Start your birding adventure with AVES Colombia</p>
                    <Link href="/shopping">
                      <Button>Book Your First Tour</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                    <p className="text-gray-900">{profile?.full_name || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900">{profile?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-gray-900">{profile?.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
                    <p className="text-gray-900">{profile?.emergency_contact || "Not provided"}</p>
                  </div>
                  <Link href="/account/settings">
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Birding Preferences</CardTitle>
                  <CardDescription>Your birding experience and interests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Experience Level</label>
                    <p className="text-gray-900">{profile?.birding_experience}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Preferred Regions</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile?.preferred_regions?.map((region, index) => (
                        <Badge key={index} variant="secondary">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Dietary Restrictions</label>
                    <p className="text-gray-900">{profile?.dietary_restrictions || "None specified"}</p>
                  </div>
                  <Link href="/account/settings">
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Update Preferences
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Field Guides
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Access digital field guides for Colombian birds</p>
                  <Link href="/resources">
                    <Button variant="outline" className="w-full bg-transparent">
                      Browse Guides
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="w-5 h-5 mr-2" />
                    Photo Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">View and share your birding photos</p>
                  <Button variant="outline" className="w-full bg-transparent" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Life List
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Track your bird sightings and life list</p>
                  <Button variant="outline" className="w-full bg-transparent" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Trip Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Read detailed reports from recent tours</p>
                  <Link href="/blog">
                    <Button variant="outline" className="w-full bg-transparent">
                      Read Reports
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Share your experience and read others' reviews</p>
                  <Button variant="outline" className="w-full bg-transparent" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Get help with your bookings and tours</p>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full bg-transparent">
                      Contact Support
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
