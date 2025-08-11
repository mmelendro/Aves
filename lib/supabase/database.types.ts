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
          last_login: string | null
          marketing_consent: boolean | null
          gdpr_consent: boolean | null
          role: string | null
          first_name: string | null
          last_name: string | null
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
          last_login?: string | null
          marketing_consent?: boolean | null
          gdpr_consent?: boolean | null
          role?: string | null
          first_name?: string | null
          last_name?: string | null
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
          last_login?: string | null
          marketing_consent?: boolean | null
          gdpr_consent?: boolean | null
          role?: string | null
          first_name?: string | null
          last_name?: string | null
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string | null
          booking_data: any | null
          status: string | null
          created_at: string
          updated_at: string | null
          total_cost: number | null
          contact_info: any | null
          tour_selections: any | null
          special_requests: string | null
          booking_reference: string | null
          payment_status: string | null
          start_date: string | null
          end_date: string | null
          participants: number | null
          tour_type: string | null
          tour_name: string | null
          currency: string | null
          total_amount: number | null
          total_price: number | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          booking_data?: any | null
          status?: string | null
          created_at?: string
          updated_at?: string | null
          total_cost?: number | null
          contact_info?: any | null
          tour_selections?: any | null
          special_requests?: string | null
          booking_reference?: string | null
          payment_status?: string | null
          start_date?: string | null
          end_date?: string | null
          participants?: number | null
          tour_type?: string | null
          tour_name?: string | null
          currency?: string | null
          total_amount?: number | null
          total_price?: number | null
        }
        Update: {
          id?: string
          user_id?: string | null
          booking_data?: any | null
          status?: string | null
          created_at?: string
          updated_at?: string | null
          total_cost?: number | null
          contact_info?: any | null
          tour_selections?: any | null
          special_requests?: string | null
          booking_reference?: string | null
          payment_status?: string | null
          start_date?: string | null
          end_date?: string | null
          participants?: number | null
          tour_type?: string | null
          tour_name?: string | null
          currency?: string | null
          total_amount?: number | null
          total_price?: number | null
        }
      }
      user_profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          first_name: string | null
          last_name: string | null
          phone: string | null
          country: string | null
          city: string | null
          birding_experience: string | null
          dietary_restrictions: string[] | null
          special_requirements: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          passport_number: string | null
          passport_expiry: string | null
          date_of_birth: string | null
          travel_insurance_provider: string | null
          travel_insurance_policy: string | null
          profile_image_url: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          country?: string | null
          city?: string | null
          birding_experience?: string | null
          dietary_restrictions?: string[] | null
          special_requirements?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          passport_number?: string | null
          passport_expiry?: string | null
          date_of_birth?: string | null
          travel_insurance_provider?: string | null
          travel_insurance_policy?: string | null
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          country?: string | null
          city?: string | null
          birding_experience?: string | null
          dietary_restrictions?: string[] | null
          special_requirements?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          passport_number?: string | null
          passport_expiry?: string | null
          date_of_birth?: string | null
          travel_insurance_provider?: string | null
          travel_insurance_policy?: string | null
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string | null
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
    }
  }
}
