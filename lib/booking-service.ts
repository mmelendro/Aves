import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export interface Booking {
  id?: string
  user_id?: string
  tour_name: string
  tour_date: string
  participants: number
  total_price: number
  status: "pending" | "confirmed" | "cancelled"
  special_requests?: string
  dietary_requirements?: string
  emergency_contact?: string
  created_at?: string
  updated_at?: string
}

export interface BookingResponse {
  success: boolean
  data?: Booking | Booking[]
  error?: string
  message?: string
}

class BookingService {
  async createBooking(bookingData: Omit<Booking, "id" | "created_at" | "updated_at">): Promise<BookingResponse> {
    try {
      console.log("📝 Creating new booking:", bookingData)

      const { data, error } = await supabase
        .from("bookings")
        .insert({
          ...bookingData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) {
        console.error("❌ Booking creation failed:", error)
        return {
          success: false,
          error: error.message,
          message: `Failed to create booking: ${error.message}`,
        }
      }

      console.log("✅ Booking created successfully:", data)
      return {
        success: true,
        data,
        message: "Booking created successfully",
      }
    } catch (error: any) {
      console.error("❌ Booking creation error:", error)
      return {
        success: false,
        error: error.message,
        message: `Booking creation error: ${error.message}`,
      }
    }
  }

  async getBooking(bookingId: string): Promise<BookingResponse> {
    try {
      console.log("🔍 Retrieving booking:", bookingId)

      const { data, error } = await supabase.from("bookings").select("*").eq("id", bookingId).single()

      if (error) {
        console.error("❌ Booking retrieval failed:", error)
        return {
          success: false,
          error: error.message,
          message: `Failed to retrieve booking: ${error.message}`,
        }
      }

      console.log("✅ Booking retrieved successfully:", data)
      return {
        success: true,
        data,
        message: "Booking retrieved successfully",
      }
    } catch (error: any) {
      console.error("❌ Booking retrieval error:", error)
      return {
        success: false,
        error: error.message,
        message: `Booking retrieval error: ${error.message}`,
      }
    }
  }

  async getUserBookings(userId: string): Promise<BookingResponse> {
    try {
      console.log("📋 Retrieving user bookings for:", userId)

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("❌ User bookings retrieval failed:", error)
        return {
          success: false,
          error: error.message,
          message: `Failed to retrieve user bookings: ${error.message}`,
        }
      }

      console.log(`✅ Retrieved ${data?.length || 0} bookings for user`)
      return {
        success: true,
        data,
        message: `Retrieved ${data?.length || 0} bookings`,
      }
    } catch (error: any) {
      console.error("❌ User bookings retrieval error:", error)
      return {
        success: false,
        error: error.message,
        message: `User bookings retrieval error: ${error.message}`,
      }
    }
  }

  async updateBooking(bookingId: string, updates: Partial<Booking>): Promise<BookingResponse> {
    try {
      console.log("📝 Updating booking:", bookingId, updates)

      const { data, error } = await supabase
        .from("bookings")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", bookingId)
        .select()
        .single()

      if (error) {
        console.error("❌ Booking update failed:", error)
        return {
          success: false,
          error: error.message,
          message: `Failed to update booking: ${error.message}`,
        }
      }

      console.log("✅ Booking updated successfully:", data)
      return {
        success: true,
        data,
        message: "Booking updated successfully",
      }
    } catch (error: any) {
      console.error("❌ Booking update error:", error)
      return {
        success: false,
        error: error.message,
        message: `Booking update error: ${error.message}`,
      }
    }
  }

  async deleteBooking(bookingId: string): Promise<BookingResponse> {
    try {
      console.log("🗑️ Deleting booking:", bookingId)

      const { data, error } = await supabase.from("bookings").delete().eq("id", bookingId).select().single()

      if (error) {
        console.error("❌ Booking deletion failed:", error)
        return {
          success: false,
          error: error.message,
          message: `Failed to delete booking: ${error.message}`,
        }
      }

      console.log("✅ Booking deleted successfully:", data)
      return {
        success: true,
        data,
        message: "Booking deleted successfully",
      }
    } catch (error: any) {
      console.error("❌ Booking deletion error:", error)
      return {
        success: false,
        error: error.message,
        message: `Booking deletion error: ${error.message}`,
      }
    }
  }

  async testBookingPermissions(): Promise<{
    insert: BookingResponse
    select: BookingResponse
    cleanup: BookingResponse
  }> {
    console.log("🧪 Testing booking table permissions...")

    // Test INSERT
    const testBooking: Omit<Booking, "id" | "created_at" | "updated_at"> = {
      tour_name: "Test Tour - Permission Check",
      tour_date: new Date().toISOString().split("T")[0],
      participants: 1,
      total_price: 100.0,
      status: "pending",
    }

    const insertResult = await this.createBooking(testBooking)

    // Test SELECT
    let selectResult: BookingResponse
    if (insertResult.success && insertResult.data && "id" in insertResult.data) {
      selectResult = await this.getBooking(insertResult.data.id!)
    } else {
      selectResult = {
        success: false,
        error: "No booking ID to test SELECT",
        message: "SELECT test skipped - INSERT failed",
      }
    }

    // Test cleanup (DELETE)
    let cleanupResult: BookingResponse
    if (insertResult.success && insertResult.data && "id" in insertResult.data) {
      cleanupResult = await this.deleteBooking(insertResult.data.id!)
    } else {
      cleanupResult = {
        success: false,
        error: "No booking ID to cleanup",
        message: "Cleanup test skipped - INSERT failed",
      }
    }

    return {
      insert: insertResult,
      select: selectResult,
      cleanup: cleanupResult,
    }
  }
}

export const bookingService = new BookingService()
