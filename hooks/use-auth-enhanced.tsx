"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { AuthService, type DisplayUserProfile } from "@/lib/auth-service"
import type { Database } from "@/lib/database.types"

type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"]

interface AuthContextType {
  user: User | null
  profile: DisplayUserProfile | null
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
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ data: DisplayUserProfile | null; error: string | null }>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<DisplayUserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const mounted = useRef(false)
  const activeUserId = useRef<string | null>(null)
  const authGeneration = useRef(0)
  const profileGeneration = useRef(0)

  // Load user profile
  const loadUserProfile = async (userId: string) => {
    const request = ++profileGeneration.current
    const { data, error } = await AuthService.getUserProfile(userId)
    if (mounted.current && request === profileGeneration.current && activeUserId.current === userId) {
      setProfile(error ? null : data)
    }
  }

  // Initialize auth state
  useEffect(() => {
    mounted.current = true
    const initialGeneration = authGeneration.current
    const applySession = (nextSession: Session | null) => {
      const generation = ++authGeneration.current
      ++profileGeneration.current
      const nextUserId = nextSession?.user.id ?? null
      if (activeUserId.current !== nextUserId || !nextUserId) setProfile(null)
      activeUserId.current = nextUserId
      setUser(nextSession?.user ?? null)
      setSession(nextSession)
      setLoading(false)

      // Leave the synchronous auth callback before making another Supabase call.
      if (nextUserId) {
        void Promise.resolve().then(() => {
          if (mounted.current && authGeneration.current === generation) return loadUserProfile(nextUserId)
        })
      }
    }
    const initializeAuth = async () => {
      try {
        const { session } = await AuthService.getCurrentSession()

        // A newer auth event wins over a delayed initial session response.
        if (mounted.current && authGeneration.current === initialGeneration) applySession(session)
      } catch (error) {
        console.error("Error initializing auth:", error)
      } finally {
        if (mounted.current && authGeneration.current === initialGeneration) setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = AuthService.onAuthStateChange((_event, session) => {
      if (mounted.current) applySession(session)
    })

    return () => {
      mounted.current = false
      activeUserId.current = null
      ++authGeneration.current
      ++profileGeneration.current
      subscription.unsubscribe()
    }
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
    const previousUserId = activeUserId.current
    const generation = ++authGeneration.current
    ++profileGeneration.current
    activeUserId.current = null
    setProfile(null)
    setLoading(true)
    try {
      const result = await AuthService.signOut()
      if (mounted.current && authGeneration.current === generation) {
        if (!result.error) {
          setUser(null)
          setSession(null)
        } else if (previousUserId) {
          activeUserId.current = previousUserId
          void loadUserProfile(previousUserId)
        }
      }
      return result
    } finally {
      if (mounted.current && authGeneration.current === generation) setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    return await AuthService.resetPassword(email)
  }

  const updatePassword = async (password: string) => {
    return await AuthService.updatePassword(password)
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || user.id !== activeUserId.current) {
      return { data: null, error: "No user logged in" }
    }

    const userId = user.id
    const request = ++profileGeneration.current
    const result = await AuthService.updateUserProfile(userId, updates)
    if (mounted.current && request === profileGeneration.current && activeUserId.current === userId && result.data && !result.error) {
      setProfile(result.data)
    }
    return result
  }

  const refreshProfile = async () => {
    if (activeUserId.current) {
      await loadUserProfile(activeUserId.current)
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
