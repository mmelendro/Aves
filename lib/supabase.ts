import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          user_id: string
          full_name: string | null
          phone_number: string | null
          profile_image_url: string | null
          ebird_username: string | null
          ebird_profile_url: string | null
          passport_number: string | null
          passport_country: string | null
          passport_expiry_date: string | null
          insurance_provider: string | null
          insurance_policy_number: string | null
          insurance_coverage_details: string | null
          insurance_expiry_date: string | null
          dietary_preferences: string[] | null
          food_allergies: string | null
          environmental_allergies: string | null
          other_allergies: string | null
          medical_conditions: string | null
          current_medications: string | null
          medical_notes: string | null
          covid_vaccination_status: string | null
          yellow_fever_vaccination: boolean | null
          yellow_fever_date: string | null
          hepatitis_a_vaccination: boolean | null
          hepatitis_a_date: string | null
          hepatitis_b_vaccination: boolean | null
          hepatitis_b_date: string | null
          typhoid_vaccination: boolean | null
          typhoid_date: string | null
          other_vaccinations: string | null
          emergency_contact_name: string | null
          emergency_contact_relationship: string | null
          emergency_contact_phone: string | null
          emergency_contact_email: string | null
          instagram_handle: string | null
          facebook_profile: string | null
          twitter_handle: string | null
          linkedin_profile: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          full_name?: string | null
          phone_number?: string | null
          profile_image_url?: string | null
          ebird_username?: string | null
          ebird_profile_url?: string | null
          passport_number?: string | null
          passport_country?: string | null
          passport_expiry_date?: string | null
          insurance_provider?: string | null
          insurance_policy_number?: string | null
          insurance_coverage_details?: string | null
          insurance_expiry_date?: string | null
          dietary_preferences?: string[] | null
          food_allergies?: string | null
          environmental_allergies?: string | null
          other_allergies?: string | null
          medical_conditions?: string | null
          current_medications?: string | null
          medical_notes?: string | null
          covid_vaccination_status?: string | null
          yellow_fever_vaccination?: boolean | null
          yellow_fever_date?: string | null
          hepatitis_a_vaccination?: boolean | null
          hepatitis_a_date?: string | null
          hepatitis_b_vaccination?: boolean | null
          hepatitis_b_date?: string | null
          typhoid_vaccination?: boolean | null
          typhoid_date?: string | null
          other_vaccinations?: string | null
          emergency_contact_name?: string | null
          emergency_contact_relationship?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_email?: string | null
          instagram_handle?: string | null
          facebook_profile?: string | null
          twitter_handle?: string | null
          linkedin_profile?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          full_name?: string | null
          phone_number?: string | null
          profile_image_url?: string | null
          ebird_username?: string | null
          ebird_profile_url?: string | null
          passport_number?: string | null
          passport_country?: string | null
          passport_expiry_date?: string | null
          insurance_provider?: string | null
          insurance_policy_number?: string | null
          insurance_coverage_details?: string | null
          insurance_expiry_date?: string | null
          dietary_preferences?: string[] | null
          food_allergies?: string | null
          environmental_allergies?: string | null
          other_allergies?: string | null
          medical_conditions?: string | null
          current_medications?: string | null
          medical_notes?: string | null
          covid_vaccination_status?: string | null
          yellow_fever_vaccination?: boolean | null
          yellow_fever_date?: string | null
          hepatitis_a_vaccination?: boolean | null
          hepatitis_a_date?: string | null
          hepatitis_b_vaccination?: boolean | null
          hepatitis_b_date?: string | null
          typhoid_vaccination?: boolean | null
          typhoid_date?: string | null
          other_vaccinations?: string | null
          emergency_contact_name?: string | null
          emergency_contact_relationship?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_email?: string | null
          instagram_handle?: string | null
          facebook_profile?: string | null
          twitter_handle?: string | null
          linkedin_profile?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          tour_name: string
          tour_type: string
          start_date: string
          end_date: string
          participants: number
          total_amount: number
          currency: string | null
          status: string | null
          special_requests: string | null
          contact_name: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tour_name: string
          tour_type: string
          start_date: string
          end_date: string
          participants?: number
          total_amount: number
          currency?: string | null
          status?: string | null
          special_requests?: string | null
          contact_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tour_name?: string
          tour_type?: string
          start_date?: string
          end_date?: string
          participants?: number
          total_amount?: number
          currency?: string | null
          status?: string | null
          special_requests?: string | null
          contact_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"]
export type UserProfileInsert = Database["public"]["Tables"]["user_profiles"]["Insert"]
export type UserProfileUpdate = Database["public"]["Tables"]["user_profiles"]["Update"]

export type Booking = Database["public"]["Tables"]["bookings"]["Row"]
export type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"]
export type BookingUpdate = Database["public"]["Tables"]["bookings"]["Update"]
