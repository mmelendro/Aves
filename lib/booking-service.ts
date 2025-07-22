import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "./supabase"

export interface BookingData {
  tours: any[]
  contactInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    travelDate: string
    experienceLevel: string
  }
  questions?: string
  totalCost: number
  restDayOptions?: Record<string, any>
}

export class BookingService {
  private supabase = createClientComponentClient<Database>()

  async saveBooking(bookingData: BookingData): Promise<{ success: boolean; bookingId?: string; error?: string }> {
    try {
      const {
        data: { user },
        error: userError,
      } = await this.supabase.auth.getUser()

      if (userError || !user) {
        return { success: false, error: "User not authenticated" }
      }

      const { data, error } = await this.supabase
        .from("bookings")
        .insert({
          user_id: user.id,
          booking_data: bookingData,
          total_cost: bookingData.totalCost,
          contact_info: bookingData.contactInfo,
          tour_selections: bookingData.tours,
          special_requests: bookingData.questions || null,
          status: "draft",
        })
        .select()
        .single()

      if (error) {
        console.error("Error saving booking:", error)
        return { success: false, error: error.message }
      }

      return { success: true, bookingId: data.id }
    } catch (error) {
      console.error("Error in saveBooking:", error)
      return { success: false, error: "Failed to save booking" }
    }
  }

  async updateBooking(bookingId: string, bookingData: BookingData): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await this.supabase
        .from("bookings")
        .update({
          booking_data: bookingData,
          total_cost: bookingData.totalCost,
          contact_info: bookingData.contactInfo,
          tour_selections: bookingData.tours,
          special_requests: bookingData.questions || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", bookingId)

      if (error) {
        console.error("Error updating booking:", error)
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      console.error("Error in updateBooking:", error)
      return { success: false, error: "Failed to update booking" }
    }
  }

  async getUserBookings(): Promise<{ success: boolean; bookings?: any[]; error?: string }> {
    try {
      const {
        data: { user },
        error: userError,
      } = await this.supabase.auth.getUser()

      if (userError || !user) {
        return { success: false, error: "User not authenticated" }
      }

      const { data, error } = await this.supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching bookings:", error)
        return { success: false, error: error.message }
      }

      return { success: true, bookings: data || [] }
    } catch (error) {
      console.error("Error in getUserBookings:", error)
      return { success: false, error: "Failed to fetch bookings" }
    }
  }

  async getCurrentDraftBooking(): Promise<{ success: boolean; booking?: any; error?: string }> {
    try {
      const {
        data: { user },
        error: userError,
      } = await this.supabase.auth.getUser()

      if (userError || !user) {
        return { success: false, error: "User not authenticated" }
      }

      const { data, error } = await this.supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "draft")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (error) {
        console.error("Error fetching current booking:", error)
        return { success: false, error: error.message }
      }

      return { success: true, booking: data }
    } catch (error) {
      console.error("Error in getCurrentDraftBooking:", error)
      return { success: false, error: "Failed to fetch current booking" }
    }
  }

  async deleteBooking(bookingId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await this.supabase.from("bookings").delete().eq("id", bookingId)

      if (error) {
        console.error("Error deleting booking:", error)
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      console.error("Error in deleteBooking:", error)
      return { success: false, error: "Failed to delete booking" }
    }
  }

  async submitBookingForReview(bookingId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await this.supabase
        .from("bookings")
        .update({
          status: "pending",
          updated_at: new Date().toISOString(),
        })
        .eq("id", bookingId)

      if (error) {
        console.error("Error submitting booking:", error)
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      console.error("Error in submitBookingForReview:", error)
      return { success: false, error: "Failed to submit booking" }
    }
  }
}

export const bookingService = new BookingService()
