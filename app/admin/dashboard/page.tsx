"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Calendar,
  CreditCard,
  FileText,
  MessageSquare,
  TrendingUp,
  DollarSign,
  MapPin,
  Search,
  Download,
  Plus,
  Edit,
  Eye,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { UserService, BookingService, TripService, PaymentService, AuditService } from "@/lib/backend-services"

interface AdminStats {
  totalUsers: number
  totalBookings: number
  totalRevenue: number
  activeTrips: number
  pendingPayments: number
  unreadMessages: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeTrips: 0,
    pendingPayments: 0,
    unreadMessages: 0,
  })
  const [data, setData] = useState({
    users: [],
    bookings: [],
    trips: [],
    payments: [],
    invoices: [],
    auditLogs: [],
  })

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError || !authUser) {
        router.push("/shopping?error=auth_required")
        return
      }

      // Check if user is admin
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single()

      if (profileError || !profile || profile.role !== "admin") {
        router.push("/dashboard?error=access_denied")
        return
      }

      setUser(profile)
      await loadAdminData(authUser.id)
    } catch (error) {
      console.error("Admin access check error:", error)
      router.push("/dashboard?error=system_error")
    } finally {
      setLoading(false)
    }
  }

  const loadAdminData = async (adminUserId: string) => {
    try {
      const [usersResult, bookingsResult, tripsResult, paymentsResult, auditResult] = await Promise.all([
        UserService.getAllUsers(adminUserId),
        BookingService.getAllBookings(adminUserId),
        TripService.getAllTrips(adminUserId),
        PaymentService.getAllPayments(adminUserId),
        AuditService.getAuditLogs(adminUserId, 50),
      ])

      const users = usersResult.data || []
      const bookings = bookingsResult.data || []
      const trips = tripsResult.data || []
      const payments = paymentsResult.data || []

      setData({
        users,
        bookings,
        trips,
        payments,
        invoices: [],
        auditLogs: auditResult.data || [],
      })

      // Calculate stats
      const totalRevenue = payments
        .filter((p) => p.status === "completed")
        .reduce((sum, p) => sum + Number.parseFloat(p.amount), 0)

      const activeTrips = trips.filter((t) => t.status === "active" || t.status === "upcoming").length

      const pendingPayments = payments.filter((p) => p.status === "pending").length

      setStats({
        totalUsers: users.length,
        totalBookings: bookings.length,
        totalRevenue,
        activeTrips,
        pendingPayments,
        unreadMessages: 0, // Would need to implement admin message system
      })
    } catch (error) {
      console.error("Failed to load admin data:", error)
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
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
      case "paid":
      case "completed":
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
      case "processing":
      case "upcoming":
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Access denied. Admin privileges required.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage AVES Colombia operations</p>
            </div>
            <Button onClick={() => router.push("/dashboard")}>User Dashboard</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-emerald-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Trips</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeTrips}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CreditCard className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingPayments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                  <p className="text-2xl font-bold text-gray-900">+12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="trips">Trips</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest booking activity</CardDescription>
                </CardHeader>
                <CardContent>
                  {data.bookings.slice(0, 5).map((booking: any) => (
                    <div key={booking.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{booking.booking_reference}</p>
                        <p className="text-sm text-gray-600">{booking.profiles?.full_name}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        <p className="text-sm text-gray-600">{formatCurrency(booking.total_cost)}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Active Trips */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Trips</CardTitle>
                  <CardDescription>Currently running tours</CardDescription>
                </CardHeader>
                <CardContent>
                  {data.trips
                    .filter((trip: any) => trip.status === "active" || trip.status === "upcoming")
                    .slice(0, 5)
                    .map((trip: any) => (
                      <div key={trip.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                        <div>
                          <p className="font-medium">{trip.name}</p>
                          <p className="text-sm text-gray-600">{trip.bioregion}</p>
                        </div>
                        <Badge className={getStatusColor(trip.status)}>{trip.status}</Badge>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage user accounts and permissions</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Search users..." className="pl-10 w-64" />
                    </div>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.users.map((user: any) => (
                    <div key={user.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{user.full_name || "No name"}</h3>
                            <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                              {user.role || "user"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{user.email}</p>
                          <p className="text-sm text-gray-500">
                            Joined: {formatDate(user.created_at)} • Last login:{" "}
                            {user.last_login ? formatDate(user.last_login) : "Never"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Booking Management</CardTitle>
                    <CardDescription>Manage all tour bookings</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.bookings.map((booking: any) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{booking.booking_reference}</h3>
                            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            Customer: {booking.profiles?.full_name} ({booking.profiles?.email})
                          </p>
                          <p className="text-sm text-gray-500">
                            Created: {formatDate(booking.created_at)} • {booking.participants} participants
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-lg">{formatCurrency(booking.total_cost)}</p>
                          <p className="text-sm text-gray-600">Payment: {booking.payment_status || "Pending"}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        {booking.status === "confirmed" && <Button size="sm">Create Trip</Button>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trips Tab */}
          <TabsContent value="trips" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Trip Management</CardTitle>
                    <CardDescription>Manage active and completed trips</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Trip
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.trips.map((trip: any) => (
                    <div key={trip.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{trip.name}</h3>
                            <Badge className={getStatusColor(trip.status)}>{trip.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            <MapPin className="w-4 h-4 inline mr-1" />
                            {trip.bioregion}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Guide: {trip.profiles?.full_name || "Unassigned"}</p>
                          <p className="text-sm text-gray-500">
                            Participants: {Array.isArray(trip.participants) ? trip.participants.length : 0}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Itinerary
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Trip
                        </Button>
                        <Button size="sm" variant="outline">
                          <Users className="w-4 h-4 mr-2" />
                          Manage Participants
                        </Button>
                        {trip.status === "completed" && (
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4 mr-2" />
                            Trip Report
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Payment Management</CardTitle>
                    <CardDescription>Track and manage all payments</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Payments</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.payments.map((payment: any) => (
                    <div key={payment.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{formatCurrency(payment.amount)}</h3>
                            <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">Booking: {payment.bookings?.booking_reference}</p>
                          <p className="text-sm text-gray-600 mb-1">Customer: {payment.profiles?.full_name}</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(payment.created_at)} • {payment.payment_type} •{" "}
                            {payment.payment_method || "N/A"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          {payment.status === "pending" && <Button size="sm">Process Payment</Button>}
                          {payment.status === "completed" && (
                            <Button size="sm" variant="outline">
                              Issue Refund
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>System activity and user actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.auditLogs.map((log: any) => (
                    <div key={log.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{log.action}</p>
                          <p className="text-sm text-gray-600">
                            User: {log.profiles?.full_name || "System"} ({log.profiles?.email || "N/A"})
                          </p>
                          <p className="text-sm text-gray-500">{formatDate(log.created_at)}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
