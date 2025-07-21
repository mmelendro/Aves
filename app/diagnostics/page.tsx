"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { SupabaseDiagnostics } from "@/components/diagnostics/supabase-diagnostics"

export default function DiagnosticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader currentPage="/diagnostics" />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">System Diagnostics</h1>
            <p className="text-gray-600">
              Comprehensive testing and troubleshooting for the AVES Colombia Supabase integration.
            </p>
          </div>

          <SupabaseDiagnostics />
        </div>
      </main>

      <Footer />
    </div>
  )
}
