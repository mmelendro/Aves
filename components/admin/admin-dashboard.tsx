"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, DollarSign, Activity, Shield, Download, Eye, Trash2, AlertTriangle } from "lucide-react"

interface AdminStats {
  totalUsers: number
  totalBookings: number
  totalRevenue: number
  recentSignups: number
}

interface User {
  id: string
  email: string
  full_name: string
  created_at: string
  last_login: string
  role: string
  gdpr_consent: boolean
  marketing_consent: boolean
}

interface Booking {
  id: string
  user_id: string
  total_cost: number
  status: string
  created_at: string
  booking_reference: string
  profiles: {
    email: string
    full_name: string
  }
}

interface AuditLog {
  id: string
  user_id: string
  action: string
  details: any
  created_at: string
  ip_address: string
  profiles: {
    email: string
    full_name: string
  }
}

export function AdminDashboard({ user }: { user: any }) {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    recentSignups: 0,
  })
  const [users, setUsers] = useState<User[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user?.email === "info@aves.bio") {
      loadDashboardData()
    } else {
      setError("Access denied. Admin privileges required.")
      setLoading(false)
    }
  }, [user])

  const loadDashboardData = async () => {
    try {
      setLoading(true)

      // Load stats
      const [usersResponse, bookingsResponse] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact" }),
        supabase.from("bookings").select("*", { count: "exact" }),
      ])

      if (usersResponse.error) throw usersResponse.error
      if (bookingsResponse.error) throw bookingsResponse.error

      const totalRevenue = bookingsResponse.data?.reduce((sum, booking) => sum + (booking.total_cost || 0), 0) || 0

      const recentSignups =
        usersResponse.data?.filter((user) => {
          const signupDate = new Date(user.created_at)
          const weekAgo = new Date()
          weekAgo.setDate(weekAgo.getDate() - 7)
          return signupDate > weekAgo
        }).length || 0

      setStats({
        totalUsers: usersResponse.count || 0,
        totalBookings: bookingsResponse.count || 0,
        totalRevenue,
        recentSignups,
      })

      // Load detailed data
      const [detailedUsers, detailedBookings, logs] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(50),
        supabase
          .from("bookings")
          .select(`
            *,
            profiles (
              email,
              full_name
            )
          `)
          .order("created_at", { ascending: false })
          .limit(50),
        supabase
          .from("audit_logs")
          .select(`
            *,
            profiles (
              email,
              full_name
            )
          `)
          .order("created_at", { ascending: false })
          .limit(100),
      ])

      if (detailedUsers.error) throw detailedUsers.error
      if (detailedBookings.error) throw detailedBookings.error
      if (logs.error) throw logs.error

      setUsers(detailedUsers.data || [])
      setBookings(detailedBookings.data || [])
      setAuditLogs(logs.data || [])
    } catch (error: any) {
      console.error("Error loading dashboard data:", error)
      setError(error.message || "Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const exportUserData = async () => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").csv()

      if (error) throw error

      const blob = new Blob([data], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `aves-users-${new Date().toISOString().split("T")[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error: any) {
      console.error("Export error:", error)
      setError("Failed to export user data")
    }
  }

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return
    }

    try {
      const { error } = await supabase.from("profiles").delete().eq("id", userId)

      if (error) throw error

      setUsers(users.filter((u) => u.id !== userId))

      // Also delete from auth
      await supabase.auth.admin.deleteUser(userId)
    } catch (error: any) {
      console.error("Delete error:", error)
      setError("Failed to delete user")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert className="max-w-md border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">AVES Colombia - Administrative Panel</p>
        </div>
        <Badge className="bg-red-100 text-red-800">
          <Shield className="w-3 h-3 mr-1" />
          Admin Access
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+{stats.recentSignups} this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">All time bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Gross booking value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Online</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Data Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">User Management</h3>
            <Button onClick={exportUserData} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">GDPR</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{user.full_name}</div>
                          <div className="text-sm text-gray-500">{user.role}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{user.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {user.last_login ? new Date(user.last_login).toLocaleDateString() : "Never"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-1">
                            <Badge variant={user.gdpr_consent ? "default" : "destructive"} className="text-xs">
                              {user.gdpr_consent ? "✓" : "✗"}
                            </Badge>
                            <Badge variant={user.marketing_consent ? "default" : "secondary"} className="text-xs">
                              {user.marketing_consent ? "M" : "-"}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => deleteUser(user.id)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Bookings</h3>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-4 py-3 font-mono text-sm">{booking.booking_reference}</td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{booking.profiles?.full_name}</div>
                          <div className="text-sm text-gray-500">{booking.profiles?.email}</div>
                        </td>
                        <td className="px-4 py-3 font-medium">${booking.total_cost?.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                            {booking.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {new Date(booking.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <h3 className="text-lg font-semibold">Audit Logs</h3>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {auditLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{log.profiles?.full_name || "Anonymous"}</div>
                          <div className="text-sm text-gray-500">{log.profiles?.email}</div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline">{log.action}</Badge>
                        </td>
                        <td className="px-4 py-3 font-mono text-sm">{log.ip_address}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{new Date(log.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
