import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase-client"
import { SignupForm } from "./SignupForm"

export const metadata: Metadata = {
  title: "Sign Up - AVES Colombia",
  description: "Create your AVES Colombia account to start your birding adventure.",
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: { redirect?: string }
}) {
  const supabase = getSupabaseServer()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Redirect if already logged in
  if (session) {
    redirect(searchParams.redirect || "/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Join the AVES Community</h2>
          <p className="mt-2 text-sm text-gray-600">Create your account to start your Colombian birding adventure</p>
        </div>
        <SignupForm redirectTo={searchParams.redirect} />
      </div>
    </div>
  )
}
