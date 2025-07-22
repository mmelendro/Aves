import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/supabase-server"
import { profileService } from "@/lib/profile-service"
import AccountSettingsClient from "./AccountSettingsClient"

export const metadata: Metadata = {
  title: "Account Settings - AVES Colombia",
  description: "Manage your profile, preferences, and personal information for AVES Colombia birding tours.",
  keywords: "account settings, profile management, AVES Colombia, birding tours, user profile",
}

export default async function AccountSettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login?redirect=/account/settings")
  }

  // Fetch user profile data
  let profile = null
  try {
    profile = await profileService.getUserProfile(user.id)
  } catch (error) {
    console.error("Error fetching profile:", error)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Account Settings</h1>
            <p className="text-green-100 mt-2">Manage your profile and preferences for AVES Colombia birding tours</p>
          </div>

          <AccountSettingsClient initialProfile={profile} userId={user.id} userEmail={user.email || ""} />
        </div>
      </div>
    </div>
  )
}
