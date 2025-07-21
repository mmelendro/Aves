import { SupabaseDiagnostics } from "@/components/diagnostics/supabase-diagnostics"

export default function DiagnosticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Diagnostics</h1>
          <p className="text-gray-600">
            Diagnose and troubleshoot Supabase integration issues for the AVES application.
          </p>
        </div>

        <SupabaseDiagnostics />
      </div>
    </div>
  )
}
