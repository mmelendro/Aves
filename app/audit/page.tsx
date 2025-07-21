import { ComprehensiveAudit } from "@/components/diagnostics/comprehensive-audit"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader currentPage="/audit" />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Supabase Database Audit</h1>
            <p className="text-gray-600">
              Comprehensive analysis of the AVES application's Supabase integration, including credentials,
              connectivity, authentication, and code quality.
            </p>
          </div>

          <ComprehensiveAudit />
        </div>
      </main>

      <Footer />
    </div>
  )
}
