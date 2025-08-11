"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, MessageCircle, Clock, Eye, ChevronRight } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"
import { useToast } from "@/hooks/use-toast"

interface Booking {
  id: string
  booking_reference: string
  status: string
  payment_status: string
  total_cost: number
  participants: number
  start_date: string
  end_date: string
  tour_selections: any[]
  contact_info: any
  special_requests: string
  created_at: string
  updated_at: string
}

interface ChatMessage {
  id: string
  message: string
  sender_type: string
  created_at: string
  is_read: boolean
  booking_id: string
}

interface UserDashboardProps {
  user: User
  onClose?: () => void
}

export function UserDashboard({ user, onClose }: UserDashboardProps) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user])

  const loadUserData = async () => {
    try {
      setLoading(true)

      // Load bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (bookingsError) throw bookingsError

      // Load messages
      const { data: messagesData, error: messagesError } = await supabase
        .from("chat_messages")
        .select(`
          *,
          bookings!inner(user_id)
        `)
        .eq("bookings.user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10)

      if (messagesError) throw messagesError

      setBookings(bookingsData || [])
      setMessages(messagesData || [])
    } catch (error) {
      console.error("Error loading user data:", error)
      toast({
        title: "Error Loading Data",
        description: "Failed to load your dashboard data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  if (loading) {
    return (
      <Card className="border-2 border-emerald-200">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-emerald-200 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-emerald-800">
            Welcome back, {user.user_metadata?.full_name || user.email?.split("@")[0]}!
          </CardTitle>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Bookings ({bookings.length})
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Messages ({messages.filter((m) => !m.is_read).length})
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4 mt-4">
            {bookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No bookings yet</p>
                <p className="text-sm">Your saved tours will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="border border-gray-200 hover:border-emerald-300 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                            <Badge className={getPaymentStatusColor(booking.payment_status)}>
                              {booking.payment_status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Ref: {booking.booking_reference || booking.id.slice(0, 8)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-emerald-600">{formatCurrency(booking.total_cost)}</p>
                          <p className="text-xs text-gray-500">
                            {booking.participants} participant{booking.participants !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span>{booking.start_date ? formatDate(booking.start_date) : "TBD"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-purple-600" />
                          <span>Created {formatDate(booking.created_at)}</span>
                        </div>
                      </div>

                      {booking.tour_selections && booking.tour_selections.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-600 mb-2">Tours:</p>
                          <div className="flex flex-wrap gap-1">
                            {booking.tour_selections.slice(0, 3).map((tour: any, idx: number) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tour.bioregion?.replace(/^[🏖️🏔️🌊⛰️🏞️🗻🌄🌾🌳🌋🗺️✨]\s*/u, "") || `Tour ${idx + 1}`}
                              </Badge>
                            ))}
                            {booking.tour_selections.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{booking.tour_selections.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <Button variant="outline" size="sm" className="text-xs bg-transparent">
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                        {booking.status === "draft" && (
                          <Button size="sm" className="text-xs bg-emerald-600 hover:bg-emerald-700">
                            Continue Editing
                            <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="messages" className="space-y-4 mt-4">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No messages yet</p>
                <p className="text-sm">Communication with our team will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((message) => (
                  <Card
                    key={message.id}
                    className={`border ${!message.is_read ? "border-emerald-300 bg-emerald-50" : "border-gray-200"}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={message.sender_type === "admin" ? "default" : "secondary"}>
                            {message.sender_type === "admin" ? "AVES Team" : "You"}
                          </Badge>
                          {!message.is_read && <Badge className="bg-emerald-600 text-white text-xs">New</Badge>}
                        </div>
                        <span className="text-xs text-gray-500">{formatDate(message.created_at)}</span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-3">{message.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="account" className="space-y-4 mt-4">
            <div className="space-y-4">
              <Card className="border border-gray-200">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Account Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span>{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Member since:</span>
                      <span>{formatDate(user.created_at)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total bookings:</span>
                      <span>{bookings.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Unread messages:</span>
                      <span>{messages.filter((m) => !m.is_read).length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Quick Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-emerald-50 rounded-lg">
                      <div className="text-2xl font-bold text-emerald-600">
                        {bookings.filter((b) => b.status === "confirmed").length}
                      </div>
                      <div className="text-xs text-emerald-700">Confirmed Tours</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {bookings.filter((b) => b.status === "draft").length}
                      </div>
                      <div className="text-xs text-blue-700">Draft Bookings</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
