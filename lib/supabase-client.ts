import { createClient } from "@supabase/supabase-js"

// Enhanced Supabase configuration with proper error handling
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validate configuration
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase configuration. Please check your environment variables.")
}

// Get current origin for redirect URLs
const getOrigin = () => {
  if (typeof window !== "undefined") {
    return window.location.origin
  }
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
}

// Create enhanced Supabase client with proper OAuth configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    debug: process.env.NODE_ENV === "development",
  },
  global: {
    headers: {
      "X-Client-Info": "aves-colombia-app",
    },
  },
  db: {
    schema: "public",
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Enhanced Google OAuth sign-in with proper configuration
export const signInWithGoogle = async () => {
  try {
    const redirectTo = `${getOrigin()}/auth/callback`

    console.log("Initiating Google OAuth with redirect:", redirectTo)

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
          hd: undefined, // Remove domain restriction
        },
        skipBrowserRedirect: false,
      },
    })

    if (error) {
      console.error("Google OAuth configuration error:", error)
      throw error
    }

    console.log("Google OAuth initiated successfully:", data)
    return { success: true, data, error: null }
  } catch (error: any) {
    console.error("Google sign in failed:", error)
    return {
      success: false,
      data: null,
      error: handleSupabaseError(error),
    }
  }
}

// Enhanced email sign-up
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
      email: userData.email.toLowerCase().trim(),
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

// Enhanced email sign-in
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password: password,
    })

    if (error) throw error

    // Update last login timestamp
    if (data.user) {
      await updateLastLogin(data.user.id)
    }

    return { success: true, data, error: null }
  } catch (error: any) {
    console.error("Sign in error:", error)
    return { success: false, data: null, error: handleSupabaseError(error) }
  }
}

// Admin authentication with enhanced security
export const signInAdmin = async (email: string, password: string) => {
  try {
    // First, sign in with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password: password,
    })

    if (error) throw error

    // Verify admin role
    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role, full_name")
        .eq("id", data.user.id)
        .single()

      if (profileError) {
        await supabase.auth.signOut()
        throw new Error("Failed to verify user profile")
      }

      if (profile.role !== "admin") {
        await supabase.auth.signOut()
        throw new Error("Access denied. Admin privileges required.")
      }

      // Log admin login
      await logAuditAction(data.user.id, "admin_login", {
        email: data.user.email,
        timestamp: new Date().toISOString(),
      })

      return { success: true, data, error: null, profile }
    }

    return { success: false, data: null, error: "Authentication failed" }
  } catch (error: any) {
    console.error("Admin sign in error:", error)
    return { success: false, data: null, error: error.message }
  }
}

// Magic link sign-in
export const signInWithMagicLink = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email.toLowerCase().trim(),
      options: {
        emailRedirectTo: `${getOrigin()}/auth/callback`,
      },
    })

    if (error) throw error
    return { success: true, data, error: null }
  } catch (error: any) {
    console.error("Magic link error:", error)
    return { success: false, data: null, error: handleSupabaseError(error) }
  }
}

// Password reset functionality
export const resetPassword = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${getOrigin()}/auth/reset-password`,
    })

    if (error) throw error
    return { success: true, data, error: null }
  } catch (error: any) {
    console.error("Password reset error:", error)
    return { success: false, data: null, error: handleSupabaseError(error) }
  }
}

export const updatePassword = async (newPassword: string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw error
    return { success: true, data, error: null }
  } catch (error: any) {
    console.error("Password update error:", error)
    return { success: false, data: null, error: handleSupabaseError(error) }
  }
}

// Helper functions
const updateLastLogin = async (userId: string) => {
  try {
    await supabase
      .from("profiles")
      .update({
        last_login: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
  } catch (error) {
    console.warn("Failed to update last login:", error)
  }
}

// Audit logging function
export const logAuditAction = async (userId: string | null, action: string, details?: any) => {
  try {
    await supabase.from("audit_logs").insert({
      user_id: userId,
      action,
      table_name: details?.table_name,
      record_id: details?.record_id,
      old_values: details?.old_values,
      new_values: details?.new_values,
      ip_address: details?.ip_address,
      user_agent: details?.user_agent || (typeof window !== "undefined" ? window.navigator.userAgent : null),
      created_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Failed to log audit action:", error)
  }
}

// Enhanced error handling with specific OAuth error messages
export const handleSupabaseError = (error: any): string => {
  console.error("Supabase Error Details:", {
    message: error?.message,
    code: error?.code,
    details: error?.details,
    hint: error?.hint,
    status: error?.status,
  })

  // Handle OAuth specific errors
  if (error?.message?.includes("OAuth")) {
    return "OAuth authentication failed. Please check your Google account settings and try again."
  }

  // Handle Google OAuth provider errors
  if (error?.message?.includes("provider is not enabled") || error?.message?.includes("Unsupported provider")) {
    return "Google sign-in is not properly configured. Please contact support."
  }

  // Handle redirect URI errors
  if (error?.message?.includes("redirect_uri") || error?.message?.includes("redirect")) {
    return "OAuth redirect configuration error. Please contact support."
  }

  // Handle code exchange errors
  if (error?.message?.includes("code") && error?.message?.includes("exchange")) {
    return "Authorization code exchange failed. Please try signing in again."
  }

  // Handle session errors
  if (error?.message?.includes("session") || error?.message?.includes("token")) {
    return "Session creation failed. Please try signing in again."
  }

  // Handle admin errors
  if (error?.message?.includes("Admin privileges required")) {
    return "Access denied. Administrator privileges are required for this action."
  }

  // Handle magic link errors
  if (error?.message?.includes("Email link is invalid or has expired")) {
    return "The magic link has expired. Please request a new one."
  }

  // Handle RLS policy errors
  if (error?.message?.includes("policy")) {
    return "Access permission error. Please ensure you're properly authenticated and try again."
  }

  // Handle connection errors
  if (error?.message?.includes("Failed to fetch") || error?.message?.includes("network")) {
    return "Network connection error. Please check your internet connection and try again."
  }

  // Handle authentication errors
  if (error?.message?.includes("Invalid login credentials")) {
    return "Invalid email or password. Please check your credentials and try again."
  }

  if (error?.message?.includes("Email not confirmed")) {
    return "Please check your email and click the confirmation link before signing in."
  }

  if (error?.message?.includes("User already registered")) {
    return "An account with this email already exists. Please sign in instead."
  }

  // Handle validation errors
  if (error?.message?.includes("Password should be at least")) {
    return "Password must be at least 6 characters long."
  }

  // Handle rate limiting
  if (error?.message?.includes("rate limit") || error?.code === "429") {
    return "Too many requests. Please wait a moment before trying again."
  }

  // Handle server errors
  if (error?.status >= 500) {
    return "Server error occurred. Please try again later or contact support if the problem persists."
  }

  return error?.message || "An unexpected error occurred. Please try again."
}

// User role checking functions
export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export const getCurrentUserProfile = async () => {
  const user = await getCurrentUser()
  if (!user) return null

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()
  return profile
}

export const isAdmin = async () => {
  const profile = await getCurrentUserProfile()
  return profile?.role === "admin"
}

export const requireAdmin = async () => {
  const admin = await isAdmin()
  if (!admin) {
    throw new Error("Admin privileges required")
  }
  return true
}

// Connection test with detailed diagnostics
export const testSupabaseConnection = async () => {
  const startTime = Date.now()

  try {
    // Test basic connectivity
    const { data: healthCheck, error: healthError } = await supabase
      .from("profiles")
      .select("count", { count: "exact", head: true })

    if (healthError) {
      return {
        success: false,
        error: healthError.message,
        details: {
          code: healthError.code,
          hint: healthError.hint,
          responseTime: Date.now() - startTime,
        },
      }
    }

    // Test authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    return {
      success: true,
      message: "Connection successful",
      details: {
        responseTime: Date.now() - startTime,
        hasUser: !!user,
        userEmail: user?.email,
        recordCount: healthCheck?.count || 0,
        supabaseUrl: supabaseUrl.substring(0, 30) + "...",
        environment: process.env.NODE_ENV,
      },
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      details: {
        responseTime: Date.now() - startTime,
        stack: error.stack,
      },
    }
  }
}

// OAuth URL debugging helper
export const getOAuthDebugInfo = () => {
  return {
    origin: getOrigin(),
    redirectTo: `${getOrigin()}/auth/callback`,
    supabaseUrl: supabaseUrl.substring(0, 30) + "...",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  }
}
