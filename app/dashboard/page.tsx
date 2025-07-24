import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase-client"
import { DashboardClient } from "./DashboardClient"

export const metadata: Metadata = {
  title: "Dashboard - AVES Colombia",
  description: "Manage your Colombian birding adventures and bookings.",
}

export default async function DashboardPage() {
  const supabase = getSupabaseServer()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/login?redirect=/dashboard")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", session.user.id).single()

  return <DashboardClient initialProfile={profile} />
}
