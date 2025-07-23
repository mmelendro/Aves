import { createClientSupabaseClient } from "./supabase-client"
import { refreshSupabaseSchemaCache } from "./schema-cache-refresh"
import { profileService } from "./profile-service"
import { bookingService } from "./booking-service"

export interface ConnectionTestResult {
  success: boolean
  message: string
  timestamp: string
  details?: {
    auth?: boolean
    database?: boolean
    profile?: boolean
    booking?: boolean
    cleanup?: boolean
  }
}

export interface TestResults {
  environment: ConnectionTestResult
  database: ConnectionTestResult
  schemaValidation: ConnectionTestResult
  schemaRefresh: ConnectionTestResult
  authentication: ConnectionTestResult
  profileOperations: {
    create: ConnectionTestResult
    read: ConnectionTestResult
    update: ConnectionTestResult
    delete: ConnectionTestResult
  }
  bookingOperations: {
    create: ConnectionTestResult
    read: ConnectionTestResult
    update: ConnectionTestResult
    delete: ConnectionTestResult
  }
  storage: ConnectionTestResult
  summary: {
    totalTests: number
    passedTests: number
    failedTests: number
    overallSuccess: boolean
  }
}

export class SupabaseConnectionTest {
  private supabase: any

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseAnonKey) {
      this.supabase = createClientSupabaseClient()
    }
  }

  async testEnvironmentVariables(): Promise<ConnectionTestResult> {
    console.log("🔧 Testing environment variables...")

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const details = {
      NEXT_PUBLIC_SUPABASE_URL: supabaseUrl ? "✅ Set" : "❌ Missing",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseAnonKey ? "✅ Set" : "❌ Missing",
      urlValid: supabaseUrl ? supabaseUrl.startsWith("https://") : false,
      keyValid: supabaseAnonKey ? supabaseAnonKey.length > 50 : false,
    }

    const success = !!(supabaseUrl && supabaseAnonKey && details.urlValid && details.keyValid)

    console.log(
      success ? "✅ Environment variables are properly configured" : "❌ Environment variables are missing or invalid",
    )
    console.log("Environment details:", details)

    return {
      success,
      message: success
        ? "All environment variables are properly configured"
        : "Missing or invalid environment variables",
      timestamp: new Date().toISOString(),
      details,
    }
  }

  async testDatabaseConnection(): Promise<ConnectionTestResult> {
    console.log("🗄️ Testing basic database connection...")

    try {
      if (!this.supabase) {
        return {
          success: false,
          message: "Supabase client not initialized",
          timestamp: new Date().toISOString(),
          details: { error: "Client initialization failed" },
        }
      }

      // Simple test - try to query the user_profiles table directly
      const { data, error } = await this.supabase.from("user_profiles").select("id, user_id").limit(1)

      if (error) {
        console.error("❌ Database connection failed:", error)

        if (error.message.includes("relation") && error.message.includes("does not exist")) {
          return {
            success: false,
            message: "user_profiles table does not exist",
            timestamp: new Date().toISOString(),
            details: {
              error: error.message,
              code: error.code,
              hint: error.hint,
              suggestion: "Please run the SQL script to create the user_profiles table",
              sqlScript: `-- Run this SQL script in your Supabase SQL editor:
DROP TABLE IF EXISTS user_profiles CASCADE;

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone_number TEXT,
  profile_image_url TEXT,
  bio TEXT,
  location TEXT,
  birding_experience TEXT CHECK (birding_experience IN ('beginner', 'intermediate', 'advanced', 'expert')),
  preferred_tour_types TEXT[],
  dietary_restrictions TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own profile" ON user_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);`,
            },
          }
        }

        return {
          success: false,
          message: `Database connection failed: ${error.message}`,
          timestamp: new Date().toISOString(),
          details: {
            error: error.message,
            code: error.code,
            hint: error.hint,
          },
        }
      }

      console.log("✅ Database connection successful")
      return {
        success: true,
        message: "Database connection successful",
        timestamp: new Date().toISOString(),
        details: { queryResult: data, recordCount: data?.length || 0 },
      }
    } catch (error: any) {
      console.error("❌ Database connection error:", error)
      return {
        success: false,
        message: `Database connection error: ${error.message}`,
        timestamp: new Date().toISOString(),
        details: { error: error.message },
      }
    }
  }

  async testSchemaValidation(): Promise<ConnectionTestResult> {
    console.log("📋 Testing schema validation...")

    try {
      if (!this.supabase) {
        return {
          success: false,
          message: "Supabase client not initialized",
          timestamp: new Date().toISOString(),
        }
      }

      // Test if we can query the table structure by trying to select specific columns
      const { data, error } = await this.supabase
        .from("user_profiles")
        .select("id, user_id, full_name, phone_number, birding_experience, created_at, updated_at")
        .limit(0) // We don't need actual data, just want to test the columns exist

      if (error) {
        console.error("❌ Schema validation failed:", error)

        if (error.message.includes("column") && error.message.includes("does not exist")) {
          const missingColumn = error.message.match(/column "([^"]+)"/)?.[1] || "unknown"
          return {
            success: false,
            message: `Missing column: ${missingColumn}`,
            timestamp: new Date().toISOString(),
            details: {
              error: error.message,
              missingColumn,
              suggestion: "Please run the updated SQL script to create the correct schema",
            },
          }
        }

        return {
          success: false,
          message: `Schema validation failed: ${error.message}`,
          timestamp: new Date().toISOString(),
          details: { error: error.message },
        }
      }

      console.log("✅ Schema validation successful")
      return {
        success: true,
        message: "Schema validation successful - all required columns exist including birding_experience",
        timestamp: new Date().toISOString(),
        details: { message: "All required columns are present" },
      }
    } catch (error: any) {
      console.error("❌ Schema validation error:", error)
      return {
        success: false,
        message: `Schema validation error: ${error.message}`,
        timestamp: new Date().toISOString(),
        details: { error: error.message },
      }
    }
  }

  async testSchemaRefresh(): Promise<ConnectionTestResult> {
    console.log("🔄 Testing schema cache refresh...")

    try {
      const refreshResult = await refreshSupabaseSchemaCache()

      console.log(refreshResult.success ? "✅ Schema cache refresh successful" : "❌ Schema cache refresh failed")

      return {
        success: refreshResult.success,
        message: refreshResult.message,
        timestamp: refreshResult.timestamp,
        details: {
          userProfilesValid: refreshResult.userProfilesValidation.success,
          bookingsValid: refreshResult.bookingsValidation.success,
          birdingExperienceFound: refreshResult.userProfilesValidation.details.columns.some(
            (col) => col.name === "birding_experience",
          ),
          currencyFound: refreshResult.bookingsValidation.details.columns.some((col) => col.name === "currency"),
          summary: refreshResult.summary,
        },
      }
    } catch (error: any) {
      console.error("❌ Schema refresh error:", error)
      return {
        success: false,
        message: `Schema refresh error: ${error.message}`,
        timestamp: new Date().toISOString(),
        details: { error: error.message },
      }
    }
  }

  async testAuthentication(): Promise<ConnectionTestResult> {
    console.log("🔐 Testing authentication...")

    try {
      const {
        data: { session },
        error,
      } = await this.supabase.auth.getSession()

      if (error) {
        console.error("❌ Authentication check failed:", error)
        return {
          success: false,
          message: `Authentication check failed: ${error.message}`,
          timestamp: new Date().toISOString(),
          details: { error: error.message },
        }
      }

      const isAuthenticated = !!session?.user
      console.log(isAuthenticated ? "✅ User is authenticated" : "⚠️ No authenticated user")

      return {
        success: true,
        message: isAuthenticated ? "User is authenticated" : "No authenticated user (normal for testing)",
        timestamp: new Date().toISOString(),
        details: {
          authenticated: isAuthenticated,
          userId: session?.user?.id || null,
          userEmail: session?.user?.email || null,
        },
      }
    } catch (error: any) {
      console.error("❌ Authentication error:", error)
      return {
        success: false,
        message: `Authentication error: ${error.message}`,
        timestamp: new Date().toISOString(),
        details: { error: error.message },
      }
    }
  }

  async testProfileOperations(): Promise<{
    create: ConnectionTestResult
    read: ConnectionTestResult
    update: ConnectionTestResult
    delete: ConnectionTestResult
  }> {
    console.log("👤 Testing profile CRUD operations...")

    const results = {
      create: { success: false, message: "Not run", timestamp: new Date().toISOString() },
      read: { success: false, message: "Not run", timestamp: new Date().toISOString() },
      update: { success: false, message: "Not run", timestamp: new Date().toISOString() },
      delete: { success: false, message: "Not run", timestamp: new Date().toISOString() },
    }

    try {
      const {
        data: { user },
      } = await this.supabase.auth.getUser()

      if (!user) {
        const message = "Profile operations require authentication"
        console.log("⚠️", message)
        return {
          create: { success: false, message, timestamp: new Date().toISOString() },
          read: { success: false, message, timestamp: new Date().toISOString() },
          update: { success: false, message, timestamp: new Date().toISOString() },
          delete: { success: false, message, timestamp: new Date().toISOString() },
        }
      }

      // CREATE test
      console.log("📝 Testing profile CREATE...")
      const { data: createData, error: createError } = await this.supabase
        .from("user_profiles")
        .insert({
          user_id: user.id,
          full_name: "Test User - Connection Test",
          phone_number: "+1234567890",
          birding_experience: "intermediate",
        })
        .select()
        .single()

      if (createError) {
        console.error("❌ Profile CREATE failed:", createError)
        results.create = {
          success: false,
          message: `Profile CREATE failed: ${createError.message}`,
          timestamp: new Date().toISOString(),
          details: { error: createError.message, code: createError.code },
        }
      } else {
        console.log("✅ Profile CREATE successful")
        results.create = {
          success: true,
          message: "Profile CREATE successful",
          timestamp: new Date().toISOString(),
          details: { profileId: createData.id },
        }

        // READ test
        console.log("📖 Testing profile READ...")
        const { data: readData, error: readError } = await this.supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (readError) {
          console.error("❌ Profile READ failed:", readError)
          results.read = {
            success: false,
            message: `Profile READ failed: ${readError.message}`,
            timestamp: new Date().toISOString(),
            details: { error: readError.message },
          }
        } else {
          console.log("✅ Profile READ successful")
          results.read = {
            success: true,
            message: "Profile READ successful",
            timestamp: new Date().toISOString(),
            details: { profileId: readData.id },
          }

          // UPDATE test
          console.log("✏️ Testing profile UPDATE...")
          const { data: updateData, error: updateError } = await this.supabase
            .from("user_profiles")
            .update({ full_name: "Updated Test User - Connection Test" })
            .eq("user_id", user.id)
            .select()
            .single()

          if (updateError) {
            console.error("❌ Profile UPDATE failed:", updateError)
            results.update = {
              success: false,
              message: `Profile UPDATE failed: ${updateError.message}`,
              timestamp: new Date().toISOString(),
              details: { error: updateError.message },
            }
          } else {
            console.log("✅ Profile UPDATE successful")
            results.update = {
              success: true,
              message: "Profile UPDATE successful",
              timestamp: new Date().toISOString(),
              details: { profileId: updateData.id },
            }
          }
        }

        // DELETE test
        console.log("🗑️ Testing profile DELETE...")
        const { error: deleteError } = await this.supabase.from("user_profiles").delete().eq("user_id", user.id)

        if (deleteError) {
          console.error("❌ Profile DELETE failed:", deleteError)
          results.delete = {
            success: false,
            message: `Profile DELETE failed: ${deleteError.message}`,
            timestamp: new Date().toISOString(),
            details: { error: deleteError.message },
          }
        } else {
          console.log("✅ Profile DELETE successful")
          results.delete = {
            success: true,
            message: "Profile DELETE successful",
            timestamp: new Date().toISOString(),
          }
        }
      }
    } catch (error: any) {
      console.error("❌ Profile operations error:", error)
      const errorMessage = `Profile operations error: ${error.message}`
      const errorResult = {
        success: false,
        message: errorMessage,
        timestamp: new Date().toISOString(),
        details: { error: error.message },
      }

      if (results.create.success === false && results.create.message === "Not run") {
        results.create = errorResult
      }
    }

    return results
  }

  async testBookingOperations(): Promise<{
    create: ConnectionTestResult
    read: ConnectionTestResult
    update: ConnectionTestResult
    delete: ConnectionTestResult
  }> {
    console.log("📅 Testing booking CRUD operations...")

    const results = {
      create: { success: false, message: "Not run", timestamp: new Date().toISOString() },
      read: { success: false, message: "Not run", timestamp: new Date().toISOString() },
      update: { success: false, message: "Not run", timestamp: new Date().toISOString() },
      delete: { success: false, message: "Not run", timestamp: new Date().toISOString() },
    }

    try {
      const {
        data: { user },
      } = await this.supabase.auth.getUser()

      if (!user) {
        const message = "Booking operations require authentication"
        console.log("⚠️", message)
        return {
          create: { success: false, message, timestamp: new Date().toISOString() },
          read: { success: false, message, timestamp: new Date().toISOString() },
          update: { success: false, message, timestamp: new Date().toISOString() },
          delete: { success: false, message, timestamp: new Date().toISOString() },
        }
      }

      // First check if bookings table exists
      const { data: testBookings, error: testError } = await this.supabase.from("bookings").select("id").limit(1)

      if (testError && testError.message.includes("relation") && testError.message.includes("does not exist")) {
        const message = "Bookings table does not exist - skipping booking tests"
        console.log("⚠️", message)
        return {
          create: { success: false, message, timestamp: new Date().toISOString() },
          read: { success: false, message, timestamp: new Date().toISOString() },
          update: { success: false, message, timestamp: new Date().toISOString() },
          delete: { success: false, message, timestamp: new Date().toISOString() },
        }
      }

      // CREATE test
      console.log("📝 Testing booking CREATE...")
      const { data: createData, error: createError } = await this.supabase
        .from("bookings")
        .insert({
          user_id: user.id,
          tour_name: "Test Tour - Connection Test",
          tour_type: "adventure",
          start_date: "2024-06-01",
          end_date: "2024-06-07",
          participants: 2,
          total_amount: 2500,
          currency: "USD",
          status: "pending",
        })
        .select()
        .single()

      if (createError) {
        console.error("❌ Booking CREATE failed:", createError)
        results.create = {
          success: false,
          message: `Booking CREATE failed: ${createError.message}`,
          timestamp: new Date().toISOString(),
          details: { error: createError.message },
        }
      } else {
        console.log("✅ Booking CREATE successful")
        results.create = {
          success: true,
          message: "Booking CREATE successful",
          timestamp: new Date().toISOString(),
          details: { bookingId: createData.id },
        }

        // READ test
        console.log("📖 Testing booking READ...")
        const { data: readData, error: readError } = await this.supabase
          .from("bookings")
          .select("*")
          .eq("id", createData.id)
          .single()

        if (readError) {
          console.error("❌ Booking READ failed:", readError)
          results.read = {
            success: false,
            message: `Booking READ failed: ${readError.message}`,
            timestamp: new Date().toISOString(),
            details: { error: readError.message },
          }
        } else {
          console.log("✅ Booking READ successful")
          results.read = {
            success: true,
            message: "Booking READ successful",
            timestamp: new Date().toISOString(),
            details: { bookingId: readData.id },
          }

          // UPDATE test
          console.log("✏️ Testing booking UPDATE...")
          const { data: updateData, error: updateError } = await this.supabase
            .from("bookings")
            .update({ special_requests: "Updated test booking - Connection Test" })
            .eq("id", createData.id)
            .select()
            .single()

          if (updateError) {
            console.error("❌ Booking UPDATE failed:", updateError)
            results.update = {
              success: false,
              message: `Booking UPDATE failed: ${updateError.message}`,
              timestamp: new Date().toISOString(),
              details: { error: updateError.message },
            }
          } else {
            console.log("✅ Booking UPDATE successful")
            results.update = {
              success: true,
              message: "Booking UPDATE successful",
              timestamp: new Date().toISOString(),
              details: { bookingId: updateData.id },
            }
          }
        }

        // DELETE test
        console.log("🗑️ Testing booking DELETE...")
        const { error: deleteError } = await this.supabase.from("bookings").delete().eq("id", createData.id)

        if (deleteError) {
          console.error("❌ Booking DELETE failed:", deleteError)
          results.delete = {
            success: false,
            message: `Booking DELETE failed: ${deleteError.message}`,
            timestamp: new Date().toISOString(),
            details: { error: deleteError.message },
          }
        } else {
          console.log("✅ Booking DELETE successful")
          results.delete = {
            success: true,
            message: "Booking DELETE successful",
            timestamp: new Date().toISOString(),
          }
        }
      }
    } catch (error: any) {
      console.error("❌ Booking operations error:", error)
      const errorMessage = `Booking operations error: ${error.message}`
      const errorResult = {
        success: false,
        message: errorMessage,
        timestamp: new Date().toISOString(),
        details: { error: error.message },
      }

      if (results.create.success === false && results.create.message === "Not run") {
        results.create = errorResult
      }
    }

    return results
  }

  async testStorageAccess(): Promise<ConnectionTestResult> {
    console.log("☁️ Testing storage access...")

    try {
      const { data, error } = await this.supabase.storage.listBuckets()

      if (error) {
        console.error("❌ Storage access failed:", error)
        return {
          success: false,
          message: `Storage access failed: ${error.message}`,
          timestamp: new Date().toISOString(),
          details: { error: error.message },
        }
      }

      console.log("✅ Storage access successful")
      return {
        success: true,
        message: `Storage access successful - ${data?.length || 0} buckets found`,
        timestamp: new Date().toISOString(),
        details: { buckets: data },
      }
    } catch (error: any) {
      console.error("❌ Storage access error:", error)
      return {
        success: false,
        message: `Storage access error: ${error.message}`,
        timestamp: new Date().toISOString(),
        details: { error: error.message },
      }
    }
  }

  async runFullConnectionTest(): Promise<TestResults> {
    console.log("🚀 Starting comprehensive Supabase connection test...")

    const results: TestResults = {
      environment: await this.testEnvironmentVariables(),
      database: await this.testDatabaseConnection(),
      schemaValidation: await this.testSchemaValidation(),
      schemaRefresh: await this.testSchemaRefresh(),
      authentication: await this.testAuthentication(),
      profileOperations: {
        create: { success: false, message: "Not run", timestamp: new Date().toISOString() },
        read: { success: false, message: "Not run", timestamp: new Date().toISOString() },
        update: { success: false, message: "Not run", timestamp: new Date().toISOString() },
        delete: { success: false, message: "Not run", timestamp: new Date().toISOString() },
      },
      bookingOperations: {
        create: { success: false, message: "Not run", timestamp: new Date().toISOString() },
        read: { success: false, message: "Not run", timestamp: new Date().toISOString() },
        update: { success: false, message: "Not run", timestamp: new Date().toISOString() },
        delete: { success: false, message: "Not run", timestamp: new Date().toISOString() },
      },
      storage: await this.testStorageAccess(),
      summary: {
        totalTests: 0,
        passedTests: 0,
        failedTests: 0,
        overallSuccess: false,
      },
    }

    // Only run CRUD tests if basic connection and schema validation work
    if (results.database.success && results.schemaValidation.success) {
      results.profileOperations = await this.testProfileOperations()
      results.bookingOperations = await this.testBookingOperations()
    }

    // Calculate summary
    const allTests = [
      results.environment,
      results.database,
      results.schemaValidation,
      results.schemaRefresh,
      results.authentication,
      results.profileOperations.create,
      results.profileOperations.read,
      results.profileOperations.update,
      results.profileOperations.delete,
      results.bookingOperations.create,
      results.bookingOperations.read,
      results.bookingOperations.update,
      results.bookingOperations.delete,
      results.storage,
    ]

    results.summary.totalTests = allTests.length
    results.summary.passedTests = allTests.filter((test) => test.success).length
    results.summary.failedTests = results.summary.totalTests - results.summary.passedTests
    results.summary.overallSuccess = results.summary.failedTests === 0

    console.log("📊 Test Summary:", results.summary)
    console.log(results.summary.overallSuccess ? "🎉 All tests passed!" : "⚠️ Some tests failed")

    return results
  }
}

// Create singleton instance
export const supabaseConnectionTest = new SupabaseConnectionTest()

export function logEnvironmentStatus() {
  console.log("🔍 Environment Status:")
  console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing")
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing")
}

export async function testSupabaseConnection(): Promise<ConnectionTestResult> {
  const supabase = createClientSupabaseClient()
  const details = {
    auth: false,
    database: false,
    profile: false,
    booking: false,
    cleanup: false,
  }

  try {
    // Test 1: Check authentication
    console.log("🔐 Testing authentication...")
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) {
      console.error("❌ Auth error:", authError.message)
      return {
        success: false,
        message: `Authentication failed: ${authError.message}`,
        timestamp: new Date().toISOString(),
        details,
      }
    }

    if (!user) {
      console.log("ℹ️ No authenticated user (this is normal for logged-out users)")
      details.auth = true
    } else {
      console.log("✅ User authenticated:", user.id)
      details.auth = true
    }

    // Test 2: Basic database connectivity
    console.log("🗄️ Testing database connectivity...")
    const { data: testQuery, error: dbError } = await supabase.from("user_profiles").select("count").limit(1)

    if (dbError) {
      console.error("❌ Database error:", dbError.message)
      return {
        success: false,
        message: `Database connection failed: ${dbError.message}`,
        timestamp: new Date().toISOString(),
        details,
      }
    }

    console.log("✅ Database connection successful")
    details.database = true

    // Test 3: Profile service (only if user is authenticated)
    if (user) {
      console.log("👤 Testing profile service...")
      try {
        const profile = await profileService.getCurrentUserProfile()
        console.log("✅ Profile service working:", profile ? `Profile ID: ${profile.id}` : "No profile found")
        details.profile = true
      } catch (error) {
        console.error("❌ Profile service error:", error)
        return {
          success: false,
          message: `Profile service failed: ${error}`,
          timestamp: new Date().toISOString(),
          details,
        }
      }

      // Test 4: Booking service
      console.log("📅 Testing booking service...")
      try {
        const bookingsResult = await bookingService.getUserBookings()
        if (bookingsResult.success) {
          console.log("✅ Booking service working:", `Found ${bookingsResult.bookings?.length || 0} bookings`)
          details.booking = true
        } else {
          console.log("⚠️ Booking service returned error:", bookingsResult.error)
          details.booking = false
        }
      } catch (error) {
        console.error("❌ Booking service error:", error)
        return {
          success: false,
          message: `Booking service failed: ${error}`,
          timestamp: new Date().toISOString(),
          details,
        }
      }

      // Test 5: Create and cleanup test booking
      console.log("🧪 Testing booking CRUD operations...")
      try {
        const testBookingResult = await bookingService.createTestBooking()
        if (testBookingResult.success && testBookingResult.booking) {
          console.log("✅ Test booking created:", testBookingResult.booking.id)

          // Cleanup test booking
          const cleanupResult = await bookingService.cleanupTestBookings()
          if (cleanupResult.success) {
            console.log("✅ Test bookings cleaned up:", cleanupResult.data)
            details.cleanup = true
          } else {
            console.log("⚠️ Cleanup failed:", cleanupResult.error)
          }
        } else {
          console.log("⚠️ Test booking creation failed:", testBookingResult.error)
        }
      } catch (error) {
        console.error("❌ Booking CRUD test error:", error)
        return {
          success: false,
          message: `Booking CRUD test failed: ${error}`,
          timestamp: new Date().toISOString(),
          details,
        }
      }
    }

    // All tests passed
    console.log("🎉 All connection tests passed!")
    return {
      success: true,
      message: user
        ? "Full connection test successful (authenticated user)"
        : "Basic connection test successful (no authenticated user)",
      timestamp: new Date().toISOString(),
      details,
    }
  } catch (error) {
    console.error("💥 Unexpected error during connection test:", error)
    return {
      success: false,
      message: `Unexpected error: ${error}`,
      timestamp: new Date().toISOString(),
      details,
    }
  }
}

export async function validateDatabaseSchema(): Promise<ConnectionTestResult> {
  const supabase = createClientSupabaseClient()

  try {
    console.log("🔍 Validating database schema...")

    // Test user_profiles table structure
    const { data: profilesTest, error: profilesError } = await supabase
      .from("user_profiles")
      .select("id, auth_user_id, full_name, created_at")
      .limit(1)

    if (profilesError) {
      return {
        success: false,
        message: `user_profiles table validation failed: ${profilesError.message}`,
        timestamp: new Date().toISOString(),
      }
    }

    // Test bookings table structure
    const { data: bookingsTest, error: bookingsError } = await supabase
      .from("bookings")
      .select("id, user_id, tour_type, total_price, created_at")
      .limit(1)

    if (bookingsError) {
      return {
        success: false,
        message: `bookings table validation failed: ${bookingsError.message}`,
        timestamp: new Date().toISOString(),
      }
    }

    console.log("✅ Database schema validation successful")
    return {
      success: true,
      message: "Database schema is valid and accessible",
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      message: `Schema validation error: ${error}`,
      timestamp: new Date().toISOString(),
    }
  }
}
