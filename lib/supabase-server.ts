import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database, UserProfileInsert } from "./supabase"

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

export async function getUserProfile(authUserId: string) {
  const supabase = createServerSupabaseClient()

  try {
    const { data: profile, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("auth_user_id", authUserId)
      .single()

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

export async function createUserProfile(authUserId: string, profileData: Partial<UserProfileInsert>) {
  const supabase = createServerSupabaseClient()

  try {
    const { data: profile, error } = await supabase
      .from("user_profiles")
      .insert({
        auth_user_id: authUserId,
        ...profileData,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating user profile:", error)
      throw error
    }

    return profile
  } catch (error) {
    console.error("Error in createUserProfile:", error)
    throw error
  }
}
