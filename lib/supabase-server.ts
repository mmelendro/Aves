import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "./supabase"

export const createServerSupabaseClient = () => {
  return createServerComponentClient<Database>({ cookies })
}

export async function getCurrentUser() {
  const supabase = createServerSupabaseClient()

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      console.error("Error getting session:", error)
      return null
    }

    return session?.user || null
  } catch (error) {
    console.error("Error in getCurrentUser:", error)
    return null
  }
}

export async function getUserProfile(userId: string) {
  const supabase = createServerSupabaseClient()

  try {
    const { data: profile, error } = await supabase.from("user_profiles").select("*").eq("user_id", userId).single()

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "not found"
      console.error("Error fetching user profile:", error)
      return null
    }

    return profile
  } catch (error) {
    console.error("Error in getUserProfile:", error)
    return null
  }
}
