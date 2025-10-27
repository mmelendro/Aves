import { NextResponse } from 'next/server'
import { CustomBookingService } from '@/lib/custom-booking-service'
import { supabase } from '@/lib/supabase-client'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tours, contactInfo, totalCost, questions } = body

    if (!tours || !contactInfo || !totalCost) {
      return NextResponse.json({ error: 'Missing required booking data.' }, { status: 400 })
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await CustomBookingService.createBooking({
      user_id: user.id,
      tour_selections: tours,
      contact_info: contactInfo,
      total_cost: totalCost,
      special_requests: questions,
      status: 'pending',
    })

    if (error) {
      throw error
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
