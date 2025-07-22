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
          first_name: string | null
          last_name: string | null
          email: string
          phone: string | null
          profile_image_url: string | null
          passport_number: string | null
          passport_country: string | null
          passport_expiry: string | null
          insurance_provider: string | null
          insurance_policy_number: string | null
          insurance_coverage_details: string | null
          ebird_profile_url: string | null
          ebird_username: string | null
          dietary_preferences: string | null
          food_allergies: string | null
          other_allergies: string | null
          medical_conditions: string | null
          current_medications: string | null
          medical_notes: string | null
          emergency_contact_name: string | null
          emergency_contact_relationship: string | null
          emergency_contact_phone: string | null
          emergency_contact_email: string | null
          instagram_handle: string | null
          facebook_profile: string | null
          twitter_handle: string | null
          linkedin_profile: string | null
          covid_vaccination_status: string | null
          yellow_fever_vaccination: boolean | null
          yellow_fever_vaccination_date: string | null
          hepatitis_a_vaccination: boolean | null
          hepatitis_a_vaccination_date: string | null
          hepatitis_b_vaccination: boolean | null
          hepatitis_b_vaccination_date: string | null
          typhoid_vaccination: boolean | null
          typhoid_vaccination_date: string | null
          other_vaccinations: string | null
          newsletter_subscription: boolean | null
          marketing_emails: boolean | null
          sms_notifications: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          first_name?: string | null
          last_name?: string | null
          email: string
          phone?: string | null
          profile_image_url?: string | null
          passport_number?: string | null
          passport_country?: string | null
          passport_expiry?: string | null
          insurance_provider?: string | null
          insurance_policy_number?: string | null
          insurance_coverage_details?: string | null
          ebird_profile_url?: string | null
          ebird_username?: string | null
          dietary_preferences?: string | null
          food_allergies?: string | null
          other_allergies?: string | null
          medical_conditions?: string | null
          current_medications?: string | null
          medical_notes?: string | null
          emergency_contact_name?: string | null
          emergency_contact_relationship?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_email?: string | null
          instagram_handle?: string | null
          facebook_profile?: string | null
          twitter_handle?: string | null
          linkedin_profile?: string | null
          covid_vaccination_status?: string | null
          yellow_fever_vaccination?: boolean | null
          yellow_fever_vaccination_date?: string | null
          hepatitis_a_vaccination?: boolean | null
          hepatitis_a_vaccination_date?: string | null
          hepatitis_b_vaccination?: boolean | null
          hepatitis_b_vaccination_date?: string | null
          typhoid_vaccination?: boolean | null
          typhoid_vaccination_date?: string | null
          other_vaccinations?: string | null
          newsletter_subscription?: boolean | null
          marketing_emails?: boolean | null
          sms_notifications?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          first_name?: string | null
          last_name?: string | null
          email?: string
          phone?: string | null
          profile_image_url?: string | null
          passport_number?: string | null
          passport_country?: string | null
          passport_expiry?: string | null
          insurance_provider?: string | null
          insurance_policy_number?: string | null
          insurance_coverage_details?: string | null
          ebird_profile_url?: string | null
          ebird_username?: string | null
          dietary_preferences?: string | null
          food_allergies?: string | null
          other_allergies?: string | null
          medical_conditions?: string | null
          current_medications?: string | null
          medical_notes?: string | null
          emergency_contact_name?: string | null
          emergency_contact_relationship?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_email?: string | null
          instagram_handle?: string | null
          facebook_profile?: string | null
          twitter_handle?: string | null
          linkedin_profile?: string | null
          covid_vaccination_status?: string | null
          yellow_fever_vaccination?: boolean | null
          yellow_fever_vaccination_date?: string | null
          hepatitis_a_vaccination?: boolean | null
          hepatitis_a_vaccination_date?: string | null
          hepatitis_b_vaccination?: boolean | null
          hepatitis_b_vaccination_date?: string | null
          typhoid_vaccination?: boolean | null
          typhoid_vaccination_date?: string | null
          other_vaccinations?: string | null
          newsletter_subscription?: boolean | null
          marketing_emails?: boolean | null
          sms_notifications?: boolean | null
          created_at?: string
          updated_at?: string
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
