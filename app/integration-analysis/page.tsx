import type { Metadata } from "next"
import { SupabaseIntegrationDashboard } from "@/components/integration/supabase-integration-dashboard"

export const metadata: Metadata = {
  title: "Supabase Integration Analysis",
  description: "Comprehensive analysis of Supabase integration health, performance, and security",
}

export default function IntegrationAnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SupabaseIntegrationDashboard />
    </div>
  )
}
