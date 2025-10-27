import { supabase } from "./supabase-client"
import type { Database } from "./supabase"

type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"]
type Booking = Database["public"]["Tables"]["bookings"]["Row"]

export class CustomBookingService {
  static async createBooking(bookingData: BookingInsert) {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert(bookingData)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  static async getUserBookings(userId: string): Promise<{ data: Booking[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }
}
