import { createClientSupabaseClient } from "./supabase-client"
import type { Booking, BookingInsert, BookingUpdate } from "./supabase"

export class BookingService {
  private supabase = createClientSupabaseClient()

  async getUserBookings(): Promise<Booking[]> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !user) {
        console.log("No authenticated user found:", authError?.message)
        return []
      }

      console.log("Fetching bookings for user:", user.id)

      const { data: bookings, error } = await this.supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching bookings:", error)
        return []
      }

      console.log(`Fetched ${bookings?.length || 0} bookings for user:`, user.id)
      return bookings || []
    } catch (error) {
      console.error("Error in getUserBookings:", error)
      return []
    }
  }

  async getBookingById(bookingId: string): Promise<Booking | null> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !user) {
        console.log("No authenticated user found:", authError?.message)
        return null
      }

      console.log("Fetching booking:", bookingId, "for user:", user.id)

      const { data: booking, error } = await this.supabase
        .from("bookings")
        .select("*")
        .eq("id", bookingId)
        .eq("user_id", user.id)
        .single()

      if (error) {
        if (error.code === "PGRST116") {
          console.log("Booking not found:", bookingId)
          return null
        }
        console.error("Error fetching booking:", error)
        return null
      }

      console.log("Booking fetched successfully:", booking.id)
      return booking
    } catch (error) {
      console.error("Error in getBookingById:", error)
      return null
    }
  }

  async createBooking(bookingData: Omit<BookingInsert, "user_id">): Promise<Booking | null> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !user) {
        console.error("No authenticated user found for booking creation:", authError?.message)
        return null
      }

      console.log("Creating booking for user:", user.id)

      const { data: booking, error } = await this.supabase
        .from("bookings")
        .insert({
          ...bookingData,
          user_id: user.id,
        })
        .select()
        .single()

      if (error) {
        console.error("Error creating booking:", error)
        throw error
      }

      console.log("Booking created successfully:", booking.id)
      return booking
    } catch (error) {
      console.error("Error in createBooking:", error)
      throw error
    }
  }

  async updateBooking(bookingId: string, updates: BookingUpdate): Promise<Booking | null> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !user) {
        console.error("No authenticated user found for booking update:", authError?.message)
        return null
      }

      console.log("Updating booking:", bookingId, "for user:", user.id)

      const { data: booking, error } = await this.supabase
        .from("bookings")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", bookingId)
        .eq("user_id", user.id)
        .select()
        .single()

      if (error) {
        console.error("Error updating booking:", error)
        throw error
      }

      console.log("Booking updated successfully:", booking.id)
      return booking
    } catch (error) {
      console.error("Error in updateBooking:", error)
      throw error
    }
  }

  async deleteBooking(bookingId: string): Promise<boolean> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !user) {
        console.error("No authenticated user found for booking deletion:", authError?.message)
        return false
      }

      console.log("Deleting booking:", bookingId, "for user:", user.id)

      const { error } = await this.supabase.from("bookings").delete().eq("id", bookingId).eq("user_id", user.id)

      if (error) {
        console.error("Error deleting booking:", error)
        return false
      }

      console.log("Booking deleted successfully:", bookingId)
      return true
    } catch (error) {
      console.error("Error in deleteBooking:", error)
      return false
    }
  }

  async createTestBooking(): Promise<Booking | null> {
    const testBookingData = {
      tour_name: "Test Sierra Nevada Adventure - Connection Test",
      tour_type: "adventure",
      start_date: "2024-06-15",
      end_date: "2024-06-22",
      participants: 2,
      total_amount: 2500.0,
      status: "test" as const,
      special_requests: "This is a test booking for database connection verification",
    }

    return await this.createBooking(testBookingData)
  }

  async cleanupTestBookings(): Promise<number> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !user) {
        console.error("No authenticated user found for cleanup:", authError?.message)
        return 0
      }

      console.log("Cleaning up test bookings for user:", user.id)

      const { data: deletedBookings, error } = await this.supabase
        .from("bookings")
        .delete()
        .eq("user_id", user.id)
        .eq("status", "test")
        .select()

      if (error) {
        console.error("Error cleaning up test bookings:", error)
        return 0
      }

      const deletedCount = deletedBookings?.length || 0
      console.log(`Cleaned up ${deletedCount} test bookings for user:`, user.id)
      return deletedCount
    } catch (error) {
      console.error("Error in cleanupTestBookings:", error)
      return 0
    }
  }
}

export const bookingService = new BookingService()
