import { createClientSupabaseClient } from "./supabase-client"
import type { Database } from "./supabase"

export type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"]
export type UserProfileInsert = Database["public"]["Tables"]["user_profiles"]["Insert"]
export type UserProfileUpdate = Database["public"]["Tables"]["user_profiles"]["Update"]

export class ProfileService {
  private supabase = createClientSupabaseClient()

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await this.supabase.from("user_profiles").select("*").eq("user_id", userId).single()

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching user profile:", error)
        throw error
      }

      return data
    } catch (error) {
      console.error("Error in getUserProfile:", error)
      return null
    }
  }

  async createUserProfile(profile: UserProfileInsert): Promise<UserProfile | null> {
    try {
      const { data, error } = await this.supabase.from("user_profiles").insert(profile).select().single()

      if (error) {
        console.error("Error creating user profile:", error)
        throw error
      }

      return data
    } catch (error) {
      console.error("Error in createUserProfile:", error)
      throw error
    }
  }

  async updateUserProfile(userId: string, updates: UserProfileUpdate): Promise<UserProfile | null> {
    try {
      const { data, error } = await this.supabase
        .from("user_profiles")
        .update(updates)
        .eq("user_id", userId)
        .select()
        .single()

      if (error) {
        console.error("Error updating user profile:", error)
        throw error
      }

      return data
    } catch (error) {
      console.error("Error in updateUserProfile:", error)
      throw error
    }
  }

  async uploadProfileImage(userId: string, file: File): Promise<string | null> {
    try {
      // Delete existing profile image if it exists
      await this.deleteProfileImage(userId)

      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}/profile.${fileExt}`

      const { error: uploadError } = await this.supabase.storage.from("profile-images").upload(fileName, file, {
        upsert: true,
      })

      if (uploadError) {
        console.error("Error uploading profile image:", uploadError)
        throw uploadError
      }

      const {
        data: { publicUrl },
      } = this.supabase.storage.from("profile-images").getPublicUrl(fileName)

      return publicUrl
    } catch (error) {
      console.error("Error in uploadProfileImage:", error)
      throw error
    }
  }

  async deleteProfileImage(userId: string): Promise<void> {
    try {
      const { data: files } = await this.supabase.storage.from("profile-images").list(`${userId}/`)

      if (files && files.length > 0) {
        const filesToDelete = files.map((file) => `${userId}/${file.name}`)
        await this.supabase.storage.from("profile-images").remove(filesToDelete)
      }
    } catch (error) {
      console.error("Error deleting profile image:", error)
    }
  }

  async upsertUserProfile(profile: UserProfileInsert | UserProfileUpdate): Promise<UserProfile | null> {
    try {
      const { data, error } = await this.supabase
        .from("user_profiles")
        .upsert(profile, {
          onConflict: "user_id",
          ignoreDuplicates: false,
        })
        .select()
        .single()

      if (error) {
        console.error("Error upserting user profile:", error)
        throw error
      }

      return data
    } catch (error) {
      console.error("Error in upsertUserProfile:", error)
      throw error
    }
  }
}

export const profileService = new ProfileService()
