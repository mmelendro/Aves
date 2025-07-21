"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  UserIcon,
  ShoppingCart,
  Calendar,
  CreditCard,
  FileText,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Loader2,
  AlertCircle,
  Clock,
  MapPin,
  Users,
} from "lucide-react"
import {
  UserService,
  CartService,
  BookingService,
  TripService,
  PaymentService,
  InvoiceService,
  MessageService,
  ReminderService,
} from "@/lib/backend-services"

interface UserProfile {
  id: string
  email: string
  full_name: string
  phone: string
  experience_level: string
  avatar_url?: string
}

interface DashboardData {
  profile: UserProfile | null
  cartItems: any[]
  bookings: any[]
  trips: any[]
  payments: any[]
  invoices: any[]
  messages: any[]
  reminders: any[]
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    profile: null,
    cartItems: [],
    bookings: [],
    trips: [],
    payments: [],
    invoices: [],
    messages: [],
    reminders: [],
  })

  useEffect(() => {
    checkAuthAndLoadData()
  }, [])

  const checkAuthAndLoadData = async () => {
    try {
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError || !authUser) {
        router.push("/shopping?error=auth_required")
        return
      }

      // Load user profile
      const { data: profile, error: profileError } = await UserService.getUserProfile(authUser.id)

      if (profileError || !profile) {
        console.error("Profile error:", profileError)
        router.push("/shopping?error=profile_not_found")
        return
      }

      setUser(profile)

      // Load all dashboard data
      const [cartResult, bookingsResult, tripsResult, paymentsResult, invoicesResult, messagesResult, remindersResult] =
        await Promise.all([
          CartService.getCartItems(authUser.id),
          BookingService.getUserBookings(authUser.id),
          TripService.getUserTrips(authUser.id),
          PaymentService.getUserPayments(authUser.id),
          InvoiceService.getUserInvoices(authUser.id),
          MessageService.getUserMessages(authUser.id),
          ReminderService.getUserReminders(authUser.id),
        ])

      setDashboardData({
        profile,
        cartItems: cartResult.data || [],
        bookings: bookingsResult.data || [],
        trips: tripsResult.data || [],
        payments: paymentsResult.data || [],
        invoices: invoicesResult.data || [],
        messages: messagesResult.data || [],
        reminders: remindersResult.data || [],
      })
    } catch (error) {
      console.error("Dashboard load error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
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
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
      case "paid":
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationHeader currentPage="/dashboard" />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationHeader currentPage="/dashboard" />
        <div className="container mx-auto px-4 py-20">
          <Alert className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Please sign in to access your dashboard.</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  const unreadMessages = dashboardData.messages.filter((msg) => !msg.read).length
  const pendingReminders = dashboardData.reminders.length
  const activeBookings = dashboardData.bookings.filter((booking) => booking.status !== "cancelled").length
  const upcomingTrips = dashboardData.trips.filter((trip) => new Date(trip.start_date) > new Date()).length

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader currentPage="/dashboard" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.full_name || "Explorer"}!</h1>
            <p className="text-gray-600">Manage your birding adventures and account settings</p>
          </div>
          <Button onClick={handleSignOut} variant="outline" className="mt-4 sm:mt-0 bg-transparent">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-emerald-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{activeBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Upcoming Trips</p>
                  <p className="text-2xl font-bold text-gray-900">{upcomingTrips}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                  <p className="text-2xl font-bold text-gray-900">{unreadMessages}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Cart Items</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.cartItems.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="trips" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Trips</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Invoices</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Messages</span>
              {unreadMessages > 0 && <Badge className="ml-1 bg-red-500 text-white text-xs">{unreadMessages}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="reminders" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Reminders</span>
              {pendingReminders > 0 && (
                <Badge className="ml-1 bg-orange-500 text-white text-xs">{pendingReminders}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Your latest booking activity</CardDescription>
                </CardHeader>
                <CardContent>
                  {dashboardData.bookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{booking.booking_reference}</p>
                        <p className="text-sm text-gray-600">{formatDate(booking.created_at)}</p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </div>
                  ))}
                  {dashboardData.bookings.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No bookings yet</p>
                  )}
                </CardContent>
              </Card>

              {/* Upcoming Trips */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Trips</CardTitle>
                  <CardDescription>Your next birding adventures</CardDescription>
                </CardHeader>
                <CardContent>
                  {dashboardData.trips
                    .filter((trip) => new Date(trip.start_date) > new Date())
                    .slice(0, 3)
                    .map((trip) => (
                      <div key={trip.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                        <div>
                          <p className="font-medium">{trip.name}</p>
                          <p className="text-sm text-gray-600">
                            {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                          </p>
                        </div>
                        <Badge className={getStatusColor(trip.status)}>{trip.status}</Badge>
                      </div>
                    ))}
                  {upcomingTrips === 0 && <p className="text-gray-500 text-center py-4">No upcoming trips</p>}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button onClick={() => router.push("/shopping")} className="h-20 flex-col">
                    <ShoppingCart className="w-6 h-6 mb-2" />
                    Book a Tour
                  </Button>
                  <Button onClick={() => setActiveTab("bookings")} variant="outline" className="h-20 flex-col">
                    <Calendar className="w-6 h-6 mb-2" />
                    View Bookings
                  </Button>
                  <Button onClick={() => setActiveTab("messages")} variant="outline" className="h-20 flex-col">
                    <MessageSquare className="w-6 h-6 mb-2" />
                    Messages
                    {unreadMessages > 0 && (
                      <Badge className="ml-1 bg-red-500 text-white text-xs">{unreadMessages}</Badge>
                    )}
                  </Button>
                  <Button onClick={() => setActiveTab("settings")} variant="outline" className="h-20 flex-col">
                    <Settings className="w-6 h-6 mb-2" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Bookings</CardTitle>
                <CardDescription>Manage your tour bookings and reservations</CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData.bookings.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.bookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{booking.booking_reference}</h3>
                            <p className="text-gray-600">
                              {booking.participants} participants • {formatCurrency(booking.total_cost)}
                            </p>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Start Date</p>
                            <p className="font-medium">{booking.start_date ? formatDate(booking.start_date) : "TBD"}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">End Date</p>
                            <p className="font-medium">{booking.end_date ? formatDate(booking.end_date) : "TBD"}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Payment Status</p>
                            <p className="font-medium">{booking.payment_status || "Pending"}</p>
                          </div>
                        </div>

                        {booking.special_requests && (
                          <div className="mt-4 p-3 bg-gray-50 rounded">
                            <p className="text-sm text-gray-600">Special Requests:</p>
                            <p className="text-sm">{booking.special_requests}</p>
                          </div>
                        )}

                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          {booking.status === "confirmed" && <Button size="sm">Make Payment</Button>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No bookings yet</p>
                    <Button onClick={() => router.push("/shopping")}>Book Your First Tour</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trips Tab */}
          <TabsContent value="trips" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Trips</CardTitle>
                <CardDescription>Past and upcoming birding adventures</CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData.trips.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.trips.map((trip) => (
                      <div key={trip.id} className="border rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{trip.name}</h3>
                            <p className="text-gray-600 flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {trip.bioregion}
                            </p>
                          </div>
                          <Badge className={getStatusColor(trip.status)}>{trip.status}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Duration</p>
                            <p className="font-medium">
                              {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Participants</p>
                            <p className="font-medium flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {Array.isArray(trip.participants) ? trip.participants.length : 1}
                            </p>
                          </div>
                        </div>

                        {trip.description && (
                          <div className="mt-4">
                            <p className="text-sm text-gray-600">{trip.description}</p>
                          </div>
                        )}

                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">
                            View Itinerary
                          </Button>
                          {trip.status === "completed" && (
                            <Button size="sm" variant="outline">
                              View Photos
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No trips yet</p>
                    <Button onClick={() => router.push("/shopping")}>Plan Your First Adventure</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Track your payments and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData.payments.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.payments.map((payment) => (
                      <div key={payment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{formatCurrency(payment.amount)}</p>
                            <p className="text-sm text-gray-600">
                              {payment.bookings?.booking_reference} • {payment.payment_type}
                            </p>
                          </div>
                          <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                        </div>

                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span>{formatDate(payment.created_at)}</span>
                          <span>{payment.payment_method || "N/A"}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No payments yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Invoices & Receipts</CardTitle>
                <CardDescription>Download and manage your invoices</CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData.invoices.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.invoices.map((invoice) => (
                      <div key={invoice.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{invoice.invoice_number}</p>
                            <p className="text-sm text-gray-600">{invoice.bookings?.booking_reference}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(invoice.total_amount)}</p>
                            <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                          <span>Issued: {formatDate(invoice.created_at)}</span>
                          {invoice.due_date && <span>Due: {formatDate(invoice.due_date)}</span>}
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                          {invoice.status === "draft" && <Button size="sm">Pay Now</Button>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No invoices yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communications and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData.messages.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`border rounded-lg p-4 ${!message.read ? "bg-blue-50 border-blue-200" : ""}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{message.subject}</h3>
                              {!message.read && <Badge className="bg-blue-500 text-white text-xs">New</Badge>}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{message.content}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <span>{formatDate(message.created_at)}</span>
                          <div className="flex gap-2">
                            {!message.read && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => MessageService.markMessageAsRead(message.id, user.id)}
                              >
                                Mark as Read
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => MessageService.archiveMessage(message.id, user.id)}
                            >
                              Archive
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No messages yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reminders Tab */}
          <TabsContent value="reminders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reminders</CardTitle>
                <CardDescription>Important dates and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData.reminders.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.reminders.map((reminder) => (
                      <div key={reminder.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-orange-500" />
                            <h3 className="font-medium">{reminder.title}</h3>
                          </div>
                          <Badge variant="outline">{reminder.reminder_type}</Badge>
                        </div>

                        {reminder.description && <p className="text-sm text-gray-600 mb-2">{reminder.description}</p>}

                        <p className="text-sm text-gray-500">Scheduled for: {formatDate(reminder.remind_at)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No pending reminders</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your profile and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Profile Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <p className="text-sm text-gray-900">{user.full_name || "Not provided"}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <p className="text-sm text-gray-900">{user.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <p className="text-sm text-gray-900">{user.phone || "Not provided"}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                        <p className="text-sm text-gray-900">{user.experience_level}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Account Actions</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <UserIcon className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Settings className="w-4 h-4 mr-2" />
                        Preferences
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Bell className="w-4 h-4 mr-2" />
                        Notification Settings
                      </Button>
                      <Button variant="destructive" className="w-full justify-start" onClick={handleSignOut}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
