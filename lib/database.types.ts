export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          first_name: string | null
          last_name: string | null
          phone: string | null
          country: string | null
          city: string | null
          date_of_birth: string | null
          birding_experience: "beginner" | "intermediate" | "advanced" | "expert" | null
          dietary_restrictions: string[] | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          passport_number: string | null
          passport_expiry: string | null
          travel_insurance_provider: string | null
          travel_insurance_policy: string | null
          special_requirements: string | null
          profile_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          country?: string | null
          city?: string | null
          date_of_birth?: string | null
          birding_experience?: "beginner" | "intermediate" | "advanced" | "expert" | null
          dietary_restrictions?: string[] | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          passport_number?: string | null
          passport_expiry?: string | null
          travel_insurance_provider?: string | null
          travel_insurance_policy?: string | null
          special_requirements?: string | null
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          country?: string | null
          city?: string | null
          date_of_birth?: string | null
          birding_experience?: "beginner" | "intermediate" | "advanced" | "expert" | null
          dietary_restrictions?: string[] | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          passport_number?: string | null
          passport_expiry?: string | null
          travel_insurance_provider?: string | null
          travel_insurance_policy?: string | null
          special_requirements?: string | null
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      trips: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          short_description: string | null
          duration_days: number
          difficulty_level: "easy" | "moderate" | "challenging" | "expert" | null
          max_participants: number | null
          price_per_person: number
          currency: string | null
          region: string
          best_months: string[] | null
          featured_image_url: string | null
          gallery_images: string[] | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          short_description?: string | null
          duration_days: number
          difficulty_level?: "easy" | "moderate" | "challenging" | "expert" | null
          max_participants?: number | null
          price_per_person: number
          currency?: string | null
          region: string
          best_months?: string[] | null
          featured_image_url?: string | null
          gallery_images?: string[] | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          duration_days?: number
          difficulty_level?: "easy" | "moderate" | "challenging" | "expert" | null
          max_participants?: number | null
          price_per_person?: number
          currency?: string | null
          region?: string
          best_months?: string[] | null
          featured_image_url?: string | null
          gallery_images?: string[] | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      trip_itineraries: {
        Row: {
          id: string
          trip_id: string | null
          day_number: number
          title: string
          description: string | null
          activities: string[] | null
          accommodation: string | null
          meals_included: string[] | null
          location: string | null
          coordinates: unknown | null
          created_at: string
        }
        Insert: {
          id?: string
          trip_id?: string | null
          day_number: number
          title: string
          description?: string | null
          activities?: string[] | null
          accommodation?: string | null
          meals_included?: string[] | null
          location?: string | null
          coordinates?: unknown | null
          created_at?: string
        }
        Update: {
          id?: string
          trip_id?: string | null
          day_number?: number
          title?: string
          description?: string | null
          activities?: string[] | null
          accommodation?: string | null
          meals_included?: string[] | null
          location?: string | null
          coordinates?: unknown | null
          created_at?: string
        }
      }
      trip_target_birds: {
        Row: {
          id: string
          trip_id: string | null
          common_name: string
          scientific_name: string | null
          family: string | null
          endemic: boolean | null
          rarity_level: "common" | "uncommon" | "rare" | "very_rare" | null
          image_url: string | null
          audio_url: string | null
          description: string | null
          best_viewing_time: string | null
          habitat: string | null
          created_at: string
        }
        Insert: {
          id?: string
          trip_id?: string | null
          common_name: string
          scientific_name?: string | null
          family?: string | null
          endemic?: boolean | null
          rarity_level?: "common" | "uncommon" | "rare" | "very_rare" | null
          image_url?: string | null
          audio_url?: string | null
          description?: string | null
          best_viewing_time?: string | null
          habitat?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          trip_id?: string | null
          common_name?: string
          scientific_name?: string | null
          family?: string | null
          endemic?: boolean | null
          rarity_level?: "common" | "uncommon" | "rare" | "very_rare" | null
          image_url?: string | null
          audio_url?: string | null
          description?: string | null
          best_viewing_time?: string | null
          habitat?: string | null
          created_at?: string
        }
      }
      trip_resources: {
        Row: {
          id: string
          trip_id: string | null
          title: string
          description: string | null
          resource_type:
            | "travel_tip"
            | "packing_list"
            | "weather_info"
            | "cultural_info"
            | "safety_info"
            | "equipment"
            | "external_link"
            | null
          content: string | null
          url: string | null
          file_url: string | null
          order_index: number | null
          created_at: string
        }
        Insert: {
          id?: string
          trip_id?: string | null
          title: string
          description?: string | null
          resource_type?:
            | "travel_tip"
            | "packing_list"
            | "weather_info"
            | "cultural_info"
            | "safety_info"
            | "equipment"
            | "external_link"
            | null
          content?: string | null
          url?: string | null
          file_url?: string | null
          order_index?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          trip_id?: string | null
          title?: string
          description?: string | null
          resource_type?:
            | "travel_tip"
            | "packing_list"
            | "weather_info"
            | "cultural_info"
            | "safety_info"
            | "equipment"
            | "external_link"
            | null
          content?: string | null
          url?: string | null
          file_url?: string | null
          order_index?: number | null
          created_at?: string
        }
      }
      trip_bookings: {
        Row: {
          id: string
          user_id: string | null
          trip_id: string | null
          booking_status: "saved" | "inquiry" | "confirmed" | "paid" | "completed" | "cancelled" | null
          payment_status: "pending" | "partial" | "paid" | "refunded" | null
          participants: number | null
          total_amount: number | null
          currency: string | null
          booking_date: string | null
          departure_date: string | null
          return_date: string | null
          special_requests: string | null
          payment_method: string | null
          payment_reference: string | null
          cancellation_reason: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          trip_id?: string | null
          booking_status?: "saved" | "inquiry" | "confirmed" | "paid" | "completed" | "cancelled" | null
          payment_status?: "pending" | "partial" | "paid" | "refunded" | null
          participants?: number | null
          total_amount?: number | null
          currency?: string | null
          booking_date?: string | null
          departure_date?: string | null
          return_date?: string | null
          special_requests?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          cancellation_reason?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          trip_id?: string | null
          booking_status?: "saved" | "inquiry" | "confirmed" | "paid" | "completed" | "cancelled" | null
          payment_status?: "pending" | "partial" | "paid" | "refunded" | null
          participants?: number | null
          total_amount?: number | null
          currency?: string | null
          booking_date?: string | null
          departure_date?: string | null
          return_date?: string | null
          special_requests?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          cancellation_reason?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          booking_id: string | null
          sender_type: "user" | "admin" | "guide"
          sender_id: string | null
          message: string
          message_type: "text" | "image" | "file" | "system" | null
          file_url: string | null
          file_name: string | null
          is_read: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          booking_id?: string | null
          sender_type: "user" | "admin" | "guide"
          sender_id?: string | null
          message: string
          message_type?: "text" | "image" | "file" | "system" | null
          file_url?: string | null
          file_name?: string | null
          is_read?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string | null
          sender_type?: "user" | "admin" | "guide"
          sender_id?: string | null
          message?: string
          message_type?: "text" | "image" | "file" | "system" | null
          file_url?: string | null
          file_name?: string | null
          is_read?: boolean | null
          created_at?: string
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
