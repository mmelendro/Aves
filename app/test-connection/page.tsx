import type { Metadata } from "next"
import { DatabaseConnectionTest } from "@/components/database-connection-test"

export const metadata: Metadata = {
  title: "Database Connection Test | AVES Colombia",
  description: "Test Supabase database connectivity and CRUD operations with corrected schema using user_id fields",
  robots: {
    index: false,
    follow: false,
  },
}

export default function TestConnectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8">
      <DatabaseConnectionTest />
    </div>
  )
}
