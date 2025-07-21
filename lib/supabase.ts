import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "pkce",
  },
  global: {
    headers: {
      "X-Client-Info": "aves-website",
    },
  },
})

// Server-side client for admin operations
export const createServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    console.warn("Service role key not available - admin functions will be limited")
    return supabase
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
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
          is_admin: boolean
          last_login: string | null
          registration_method: string | null
          marketing_consent: boolean
          newsletter_subscribed: boolean
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
          is_admin?: boolean
          last_login?: string | null
          registration_method?: string | null
          marketing_consent?: boolean
          newsletter_subscribed?: boolean
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
          is_admin?: boolean
          last_login?: string | null
          registration_method?: string | null
          marketing_consent?: boolean
          newsletter_subscribed?: boolean
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
          payment_status: string | null
          payment_method: string | null
          confirmation_number: string | null
          notes: string | null
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
          payment_status?: string | null
          payment_method?: string | null
          confirmation_number?: string | null
          notes?: string | null
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
          payment_status?: string | null
          payment_method?: string | null
          confirmation_number?: string | null
          notes?: string | null
        }
      }
      inquiries: {
        Row: {
          id: string
          user_id: string | null
          email: string
          full_name: string
          phone: string | null
          message: string
          inquiry_type: string
          status: string
          created_at: string
          updated_at: string | null
          assigned_to: string | null
          response: string | null
          priority: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          email: string
          full_name: string
          phone?: string | null
          message: string
          inquiry_type?: string
          status?: string
          created_at?: string
          updated_at?: string | null
          assigned_to?: string | null
          response?: string | null
          priority?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          email?: string
          full_name?: string
          phone?: string | null
          message?: string
          inquiry_type?: string
          status?: string
          created_at?: string
          updated_at?: string | null
          assigned_to?: string | null
          response?: string | null
          priority?: string
        }
      }
      admin_logs: {
        Row: {
          id: string
          admin_id: string
          action: string
          target_type: string
          target_id: string | null
          details: any | null
          created_at: string
          ip_address: string | null
        }
        Insert: {
          id?: string
          admin_id: string
          action: string
          target_type: string
          target_id?: string | null
          details?: any | null
          created_at?: string
          ip_address?: string | null
        }
        Update: {
          id?: string
          admin_id?: string
          action?: string
          target_type?: string
          target_id?: string | null
          details?: any | null
          created_at?: string
          ip_address?: string | null
        }
      }
    }
  }
}

// Helper functions with error handling
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()
    return { data, error }
  } catch (err) {
    console.error("Error fetching user profile:", err)
    return { data: null, error: err }
  }
}

export const updateUserProfile = async (userId: string, updates: any) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single()

    return { data, error }
  } catch (err) {
    console.error("Error updating user profile:", err)
    return { data: null, error: err }
  }
}

export const createUserProfile = async (profile: Database["public"]["Tables"]["profiles"]["Insert"]) => {
  try {
    const { data, error } = await supabase.from("profiles").insert(profile).select().single()
    return { data, error }
  } catch (err) {
    console.error("Error creating user profile:", err)
    return { data: null, error: err }
  }
}

export const createInquiry = async (inquiry: Database["public"]["Tables"]["inquiries"]["Insert"]) => {
  try {
    const { data, error } = await supabase.from("inquiries").insert(inquiry).select().single()
    return { data, error }
  } catch (err) {
    console.error("Error creating inquiry:", err)
    return { data: null, error: err }
  }
}

export const logAdminAction = async (
  adminId: string,
  action: string,
  targetType: string,
  targetId?: string,
  details?: any,
) => {
  try {
    const { error } = await supabase.from("admin_logs").insert({
      admin_id: adminId,
      action,
      target_type: targetType,
      target_id: targetId,
      details,
      created_at: new Date().toISOString(),
    })

    return { error }
  } catch (err) {
    console.error("Error logging admin action:", err)
    return { error: err }
  }
}

// Network connectivity check
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from("profiles").select("count").limit(1)
    return { connected: !error, error }
  } catch (err) {
    return { connected: false, error: err }
  }
}
