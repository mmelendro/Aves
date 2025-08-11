import { createClient } from "@supabase/supabase-js"
import type { Database } from "./supabase"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://krzmqusxxrfljjkdbklx.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyem1xdXN4eHJmbGpqa2Ria2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MDY5NTIsImV4cCI6MjA2NjE4Mjk1Mn0.qMknujUIfozjqsiMs6CG9OvinUHTIdjvEU_kQJyArlE"
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const createMockClient = () => ({
  auth: {
    signUp: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
    signInWithPassword: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
    signOut: () => Promise.resolve({ error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: null, error: { message: "Supabase not configured" } }),
    update: () => ({ data: null, error: { message: "Supabase not configured" } }),
    delete: () => ({ error: { message: "Supabase not configured" } }),
  }),
})

let supabase: any
try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  } else {
    console.warn("Supabase environment variables not found, using mock client")
    supabase = createMockClient()
  }
} catch (error) {
  console.error("Failed to create Supabase client:", error)
  supabase = createMockClient()
}

export { supabase }

export const getSupabaseServer = () => {
  try {
    if (supabaseServiceKey && supabaseUrl) {
      return createClient<Database>(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    }
    // Fallback to regular client
    return supabase
  } catch (error) {
    console.error("Failed to create Supabase server client:", error)
    return supabase
  }
}

// Export the server client as well for convenience
export const supabaseServer = getSupabaseServer()
