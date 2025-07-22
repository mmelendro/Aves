import { createClientSupabaseClient } from "./supabase-client"
import type { Database } from "./supabase"

export type Booking = Database["public"]["Tables"]["bookings"]["Row"]
export type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"]
export type BookingUpdate = Database["public"]["Tables"]["bookings"]["Update"]

export interface BookingData {
  tourType: string
  region: string
  dates: {
    start: string
    end: string
  }
  participants: number
  accommodationType: string
  totalCost: number
  contactInfo: {
    name: string
    email: string
    phone: string
  }
  tourSelections: {
    [key: string]: any
  }
  specialRequests?: string
}

export class BookingService {
  private supabase = createClientSupabaseClient()

  async saveBooking(userId: string, bookingData: BookingData): Promise<Booking | null> {
    try {
      const { data, error } = await this.supabase
        .from("bookings")
        .upsert(
          {
            user_id: userId,
            booking_data: bookingData,
            status: "draft",
            total_cost: bookingData.totalCost,
            contact_info: bookingData.contactInfo,
            tour_selections: bookingData.tourSelections,
            special_requests: bookingData.specialRequests || null,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id,status",
            ignoreDuplicates: false,
          },
        )
        .select()
        .single()

      if (error) {
        console.error("Error saving booking:", error)
        throw error
      }

      return data
    } catch (error) {
      console.error("Error in saveBooking:", error)
      throw error
    }
  }

  async getUserBookings(userId: string): Promise<Booking[]> {
    try {
      const { data, error } = await this.supabase
        .from("bookings")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching user bookings:", error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error("Error in getUserBookings:", error)
      return []
    }
  }

  async getDraftBooking(userId: string): Promise<Booking | null> {
    try {
      const { data, error } = await this.supabase
        .from("bookings")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "draft")
        .order("updated_at", { ascending: false })
        .limit(1)
        .single()

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching draft booking:", error)
        throw error
      }

      return data
    } catch (error) {
      console.error("Error in getDraftBooking:", error)
      return null
    }
  }

  async updateBookingStatus(bookingId: string, status: string): Promise<Booking | null> {
    try {
      const { data, error } = await this.supabase
        .from("bookings")
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", bookingId)
        .select()
        .single()

      if (error) {
        console.error("Error updating booking status:", error)
        throw error
      }

      return data
    } catch (error) {
      console.error("Error in updateBookingStatus:", error)
      throw error
    }
  }

  async deleteBooking(bookingId: string): Promise<boolean> {
    try {
      const { error } = await this.supabase.from("bookings").delete().eq("id", bookingId)

      if (error) {
        console.error("Error deleting booking:", error)
        throw error
      }

      return true
    } catch (error) {
      console.error("Error in deleteBooking:", error)
      return false
    }
  }
}

export const bookingService = new BookingService()
