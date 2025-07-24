import type { Metadata } from "next"
import { DashboardClient } from "./DashboardClient"

export const metadata: Metadata = {
  title: "Dashboard | AVES Colombia",
  description: "Manage your AVES Colombia bookings and account.",
}

// Make this page dynamic to avoid static generation issues
export const dynamic = "force-dynamic"

export default function DashboardPage() {
  return <DashboardClient />
}
