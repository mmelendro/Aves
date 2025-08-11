"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import {
  BookOpen,
  Calendar,
  MessageCircle,
  CreditCard,
  User,
  Save,
  Clock,
  DollarSign,
  Users,
  X,
  RefreshCw,
} from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface UserDashboardProps {
  user: SupabaseUser
  isOpen: boolean
  onClose: () => void
  currentBookingData?: {
    tours: any[]
    contactInfo: any
    totalCost: number
  }
  onSaveBooking?: () => Promise<void>
}

interface BookingData {
  id: string
  booking_reference: string
  tour_name: string
  tour_type: string
  status: string
  payment_status: string
  start_date: string
  end_date: string
  participants: number
  total_cost: number
  created_at: string
  tour_selections: any
}

interface MessageData {
  id: string
  message: string
  sender_type: string
  created_at: string
  is_read: boolean
  booking_id: string
  message_type: string
}

interface PaymentData {
  id: string
  amount: number
  payment_status: string
  payment_type: string
  due_date: string
  created_at: string
  booking_id: string
}

export function UserDashboard({ user, isOpen, onClose, currentBookingData, onSaveBooking }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState("bookings")
  const [bookings, setBookings] = useState<BookingData[]>([])
  const [messages, setMessages] = useState<MessageData[]>([])
  const [payments, setPayments] = useState<PaymentData[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  // Load user data when dashboard opens
  useEffect(() => {
    if (isOpen && user) {
      loadUserData()
    }
  }, [isOpen, user])

  const loadUserData = async () => {
    setLoading(true)
    try {
      // Load bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (bookingsError) throw bookingsError
      setBookings(bookingsData || [])

      // Load messages
      const { data: messagesData, error: messagesError } = await supabase
        .from("chat_messages")
        .select("*")
        .in("booking_id", bookingsData?.map((b) => b.id) || [])
        .order("created_at", { ascending: false })

      if (messagesError) throw messagesError
      setMessages(messagesData || [])

      // Load payments
      const { data: paymentsData, error: paymentsError } = await supabase
        .from("booking_payments")
        .select("*")
        .in("booking_id", bookingsData?.map((b) => b.id) || [])
        .order("created_at", { ascending: false })

      if (paymentsError) throw paymentsError
      setPayments(paymentsData || [])
    } catch (error: any) {
      console.error("Error loading user data:", error)
      toast({
        title: "Error",
        description: "Failed to load your data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveCurrentBooking = async () => {
    if (!onSaveBooking || !currentBookingData) return

    setSaving(true)
    try {
      await onSaveBooking()
      toast({
        title: "Booking Saved",
        description: "Your booking has been saved successfully!",
      })
      // Reload data to show the new booking
      await loadUserData()
    } catch (error: any) {
      console.error("Error saving booking:", error)
      toast({
        title: "Error",
        description: "Failed to save booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
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

  const unreadMessages = messages.filter((m) => !m.is_read).length

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-600" />
                Your AVES Dashboard
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Welcome back, {user.user_metadata?.first_name || "Member"}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Save Current Booking Button */}
          {currentBookingData && currentBookingData.tours.length > 0 && (
            <Alert className="mt-4 border-emerald-200 bg-emerald-50">
              <Save className="h-4 w-4 text-emerald-600" />
              <AlertDescription className="flex items-center justify-between">
                <span className="text-emerald-800">
                  You have unsaved booking selections ({currentBookingData.tours.length} tours, $
                  {currentBookingData.totalCost.toLocaleString()})
                </span>
                <Button
                  onClick={handleSaveCurrentBooking}
                  disabled={saving}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white ml-4"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-3 h-3 mr-1" />
                      Save Booking
                    </>
                  )}
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Bookings</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {bookings.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Messages</span>
                {unreadMessages > 0 && <Badge className="ml-1 bg-red-500 text-white text-xs">{unreadMessages}</Badge>}
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span className="hidden sm:inline">Payments</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {payments.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
            </TabsList>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-6 h-6 animate-spin text-emerald-600" />
                <span className="ml-2 text-gray-600">Loading your data...</span>
              </div>
            ) : (
              <>
                {/* Bookings Tab */}
                <TabsContent value="bookings" className="space-y-4">
                  {bookings.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                      <p className="text-gray-600">Your saved and confirmed bookings will appear here.</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {bookings.map((booking) => (
                        <Card key={booking.id} className="border-l-4 border-l-emerald-500">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {booking.tour_name || `${booking.tour_type} Tour`}
                                </h4>
                                <p className="text-sm text-gray-600">Ref: {booking.booking_reference}</p>
                              </div>
                              <div className="flex gap-2">
                                <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                                <Badge className={getStatusColor(booking.payment_status)}>
                                  {booking.payment_status}
                                </Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-blue-600" />
                                <span>
                                  {formatDate(booking.start_date)} - {formatDate(booking.end_date)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-purple-600" />
                                <span>{booking.participants} people</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                <span>${booking.total_cost?.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-600" />
                                <span>{formatDate(booking.created_at)}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Messages Tab */}
                <TabsContent value="messages" className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No messages</h3>
                      <p className="text-gray-600">Messages from the AVES team will appear here.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((message) => (
                        <Card
                          key={message.id}
                          className={`${!message.is_read ? "border-l-4 border-l-blue-500 bg-blue-50" : ""}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Badge variant={message.sender_type === "admin" ? "default" : "secondary"}>
                                  {message.sender_type === "admin" ? "AVES Team" : "You"}
                                </Badge>
                                {!message.is_read && <Badge className="bg-blue-500 text-white text-xs">New</Badge>}
                              </div>
                              <span className="text-xs text-gray-500">{formatDate(message.created_at)}</span>
                            </div>
                            <p className="text-sm text-gray-700">{message.message}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Payments Tab */}
                <TabsContent value="payments" className="space-y-4">
                  {payments.length === 0 ? (
                    <div className="text-center py-12">
                      <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No payments</h3>
                      <p className="text-gray-600">Your payment history will appear here.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {payments.map((payment) => (
                        <Card key={payment.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                <span className="font-medium">${payment.amount?.toLocaleString()}</span>
                                <Badge className={getStatusColor(payment.payment_status)}>
                                  {payment.payment_status}
                                </Badge>
                              </div>
                              <span className="text-sm text-gray-600">{formatDate(payment.created_at)}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              <span>Type: {payment.payment_type}</span>
                              {payment.due_date && <span className="ml-4">Due: {formatDate(payment.due_date)}</span>}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Account Tab */}
                <TabsContent value="account" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <label className="font-medium text-gray-700">Email</label>
                          <p className="text-gray-600">{user.email}</p>
                        </div>
                        <div>
                          <label className="font-medium text-gray-700">Full Name</label>
                          <p className="text-gray-600">{user.user_metadata?.full_name || "Not provided"}</p>
                        </div>
                        <div>
                          <label className="font-medium text-gray-700">Phone</label>
                          <p className="text-gray-600">{user.user_metadata?.phone || "Not provided"}</p>
                        </div>
                        <div>
                          <label className="font-medium text-gray-700">Experience Level</label>
                          <p className="text-gray-600">{user.user_metadata?.experience_level || "Not specified"}</p>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-emerald-600">{bookings.length}</div>
                          <div className="text-xs text-gray-600">Total Bookings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{unreadMessages}</div>
                          <div className="text-xs text-gray-600">Unread Messages</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            ${payments.reduce((sum, p) => sum + (p.amount || 0), 0).toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600">Total Paid</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
