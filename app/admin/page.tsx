"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase, logAdminAction } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Users, ShoppingCart, MessageSquare, Shield, Search, Mail, Phone, Download } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

interface User {
  id: string
  email: string
  full_name: string
  phone: string | null
  experience_level: string
  created_at: string
  last_login: string | null
  registration_method: string
  is_admin: boolean
  marketing_consent: boolean
  newsletter_subscribed: boolean
}

interface Booking {
  id: string
  user_id: string
  status: string
  total_cost: number | null
  created_at: string
  contact_info: any
  tour_selections: any
  profiles: {
    full_name: string
    email: string
  }
}

interface Inquiry {
  id: string
  email: string
  full_name: string
  phone: string | null
  message: string
  inquiry_type: string
  status: string
  created_at: string
  priority: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        router.push("/")
        return
      }

      const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

      if (!profile?.is_admin) {
        router.push("/")
        return
      }

      setUser(session.user)
      setIsAdmin(true)
      await loadDashboardData()

      // Log admin access
      await logAdminAction(session.user.id, "ADMIN_DASHBOARD_ACCESS", "dashboard")
    } catch (error) {
      console.error("Admin access check failed:", error)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  const loadDashboardData = async () => {
    try {
      // Load users
      const { data: usersData } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

      if (usersData) setUsers(usersData)

      // Load bookings
      const { data: bookingsData } = await supabase
        .from("bookings")
        .select(`
          *,
          profiles (
            full_name,
            email
          )
        `)
        .order("created_at", { ascending: false })

      if (bookingsData) setBookings(bookingsData)

      // Load inquiries
      const { data: inquiriesData } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false })

      if (inquiriesData) setInquiries(inquiriesData)
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    }
  }

  const exportData = async (type: "users" | "bookings" | "inquiries") => {
    if (!user) return

    try {
      let data: any[] = []
      let filename = ""

      switch (type) {
        case "users":
          data = users
          filename = "aves-users.csv"
          break
        case "bookings":
          data = bookings
          filename = "aves-bookings.csv"
          break
        case "inquiries":
          data = inquiries
          filename = "aves-inquiries.csv"
          break
      }

      // Convert to CSV
      const headers = Object.keys(data[0] || {})
      const csvContent = [
        headers.join(","),
        ...data.map((row) => headers.map((header) => JSON.stringify(row[header] || "")).join(",")),
      ].join("\n")

      // Download
      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      a.click()
      window.URL.revokeObjectURL(url)

      // Log export action
      await logAdminAction(user.id, "DATA_EXPORT", type, null, { type, count: data.length })
    } catch (error) {
      console.error("Export failed:", error)
    }
  }

  const updateInquiryStatus = async (inquiryId: string, status: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from("inquiries")
        .update({
          status,
          updated_at: new Date().toISOString(),
          assigned_to: user.id,
        })
        .eq("id", inquiryId)

      if (!error) {
        setInquiries((prev) => prev.map((inquiry) => (inquiry.id === inquiryId ? { ...inquiry, status } : inquiry)))

        await logAdminAction(user.id, "INQUIRY_STATUS_UPDATE", "inquiry", inquiryId, {
          new_status: status,
        })
      }
    } catch (error) {
      console.error("Failed to update inquiry status:", error)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader currentPage="/admin" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="w-8 h-8 text-emerald-600" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.email}. Manage your AVES platform.</p>
            </div>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
              Admin Access
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
            <TabsTrigger value="bookings">Bookings ({bookings.length})</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries ({inquiries.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{users.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {
                      users.filter((u) => u.created_at > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
                        .length
                    }{" "}
                    new this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{bookings.length}</div>
                  <p className="text-xs text-muted-foreground">
                    ${bookings.reduce((sum, b) => sum + (b.total_cost || 0), 0).toLocaleString()} total value
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inquiries.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {inquiries.filter((i) => i.status === "pending").length} pending
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{users.filter((u) => u.is_admin).length}</div>
                  <p className="text-xs text-muted-foreground">System administrators</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{user.full_name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <Badge variant={user.is_admin ? "default" : "secondary"}>
                          {user.is_admin ? "Admin" : "User"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inquiries.slice(0, 5).map((inquiry) => (
                      <div key={inquiry.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{inquiry.full_name}</p>
                          <p className="text-sm text-gray-600 truncate max-w-xs">{inquiry.message}</p>
                        </div>
                        <Badge variant={inquiry.status === "pending" ? "destructive" : "default"}>
                          {inquiry.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
              <Button onClick={() => exportData("users")} variant="outline">
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Experience
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Registration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Login
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-2">
                                <Mail className="w-3 h-3" />
                                {user.email}
                              </div>
                              {user.phone && (
                                <div className="text-sm text-gray-500 flex items-center gap-2">
                                  <Phone className="w-3 h-3" />
                                  {user.phone}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline">{user.experience_level}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div>
                              <div>{new Date(user.created_at).toLocaleDateString()}</div>
                              <div className="text-xs">{user.registration_method}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.last_login ? new Date(user.last_login).toLocaleDateString() : "Never"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {user.is_admin && <Badge variant="default">Admin</Badge>}
                              {user.newsletter_subscribed && <Badge variant="secondary">Newsletter</Badge>}
                              {user.marketing_consent && <Badge variant="outline">Marketing</Badge>}
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

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
              <Button onClick={() => exportData("bookings")} variant="outline">
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tours
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Cost
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{booking.profiles?.full_name}</div>
                              <div className="text-sm text-gray-500">{booking.profiles?.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{booking.tour_selections?.length || 0} tour(s)</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.total_cost ? `$${booking.total_cost.toLocaleString()}` : "TBD"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant={
                                booking.status === "confirmed"
                                  ? "default"
                                  : booking.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {booking.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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

          <TabsContent value="inquiries" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search inquiries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
              <Button onClick={() => exportData("inquiries")} variant="outline">
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Message
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredInquiries.map((inquiry) => (
                        <tr key={inquiry.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{inquiry.full_name}</div>
                              <div className="text-sm text-gray-500">{inquiry.email}</div>
                              {inquiry.phone && <div className="text-sm text-gray-500">{inquiry.phone}</div>}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">{inquiry.message}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline">{inquiry.inquiry_type}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant={
                                inquiry.status === "resolved"
                                  ? "default"
                                  : inquiry.status === "in_progress"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {inquiry.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(inquiry.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateInquiryStatus(inquiry.id, "in_progress")}
                                disabled={inquiry.status === "in_progress"}
                              >
                                In Progress
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateInquiryStatus(inquiry.id, "resolved")}
                                disabled={inquiry.status === "resolved"}
                              >
                                Resolve
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
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
