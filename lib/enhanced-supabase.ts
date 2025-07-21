import { createClient } from "@supabase/supabase-js"

// Enhanced Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validate configuration
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase configuration. Please check your environment variables.")
}

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
}

// Enhanced error types
export interface SupabaseError {
  message: string
  code?: string
  details?: any
  hint?: string
  status?: number
}

// Retry utility function with exponential backoff
async function withRetry<T>(operation: () => Promise<T>, retries: number = RETRY_CONFIG.maxRetries): Promise<T> {
  try {
    return await operation()
  } catch (error: any) {
    if (retries > 0 && isRetryableError(error)) {
      const delay = Math.min(
        RETRY_CONFIG.baseDelay * Math.pow(2, RETRY_CONFIG.maxRetries - retries),
        RETRY_CONFIG.maxDelay,
      )

      console.warn(`Operation failed, retrying in ${delay}ms. Retries left: ${retries}`, error)

      await new Promise((resolve) => setTimeout(resolve, delay))
      return withRetry(operation, retries - 1)
    }
    throw error
  }
}

// Determine if an error is retryable
function isRetryableError(error: any): boolean {
  const retryableCodes = ["PGRST301", "PGRST302", "23505"] // Connection errors, constraint violations
  const retryableMessages = ["fetch failed", "network error", "timeout", "connection refused", "temporary failure"]

  if (error?.code && retryableCodes.includes(error.code)) {
    return true
  }

  if (error?.message) {
    return retryableMessages.some((msg) => error.message.toLowerCase().includes(msg.toLowerCase()))
  }

  return false
}

// Get current origin for redirect URLs
const getOrigin = () => {
  if (typeof window !== "undefined") {
    return window.location.origin
  }
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
}

// Create enhanced Supabase client
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
  db: {
    schema: "public",
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Enhanced connection test with detailed diagnostics
export const testSupabaseConnection = async () => {
  const startTime = Date.now()

  try {
    // Test basic connectivity
    const { data: healthCheck, error: healthError } = await withRetry(async () => {
      return await supabase.from("profiles").select("count", { count: "exact", head: true })
    })

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

// Enhanced authentication functions with retry logic
export const signUpWithEmail = async (userData: {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  experienceLevel?: string
}) => {
  try {
    const { data, error } = await withRetry(async () => {
      return await supabase.auth.signUp({
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
    const { data, error } = await withRetry(async () => {
      return await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password: password,
      })
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
      email: email.toLowerCase().trim(),
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

// Helper function to update last login
const updateLastLogin = async (userId: string) => {
  try {
    await supabase.from("profiles").update({ last_login: new Date().toISOString() }).eq("id", userId)
  } catch (error) {
    console.warn("Failed to update last login:", error)
  }
}

// Enhanced error handling with more specific error types
export const handleSupabaseError = (error: any): string => {
  console.error("Supabase Error Details:", {
    message: error?.message,
    code: error?.code,
    details: error?.details,
    hint: error?.hint,
    status: error?.status,
  })

  // Handle specific Google OAuth errors
  if (error?.message?.includes("provider is not enabled") || error?.message?.includes("Unsupported provider")) {
    return "Google sign-in is not enabled. Please contact support or try email/password sign-in."
  }

  // Handle magic link errors
  if (error?.message?.includes("Email link is invalid or has expired")) {
    return "The magic link has expired. Please request a new one."
  }

  // Handle infinite recursion error specifically
  if (error?.message?.includes("infinite recursion detected")) {
    return "Database configuration error detected. Please contact support - this issue is being resolved."
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

// Connection health monitoring
export const monitorConnection = () => {
  let isConnected = true

  const checkConnection = async () => {
    const result = await testSupabaseConnection()
    const wasConnected = isConnected
    isConnected = result.success

    if (wasConnected && !isConnected) {
      console.warn("Database connection lost")
      // Emit custom event for UI to handle
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("supabase-connection-lost"))
      }
    } else if (!wasConnected && isConnected) {
      console.info("Database connection restored")
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("supabase-connection-restored"))
      }
    }
  }

  // Check connection every 30 seconds
  const interval = setInterval(checkConnection, 30000)

  return () => clearInterval(interval)
}

// Batch operations with retry logic - FIXED SYNTAX
export const batchOperation = async (operations: (() => Promise<any>)[], concurrency = 3): Promise<(any | Error)[]> => {
  const results: (any | Error)[] = []

  for (let i = 0; i < operations.length; i += concurrency) {
    const batch = operations.slice(i, i + concurrency)
    const batchResults = await Promise.allSettled(batch.map((op) => withRetry(op)))

    results.push(...batchResults.map((result) => (result.status === "fulfilled" ? result.value : result.reason)))
  }

  return results
}

// GDPR compliance utilities
export const logUserAction = async (userId: string | null, action: string, details?: any) => {
  try {
    await supabase.from("audit_logs").insert({
      user_id: userId,
      action,
      details,
      created_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Failed to log user action:", error)
  }
}
