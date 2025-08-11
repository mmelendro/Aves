import { createClient } from "@supabase/supabase-js"
import type { Database } from "../database.types"

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

// Create a singleton instance of the Supabase client for Client Components
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null

export function createSupabaseClient() {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase environment variables are not configured")
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        },
      },
    )
  }

  return supabaseInstance
}

// Export the singleton instance
export const supabase = createSupabaseClient()
