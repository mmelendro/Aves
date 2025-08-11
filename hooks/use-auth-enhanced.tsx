"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import type { Database } from "@/lib/database.types"
import { toast } from "sonner"

type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"]

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  session: Session | null
  loading: boolean
  error: string | null
  signUp: (
    email: string,
    password: string,
    userData?: Partial<UserProfile>,
  ) => Promise<{ data: any; error: string | null }>
  signIn: (email: string, password: string) => Promise<{ data: any; error: string | null }>
  signInWithGoogle: () => Promise<{ data: any; error: string | null }>
  signOut: () => Promise<{ error: string | null }>
  resetPassword: (email: string) => Promise<{ data: any; error: string | null }>
  updatePassword: (password: string) => Promise<{ data: any; error: string | null }>
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ data: UserProfile | null; error: string | null }>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleError = (error: any, context: string) => {
    const errorMessage = error?.message || `An error occurred during ${context}`
    setError(errorMessage)
    console.error(`Auth error (${context}):`, error)

    // Show user-friendly toast notification
    if (errorMessage !== "Supabase not configured") {
      toast.error(errorMessage)
    }

    return errorMessage
  }

  // Load user profile with enhanced error handling
  const loadUserProfile = async (userId: string) => {
    if (!isSupabaseConfigured) return

    try {
      const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

      if (error && error.code !== "PGRST116") {
        // PGRST116 = no rows returned
        console.error("Error loading user profile:", error)
        return
      }

      if (data) {
        setProfile(data)
      }
    } catch (error) {
      console.error("Error loading user profile:", error)
    }
  }

  // Initialize auth state with better error handling
  useEffect(() => {
    const initializeAuth = async () => {
      if (!isSupabaseConfigured) {
        setLoading(false)
        return
      }

      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          handleError(error, "session initialization")
        } else if (session?.user) {
          setUser(session.user)
          setSession(session)
          await loadUserProfile(session.user.id)
        }
      } catch (error) {
        handleError(error, "auth initialization")
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    if (!isSupabaseConfigured) return

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setError(null) // Clear errors on auth state change

      if (session?.user) {
        await loadUserProfile(session.user.id)

        // Show success message for sign in
        if (event === "SIGNED_IN") {
          toast.success("Successfully signed in!")
        }
      } else {
        setProfile(null)

        // Show success message for sign out
        if (event === "SIGNED_OUT") {
          toast.success("Successfully signed out!")
        }
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, userData?: Partial<UserProfile>) => {
    if (!isSupabaseConfigured) {
      return { data: null, error: "Supabase not configured" }
    }

    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
          data: {
            full_name: userData?.full_name || `${userData?.first_name || ""} ${userData?.last_name || ""}`.trim(),
            first_name: userData?.first_name || "",
            last_name: userData?.last_name || "",
            phone: userData?.phone || "",
            birding_experience: userData?.birding_experience || "Beginner birder",
          },
        },
      })

      if (error) {
        const errorMessage = handleError(error, "sign up")
        return { data: null, error: errorMessage }
      }

      // Create user profile if signup successful
      if (data.user && userData) {
        try {
          const { error: profileError } = await supabase.from("user_profiles").insert({
            id: data.user.id,
            email: data.user.email!,
            ...userData,
          })

          if (profileError) {
            console.error("Profile creation error:", profileError)
          }
        } catch (profileError) {
          console.error("Profile creation error:", profileError)
        }
      }

      if (data.user) {
        toast.success("Account created! Please check your email to verify your account.")
      }

      return { data, error: null }
    } catch (error: any) {
      const errorMessage = handleError(error, "sign up")
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { data: null, error: "Supabase not configured" }
    }

    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        const errorMessage = handleError(error, "sign in")
        return { data: null, error: errorMessage }
      }

      return { data, error: null }
    } catch (error: any) {
      const errorMessage = handleError(error, "sign in")
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      return { data: null, error: "Supabase not configured" }
    }

    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/shopping`,
        },
      })

      if (error) {
        const errorMessage = handleError(error, "Google sign in")
        return { data: null, error: errorMessage }
      }

      return { data, error: null }
    } catch (error: any) {
      const errorMessage = handleError(error, "Google sign in")
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      return { error: null }
    }

    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        const errorMessage = handleError(error, "sign out")
        return { error: errorMessage }
      }

      setUser(null)
      setProfile(null)
      setSession(null)

      return { error: null }
    } catch (error: any) {
      const errorMessage = handleError(error, "sign out")
      return { error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    if (!isSupabaseConfigured) {
      return { data: null, error: "Supabase not configured" }
    }

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        const errorMessage = handleError(error, "password reset")
        return { data: null, error: errorMessage }
      }

      toast.success("Password reset email sent! Check your inbox.")
      return { data, error: null }
    } catch (error: any) {
      const errorMessage = handleError(error, "password reset")
      return { data: null, error: errorMessage }
    }
  }

  const updatePassword = async (password: string) => {
    if (!isSupabaseConfigured) {
      return { data: null, error: "Supabase not configured" }
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        const errorMessage = handleError(error, "password update")
        return { data: null, error: errorMessage }
      }

      toast.success("Password updated successfully!")
      return { data, error: null }
    } catch (error: any) {
      const errorMessage = handleError(error, "password update")
      return { data: null, error: errorMessage }
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !isSupabaseConfigured) {
      return { data: null, error: "No user logged in or Supabase not configured" }
    }

    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", user.id)
        .select()
        .single()

      if (error) {
        const errorMessage = handleError(error, "profile update")
        return { data: null, error: errorMessage }
      }

      if (data) {
        setProfile(data)
        toast.success("Profile updated successfully!")
      }

      return { data, error: null }
    } catch (error: any) {
      const errorMessage = handleError(error, "profile update")
      return { data: null, error: errorMessage }
    }
  }

  const refreshProfile = async () => {
    if (user && isSupabaseConfigured) {
      await loadUserProfile(user.id)
    }
  }

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
