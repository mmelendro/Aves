import { createClient } from "@supabase/supabase-js"

export interface ConnectionTestResult {
  success: boolean
  message: string
  timestamp: string
  details?: any
}

export interface TestResults {
  environment: ConnectionTestResult
  database: ConnectionTestResult
  schemaValidation: ConnectionTestResult
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
      this.supabase = createClient(supabaseUrl, supabaseAnonKey)
    }
  }

  async testEnvironmentVariables(): Promise<ConnectionTestResult> {
    console.log("🔧 Testing environment variables...")

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const details = {
      NEXT_PUBLIC_SUPABASE_URL: supabaseUrl ? "Set" : "Missing",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseAnonKey ? "Set" : "Missing",
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
      // If it doesn't exist, we'll get a clear error message
      const { data, error } = await this.supabase.from("user_profiles").select("id, user_id").limit(1)

      if (error) {
        console.error("❌ Database connection failed:", error)

        // Check if it's a table doesn't exist error
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
        .select("id, user_id, full_name, phone_number, created_at, updated_at")
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
        message: "Schema validation successful - all required columns exist",
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

// Legacy exports for backward compatibility
export const testSupabaseConnection = async (): Promise<ConnectionTestResult> => {
  const results = await supabaseConnectionTest.runFullConnectionTest()
  return {
    success: results.summary.overallSuccess,
    message: results.summary.overallSuccess
      ? `All ${results.summary.totalTests} tests passed successfully`
      : `${results.summary.failedTests} of ${results.summary.totalTests} tests failed`,
    timestamp: new Date().toISOString(),
    details: results,
  }
}

export const logEnvironmentStatus = (): void => {
  console.log("🔧 Environment Status Check:")
  console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing")
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Missing")
}
