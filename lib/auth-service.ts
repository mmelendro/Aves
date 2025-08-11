import { supabase } from "./supabase-client"
import type { Database } from "./supabase"

type UserProfile = Database["public"]["Tables"]["profiles"]["Row"]
type UserProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"]
type UserProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"]

export class AuthService {
  // Sign up with email and password
  static async signUp(email: string, password: string, userData?: Partial<UserProfileInsert>) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData?.full_name || "",
            first_name: userData?.first_name || "",
            last_name: userData?.last_name || "",
          },
        },
      })

      if (error) throw error

      // Create user profile if signup successful
      if (data.user) {
        await this.createUserProfile({
          id: data.user.id,
          email: data.user.email!,
          ...userData,
        })
      }

      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  // Sign in with email and password
  static async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  // Sign in with Google OAuth
  static async signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  // Sign out
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    }
  }

  // Reset password
  static async resetPassword(email: string) {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  // Update password
  static async updatePassword(password: string) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password,
      })

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  // Create user profile
  static async createUserProfile(profileData: UserProfileInsert) {
    try {
      const { data, error } = await supabase.from("profiles").insert(profileData).select().single()

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  // Get user profile
  static async getUserProfile(userId: string): Promise<{ data: UserProfile | null; error: string | null }> {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  // Update user profile
  static async updateUserProfile(userId: string, updates: UserProfileUpdate) {
    try {
      const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select().single()

      if (error) throw error
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  // Get current session
  static async getCurrentSession() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      if (error) throw error
      return { session, error: null }
    } catch (error: any) {
      return { session: null, error: error.message }
    }
  }

  // Get current user
  static async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (error) throw error
      return { user, error: null }
    } catch (error: any) {
      return { user: null, error: error.message }
    }
  }

  // Listen to auth state changes
  static onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}
