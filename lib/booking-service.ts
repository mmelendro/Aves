import { createClient } from "@/lib/supabase/client"
import type { Database } from "./database.types"

type Booking = Database["public"]["Tables"]["bookings"]["Row"]
type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"]
type BookingUpdate = Database["public"]["Tables"]["bookings"]["Update"]

export class BookingService {
  private static getClient() {
    return createClient()
  }

  static async createBooking(bookingData: {
    user_id: string
    tour_selections: any[]
    contact_info: any
    questions?: string
    total_cost: number
    booking_data?: any
  }): Promise<{ data: Booking | null; error: string | null }> {
    try {
      const supabase = this.getClient()

      const insertData: BookingInsert = {
        user_id: bookingData.user_id,
        tour_selections: bookingData.tour_selections,
        contact_info: bookingData.contact_info,
        questions: bookingData.questions,
        total_amount: bookingData.total_cost,
        booking_data: bookingData.booking_data || {},
        status: "pending",
      }

      const { data, error } = await supabase.from("bookings").insert(insertData).select().single()

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      console.error("[v0] Error creating booking:", error)
      return { data: null, error: error.message }
    }
  }

  // Get user's bookings
  static async getUserBookings(userId: string, status?: string) {
    try {
      const supabase = this.getClient()

      let query = supabase.from("bookings").select("*").eq("user_id", userId).order("created_at", { ascending: false })

      if (status) {
        query = query.eq("status", status)
      }

      const { data, error } = await query

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      console.error("[v0] Error fetching bookings:", error)
      return { data: null, error: error.message }
    }
  }

  // Get booking by ID
  static async getBookingById(bookingId: string) {
    try {
      const supabase = this.getClient()

      const { data, error } = await supabase.from("bookings").select("*").eq("id", bookingId).single()

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      console.error("[v0] Error fetching booking:", error)
      return { data: null, error: error.message }
    }
  }

  // Update booking
  static async updateBooking(bookingId: string, updates: BookingUpdate) {
    try {
      const supabase = this.getClient()

      const { data, error } = await supabase.from("bookings").update(updates).eq("id", bookingId).select().single()

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      console.error("[v0] Error updating booking:", error)
      return { data: null, error: error.message }
    }
  }

  // Delete booking
  static async deleteBooking(bookingId: string) {
    try {
      const supabase = this.getClient()

      const { error } = await supabase.from("bookings").delete().eq("id", bookingId)

      if (error) throw error
      return { error: null }
    } catch (error: any) {
      console.error("[v0] Error deleting booking:", error)
      return { error: error.message }
    }
  }

  static saveToLocalStorage(bookingData: any) {
    try {
      localStorage.setItem("aves-pending-booking", JSON.stringify(bookingData))
      return true
    } catch (error) {
      console.error("[v0] Error saving to localStorage:", error)
      return false
    }
  }

  static getPendingBooking() {
    try {
      const data = localStorage.getItem("aves-pending-booking")
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error("[v0] Error reading from localStorage:", error)
      return null
    }
  }

  static clearPendingBooking() {
    try {
      localStorage.removeItem("aves-pending-booking")
      return true
    } catch (error) {
      console.error("[v0] Error clearing localStorage:", error)
      return false
    }
  }
}
