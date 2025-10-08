"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { CheckCircle, Calendar, Users, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import { BookingService } from "@/lib/booking-service"

export default function BookingConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("id")
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadBooking = async () => {
      console.log("[v0] Loading booking with ID:", bookingId)
      if (bookingId) {
        const { data, error } = await BookingService.getBookingById(bookingId)
        console.log("[v0] Booking data:", data)
        console.log("[v0] Booking error:", error)
        if (data) {
          setBooking(data)
        } else if (error) {
          setError(error)
        }
      } else {
        setError("No booking ID provided")
      }
      setLoading(false)
    }

    loadBooking()
  }, [bookingId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationHeader currentPage="/booking/confirmation" />
        <div className="container mx-auto px-4 py-16 mt-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
            <p className="text-gray-600 mb-6">{error || "Unable to load booking details"}</p>
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader currentPage="/booking/confirmation" />

      <div className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Saved Successfully!</h1>
            <p className="text-lg text-gray-600">
              Your booking has been saved to your account. We'll review your request and get back to you within 24
              hours.
            </p>
            {booking.booking_reference && (
              <div className="mt-4">
                <Badge className="bg-emerald-100 text-emerald-800 text-base px-4 py-2">
                  Booking Reference: {booking.booking_reference}
                </Badge>
              </div>
            )}
          </div>

          {/* Booking Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Name</p>
                    <p className="font-medium">
                      {booking.contact_info?.firstName} {booking.contact_info?.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-medium">{booking.contact_info?.email}</p>
                  </div>
                  {booking.contact_info?.phone && (
                    <div>
                      <p className="text-gray-600">Phone</p>
                      <p className="font-medium">{booking.contact_info.phone}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-600">Experience Level</p>
                    <p className="font-medium">{booking.contact_info?.experienceLevel}</p>
                  </div>
                </div>
              </div>

              {/* Tour Selections */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Selected Tours</h3>
                <div className="space-y-3">
                  {booking.tour_selections?.map((tour: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Badge className="mb-2">Tour {index + 1}</Badge>
                          <p className="font-medium">{tour.tourType}</p>
                          <p className="text-sm text-gray-600">{tour.bioregion}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{tour.totalDays} days</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{tour.participants} people</span>
                          </div>
                          {tour.restDays > 0 && (
                            <div className="text-xs text-amber-600 mt-1">+{tour.restDays} rest days</div>
                          )}
                        </div>
                      </div>
                      {tour.startDate && tour.endDate && (
                        <p className="text-sm text-blue-600 font-medium">
                          {new Date(tour.startDate).toLocaleDateString()} -{" "}
                          {new Date(tour.endDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Cost */}
              <div className="border-t pt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Total Cost</span>
                    <span className="text-2xl font-bold text-emerald-600">${booking.total_cost?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Deposit Required (30%)</span>
                    <span className="font-medium text-gray-900">${booking.deposit_amount?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Final Payment</span>
                    <span className="font-medium text-gray-900">
                      ${(booking.total_cost - booking.deposit_amount)?.toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">Final payment due 30 days before departure</p>
              </div>

              {/* Questions/Special Requests */}
              {booking.questions && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Special Requests</h4>
                  <p className="text-sm text-purple-800">{booking.questions}</p>
                </div>
              )}

              {/* Status */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">What happens next?</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• We'll review your booking request within 24 hours</li>
                      <li>• You'll receive a confirmation email with payment details</li>
                      <li>• Our team will contact you to finalize the itinerary</li>
                      <li>• You can track your booking status in your dashboard</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Booking Metadata */}
              <div className="text-xs text-gray-500 pt-4 border-t">
                <p>Booking created: {new Date(booking.created_at).toLocaleString()}</p>
                <p>
                  Status:{" "}
                  <Badge variant="outline" className="text-xs">
                    {booking.status}
                  </Badge>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full">
                View Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/shopping" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                Book Another Tour
              </Button>
            </Link>
          </div>

          {/* Support */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-2">Questions about your booking?</p>
            <Link href="/contact" className="text-emerald-600 hover:underline font-medium">
              Contact our support team
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
