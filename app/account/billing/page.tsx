import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/supabase-server"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard } from "lucide-react"

export const metadata: Metadata = {
  title: "Billing - AVES Colombia",
  description: "Manage your billing information and payment methods.",
}

export default async function BillingPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login?redirect=/account/billing")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
          <p className="text-gray-600 mt-2">Manage your billing information and payment methods</p>
        </div>

        <Card>
          <CardContent className="text-center py-12">
            <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Billing Management</h3>
            <p className="text-gray-600 mb-4">
              Billing and payment management features are coming soon. For now, all payments are handled during the
              booking process.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
