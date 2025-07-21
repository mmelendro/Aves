import { createClient } from "@supabase/supabase-js"

// Supabase configuration with validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://krzmqusxxrfljjkdbklx.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyem1xdXN4eHJmbGpqa2Ria2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MDY5NTIsImV4cCI6MjA2NjE4Mjk1Mn0.qMknujUIfozjqsiMs6CG9OvinUHTIdjvEU_kQJyArlE"

// Validate configuration
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase configuration. Please check your environment variables.")
}

if (!supabaseUrl.startsWith("https://")) {
  throw new Error("Invalid Supabase URL format. URL must start with https://")
}

// Get current origin for redirect URLs
const getOrigin = () => {
  if (typeof window !== "undefined") {
    return window.location.origin
  }
  // Fallback for server-side rendering
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
}

// Create Supabase client with enhanced configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "pkce",
  },
  global: {
    headers: {
      "X-Client-Info": "aves-colombia-app",
    },
  },
})

// Test connection function
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from("profiles").select("count", { count: "exact", head: true })

    if (error) {
      console.error("Supabase connection test failed:", error)
      return { success: false, error: error.message }
    }

    return { success: true, message: "Connection successful" }
  } catch (error: any) {
    console.error("Supabase connection test error:", error)
    return { success: false, error: error.message }
  }
}

// Enhanced authentication functions with proper error handling
export const signUpWithEmail = async (userData: {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  experienceLevel?: string
}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email.toLowerCase(),
      password: userData.password,
      options: {
        data: {
          full_name: `${userData.firstName} ${userData.lastName}`,
          first_name: userData.firstName,
          last_name: userData.lastName,
          phone: userData.phone || "",
          experience_level: userData.experienceLevel || "Beginner birder",
        },
        emailRedirectTo: `${getOrigin()}/auth/callback`,
      },
    })

    if (error) throw error

    return { success: true, data, error: null }
  } catch (error: any) {
    console.error("Sign up error:", error)
    return { success: false, data: null, error: handleSupabaseError(error) }
  }
}

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password: password,
    })

    if (error) throw error

    return { success: true, data, error: null }
  } catch (error: any) {
    console.error("Sign in error:", error)
    return { success: false, data: null, error: handleSupabaseError(error) }
  }
}

export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getOrigin()}/auth/callback?next=/shopping`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })

    if (error) throw error

    return { success: true, data, error: null }
  } catch (error: any) {
    console.error("Google sign in error:", error)
    return { success: false, data: null, error: handleSupabaseError(error) }
  }
}

export const signInWithMagicLink = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email.toLowerCase(),
      options: {
        emailRedirectTo: `${getOrigin()}/auth/callback?next=/shopping`,
      },
    })

    if (error) throw error

    return { success: true, data, error: null }
  } catch (error: any) {
    console.error("Magic link error:", error)
    return { success: false, data: null, error: handleSupabaseError(error) }
  }
}

// Create a singleton client for browser usage
let supabaseClient: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          email: string
          phone: string | null
          experience_level: string | null
          preferences: any | null
          created_at: string
          role: string | null
          gdpr_consent: boolean | null
          marketing_consent: boolean | null
          last_login: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          email: string
          phone?: string | null
          experience_level?: string | null
          preferences?: any | null
          created_at?: string
          role?: string | null
          gdpr_consent?: boolean | null
          marketing_consent?: boolean | null
          last_login?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          email?: string
          phone?: string | null
          experience_level?: string | null
          preferences?: any | null
          created_at?: string
          role?: string | null
          gdpr_consent?: boolean | null
          marketing_consent?: boolean | null
          last_login?: string | null
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          booking_data: any
          status: string
          created_at: string
          updated_at: string | null
          total_cost: number | null
          contact_info: any | null
          tour_selections: any | null
          special_requests: string | null
          booking_reference: string | null
          payment_status: string | null
        }
        Insert: {
          id?: string
          user_id: string
          booking_data: any
          status?: string
          created_at?: string
          updated_at?: string | null
          total_cost?: number | null
          contact_info?: any | null
          tour_selections?: any | null
          special_requests?: string | null
          booking_reference?: string | null
          payment_status?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          booking_data?: any
          status?: string
          created_at?: string
          updated_at?: string | null
          total_cost?: number | null
          contact_info?: any | null
          tour_selections?: any | null
          special_requests?: string | null
          booking_reference?: string | null
          payment_status?: string | null
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          details: any | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          details?: any | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          details?: any | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
  }
}

// Enhanced error handling with specific error types
export const handleSupabaseError = (error: any) => {
  console.error("Supabase Error Details:", {
    message: error?.message,
    code: error?.code,
    details: error?.details,
    hint: error?.hint,
    status: error?.status,
  })

  // Handle specific error cases
  if (error?.message?.includes("Tenant or user not found")) {
    return "Database connection failed. Please check your internet connection and try again. If the problem persists, contact support."
  }

  if (error?.message?.includes("provider is not enabled")) {
    return "This sign-in method is not available. Please try email/password or contact support."
  }

  if (error?.message?.includes("Invalid login credentials")) {
    return "Invalid email or password. Please check your credentials and try again."
  }

  if (error?.message?.includes("Email not confirmed")) {
    return "Please check your email and click the confirmation link before signing in."
  }

  if (error?.message?.includes("User already registered")) {
    return "An account with this email already exists. Please sign in instead."
  }

  if (error?.message?.includes("Password should be at least 6 characters")) {
    return "Password must be at least 6 characters long."
  }

  if (error?.message?.includes("SMTP")) {
    return "Email service is temporarily unavailable. Please try again later or contact support."
  }

  if (error?.message?.includes("rate limit")) {
    return "Too many requests. Please wait a moment before trying again."
  }

  if (error?.code === "PGRST116") {
    return "Database table not found. The application may need to be set up properly."
  }

  if (error?.code === "42P01") {
    return "Database schema not found. Please contact support to set up your account."
  }

  if (error?.status === 404) {
    return "Service temporarily unavailable. Please try again in a few moments."
  }

  if (error?.status >= 500) {
    return "Server error occurred. Please try again later or contact support if the problem persists."
  }

  return error?.message || "An unexpected error occurred. Please try again."
}

// GDPR compliance utilities
export const logUserAction = async (userId: string | null, action: string, details?: any) => {
  try {
    await supabase.from("audit_logs").insert({
      user_id: userId,
      action,
      details,
      ip_address: typeof window !== "undefined" ? await getUserIP() : null,
      user_agent: typeof window !== "undefined" ? navigator.userAgent : null,
      created_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Failed to log user action:", error)
  }
}

const getUserIP = async (): Promise<string | null> => {
  try {
    const response = await fetch("https://api.ipify.org?format=json")
    const data = await response.json()
    return data.ip
  } catch {
    return null
  }
}
