import { supabase } from "./supabase-client"
import type { Database } from "./supabase"

type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"]

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
}
