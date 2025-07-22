import { createClientSupabaseClient } from "./supabase-client"
import type { UserProfile, UserProfileInsert, UserProfileUpdate } from "./supabase"

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

  async createUserProfile(profileData: UserProfileInsert): Promise<UserProfile | null> {
    try {
      const { data, error } = await this.supabase.from("user_profiles").insert(profileData).select().single()

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
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
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
      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}-${Date.now()}.${fileExt}`
      const filePath = `profile-images/${fileName}`

      const { error: uploadError } = await this.supabase.storage.from("user-uploads").upload(filePath, file)

      if (uploadError) {
        console.error("Error uploading file:", uploadError)
        throw uploadError
      }

      const { data } = this.supabase.storage.from("user-uploads").getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error("Error in uploadProfileImage:", error)
      return null
    }
  }

  async removeProfileImage(imageUrl: string): Promise<boolean> {
    try {
      // Extract file path from URL
      const urlParts = imageUrl.split("/")
      const filePath = urlParts.slice(-2).join("/")

      const { error } = await this.supabase.storage.from("user-uploads").remove([filePath])

      if (error) {
        console.error("Error removing file:", error)
        throw error
      }

      return true
    } catch (error) {
      console.error("Error in removeProfileImage:", error)
      return false
    }
  }
}

export const profileService = new ProfileService()
