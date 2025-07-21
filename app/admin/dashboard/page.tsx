"use client"

import { useState, useEffect } from "react"
import { supabase, requireAdmin, logAuditAction } from "@/lib/supabase-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  Calendar,
  CreditCard,
  MessageSquare,
  Bell,
  Shield,
  Activity,
  DollarSign,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  Send,
  Download,
  RefreshCw,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface DashboardStats {
  total_users: number
  total_bookings: number
  pending_bookings: number
  confirmed_bookings: number
  total_payments: number
  pending_payments: number
  completed_payments: number
  active_trips: number
  upcoming_trips: number
  total_revenue: number
  unread_messages: number
  pending_reminders: number
}

interface User {
  id: string
  email: string
  full_name: string
  role: string
  created_at: string
  last_login: string
}

interface Booking {
  id: string
  booking_reference: string
  user_id: string
  tour_id: string
  status: string
  total_amount: number
  start_date: string
  end_date: string
  participants: number
  profiles: { full_name: string; email: string }
  tours: { name: string }
}

interface Payment {
  id: string
  amount: number
  status: string
  payment_method: string
  created_at: string
  bookings: { booking_reference: string }
  profiles: { full_name: string; email: string }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [messageContent, setMessageContent] = useState("")
  const [messageTitle, setMessageTitle] = useState("")
  const router = useRouter()

  useEffect(() => {
    checkAdminAndLoadData()
  }, [])

  const checkAdminAndLoadData = async () => {
    try {
      await requireAdmin()
      await loadDashboardData()
    } catch (error: any) {
      console.error("Admin check failed:", error)
      setError("Access denied. Admin privileges required.")
      router.push("/")
    }
  }

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      // Load dashboard stats
      const { data: statsData, error: statsError } = await supabase.rpc("get_admin_dashboard_stats")
      if (statsError) throw statsError
      setStats(statsData)

      // Load users
      const { data: usersData, error: usersError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100)
      if (usersError) throw usersError
      setUsers(usersData || [])

      // Load bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select("*, profiles(full_name, email), tours(name)")
        .order("created_at", { ascending: false })
        .limit(50)
      if (bookingsError) throw bookingsError
      setBookings(bookingsData || [])

      // Load payments
      const { data: paymentsData, error: paymentsError } = await supabase
        .from("payments")
        .select("*, bookings(booking_reference), profiles(full_name, email)")
        .order("created_at", { ascending: false })
        .limit(50)
      if (paymentsError) throw paymentsError
      setPayments(paymentsData || [])

      await logAuditAction(null, "admin_dashboard_accessed", {
        timestamp: new Date().toISOString(),
      })
    } catch (error: any) {
      console.error("Failed to load dashboard data:", error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase.from("bookings").update({ status: newStatus }).eq("id", bookingId)

      if (error) throw error

      await logAuditAction(null, "booking_status_updated", {
        booking_id: bookingId,
        new_status: newStatus,
      })

      await loadDashboardData()
    } catch (error: any) {
      console.error("Failed to update booking status:", error)
      setError(error.message)
    }
  }

  const sendMessageToUser = async (userId: string) => {
    if (!messageTitle.trim() || !messageContent.trim()) {
      setError("Please provide both title and message content")
      return
    }

    try {
      const { error } = await supabase.from("messages").insert({
        user_id: userId,
        title: messageTitle,
        content: messageContent,
        message_type: "general",
        sender_id: (await supabase.auth.getUser()).data.user?.id,
      })

      if (error) throw error

      await logAuditAction(null, "admin_message_sent", {
        recipient_user_id: userId,
        message_title: messageTitle,
      })

      setMessageTitle("")
      setMessageContent("")
      setSelectedUser(null)
      setError(null)
    } catch (error: any) {
      console.error("Failed to send message:", error)
      setError(error.message)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      confirmed: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      cancelled: { color: "bg-red-100 text-red-800", icon: XCircle },
      completed: { color: "bg-blue-100 text-blue-800", icon: CheckCircle },
      failed: { color: "bg-red-100 text-red-800", icon: XCircle },
      processing: { color: "bg-blue-100 text-blue-800", icon: RefreshCw },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || {
      color: "bg-gray-100 text-gray-800",
      icon: AlertTriangle,
    }
    const Icon = config.icon

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-600" />
          <h2 className="text-xl font-semibold">Loading Admin Dashboard</h2>
          <p className="text-gray-600">Please wait while we load the data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage users, bookings, and system operations</p>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={loadDashboardData} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Badge className="bg-emerald-100 text-emerald-800">
              <Shield className="w-3 h-3 mr-1" />
              Administrator
            </Badge>
          </div>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_users}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_bookings}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.pending_bookings} pending, {stats.confirmed_bookings} confirmed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.total_revenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{stats.completed_payments} completed payments</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Trips</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.active_trips}</div>
                <p className="text-xs text-muted-foreground">{stats.upcoming_trips} upcoming</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system activities and user actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">New user registration</p>
                        <p className="text-xs text-gray-500">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Booking confirmed</p>
                        <p className="text-xs text-gray-500">15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Payment completed</p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Current system status and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database Connection</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Healthy
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Authentication Service</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Operational
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Payment Processing</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                    {stats && stats.pending_reminders > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pending Reminders</span>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Bell className="w-3 h-3 mr-1" />
                          {stats.pending_reminders}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.full_name || "N/A"}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              user.role === "admin"
                                ? "bg-red-100 text-red-800"
                                : user.role === "guide"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {user.last_login ? new Date(user.last_login).toLocaleDateString() : "Never"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => setSelectedUser(user)}>
                              <Send className="w-3 h-3 mr-1" />
                              Message
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Management</CardTitle>
                <CardDescription>View and manage all tour bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Tour</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.booking_reference}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{booking.profiles?.full_name}</p>
                            <p className="text-xs text-gray-500">{booking.profiles?.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{booking.tours?.name}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{new Date(booking.start_date).toLocaleDateString()}</p>
                            <p className="text-xs text-gray-500">
                              to {new Date(booking.end_date).toLocaleDateString()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>${booking.total_amount.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Select
                              value={booking.status}
                              onValueChange={(value) => updateBookingStatus(booking.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
                <CardDescription>Monitor and manage all payment transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking Ref</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.bookings?.booking_reference}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{payment.profiles?.full_name}</p>
                            <p className="text-xs text-gray-500">{payment.profiles?.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>${payment.amount.toLocaleString()}</TableCell>
                        <TableCell>{payment.payment_method || "N/A"}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell>{new Date(payment.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Send Message to User</CardTitle>
                  <CardDescription>Send notifications and messages to users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="user-select">Select User</Label>
                    <Select
                      value={selectedUser?.id || ""}
                      onValueChange={(value) => {
                        const user = users.find((u) => u.id === value)
                        setSelectedUser(user || null)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a user..." />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.full_name} ({user.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message-title">Message Title</Label>
                    <Input
                      id="message-title"
                      value={messageTitle}
                      onChange={(e) => setMessageTitle(e.target.value)}
                      placeholder="Enter message title..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="message-content">Message Content</Label>
                    <Textarea
                      id="message-content"
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      placeholder="Enter your message..."
                      rows={4}
                    />
                  </div>

                  <Button
                    onClick={() => selectedUser && sendMessageToUser(selectedUser.id)}
                    disabled={!selectedUser || !messageTitle.trim() || !messageContent.trim()}
                    className="w-full"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Notifications</CardTitle>
                  <CardDescription>Recent system alerts and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats && stats.unread_messages > 0 && (
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Unread Messages</p>
                          <p className="text-xs text-gray-500">{stats.unread_messages} messages need attention</p>
                        </div>
                      </div>
                    )}

                    {stats && stats.pending_reminders > 0 && (
                      <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                        <Bell className="w-4 h-4 text-yellow-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Pending Reminders</p>
                          <p className="text-xs text-gray-500">{stats.pending_reminders} reminders to send</p>
                        </div>
                      </div>
                    )}

                    {stats && stats.pending_payments > 0 && (
                      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                        <CreditCard className="w-4 h-4 text-red-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Pending Payments</p>
                          <p className="text-xs text-gray-500">{stats.pending_payments} payments need processing</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">System Status</p>
                        <p className="text-xs text-gray-500">All systems operational</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Message Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Send Message to {selectedUser.full_name}</CardTitle>
                <CardDescription>{selectedUser.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="modal-title">Title</Label>
                  <Input
                    id="modal-title"
                    value={messageTitle}
                    onChange={(e) => setMessageTitle(e.target.value)}
                    placeholder="Message title..."
                  />
                </div>
                <div>
                  <Label htmlFor="modal-content">Message</Label>
                  <Textarea
                    id="modal-content"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Your message..."
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => sendMessageToUser(selectedUser.id)} className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedUser(null)
                      setMessageTitle("")
                      setMessageContent("")
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
