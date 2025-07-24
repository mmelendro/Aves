"use client"

import { useState, useEffect, useCallback } from "react"
import { BookingService } from "@/lib/booking-service"
import { useAuth } from "./use-auth-enhanced"
import type { Database } from "@/lib/database.types"

type TripBooking = Database["public"]["Tables"]["trip_bookings"]["Row"] & {
  trips: Database["public"]["Tables"]["trips"]["Row"] | null
}

type BookingStats = {
  total: number
  saved: number
  confirmed: number
  paid: number
  completed: number
  cancelled: number
  totalSpent: number
}

export function useBookings() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<TripBooking[]>([])
  const [stats, setStats] = useState<BookingStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load user's bookings
  const loadBookings = useCallback(
    async (status?: string) => {
      if (!user) return

      setLoading(true)
      setError(null)

      try {
        const { data, error } = await BookingService.getUserBookings(user.id, status)
        if (error) throw new Error(error)

        setBookings(data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    },
    [user],
  )

  // Load booking statistics
  const loadStats = useCallback(async () => {
    if (!user) return

    try {
      const { data, error } = await BookingService.getBookingStats(user.id)
      if (error) throw new Error(error)

      setStats(data)
    } catch (err: any) {
      console.error("Error loading booking stats:", err)
    }
  }, [user])

  // Create a new booking
  const createBooking = async (bookingData: any) => {
    if (!user) return { data: null, error: "User not authenticated" }

    setLoading(true)
    try {
      const result = await BookingService.createBooking({
        ...bookingData,
        user_id: user.id,
      })

      if (result.data && !result.error) {
        await loadBookings()
        await loadStats()
      }

      return result
    } catch (err: any) {
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Update a booking
  const updateBooking = async (bookingId: string, updates: any) => {
    setLoading(true)
    try {
      const result = await BookingService.updateBooking(bookingId, updates)

      if (result.data && !result.error) {
        await loadBookings()
        await loadStats()
      }

      return result
    } catch (err: any) {
      return { data: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Delete a booking
  const deleteBooking = async (bookingId: string) => {
    setLoading(true)
    try {
      const result = await BookingService.deleteBooking(bookingId)

      if (!result.error) {
        await loadBookings()
        await loadStats()
      }

      return result
    } catch (err: any) {
      return { error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Get bookings by status
  const getBookingsByStatus = (status: string) => {
    return bookings.filter((booking) => booking.booking_status === status)
  }

  // Initialize data when user changes
  useEffect(() => {
    if (user) {
      loadBookings()
      loadStats()
    } else {
      setBookings([])
      setStats(null)
    }
  }, [user, loadBookings, loadStats])

  // Subscribe to real-time updates
  useEffect(() => {
    if (!user) return

    const subscription = BookingService.subscribeToBookingUpdates(user.id, (updatedBooking) => {
      setBookings((prev) =>
        prev.map((booking) => (booking.id === updatedBooking.id ? { ...booking, ...updatedBooking } : booking)),
      )
      loadStats() // Refresh stats when bookings change
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [user, loadStats])

  return {
    bookings,
    stats,
    loading,
    error,
    createBooking,
    updateBooking,
    deleteBooking,
    loadBookings,
    getBookingsByStatus,
    savedBookings: getBookingsByStatus("saved"),
    confirmedBookings: getBookingsByStatus("confirmed"),
    paidBookings: getBookingsByStatus("paid"),
    completedBookings: getBookingsByStatus("completed"),
    cancelledBookings: getBookingsByStatus("cancelled"),
  }
}

// Add this new hook export at the end of the file
export function useBookingStats() {
  const { user } = useAuth()
  const [stats, setStats] = useState<BookingStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadStats = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const { data, error } = await BookingService.getBookingStats(user.id)
      if (error) throw new Error(error)

      setStats(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      loadStats()
    } else {
      setStats(null)
    }
  }, [user, loadStats])

  return {
    stats,
    loading,
    error,
    loadStats,
  }
}
