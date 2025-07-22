import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getCurrentUser, getUserProfile } from "@/lib/supabase-server"
import AccountSettingsClient from "./AccountSettingsClient"

export const metadata: Metadata = {
  title: "Account Settings - AVES Colombia",
  description: "Manage your profile, preferences, and booking information for AVES Colombia birding tours.",
}

export default async function AccountSettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login?redirect=/account/settings")
  }

  // Fetch user profile data
  const profile = await getUserProfile(user.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600 mt-1">Manage your profile and preferences for AVES Colombia tours</p>
          </div>

          <AccountSettingsClient initialProfile={profile} userId={user.id} userEmail={user.email || ""} />
        </div>
      </div>
    </div>
  )
}
