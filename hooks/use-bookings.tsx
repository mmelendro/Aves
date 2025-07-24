"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { supabase } from "@/lib/supabase-client"
import { useAuth } from "./use-auth-enhanced"
import type { Database } from "@/lib/database.types"

type Booking = Database["public"]["Tables"]["bookings"]["Row"]
type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"]
type BookingUpdate = Database["public"]["Tables"]["bookings"]["Update"]

interface BookingStats {
  totalBookings: number
  upcomingBookings: number
  completedBookings: number
  cancelledBookings: number
  totalRevenue: number
  averageBookingValue: number
}

interface BookingsContextType {
  bookings: Booking[]
  loading: boolean
  error: string | null
  createBooking: (booking: BookingInsert) => Promise<{ data: Booking | null; error: string | null }>
  updateBooking: (id: string, updates: BookingUpdate) => Promise<{ data: Booking | null; error: string | null }>
  deleteBooking: (id: string) => Promise<{ error: string | null }>
  refreshBookings: () => Promise<void>
  getBookingById: (id: string) => Booking | null
  getUserBookings: (userId: string) => Booking[]
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined)

export function BookingsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load bookings
  const loadBookings = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })

      if (fetchError) {
        throw fetchError
      }

      setBookings(data || [])
    } catch (err: any) {
      setError(err.message || "Failed to load bookings")
      console.error("Error loading bookings:", err)
    } finally {
      setLoading(false)
    }
  }

  // Initialize bookings
  useEffect(() => {
    loadBookings()
  }, [])

  // Create booking
  const createBooking = async (booking: BookingInsert) => {
    try {
      const { data, error: insertError } = await supabase.from("bookings").insert(booking).select().single()

      if (insertError) {
        return { data: null, error: insertError.message }
      }

      setBookings((prev) => [data, ...prev])
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message || "Failed to create booking" }
    }
  }

  // Update booking
  const updateBooking = async (id: string, updates: BookingUpdate) => {
    try {
      const { data, error: updateError } = await supabase
        .from("bookings")
        .update(updates)
        .eq("id", id)
        .select()
        .single()

      if (updateError) {
        return { data: null, error: updateError.message }
      }

      setBookings((prev) => prev.map((booking) => (booking.id === id ? data : booking)))
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message || "Failed to update booking" }
    }
  }

  // Delete booking
  const deleteBooking = async (id: string) => {
    try {
      const { error: deleteError } = await supabase.from("bookings").delete().eq("id", id)

      if (deleteError) {
        return { error: deleteError.message }
      }

      setBookings((prev) => prev.filter((booking) => booking.id !== id))
      return { error: null }
    } catch (err: any) {
      return { error: err.message || "Failed to delete booking" }
    }
  }

  // Refresh bookings
  const refreshBookings = async () => {
    await loadBookings()
  }

  // Get booking by ID
  const getBookingById = (id: string) => {
    return bookings.find((booking) => booking.id === id) || null
  }

  // Get user bookings
  const getUserBookings = (userId: string) => {
    return bookings.filter((booking) => booking.user_id === userId)
  }

  const value: BookingsContextType = {
    bookings,
    loading,
    error,
    createBooking,
    updateBooking,
    deleteBooking,
    refreshBookings,
    getBookingById,
    getUserBookings,
  }

  return <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>
}

export function useBookings() {
  const context = useContext(BookingsContext)
  if (context === undefined) {
    throw new Error("useBookings must be used within a BookingsProvider")
  }
  return context
}

// Standalone hook for booking statistics
export function useBookingStats(): {
  stats: BookingStats | null
  loading: boolean
  error: string | null
  refreshStats: () => Promise<void>
} {
  const [stats, setStats] = useState<BookingStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadStats = async () => {
    try {
      setLoading(true)
      setError(null)

      // Get all bookings for statistics
      const { data: bookings, error: fetchError } = await supabase.from("bookings").select("*")

      if (fetchError) {
        throw fetchError
      }

      if (!bookings) {
        setStats({
          totalBookings: 0,
          upcomingBookings: 0,
          completedBookings: 0,
          cancelledBookings: 0,
          totalRevenue: 0,
          averageBookingValue: 0,
        })
        return
      }

      const now = new Date()
      const totalBookings = bookings.length
      const upcomingBookings = bookings.filter((b) => b.status === "confirmed" && new Date(b.tour_date) > now).length
      const completedBookings = bookings.filter((b) => b.status === "completed").length
      const cancelledBookings = bookings.filter((b) => b.status === "cancelled").length

      const totalRevenue = bookings
        .filter((b) => b.status !== "cancelled")
        .reduce((sum, b) => sum + (b.total_amount || 0), 0)

      const averageBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0

      setStats({
        totalBookings,
        upcomingBookings,
        completedBookings,
        cancelledBookings,
        totalRevenue,
        averageBookingValue,
      })
    } catch (err: any) {
      setError(err.message || "Failed to load booking statistics")
      console.error("Error loading booking stats:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStats()
  }, [])

  return {
    stats,
    loading,
    error,
    refreshStats: loadStats,
  }
}
