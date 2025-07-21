import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client for admin operations
export const createServerClient = () => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
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

// Helper functions for common operations
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  return { data, error }
}

export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select()
    .single()

  return { data, error }
}

export const createUserProfile = async (profile: Database["public"]["Tables"]["profiles"]["Insert"]) => {
  const { data, error } = await supabase.from("profiles").insert(profile).select().single()

  return { data, error }
}

export const logAdminAction = async (
  adminId: string,
  action: string,
  targetType: string,
  targetId?: string,
  details?: any,
) => {
  const { error } = await supabase.from("admin_logs").insert({
    admin_id: adminId,
    action,
    target_type: targetType,
    target_id: targetId,
    details,
    created_at: new Date().toISOString(),
  })

  return { error }
}
