import { createClientSupabaseClient } from "./supabase-client"
import type { Booking, BookingInsert, BookingUpdate } from "./supabase"

interface BookingServiceResponse<T> {
  success: boolean
  data?: T
  error?: string
  bookings?: Booking[]
  booking?: Booking
}

export class BookingService {
  private supabase = createClientSupabaseClient()

  async getUserBookings(): Promise<BookingServiceResponse<Booking[]>> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !user) {
        console.log("No authenticated user found:", authError?.message)
        return { success: false, error: "No authenticated user", bookings: [] }
      }

      console.log("Fetching bookings for auth user:", user.id)

      // First get the user's profile to get their profile ID
      const { data: profile, error: profileError } = await this.supabase
        .from("user_profiles")
        .select("id")
        .eq("auth_user_id", user.id)
        .single()

      if (profileError) {
        console.error("Error fetching user profile:", profileError)
        return { success: false, error: "User profile not found", bookings: [] }
      }

      // Now fetch bookings using the profile ID
      const { data: bookings, error } = await this.supabase
        .from("bookings")
        .select("*")
        .eq("user_id", profile.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching bookings:", error)
        return { success: false, error: error.message, bookings: [] }
      }

      console.log(`Fetched ${bookings?.length || 0} bookings for profile ID:`, profile.id)
      return { success: true, bookings: bookings || [] }
    } catch (error) {
      console.error("Error in getUserBookings:", error)
      return { success: false, error: "Unexpected error", bookings: [] }
    }
  }

  async getBookingById(bookingId: string): Promise<BookingServiceResponse<Booking>> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !user) {
        console.log("No authenticated user found:", authError?.message)
        return { success: false, error: "No authenticated user" }
      }

      console.log("Fetching booking:", bookingId, "for auth user:", user.id)

      // First get the user's profile to get their profile ID
      const { data: profile, error: profileError } = await this.supabase
        .from("user_profiles")
        .select("id")
        .eq("auth_user_id", user.id)
        .single()

      if (profileError) {
        console.error("Error fetching user profile:", profileError)
        return { success: false, error: "User profile not found" }
      }

      // Now fetch the specific booking
      const { data: booking, error } = await this.supabase
        .from("bookings")
        .select("*")
        .eq("id", bookingId)
        .eq("user_id", profile.id)
        .single()

      if (error) {
        if (error.code === "PGRST116") {
          console.log("Booking not found:", bookingId)
          return { success: false, error: "Booking not found" }
        }
        console.error("Error fetching booking:", error)
        return { success: false, error: error.message }
      }

      console.log("Booking fetched successfully:", booking.id)
      return { success: true, booking }
    } catch (error) {
      console.error("Error in getBookingById:", error)
      return { success: false, error: "Unexpected error" }
    }
  }

  async createBooking(bookingData: Omit<BookingInsert, "user_id">): Promise<BookingServiceResponse<Booking>> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !user) {
        console.error("No authenticated user found for booking creation:", authError?.message)
        return { success: false, error: "No authenticated user" }
      }

      console.log("Creating booking for auth user:", user.id)

      // First get the user's profile to get their profile ID
      const { data: profile, error: profileError } = await this.supabase
        .from("user_profiles")
        .select("id")
        .eq("auth_user_id", user.id)
        .single()

      if (profileError) {
        console.error("Error fetching user profile:", profileError)
        return { success: false, error: "User profile not found" }
      }

      // Create booking with profile ID
      const { data: booking, error } = await this.supabase
        .from("bookings")
        .insert({
          ...bookingData,
          user_id: profile.id,
        })
        .select()
        .single()

      if (error) {
        console.error("Error creating booking:", error)
        return { success: false, error: error.message }
      }

      console.log("Booking created successfully:", booking.id)
      return { success: true, booking }
    } catch (error) {
      console.error("Error in createBooking:", error)
      return { success: false, error: "Unexpected error" }
    }
  }

  async updateBooking(bookingId: string, updates: BookingUpdate): Promise<BookingServiceResponse<Booking>> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !user) {
        console.error("No authenticated user found for booking update:", authError?.message)
        return { success: false, error: "No authenticated user" }
      }

      console.log("Updating booking:", bookingId, "for auth user:", user.id)

      // First get the user's profile to get their profile ID
      const { data: profile, error: profileError } = await this.supabase
        .from("user_profiles")
        .select("id")
        .eq("auth_user_id", user.id)
        .single()

      if (profileError) {
        console.error("Error fetching user profile:", profileError)
        return { success: false, error: "User profile not found" }
      }

      // Update booking
      const { data: booking, error } = await this.supabase
        .from("bookings")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", bookingId)
        .eq("user_id", profile.id)
        .select()
        .single()

      if (error) {
        console.error("Error updating booking:", error)
        return { success: false, error: error.message }
      }

      console.log("Booking updated successfully:", booking.id)
      return { success: true, booking }
    } catch (error) {
      console.error("Error in updateBooking:", error)
      return { success: false, error: "Unexpected error" }
    }
  }

  async deleteBooking(bookingId: string): Promise<BookingServiceResponse<boolean>> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !user) {
        console.error("No authenticated user found for booking deletion:", authError?.message)
        return { success: false, error: "No authenticated user" }
      }

      console.log("Deleting booking:", bookingId, "for auth user:", user.id)

      // First get the user's profile to get their profile ID
      const { data: profile, error: profileError } = await this.supabase
        .from("user_profiles")
        .select("id")
        .eq("auth_user_id", user.id)
        .single()

      if (profileError) {
        console.error("Error fetching user profile:", profileError)
        return { success: false, error: "User profile not found" }
      }

      // Delete booking
      const { error } = await this.supabase.from("bookings").delete().eq("id", bookingId).eq("user_id", profile.id)

      if (error) {
        console.error("Error deleting booking:", error)
        return { success: false, error: error.message }
      }

      console.log("Booking deleted successfully:", bookingId)
      return { success: true, data: true }
    } catch (error) {
      console.error("Error in deleteBooking:", error)
      return { success: false, error: "Unexpected error" }
    }
  }

  async getCurrentDraftBooking(): Promise<BookingServiceResponse<any>> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !user) {
        console.log("No authenticated user found:", authError?.message)
        return { success: false, error: "No authenticated user" }
      }

      // First get the user's profile to get their profile ID
      const { data: profile, error: profileError } = await this.supabase
        .from("user_profiles")
        .select("id")
        .eq("auth_user_id", user.id)
        .single()

      if (profileError) {
        console.error("Error fetching user profile:", profileError)
        return { success: false, error: "User profile not found" }
      }

      // Look for draft bookings
      const { data: draftBooking, error } = await this.supabase
        .from("bookings")
        .select("*")
        .eq("user_id", profile.id)
        .eq("status", "draft")
        .order("updated_at", { ascending: false })
        .limit(1)
        .single()

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching draft booking:", error)
        return { success: false, error: error.message }
      }

      return { success: true, booking: draftBooking || null }
    } catch (error) {
      console.error("Error in getCurrentDraftBooking:", error)
      return { success: false, error: "Unexpected error" }
    }
  }

  async createTestBooking(): Promise<BookingServiceResponse<Booking>> {
    const testBookingData = {
      tour_type: "adventure",
      contact_name: "Test User",
      contact_email: "test@example.com",
      contact_phone: "+1234567890",
      start_date: "2024-06-15",
      end_date: "2024-06-22",
      participants: 2,
      total_price: 2500.0,
      status: "test",
      notes: "This is a test booking for database connection verification",
      booking_reference: `TEST-${Date.now()}`,
    }

    return await this.createBooking(testBookingData)
  }

  async cleanupTestBookings(): Promise<BookingServiceResponse<number>> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !user) {
        console.error("No authenticated user found for cleanup:", authError?.message)
        return { success: false, error: "No authenticated user", data: 0 }
      }

      console.log("Cleaning up test bookings for auth user:", user.id)

      // First get the user's profile to get their profile ID
      const { data: profile, error: profileError } = await this.supabase
        .from("user_profiles")
        .select("id")
        .eq("auth_user_id", user.id)
        .single()

      if (profileError) {
        console.error("Error fetching user profile:", profileError)
        return { success: false, error: "User profile not found", data: 0 }
      }

      // Delete test bookings
      const { data: deletedBookings, error } = await this.supabase
        .from("bookings")
        .delete()
        .eq("user_id", profile.id)
        .eq("status", "test")
        .select()

      if (error) {
        console.error("Error cleaning up test bookings:", error)
        return { success: false, error: error.message, data: 0 }
      }

      const deletedCount = deletedBookings?.length || 0
      console.log(`Cleaned up ${deletedCount} test bookings for profile ID:`, profile.id)
      return { success: true, data: deletedCount }
    } catch (error) {
      console.error("Error in cleanupTestBookings:", error)
      return { success: false, error: "Unexpected error", data: 0 }
    }
  }
}

export const bookingService = new BookingService()
