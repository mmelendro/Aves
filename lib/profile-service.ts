import { createClientSupabaseClient } from "./supabase-client"
import type { UserProfile, UserProfileInsert, UserProfileUpdate } from "./supabase"

export class ProfileService {
  private supabase = createClientSupabaseClient()

  async getCurrentUserProfile(): Promise<UserProfile | null> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !user) {
        console.log("No authenticated user found:", authError?.message)
        return null
      }

      console.log("Fetching profile for auth user:", user.id)

      const { data: profile, error } = await this.supabase
        .from("user_profiles")
        .select("*")
        .eq("auth_user_id", user.id)
        .single()

      if (error) {
        if (error.code === "PGRST116") {
          // Profile doesn't exist, create one
          console.log("Profile not found, creating new profile for auth user:", user.id)
          return await this.createUserProfile({
            auth_user_id: user.id,
            full_name: user.user_metadata?.full_name || "",
            phone_number: user.user_metadata?.phone_number || "",
          })
        }
        console.error("Error fetching profile:", error)
        return null
      }

      console.log("Profile fetched successfully for profile ID:", profile.id)
      return profile
    } catch (error) {
      console.error("Error in getCurrentUserProfile:", error)
      return null
    }
  }

  async createUserProfile(profileData: UserProfileInsert): Promise<UserProfile | null> {
    try {
      console.log("Creating profile for auth user:", profileData.auth_user_id)

      const { data: profile, error } = await this.supabase.from("user_profiles").insert(profileData).select().single()

      if (error) {
        console.error("Error creating profile:", error)
        throw error
      }

      console.log("Profile created successfully with ID:", profile.id)
      return profile
    } catch (error) {
      console.error("Error in createUserProfile:", error)
      throw error
    }
  }

  async updateUserProfile(profileData: UserProfileUpdate): Promise<UserProfile | null> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !user) {
        console.error("No authenticated user found for update:", authError?.message)
        return null
      }

      console.log("Updating profile for auth user:", user.id)

      const { data: profile, error } = await this.supabase
        .from("user_profiles")
        .update({
          ...profileData,
          updated_at: new Date().toISOString(),
        })
        .eq("auth_user_id", user.id)
        .select()
        .single()

      if (error) {
        console.error("Error updating profile:", error)
        throw error
      }

      console.log("Profile updated successfully with ID:", profile.id)
      return profile
    } catch (error) {
      console.error("Error in updateUserProfile:", error)
      throw error
    }
  }

  async deleteUserProfile(): Promise<boolean> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !user) {
        console.error("No authenticated user found for deletion:", authError?.message)
        return false
      }

      console.log("Deleting profile for auth user:", user.id)

      const { error } = await this.supabase.from("user_profiles").delete().eq("auth_user_id", user.id)

      if (error) {
        console.error("Error deleting profile:", error)
        return false
      }

      console.log("Profile deleted successfully for auth user:", user.id)
      return true
    } catch (error) {
      console.error("Error in deleteUserProfile:", error)
      return false
    }
  }

  async uploadProfileImage(file: File): Promise<string | null> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !user) {
        console.error("No authenticated user found for image upload:", authError?.message)
        return null
      }

      // Generate unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `${user.id}/profile-${Date.now()}.${fileExt}`

      console.log("Uploading profile image:", fileName)

      // Upload file to storage
      const { data: uploadData, error: uploadError } = await this.supabase.storage
        .from("profile-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        })

      if (uploadError) {
        console.error("Error uploading image:", uploadError)
        return null
      }

      // Get public URL
      const { data: urlData } = this.supabase.storage.from("profile-images").getPublicUrl(uploadData.path)

      console.log("Profile image uploaded successfully:", urlData.publicUrl)
      return urlData.publicUrl
    } catch (error) {
      console.error("Error in uploadProfileImage:", error)
      return null
    }
  }

  async removeProfileImage(imageUrl: string): Promise<boolean> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser()

      if (authError || !user) {
        console.error("No authenticated user found for image removal:", authError?.message)
        return false
      }

      // Extract file path from URL
      const urlParts = imageUrl.split("/")
      const fileName = urlParts[urlParts.length - 1]
      const filePath = `${user.id}/${fileName}`

      console.log("Removing profile image:", filePath)

      // Remove file from storage
      const { error } = await this.supabase.storage.from("profile-images").remove([filePath])

      if (error) {
        console.error("Error removing image:", error)
        return false
      }

      // Update profile to remove image URL
      await this.updateUserProfile({ profile_image_url: null })

      console.log("Profile image removed successfully")
      return true
    } catch (error) {
      console.error("Error in removeProfileImage:", error)
      return false
    }
  }
}

export const profileService = new ProfileService()
