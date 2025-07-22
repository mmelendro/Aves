import type { Metadata } from "next"
import { DatabaseConnectionTest } from "@/components/database-connection-test"

export const metadata: Metadata = {
  title: "Database Connection Test | AVES Colombia",
  description: "Test Supabase database connectivity and permissions for the AVES Colombia platform",
}

export default function TestConnectionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <DatabaseConnectionTest />
    </div>
  )
}
