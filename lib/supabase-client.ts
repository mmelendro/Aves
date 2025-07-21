import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Create the main Supabase client
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

// Enhanced Google OAuth sign-in with proper error handling
export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })

    if (error) {
      console.error("Google OAuth error:", error)
      throw error
    }

    return { data, error: null }
  } catch (error: any) {
    console.error("Google sign-in failed:", error)
    return { data: null, error: error.message }
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
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          full_name: `${userData.firstName} ${userData.lastName}`,
          first_name: userData.firstName,
          last_name: userData.lastName,
          phone: userData.phone || "",
          experience_level: userData.experienceLevel || "Beginner birder",
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) throw error

    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email: userData.email,
        full_name: `${userData.firstName} ${userData.lastName}`,
        phone: userData.phone || "",
        experience_level: userData.experienceLevel || "Beginner birder",
        created_at: new Date().toISOString(),
      })

      if (profileError) {
        console.warn("Profile creation error:", profileError)
      }
    }

    return { data, error: null }
  } catch (error: any) {
    console.error("Sign-up error:", error)
    return { data: null, error: error.message }
  }
}

// Enhanced email sign-in
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    // Update last login
    if (data.user) {
      await supabase.from("profiles").update({ last_login: new Date().toISOString() }).eq("id", data.user.id)
    }

    return { data, error: null }
  } catch (error: any) {
    console.error("Sign-in error:", error)
    return { data: null, error: error.message }
  }
}

// Sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error("Sign-out error:", error)
  }
  return { error }
}

// Get current user
export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  return { user, error }
}

// Get user profile
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()
  return { data, error }
}
