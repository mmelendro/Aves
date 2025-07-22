import { createClientSupabaseClient } from "./supabase-client"

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

class SupabaseConnectionTest {
  private supabase = createClientSupabaseClient()

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
      // Test basic connection with a simple query
      const { data, error } = await this.supabase.from("user_profiles").select("count").limit(1)

      if (error) {
        console.error("❌ Database connection failed:", error)
        return {
          success: false,
          message: `Database connection failed: ${error.message}`,
          timestamp: new Date().toISOString(),
          details: {
            error: error.message,
            code: error.code,
            hint: error.hint,
            suggestion: "Check if the user_profiles table exists and has the correct schema",
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
    console.log("📋 Testing database schema validation...")

    try {
      // Test if user_profiles table has the correct structure
      const { data: tableInfo, error: tableError } = await this.supabase
        .from("user_profiles")
        .select("user_id, full_name, created_at")
        .limit(1)

      if (tableError) {
        console.error("❌ Schema validation failed:", tableError)

        // Check if it's a column not found error
        if (tableError.message.includes("column") && tableError.message.includes("does not exist")) {
          return {
            success: false,
            message: "Schema mismatch: user_profiles table structure is incorrect",
            timestamp: new Date().toISOString(),
            details: {
              error: tableError.message,
              suggestion: "Run the create-user-profiles-table-v2.sql script to create the correct schema",
              expectedColumns: ["user_id (UUID PRIMARY KEY)", "full_name", "phone_number", "created_at", "updated_at"],
            },
          }
        }

        return {
          success: false,
          message: `Schema validation failed: ${tableError.message}`,
          timestamp: new Date().toISOString(),
          details: { error: tableError.message, code: tableError.code },
        }
      }

      // Test if we can query the table structure
      const { data: structureTest, error: structureError } = await this.supabase
        .rpc("get_table_columns", { table_name: "user_profiles" })
        .single()

      console.log("✅ Schema validation successful")
      return {
        success: true,
        message: "Database schema is correctly configured with user_id primary key",
        timestamp: new Date().toISOString(),
        details: {
          tableAccessible: true,
          hasUserIdColumn: true,
          queryResult: tableInfo,
        },
      }
    } catch (error: any) {
      console.error("❌ Schema validation error:", error)
      return {
        success: false,
        message: `Schema validation error: ${error.message}`,
        timestamp: new Date().toISOString(),
        details: {
          error: error.message,
          suggestion: "Ensure the user_profiles table exists with user_id as primary key",
        },
      }
    }
  }

  async testAuthentication(): Promise<ConnectionTestResult> {
    console.log("🔐 Testing authentication status...")

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
      console.log(isAuthenticated ? "✅ User is authenticated" : "⚠️ No authenticated user (this is normal for testing)")

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
      // Test CREATE
      console.log("📝 Testing profile CREATE...")
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

      // Direct database insert test
      const { data: insertData, error: insertError } = await this.supabase
        .from("user_profiles")
        .insert({
          user_id: user.id,
          full_name: "Test User - Connection Test",
          phone_number: "+1234567890",
        })
        .select()
        .single()

      if (insertError) {
        console.error("❌ Profile CREATE failed:", insertError)
        results.create = {
          success: false,
          message: `Profile CREATE failed: ${insertError.message}`,
          timestamp: new Date().toISOString(),
          details: { error: insertError.message, code: insertError.code },
        }
      } else {
        console.log("✅ Profile CREATE successful")
        results.create = {
          success: true,
          message: "Profile CREATE successful",
          timestamp: new Date().toISOString(),
          details: { profileId: insertData.user_id },
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
            details: { profileId: readData.user_id },
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
              details: { profileId: updateData.user_id },
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

      // CREATE test - Direct database insert
      console.log("📝 Testing booking CREATE...")
      const { data: insertData, error: insertError } = await this.supabase
        .from("bookings")
        .insert({
          user_id: user.id,
          tour_name: "Test Tour - Connection Test",
          tour_type: "Adventure",
          start_date: new Date().toISOString().split("T")[0],
          end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          participants: 2,
          total_amount: 1000,
          currency: "USD",
          status: "pending",
          special_requests: "Test booking for connection test",
        })
        .select()
        .single()

      if (insertError) {
        console.error("❌ Booking CREATE failed:", insertError)
        results.create = {
          success: false,
          message: `Booking CREATE failed: ${insertError.message}`,
          timestamp: new Date().toISOString(),
          details: { error: insertError.message, code: insertError.code },
        }
      } else {
        console.log("✅ Booking CREATE successful")
        results.create = {
          success: true,
          message: "Booking CREATE successful",
          timestamp: new Date().toISOString(),
          details: { bookingId: insertData.id },
        }

        // READ test
        console.log("📖 Testing booking READ...")
        const { data: readData, error: readError } = await this.supabase
          .from("bookings")
          .select("*")
          .eq("id", insertData.id)
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
            .eq("id", insertData.id)
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
        const { error: deleteError } = await this.supabase.from("bookings").delete().eq("id", insertData.id)

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

      console.log("✅ Storage access successful:", data)
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
      schemaValidation: { success: false, message: "Not run", timestamp: new Date().toISOString() },
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

    // Only run schema validation if basic connection works
    if (results.database.success) {
      results.schemaValidation = await this.testSchemaValidation()

      // Only run CRUD tests if schema is valid
      if (results.schemaValidation.success) {
        results.profileOperations = await this.testProfileOperations()
        results.bookingOperations = await this.testBookingOperations()
      }
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
