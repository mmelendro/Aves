"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { AuthService } from "@/lib/auth-service"
import type { Database } from "@/lib/database.types"

type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"]

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  session: Session | null
  loading: boolean
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

  // Load user profile
  const loadUserProfile = async (userId: string) => {
    const { data, error } = await AuthService.getUserProfile(userId)
    if (data && !error) {
      setProfile(data)
    }
  }

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { session } = await AuthService.getCurrentSession()

        if (session?.user) {
          setUser(session.user)
          setSession(session)
          await loadUserProfile(session.user.id)
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = AuthService.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        await loadUserProfile(session.user.id)
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Auth methods
  const signUp = async (email: string, password: string, userData?: Partial<UserProfile>) => {
    setLoading(true)
    try {
      const result = await AuthService.signUp(email, password, userData)
      return result
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const result = await AuthService.signIn(email, password)
      return result
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setLoading(true)
    try {
      const result = await AuthService.signInWithGoogle()
      return result
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      const result = await AuthService.signOut()
      if (!result.error) {
        setUser(null)
        setProfile(null)
        setSession(null)
      }
      return result
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    return await AuthService.resetPassword(email)
  }

  const updatePassword = async (password: string) => {
    return await AuthService.updatePassword(password)
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      return { data: null, error: "No user logged in" }
    }

    const result = await AuthService.updateUserProfile(user.id, updates)
    if (result.data && !result.error) {
      setProfile(result.data)
    }
    return result
  }

  const refreshProfile = async () => {
    if (user) {
      await loadUserProfile(user.id)
    }
  }

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
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
