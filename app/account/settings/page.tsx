import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import AccountSettingsClient from "./AccountSettingsClient"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Account Settings - AVES Tours",
  description: "Manage your profile, preferences, and booking information for AVES Tours birding tours.",
}

export default async function AccountSettingsPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/auth/login?redirect=/account/settings")
  }

  // Fetch user profile data
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("user_id,first_name,last_name,email,phone,passport_number,passport_country,passport_expiry,insurance_provider,insurance_policy_number,ebird_profile_url,dietary_preferences,allergies,medical_history,current_medications,vaccinations,emergency_contact_name,emergency_contact_relationship,emergency_contact_phone,social_media_handles,uploaded_documents,created_at,updated_at")
    .eq("user_id", user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600 mt-1">Manage your profile and preferences for AVES Tours</p>
          </div>

          <AccountSettingsClient
            initialProfile={profile}
            userId={user.id}
            userEmail={user.email || ""}
          />
        </div>
      </div>
    </div>
  )
}
