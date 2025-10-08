import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AdminDashboard from "./AdminDashboard"

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin")
  }

  // Check if user is admin
  const { data: adminUser } = await supabase.from("admin_users").select("*").eq("user_id", user.id).single()

  if (!adminUser) {
    redirect("/dashboard")
  }

  // Fetch all bookings
  const { data: bookings } = await supabase
    .from("bookings")
    .select(
      `
      *,
      user_profiles (
        full_name,
        email
      )
    `,
    )
    .order("created_at", { ascending: false })

  return <AdminDashboard bookings={bookings || []} adminUser={adminUser} />
}
