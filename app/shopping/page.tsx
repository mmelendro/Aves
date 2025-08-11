"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
// Updated import to use the enhanced auth hook
import { AuthProvider, useAuth } from "@/hooks/use-auth-enhanced"

// Main Shopping Page Component with Auth Integration
function ShoppingPageContent() {
  const searchParams = useSearchParams()
  // Updated to use enhanced auth hook with error handling
  const { user, loading: authLoading, signOut, error: authError } = useAuth()
  const preselectedTourType = searchParams.get("preset") || searchParams.get("tour")
  const preselectedRegion = searchParams.get("region") || searchParams.get("bioregion")
  const fromPage = searchParams.get("from")

  const [tourSelections, setTourSelections] = useState([])
  const [contactInfo, setContactInfo] = useState({})
  const [costBreakdown, setCostBreakdown] = useState({ totalCost: 0 })
  const [questions, setQuestions] = useState("")
  const [savedBooking, setSavedBooking] = useState(false)

  useEffect(() => {
    if (authError) {
      console.error("Authentication error:", authError)
      // Optionally show user-friendly error message
    }
  }, [authError])

  const saveBookingToDatabase = async (userData?: any) => {
    if (!user && !userData) return

    try {
      const bookingData = {
        user_id: user?.id || userData?.id,
        tour_selections: tourSelections,
        contact_info: contactInfo,
        total_cost: costBreakdown.totalCost,
        special_requests: questions,
        booking_reference: `AVES-${Date.now()}`,
        status: "pending",
        payment_status: "pending",
        currency: "USD",
        participants: tourSelections.reduce((sum, tour) => sum + tour.participants, 0),
      }

      // This would be implemented with proper Supabase integration
      console.log("Saving booking:", bookingData)
      setSavedBooking(true)
    } catch (error) {
      console.error("Error saving booking:", error)
    }
  }

  // ... rest of existing code remains the same ...
}

// Wrapped component with AuthProvider
export default function ShoppingPage() {
  return (
    <AuthProvider>
      <ShoppingPageContent />
    </AuthProvider>
  )
}
