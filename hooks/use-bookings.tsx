"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { supabase } from "@/lib/supabase-client"
import type { User } from "@supabase/supabase-js"

interface Booking {
  id: string
  user_id: string
  tour_name: string
  tour_date: string
  participants: number
  status: "pending" | "confirmed" | "cancelled"
  total_amount: number
  created_at: string
  updated_at: string
}

interface BookingStats {
  totalBookings: number
  confirmedBookings: number
  pendingBookings: number
  cancelledBookings: number
  totalRevenue: number
  averageBookingValue: number
}

interface BookingsContextType {
  bookings: Booking[]
  loading: boolean
  error: string | null
  createBooking: (booking: Omit<Booking, "id" | "created_at" | "updated_at">) => Promise<Booking | null>
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<boolean>
  deleteBooking: (id: string) => Promise<boolean>
  refreshBookings: () => Promise<void>
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined)

export function BookingsProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
      } catch (err) {
        console.error("Error getting user:", err)
      }
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Fetch bookings
  const fetchBookings = async () => {
    if (!user) {
      setBookings([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (fetchError) {
        throw fetchError
      }

      setBookings(data || [])
    } catch (err) {
      console.error("Error fetching bookings:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch bookings")
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  // Refresh bookings when user changes
  useEffect(() => {
    fetchBookings()
  }, [user])

  const createBooking = async (
    bookingData: Omit<Booking, "id" | "created_at" | "updated_at">,
  ): Promise<Booking | null> => {
    if (!user) {
      setError("User must be logged in to create bookings")
      return null
    }

    try {
      setError(null)

      const { data, error: createError } = await supabase
        .from("bookings")
        .insert([{ ...bookingData, user_id: user.id }])
        .select()
        .single()

      if (createError) {
        throw createError
      }

      if (data) {
        setBookings((prev) => [data, ...prev])
        return data
      }

      return null
    } catch (err) {
      console.error("Error creating booking:", err)
      setError(err instanceof Error ? err.message : "Failed to create booking")
      return null
    }
  }

  const updateBooking = async (id: string, updates: Partial<Booking>): Promise<boolean> => {
    try {
      setError(null)

      const { error: updateError } = await supabase
        .from("bookings")
        .update(updates)
        .eq("id", id)
        .eq("user_id", user?.id)

      if (updateError) {
        throw updateError
      }

      setBookings((prev) => prev.map((booking) => (booking.id === id ? { ...booking, ...updates } : booking)))

      return true
    } catch (err) {
      console.error("Error updating booking:", err)
      setError(err instanceof Error ? err.message : "Failed to update booking")
      return false
    }
  }

  const deleteBooking = async (id: string): Promise<boolean> => {
    try {
      setError(null)

      const { error: deleteError } = await supabase.from("bookings").delete().eq("id", id).eq("user_id", user?.id)

      if (deleteError) {
        throw deleteError
      }

      setBookings((prev) => prev.filter((booking) => booking.id !== id))
      return true
    } catch (err) {
      console.error("Error deleting booking:", err)
      setError(err instanceof Error ? err.message : "Failed to delete booking")
      return false
    }
  }

  const refreshBookings = async () => {
    await fetchBookings()
  }

  const value: BookingsContextType = {
    bookings,
    loading,
    error,
    createBooking,
    updateBooking,
    deleteBooking,
    refreshBookings,
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

export function useBookingStats(): {
  stats: BookingStats | null
  loading: boolean
  error: string | null
} {
  const { bookings, loading, error } = useBookings()
  const [stats, setStats] = useState<BookingStats | null>(null)

  useEffect(() => {
    if (loading || error || !bookings.length) {
      setStats(null)
      return
    }

    const totalBookings = bookings.length
    const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length
    const pendingBookings = bookings.filter((b) => b.status === "pending").length
    const cancelledBookings = bookings.filter((b) => b.status === "cancelled").length

    const totalRevenue = bookings.filter((b) => b.status === "confirmed").reduce((sum, b) => sum + b.total_amount, 0)

    const averageBookingValue = confirmedBookings > 0 ? totalRevenue / confirmedBookings : 0

    setStats({
      totalBookings,
      confirmedBookings,
      pendingBookings,
      cancelledBookings,
      totalRevenue,
      averageBookingValue,
    })
  }, [bookings, loading, error])

  return { stats, loading, error }
}
