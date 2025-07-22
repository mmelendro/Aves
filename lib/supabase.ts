import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_date: string
          booking_reference: string
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at: string
          end_date: string
          id: string
          notes: string | null
          participants: number
          start_date: string
          status: string
          total_price: number
          tour_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          booking_date?: string
          booking_reference?: string
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at?: string
          end_date: string
          id?: string
          notes?: string | null
          participants: number
          start_date: string
          status?: string
          total_price: number
          tour_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          booking_date?: string
          booking_reference?: string
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          created_at?: string
          end_date?: string
          id?: string
          notes?: string | null
          participants?: number
          start_date?: string
          status?: string
          total_price?: number
          tour_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          covid_vaccination_status: string | null
          created_at: string
          current_medications: string | null
          dietary_preferences: string[] | null
          ebird_profile_url: string | null
          ebird_username: string | null
          emergency_contact_email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          environmental_allergies: string | null
          facebook_profile: string | null
          food_allergies: string | null
          full_name: string | null
          hepatitis_a_date: string | null
          hepatitis_a_vaccination: boolean | null
          hepatitis_b_date: string | null
          hepatitis_b_vaccination: boolean | null
          id: string
          instagram_handle: string | null
          insurance_coverage_details: string | null
          insurance_expiry_date: string | null
          insurance_policy_number: string | null
          insurance_provider: string | null
          linkedin_profile: string | null
          medical_conditions: string | null
          medical_notes: string | null
          other_allergies: string | null
          other_vaccinations: string | null
          passport_country: string | null
          passport_expiry_date: string | null
          passport_number: string | null
          phone_number: string | null
          profile_image_url: string | null
          twitter_handle: string | null
          typhoid_date: string | null
          typhoid_vaccination: boolean | null
          updated_at: string
          user_id: string
          yellow_fever_date: string | null
          yellow_fever_vaccination: boolean | null
        }
        Insert: {
          covid_vaccination_status?: string | null
          created_at?: string
          current_medications?: string | null
          dietary_preferences?: string[] | null
          ebird_profile_url?: string | null
          ebird_username?: string | null
          emergency_contact_email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          environmental_allergies?: string | null
          facebook_profile?: string | null
          food_allergies?: string | null
          full_name?: string | null
          hepatitis_a_date?: string | null
          hepatitis_a_vaccination?: boolean | null
          hepatitis_b_date?: string | null
          hepatitis_b_vaccination?: boolean | null
          id?: string
          instagram_handle?: string | null
          insurance_coverage_details?: string | null
          insurance_expiry_date?: string | null
          insurance_policy_number?: string | null
          insurance_provider?: string | null
          linkedin_profile?: string | null
          medical_conditions?: string | null
          medical_notes?: string | null
          other_allergies?: string | null
          other_vaccinations?: string | null
          passport_country?: string | null
          passport_expiry_date?: string | null
          passport_number?: string | null
          phone_number?: string | null
          profile_image_url?: string | null
          twitter_handle?: string | null
          typhoid_date?: string | null
          typhoid_vaccination?: boolean | null
          updated_at?: string
          user_id: string
          yellow_fever_date?: string | null
          yellow_fever_vaccination?: boolean | null
        }
        Update: {
          covid_vaccination_status?: string | null
          created_at?: string
          current_medications?: string | null
          dietary_preferences?: string[] | null
          ebird_profile_url?: string | null
          ebird_username?: string | null
          emergency_contact_email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          environmental_allergies?: string | null
          facebook_profile?: string | null
          food_allergies?: string | null
          full_name?: string | null
          hepatitis_a_date?: string | null
          hepatitis_a_vaccination?: boolean | null
          hepatitis_b_date?: string | null
          hepatitis_b_vaccination?: boolean | null
          id?: string
          instagram_handle?: string | null
          insurance_coverage_details?: string | null
          insurance_expiry_date?: string | null
          insurance_policy_number?: string | null
          insurance_provider?: string | null
          linkedin_profile?: string | null
          medical_conditions?: string | null
          medical_notes?: string | null
          other_allergies?: string | null
          other_vaccinations?: string | null
          passport_country?: string | null
          passport_expiry_date?: string | null
          passport_number?: string | null
          phone_number?: string | null
          profile_image_url?: string | null
          twitter_handle?: string | null
          typhoid_date?: string | null
          typhoid_vaccination?: boolean | null
          updated_at?: string
          user_id?: string
          yellow_fever_date?: string | null
          yellow_fever_vaccination?: boolean | null
        }
        Relationships: []
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    ? (Database["public"]["Tables"] & Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof Database["public"]["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never

// Type aliases for easier usage
export type UserProfile = Tables<"user_profiles">
export type UserProfileInsert = TablesInsert<"user_profiles">
export type UserProfileUpdate = TablesUpdate<"user_profiles">

export type Booking = Tables<"bookings">
export type BookingInsert = TablesInsert<"bookings">
export type BookingUpdate = TablesUpdate<"bookings">
