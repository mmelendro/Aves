import { supabase } from "./supabase-client"

// User Management Service
export class UserService {
  static async getUserProfile(userId: string) {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()
    return { data, error }
  }

  static async updateUserProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single()
    return { data, error }
  }

  static async getAllUsers(adminUserId: string) {
    // Verify admin access
    const { data: adminProfile } = await supabase.from("profiles").select("role").eq("id", adminUserId).single()

    if (adminProfile?.role !== "admin") {
      return { data: null, error: "Unauthorized" }
    }

    const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })
    return { data, error }
  }
}

// Cart Management Service
export class CartService {
  static async getCartItems(userId: string) {
    const { data, error } = await supabase
      .from("cart_items")
      .select("*, tours(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
    return { data, error }
  }

  static async addToCart(userId: string, item: any) {
    const { data, error } = await supabase
      .from("cart_items")
      .insert({
        user_id: userId,
        ...item,
      })
      .select()
      .single()
    return { data, error }
  }

  static async updateCartItem(userId: string, itemId: string, updates: any) {
    const { data, error } = await supabase
      .from("cart_items")
      .update(updates)
      .eq("id", itemId)
      .eq("user_id", userId)
      .select()
      .single()
    return { data, error }
  }

  static async removeFromCart(userId: string, itemId: string) {
    const { error } = await supabase.from("cart_items").delete().eq("id", itemId).eq("user_id", userId)
    return { error }
  }

  static async clearCart(userId: string) {
    const { error } = await supabase.from("cart_items").delete().eq("user_id", userId)
    return { error }
  }
}

// Booking Management Service
export class BookingService {
  static async createBooking(userId: string, bookingData: any) {
    const bookingReference = await this.generateBookingReference()

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        user_id: userId,
        booking_reference: bookingReference,
        ...bookingData,
      })
      .select()
      .single()

    if (!error && data) {
      // Create initial reminder
      await ReminderService.createPaymentReminder(data.id, userId)
    }

    return { data, error }
  }

  static async getUserBookings(userId: string) {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, payments(*), invoices(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
    return { data, error }
  }

  static async getBookingById(bookingId: string, userId?: string) {
    let query = supabase.from("bookings").select("*, payments(*), invoices(*), trips(*)").eq("id", bookingId)

    if (userId) {
      query = query.eq("user_id", userId)
    }

    const { data, error } = await query.single()
    return { data, error }
  }

  static async updateBooking(bookingId: string, updates: any, userId?: string) {
    let query = supabase.from("bookings").update(updates).eq("id", bookingId)

    if (userId) {
      query = query.eq("user_id", userId)
    }

    const { data, error } = await query.select().single()
    return { data, error }
  }

  static async getAllBookings(adminUserId: string) {
    // Verify admin access
    const { data: adminProfile } = await supabase.from("profiles").select("role").eq("id", adminUserId).single()

    if (adminProfile?.role !== "admin") {
      return { data: null, error: "Unauthorized" }
    }

    const { data, error } = await supabase
      .from("bookings")
      .select("*, profiles(full_name, email), payments(*), trips(*)")
      .order("created_at", { ascending: false })
    return { data, error }
  }

  private static async generateBookingReference(): Promise<string> {
    const { data } = await supabase.rpc("generate_booking_reference")
    return data || `AVES-${Date.now()}`
  }
}

// Trip Management Service
export class TripService {
  static async getUserTrips(userId: string) {
    const { data, error } = await supabase
      .from("trips")
      .select("*, bookings!inner(user_id)")
      .eq("bookings.user_id", userId)
      .order("start_date", { ascending: true })
    return { data, error }
  }

  static async getTripById(tripId: string, userId?: string) {
    let query = supabase.from("trips").select("*, bookings(*), profiles!trips_guide_id_fkey(full_name, email)")

    if (userId) {
      query = query.eq("bookings.user_id", userId)
    }

    const { data, error } = await query.eq("id", tripId).single()
    return { data, error }
  }

  static async createTrip(bookingId: string, tripData: any) {
    const { data, error } = await supabase
      .from("trips")
      .insert({
        booking_id: bookingId,
        ...tripData,
      })
      .select()
      .single()
    return { data, error }
  }

  static async updateTrip(tripId: string, updates: any) {
    const { data, error } = await supabase.from("trips").update(updates).eq("id", tripId).select().single()
    return { data, error }
  }

  static async getAllTrips(adminUserId: string) {
    // Verify admin access
    const { data: adminProfile } = await supabase.from("profiles").select("role").eq("id", adminUserId).single()

    if (adminProfile?.role !== "admin") {
      return { data: null, error: "Unauthorized" }
    }

    const { data, error } = await supabase
      .from("trips")
      .select("*, bookings(*, profiles(full_name, email)), profiles!trips_guide_id_fkey(full_name)")
      .order("start_date", { ascending: true })
    return { data, error }
  }
}

// Payment Management Service
export class PaymentService {
  static async createPayment(bookingId: string, userId: string, paymentData: any) {
    const { data, error } = await supabase
      .from("payments")
      .insert({
        booking_id: bookingId,
        user_id: userId,
        ...paymentData,
      })
      .select()
      .single()
    return { data, error }
  }

  static async getUserPayments(userId: string) {
    const { data, error } = await supabase
      .from("payments")
      .select("*, bookings(booking_reference)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
    return { data, error }
  }

  static async updatePaymentStatus(paymentId: string, status: string, metadata?: any) {
    const updates: any = { status }

    if (status === "completed") {
      updates.processed_at = new Date().toISOString()
    } else if (status === "failed") {
      updates.failed_at = new Date().toISOString()
    }

    if (metadata) {
      updates.metadata = metadata
    }

    const { data, error } = await supabase.from("payments").update(updates).eq("id", paymentId).select().single()
    return { data, error }
  }

  static async getAllPayments(adminUserId: string) {
    // Verify admin access
    const { data: adminProfile } = await supabase.from("profiles").select("role").eq("id", adminUserId).single()

    if (adminProfile?.role !== "admin") {
      return { data: null, error: "Unauthorized" }
    }

    const { data, error } = await supabase
      .from("payments")
      .select("*, bookings(booking_reference), profiles(full_name, email)")
      .order("created_at", { ascending: false })
    return { data, error }
  }
}

// Invoice Management Service
export class InvoiceService {
  static async createInvoice(bookingId: string, userId: string, invoiceData: any) {
    const invoiceNumber = await this.generateInvoiceNumber()

    const { data, error } = await supabase
      .from("invoices")
      .insert({
        booking_id: bookingId,
        user_id: userId,
        invoice_number: invoiceNumber,
        ...invoiceData,
      })
      .select()
      .single()
    return { data, error }
  }

  static async getUserInvoices(userId: string) {
    const { data, error } = await supabase
      .from("invoices")
      .select("*, bookings(booking_reference)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
    return { data, error }
  }

  static async getInvoiceById(invoiceId: string, userId?: string) {
    let query = supabase.from("invoices").select("*, bookings(*)")

    if (userId) {
      query = query.eq("user_id", userId)
    }

    const { data, error } = await query.eq("id", invoiceId).single()
    return { data, error }
  }

  static async updateInvoice(invoiceId: string, updates: any) {
    const { data, error } = await supabase.from("invoices").update(updates).eq("id", invoiceId).select().single()
    return { data, error }
  }

  private static async generateInvoiceNumber(): Promise<string> {
    const { data } = await supabase.rpc("generate_invoice_number")
    return data || `INV-${Date.now()}`
  }
}

// Message Management Service
export class MessageService {
  static async getUserMessages(userId: string) {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
    return { data, error }
  }

  static async createMessage(userId: string, messageData: any) {
    const { data, error } = await supabase
      .from("messages")
      .insert({
        user_id: userId,
        ...messageData,
      })
      .select()
      .single()
    return { data, error }
  }

  static async markMessageAsRead(messageId: string, userId: string) {
    const { data, error } = await supabase
      .from("messages")
      .update({
        read: true,
        read_at: new Date().toISOString(),
      })
      .eq("id", messageId)
      .eq("user_id", userId)
      .select()
      .single()
    return { data, error }
  }

  static async archiveMessage(messageId: string, userId: string) {
    const { data, error } = await supabase
      .from("messages")
      .update({ archived: true })
      .eq("id", messageId)
      .eq("user_id", userId)
      .select()
      .single()
    return { data, error }
  }

  static async sendBulkMessage(adminUserId: string, messageData: any, userIds: string[]) {
    // Verify admin access
    const { data: adminProfile } = await supabase.from("profiles").select("role").eq("id", adminUserId).single()

    if (adminProfile?.role !== "admin") {
      return { data: null, error: "Unauthorized" }
    }

    const messages = userIds.map((userId) => ({
      user_id: userId,
      ...messageData,
    }))

    const { data, error } = await supabase.from("messages").insert(messages).select()
    return { data, error }
  }
}

// Reminder Management Service
export class ReminderService {
  static async getUserReminders(userId: string) {
    const { data, error } = await supabase
      .from("reminders")
      .select("*")
      .eq("user_id", userId)
      .eq("sent", false)
      .order("remind_at", { ascending: true })
    return { data, error }
  }

  static async createReminder(userId: string, reminderData: any) {
    const { data, error } = await supabase
      .from("reminders")
      .insert({
        user_id: userId,
        ...reminderData,
      })
      .select()
      .single()
    return { data, error }
  }

  static async createPaymentReminder(bookingId: string, userId: string) {
    const { data: booking } = await supabase.from("bookings").select("*").eq("id", bookingId).single()

    if (booking && booking.payment_due_date) {
      const remindAt = new Date(booking.payment_due_date)
      remindAt.setDate(remindAt.getDate() - 7) // Remind 7 days before due date

      return this.createReminder(userId, {
        booking_id: bookingId,
        title: "Payment Due Soon",
        description: `Your payment for booking ${booking.booking_reference} is due in 7 days.`,
        reminder_type: "payment_due",
        remind_at: remindAt.toISOString(),
      })
    }

    return { data: null, error: "No payment due date found" }
  }

  static async markReminderAsSent(reminderId: string) {
    const { data, error } = await supabase
      .from("reminders")
      .update({
        sent: true,
        sent_at: new Date().toISOString(),
      })
      .eq("id", reminderId)
      .select()
      .single()
    return { data, error }
  }

  static async getPendingReminders() {
    const { data, error } = await supabase
      .from("reminders")
      .select("*, profiles(email, full_name)")
      .eq("sent", false)
      .lte("remind_at", new Date().toISOString())
      .order("remind_at", { ascending: true })
    return { data, error }
  }
}

// Audit Service
export class AuditService {
  static async logAction(userId: string | null, action: string, details?: any) {
    const { error } = await supabase.from("audit_logs").insert({
      user_id: userId,
      action,
      ...details,
    })
    return { error }
  }

  static async getAuditLogs(adminUserId: string, limit = 100) {
    // Verify admin access
    const { data: adminProfile } = await supabase.from("profiles").select("role").eq("id", adminUserId).single()

    if (adminProfile?.role !== "admin") {
      return { data: null, error: "Unauthorized" }
    }

    const { data, error } = await supabase
      .from("audit_logs")
      .select("*, profiles(full_name, email)")
      .order("created_at", { ascending: false })
      .limit(limit)
    return { data, error }
  }
}
