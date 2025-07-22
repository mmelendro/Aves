import type { Metadata } from "next"
import { SchemaCacheRefresh } from "@/components/schema-cache-refresh"

export const metadata: Metadata = {
  title: "Schema Cache Refresh | AVES Colombia",
  description: "Validate and refresh Supabase schema cache for the AVES project",
}

export default function SchemaRefreshPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <SchemaCacheRefresh />
    </div>
  )
}
