import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          user_id: string
          updated_at: string | null
          first_name: string | null
          last_name: string | null
          email: string
          phone: string | null
          passport_number: string | null
          passport_country: string | null
          passport_expiry: string | null
          insurance_provider: string | null
          insurance_policy_number: string | null
          ebird_profile_url: string | null
          dietary_preferences: string | null
          allergies: string | null
          medical_history: string | null
          current_medications: string | null
          vaccinations: string[] | null
          emergency_contact_name: string | null
          emergency_contact_relationship: string | null
          emergency_contact_phone: string | null
          social_media_handles: Record<string, string> | null
          uploaded_documents: string[] | null
          created_at: string
        }
        Insert: {
          user_id: string
          updated_at?: string | null
          first_name?: string | null
          last_name?: string | null
          email: string
          phone?: string | null
          passport_number?: string | null
          passport_country?: string | null
          passport_expiry?: string | null
          insurance_provider?: string | null
          insurance_policy_number?: string | null
          ebird_profile_url?: string | null
          dietary_preferences?: string | null
          allergies?: string | null
          medical_history?: string | null
          current_medications?: string | null
          vaccinations?: string[] | null
          emergency_contact_name?: string | null
          emergency_contact_relationship?: string | null
          emergency_contact_phone?: string | null
          social_media_handles?: Record<string, string> | null
          uploaded_documents?: string[] | null
          created_at?: string
        }
        Update: {
          user_id?: string
          updated_at?: string | null
          first_name?: string | null
          last_name?: string | null
          email?: string
          phone?: string | null
          passport_number?: string | null
          passport_country?: string | null
          passport_expiry?: string | null
          insurance_provider?: string | null
          insurance_policy_number?: string | null
          ebird_profile_url?: string | null
          dietary_preferences?: string | null
          allergies?: string | null
          medical_history?: string | null
          current_medications?: string | null
          vaccinations?: string[] | null
          emergency_contact_name?: string | null
          emergency_contact_relationship?: string | null
          emergency_contact_phone?: string | null
          social_media_handles?: Record<string, string> | null
          uploaded_documents?: string[] | null
          created_at?: string
        }
      }
      user_bookings: {
        Row: {
          booking_id: string
          user_id: string
          tour_type: string
          region: string
          start_date: string
          end_date: string
          price: number
          booking_status: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          booking_id?: string
          user_id: string
          tour_type: string
          region: string
          start_date: string
          end_date: string
          price: number
          booking_status?: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          booking_id?: string
          user_id?: string
          tour_type?: string
          region?: string
          start_date?: string
          end_date?: string
          price?: number
          booking_status?: string
          created_at?: string
          updated_at?: string | null
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          booking_data: any
          status: string
          created_at: string
          updated_at: string
          total_cost: number | null
          contact_info: any | null
          tour_selections: any | null
          special_requests: string | null
        }
        Insert: {
          id?: string
          user_id: string
          booking_data: any
          status?: string
          created_at?: string
          updated_at?: string
          total_cost?: number | null
          contact_info?: any | null
          tour_selections?: any | null
          special_requests?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          booking_data?: any
          status?: string
          created_at?: string
          updated_at?: string
          total_cost?: number | null
          contact_info?: any | null
          tour_selections?: any | null
          special_requests?: string | null
        }
      }
    }
  }
}
