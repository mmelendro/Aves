import { supabase } from "./supabase-client"
import type { Database } from "./supabase"

type Booking = Database["public"]["Tables"]["bookings"]["Row"]
type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"]
type BookingUpdate = Database["public"]["Tables"]["bookings"]["Update"]
type TripBooking = Database["public"]["Tables"]["trip_bookings"]["Row"]
type TripBookingInsert = Database["public"]["Tables"]["trip_bookings"]["Insert"]
type TripBookingUpdate = Database["public"]["Tables"]["trip_bookings"]["Update"]
type ChatMessage = Database["public"]["Tables"]["chat_messages"]["Row"]
type ChatMessageInsert = Database["public"]["Tables"]["chat_messages"]["Insert"]

export class BookingService {
  // Create a new booking
  static async createBooking(bookingData: TripBookingInsert) {
    try {
      const { data, error } = await supabase
        .from("trip_bookings")
        .insert(bookingData)
        .select(`
          *,
          trips:trip_id (
            title,
            slug,
            duration_days,
            price_per_person,
            featured_image_url
          )
        `)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  // Get user's bookings with optional status filter
  static async getUserBookings(userId: string, status?: string) {
    try {
      let query = supabase
        .from("trip_bookings")
        .select(`
          *,
          trips:trip_id (
            title,
            slug,
            duration_days,
            price_per_person,
            featured_image_url,
            region,
            difficulty_level
          )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (status) {
        query = query.eq("booking_status", status)
      }

      const { data, error } = await query

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  // Get booking by ID
  static async getBookingById(bookingId: string) {
    try {
      const { data, error } = await supabase
        .from("trip_bookings")
        .select(`
          *,
          trips:trip_id (
            *,
            trip_itineraries (*),
            trip_target_birds (*),
            trip_resources (*)
          )
        `)
        .eq("id", bookingId)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  // Update booking
  static async updateBooking(bookingId: string, updates: TripBookingUpdate) {
    try {
      const { data, error } = await supabase
        .from("trip_bookings")
        .update(updates)
        .eq("id", bookingId)
        .select(`
          *,
          trips:trip_id (
            title,
            slug,
            duration_days,
            price_per_person,
            featured_image_url
          )
        `)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  // Delete booking
  static async deleteBooking(bookingId: string) {
    try {
      const { error } = await supabase.from("trip_bookings").delete().eq("id", bookingId)

      if (error) throw error
      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    }
  }

  // Get booking statistics for user
  static async getBookingStats(userId: string) {
    try {
      const { data, error } = await supabase
        .from("trip_bookings")
        .select("booking_status, payment_status, total_amount")
        .eq("user_id", userId)

      if (error) throw error

      const stats = {
        total: data.length,
        saved: data.filter((b) => b.booking_status === "saved").length,
        confirmed: data.filter((b) => b.booking_status === "confirmed").length,
        paid: data.filter((b) => b.booking_status === "paid").length,
        completed: data.filter((b) => b.booking_status === "completed").length,
        cancelled: data.filter((b) => b.booking_status === "cancelled").length,
        totalSpent: data.filter((b) => b.payment_status === "paid").reduce((sum, b) => sum + (b.total_amount || 0), 0),
      }

      return { data: stats, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  // Chat message methods
  static async sendMessage(messageData: ChatMessageInsert) {
    try {
      const { data, error } = await supabase.from("chat_messages").insert(messageData).select().single()

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  // Get chat messages for a booking
  static async getChatMessages(bookingId: string) {
    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("booking_id", bookingId)
        .order("created_at", { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  // Mark messages as read
  static async markMessagesAsRead(bookingId: string, userId: string) {
    try {
      const { error } = await supabase
        .from("chat_messages")
        .update({ is_read: true })
        .eq("booking_id", bookingId)
        .neq("sender_id", userId)

      if (error) throw error
      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    }
  }

  // Subscribe to chat messages
  static subscribeToChatMessages(bookingId: string, callback: (message: ChatMessage) => void) {
    return supabase
      .channel(`chat_messages:${bookingId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `booking_id=eq.${bookingId}`,
        },
        (payload) => {
          callback(payload.new as ChatMessage)
        },
      )
      .subscribe()
  }

  // Subscribe to booking updates
  static subscribeToBookingUpdates(userId: string, callback: (booking: TripBooking) => void) {
    return supabase
      .channel(`trip_bookings:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "trip_bookings",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload.new as TripBooking)
        },
      )
      .subscribe()
  }
}
