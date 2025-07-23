import { createClient } from "@supabase/supabase-js"

// Database implementation service for AVES Colombia
export class DatabaseImplementationService {
  private supabase
  private serviceRoleKey: string

  constructor() {
    this.serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    this.supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, this.serviceRoleKey)
  }

  // Phase 1: Core Schema Updates
  async executePhase1(): Promise<{ success: boolean; results: any[]; errors: any[] }> {
    const results: any[] = []
    const errors: any[] = []

    const phase1Scripts = [
      // Update user_profiles table
      `
      ALTER TABLE user_profiles 
      ADD COLUMN IF NOT EXISTS birding_experience TEXT CHECK (birding_experience IN ('beginner', 'intermediate', 'advanced', 'expert')),
      ADD COLUMN IF NOT EXISTS preferred_contact_method TEXT DEFAULT 'email' CHECK (preferred_contact_method IN ('email', 'phone', 'whatsapp')),
      ADD COLUMN IF NOT EXISTS travel_insurance_required BOOLEAN DEFAULT true,
      ADD COLUMN IF NOT EXISTS group_size_preference INTEGER DEFAULT 1,
      ADD COLUMN IF NOT EXISTS accessibility_requirements TEXT;
      `,

      // Update bookings table
      `
      ALTER TABLE bookings 
      ADD COLUMN IF NOT EXISTS booking_reference TEXT UNIQUE,
      ADD COLUMN IF NOT EXISTS tour_package_id UUID,
      ADD COLUMN IF NOT EXISTS deposit_amount DECIMAL(10,2),
      ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'completed')),
      ADD COLUMN IF NOT EXISTS tour_guide_assigned UUID,
      ADD COLUMN IF NOT EXISTS special_dietary_requirements TEXT,
      ADD COLUMN IF NOT EXISTS group_booking_id UUID;
      `,

      // Fix foreign key constraints
      `
      ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_user_id_fkey;
      ALTER TABLE bookings ADD CONSTRAINT bookings_user_id_fkey 
          FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE;
      `,
    ]

    for (const script of phase1Scripts) {
      try {
        const { data, error } = await this.supabase.rpc("exec_sql", { sql: script })
        if (error) {
          errors.push({ script, error: error.message })
        } else {
          results.push({ script, success: true, data })
        }
      } catch (err) {
        errors.push({ script, error: err })
      }
    }

    return { success: errors.length === 0, results, errors }
  }

  // Phase 2: Create New Tables
  async executePhase2(): Promise<{ success: boolean; results: any[]; errors: any[] }> {
    const results: any[] = []
    const errors: any[] = []

    const tableCreationScripts = [
      // tour_packages table
      `
      CREATE TABLE IF NOT EXISTS tour_packages (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          duration_days INTEGER NOT NULL,
          max_participants INTEGER NOT NULL,
          base_price DECIMAL(10,2) NOT NULL,
          difficulty_level TEXT CHECK (difficulty_level IN ('easy', 'moderate', 'challenging')),
          regions TEXT[] DEFAULT ARRAY[]::TEXT[],
          target_species TEXT[] DEFAULT ARRAY[]::TEXT[],
          included_services JSONB DEFAULT '{}'::jsonb,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      `,

      // tour_availability table
      `
      CREATE TABLE IF NOT EXISTS tour_availability (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          tour_package_id UUID NOT NULL REFERENCES tour_packages(id) ON DELETE CASCADE,
          start_date DATE NOT NULL,
          end_date DATE NOT NULL,
          available_spots INTEGER NOT NULL,
          price_override DECIMAL(10,2),
          status TEXT DEFAULT 'available' CHECK (status IN ('available', 'full', 'cancelled')),
          created_at TIMESTAMPTZ DEFAULT NOW()
      );
      `,

      // booking_payments table
      `
      CREATE TABLE IF NOT EXISTS booking_payments (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
          payment_method TEXT NOT NULL,
          amount DECIMAL(10,2) NOT NULL,
          currency TEXT DEFAULT 'USD',
          payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
          transaction_id TEXT UNIQUE,
          payment_date TIMESTAMPTZ,
          created_at TIMESTAMPTZ DEFAULT NOW()
      );
      `,

      // booking_participants table
      `
      CREATE TABLE IF NOT EXISTS booking_participants (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
          participant_name TEXT NOT NULL,
          participant_email TEXT,
          participant_phone TEXT,
          age_group TEXT CHECK (age_group IN ('child', 'adult', 'senior')),
          dietary_restrictions TEXT,
          medical_conditions TEXT,
          emergency_contact_name TEXT,
          emergency_contact_phone TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW()
      );
      `,

      // booking_communications table
      `
      CREATE TABLE IF NOT EXISTS booking_communications (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
          communication_type TEXT NOT NULL CHECK (communication_type IN ('email', 'sms', 'whatsapp', 'call')),
          subject TEXT,
          message TEXT NOT NULL,
          sent_at TIMESTAMPTZ DEFAULT NOW(),
          sent_by UUID REFERENCES auth.users(id),
          status TEXT DEFAULT 'sent' CHECK (status IN ('pending', 'sent', 'delivered', 'failed'))
      );
      `,

      // booking_documents table
      `
      CREATE TABLE IF NOT EXISTS booking_documents (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
          document_type TEXT NOT NULL CHECK (document_type IN ('passport', 'insurance', 'medical', 'waiver', 'itinerary')),
          document_name TEXT NOT NULL,
          document_url TEXT NOT NULL,
          uploaded_at TIMESTAMPTZ DEFAULT NOW(),
          uploaded_by UUID REFERENCES auth.users(id)
      );
      `,
    ]

    for (const script of tableCreationScripts) {
      try {
        const { data, error } = await this.supabase.rpc("exec_sql", { sql: script })
        if (error) {
          errors.push({ script, error: error.message })
        } else {
          results.push({ script, success: true, data })
        }
      } catch (err) {
        errors.push({ script, error: err })
      }
    }

    return { success: errors.length === 0, results, errors }
  }

  // Phase 3: Database Functions and Triggers
  async executePhase3(): Promise<{ success: boolean; results: any[]; errors: any[] }> {
    const results: any[] = []
    const errors: any[] = []

    const functionsAndTriggers = [
      // Booking reference generation function
      `
      CREATE OR REPLACE FUNCTION generate_booking_reference()
      RETURNS TEXT AS $$
      DECLARE
          ref TEXT;
      BEGIN
          ref := 'AVES-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
          RETURN ref;
      END;
      $$ LANGUAGE plpgsql;
      `,

      // Cost calculation function
      `
      CREATE OR REPLACE FUNCTION calculate_booking_cost(
          p_tour_package_id UUID,
          p_participants INTEGER,
          p_start_date DATE
      )
      RETURNS DECIMAL(10,2) AS $$
      DECLARE
          base_price DECIMAL(10,2);
          price_override DECIMAL(10,2);
          total_cost DECIMAL(10,2);
      BEGIN
          SELECT tp.base_price INTO base_price
          FROM tour_packages tp
          WHERE tp.id = p_tour_package_id;
          
          SELECT ta.price_override INTO price_override
          FROM tour_availability ta
          WHERE ta.tour_package_id = p_tour_package_id
          AND p_start_date BETWEEN ta.start_date AND ta.end_date;
          
          total_cost := COALESCE(price_override, base_price) * p_participants;
          
          RETURN total_cost;
      END;
      $$ LANGUAGE plpgsql;
      `,

      // Booking status trigger function
      `
      CREATE OR REPLACE FUNCTION update_booking_status()
      RETURNS TRIGGER AS $$
      BEGIN
          IF NEW.status = 'pending' AND EXISTS (
              SELECT 1 FROM booking_payments 
              WHERE booking_id = NEW.id AND payment_status = 'completed'
          ) THEN
              NEW.status := 'confirmed';
          END IF;
          
          IF NEW.booking_reference IS NULL THEN
              NEW.booking_reference := generate_booking_reference();
          END IF;
          
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      `,

      // Create booking status trigger
      `
      DROP TRIGGER IF EXISTS booking_status_trigger ON bookings;
      CREATE TRIGGER booking_status_trigger
          BEFORE INSERT OR UPDATE ON bookings
          FOR EACH ROW
          EXECUTE FUNCTION update_booking_status();
      `,

      // Availability management function
      `
      CREATE OR REPLACE FUNCTION update_tour_availability()
      RETURNS TRIGGER AS $$
      BEGIN
          IF NEW.status = 'confirmed' AND OLD.status != 'confirmed' THEN
              UPDATE tour_availability 
              SET available_spots = available_spots - NEW.participants
              WHERE tour_package_id = NEW.tour_package_id
              AND NEW.start_date BETWEEN start_date AND end_date;
          END IF;
          
          IF NEW.status = 'cancelled' AND OLD.status = 'confirmed' THEN
              UPDATE tour_availability 
              SET available_spots = available_spots + NEW.participants
              WHERE tour_package_id = NEW.tour_package_id
              AND NEW.start_date BETWEEN start_date AND end_date;
          END IF;
          
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      `,

      // Create availability trigger
      `
      DROP TRIGGER IF EXISTS availability_trigger ON bookings;
      CREATE TRIGGER availability_trigger
          AFTER UPDATE ON bookings
          FOR EACH ROW
          EXECUTE FUNCTION update_tour_availability();
      `,
    ]

    for (const script of functionsAndTriggers) {
      try {
        const { data, error } = await this.supabase.rpc("exec_sql", { sql: script })
        if (error) {
          errors.push({ script, error: error.message })
        } else {
          results.push({ script, success: true, data })
        }
      } catch (err) {
        errors.push({ script, error: err })
      }
    }

    return { success: errors.length === 0, results, errors }
  }

  // Phase 4: Performance Indexes
  async executePhase4(): Promise<{ success: boolean; results: any[]; errors: any[] }> {
    const results: any[] = []
    const errors: any[] = []

    const indexScripts = [
      `CREATE INDEX IF NOT EXISTS idx_bookings_status_date ON bookings(status, start_date);`,
      `CREATE INDEX IF NOT EXISTS idx_bookings_user_status ON bookings(user_id, status);`,
      `CREATE INDEX IF NOT EXISTS idx_tour_availability_dates ON tour_availability(start_date, end_date);`,
      `CREATE INDEX IF NOT EXISTS idx_booking_payments_status ON booking_payments(payment_status);`,
      `CREATE INDEX IF NOT EXISTS idx_booking_participants_booking ON booking_participants(booking_id);`,
      `CREATE INDEX IF NOT EXISTS idx_tour_packages_regions ON tour_packages USING GIN(regions);`,
      `CREATE INDEX IF NOT EXISTS idx_tour_packages_species ON tour_packages USING GIN(target_species);`,
      `CREATE INDEX IF NOT EXISTS idx_user_profiles_experience ON user_profiles(birding_experience);`,
    ]

    for (const script of indexScripts) {
      try {
        const { data, error } = await this.supabase.rpc("exec_sql", { sql: script })
        if (error) {
          errors.push({ script, error: error.message })
        } else {
          results.push({ script, success: true, data })
        }
      } catch (err) {
        errors.push({ script, error: err })
      }
    }

    return { success: errors.length === 0, results, errors }
  }

  // Phase 5: Row Level Security Policies
  async executePhase5(): Promise<{ success: boolean; results: any[]; errors: any[] }> {
    const results: any[] = []
    const errors: any[] = []

    const rlsPolicies = [
      // Enable RLS on new tables
      `ALTER TABLE tour_packages ENABLE ROW LEVEL SECURITY;`,
      `ALTER TABLE tour_availability ENABLE ROW LEVEL SECURITY;`,
      `ALTER TABLE booking_payments ENABLE ROW LEVEL SECURITY;`,
      `ALTER TABLE booking_participants ENABLE ROW LEVEL SECURITY;`,
      `ALTER TABLE booking_communications ENABLE ROW LEVEL SECURITY;`,
      `ALTER TABLE booking_documents ENABLE ROW LEVEL SECURITY;`,

      // Tour packages policies (public read)
      `
      CREATE POLICY "Anyone can view tour packages" ON tour_packages
          FOR SELECT USING (true);
      `,

      // Tour availability policies (public read)
      `
      CREATE POLICY "Anyone can view tour availability" ON tour_availability
          FOR SELECT USING (true);
      `,

      // Booking payments policies
      `
      CREATE POLICY "Users can view own booking payments" ON booking_payments
          FOR SELECT USING (
              booking_id IN (
                  SELECT id FROM bookings b
                  JOIN user_profiles up ON b.user_id = up.id
                  WHERE up.auth_user_id = auth.uid()
              )
          );
      `,

      // Booking participants policies
      `
      CREATE POLICY "Users can manage own booking participants" ON booking_participants
          FOR ALL USING (
              booking_id IN (
                  SELECT id FROM bookings b
                  JOIN user_profiles up ON b.user_id = up.id
                  WHERE up.auth_user_id = auth.uid()
              )
          );
      `,

      // Booking communications policies
      `
      CREATE POLICY "Users can view own booking communications" ON booking_communications
          FOR SELECT USING (
              booking_id IN (
                  SELECT id FROM bookings b
                  JOIN user_profiles up ON b.user_id = up.id
                  WHERE up.auth_user_id = auth.uid()
              )
          );
      `,

      // Booking documents policies
      `
      CREATE POLICY "Users can manage own booking documents" ON booking_documents
          FOR ALL USING (
              booking_id IN (
                  SELECT id FROM bookings b
                  JOIN user_profiles up ON b.user_id = up.id
                  WHERE up.auth_user_id = auth.uid()
              )
          );
      `,
    ]

    for (const script of rlsPolicies) {
      try {
        const { data, error } = await this.supabase.rpc("exec_sql", { sql: script })
        if (error) {
          errors.push({ script, error: error.message })
        } else {
          results.push({ script, success: true, data })
        }
      } catch (err) {
        errors.push({ script, error: err })
      }
    }

    return { success: errors.length === 0, results, errors }
  }

  // Verification methods
  async verifyPhase1(): Promise<{ success: boolean; results: any }> {
    try {
      // Check if new columns exist in user_profiles
      const { data: userProfilesColumns } = await this.supabase.rpc("exec_sql", {
        sql: `
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'user_profiles' 
            AND column_name IN ('birding_experience', 'preferred_contact_method', 'travel_insurance_required', 'group_size_preference', 'accessibility_requirements');
          `,
      })

      // Check if new columns exist in bookings
      const { data: bookingsColumns } = await this.supabase.rpc("exec_sql", {
        sql: `
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'bookings' 
            AND column_name IN ('booking_reference', 'tour_package_id', 'deposit_amount', 'payment_status', 'tour_guide_assigned', 'special_dietary_requirements', 'group_booking_id');
          `,
      })

      return {
        success: true,
        results: {
          userProfilesColumns,
          bookingsColumns,
        },
      }
    } catch (error) {
      return { success: false, results: { error } }
    }
  }

  async verifyPhase2(): Promise<{ success: boolean; results: any }> {
    try {
      const { data: tables } = await this.supabase.rpc("exec_sql", {
        sql: `
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('tour_packages', 'tour_availability', 'booking_payments', 'booking_participants', 'booking_communications', 'booking_documents');
          `,
      })

      return { success: true, results: { tables } }
    } catch (error) {
      return { success: false, results: { error } }
    }
  }

  async verifyPhase3(): Promise<{ success: boolean; results: any }> {
    try {
      const { data: functions } = await this.supabase.rpc("exec_sql", {
        sql: `
            SELECT routine_name 
            FROM information_schema.routines 
            WHERE routine_schema = 'public' 
            AND routine_name IN ('generate_booking_reference', 'calculate_booking_cost', 'update_booking_status', 'update_tour_availability');
          `,
      })

      const { data: triggers } = await this.supabase.rpc("exec_sql", {
        sql: `
            SELECT trigger_name, event_object_table 
            FROM information_schema.triggers 
            WHERE trigger_schema = 'public' 
            AND trigger_name IN ('booking_status_trigger', 'availability_trigger');
          `,
      })

      return { success: true, results: { functions, triggers } }
    } catch (error) {
      return { success: false, results: { error } }
    }
  }

  async verifyPhase4(): Promise<{ success: boolean; results: any }> {
    try {
      const { data: indexes } = await this.supabase.rpc("exec_sql", {
        sql: `
            SELECT indexname, tablename 
            FROM pg_indexes 
            WHERE schemaname = 'public' 
            AND indexname LIKE 'idx_%';
          `,
      })

      return { success: true, results: { indexes } }
    } catch (error) {
      return { success: false, results: { error } }
    }
  }

  async verifyPhase5(): Promise<{ success: boolean; results: any }> {
    try {
      const { data: policies } = await this.supabase.rpc("exec_sql", {
        sql: `
            SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
            FROM pg_policies 
            WHERE schemaname = 'public';
          `,
      })

      return { success: true, results: { policies } }
    } catch (error) {
      return { success: false, results: { error } }
    }
  }

  // Test booking creation
  async testBookingCreation(): Promise<{ success: boolean; results: any }> {
    try {
      // Create a test booking
      const { data: booking, error } = await this.supabase
        .from("bookings")
        .insert({
          tour_name: "Test Sierra Nevada Tour",
          tour_type: "adventure",
          start_date: "2024-06-15",
          end_date: "2024-06-22",
          participants: 2,
          total_amount: 2500.0,
          contact_name: "Test User",
          contact_email: "test@example.com",
          contact_phone: "+1234567890",
          status: "test",
        })
        .select()
        .single()

      if (error) {
        return { success: false, results: { error } }
      }

      // Clean up test booking
      await this.supabase.from("bookings").delete().eq("id", booking.id)

      return { success: true, results: { booking } }
    } catch (error) {
      return { success: false, results: { error } }
    }
  }
}

export const databaseImplementation = new DatabaseImplementationService()
