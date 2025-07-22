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
  authentication: ConnectionTestResult
  bookingPermissions: {
    insert: ConnectionTestResult
    select: ConnectionTestResult
    cleanup: ConnectionTestResult
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
  private supabase: any

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    )
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
    console.log("🗄️ Testing database connection...")

    try {
      const { data, error } = await this.supabase.from("user_profiles").select("id").limit(1)

      if (error) {
        console.error("❌ Database connection failed:", error)
        return {
          success: false,
          message: `Database connection failed: ${error.message}`,
          timestamp: new Date().toISOString(),
          details: { error: error.message, code: error.code, hint: error.hint },
        }
      }

      console.log("✅ Database connection successful")
      return {
        success: true,
        message: "Database connection successful",
        timestamp: new Date().toISOString(),
        details: { queryResult: data },
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

  async testBookingInsert(): Promise<ConnectionTestResult> {
    console.log("📝 Testing booking INSERT permission...")

    try {
      const testBooking = {
        tour_name: "Test Tour - Connection Test",
        tour_date: new Date().toISOString().split("T")[0],
        participants: 1,
        total_price: 100.0,
        status: "pending",
        created_at: new Date().toISOString(),
      }

      const { data, error } = await this.supabase.from("bookings").insert(testBooking).select().single()

      if (error) {
        console.error("❌ Booking INSERT failed:", error)
        return {
          success: false,
          message: `INSERT failed: ${error.message}`,
          timestamp: new Date().toISOString(),
          details: {
            error: error.message,
            code: error.code,
            hint: error.hint,
            testData: testBooking,
          },
        }
      }

      console.log("✅ Booking INSERT successful:", data)
      return {
        success: true,
        message: "INSERT operation successful",
        timestamp: new Date().toISOString(),
        details: { insertedRecord: data, testData: testBooking },
      }
    } catch (error: any) {
      console.error("❌ Booking INSERT error:", error)
      return {
        success: false,
        message: `INSERT error: ${error.message}`,
        timestamp: new Date().toISOString(),
        details: { error: error.message },
      }
    }
  }

  async testBookingSelect(insertedId?: string): Promise<ConnectionTestResult> {
    console.log("🔍 Testing booking SELECT permission...")

    try {
      let query = this.supabase.from("bookings").select("*")

      if (insertedId) {
        query = query.eq("id", insertedId)
      } else {
        query = query.eq("tour_name", "Test Tour - Connection Test").limit(1)
      }

      const { data, error } = await query

      if (error) {
        console.error("❌ Booking SELECT failed:", error)
        return {
          success: false,
          message: `SELECT failed: ${error.message}`,
          timestamp: new Date().toISOString(),
          details: {
            error: error.message,
            code: error.code,
            hint: error.hint,
            searchCriteria: insertedId ? { id: insertedId } : { tour_name: "Test Tour - Connection Test" },
          },
        }
      }

      const recordFound = data && data.length > 0
      console.log(recordFound ? "✅ Booking SELECT successful:" : "⚠️ No records found:", data)

      return {
        success: true,
        message: recordFound
          ? "SELECT operation successful - record retrieved"
          : "SELECT operation successful - no records found",
        timestamp: new Date().toISOString(),
        details: {
          recordsFound: data?.length || 0,
          retrievedData: data,
          searchCriteria: insertedId ? { id: insertedId } : { tour_name: "Test Tour - Connection Test" },
        },
      }
    } catch (error: any) {
      console.error("❌ Booking SELECT error:", error)
      return {
        success: false,
        message: `SELECT error: ${error.message}`,
        timestamp: new Date().toISOString(),
        details: { error: error.message },
      }
    }
  }

  async testBookingCleanup(): Promise<ConnectionTestResult> {
    console.log("🧹 Testing booking cleanup (DELETE)...")

    try {
      const { data, error } = await this.supabase
        .from("bookings")
        .delete()
        .eq("tour_name", "Test Tour - Connection Test")
        .select()

      if (error) {
        console.error("❌ Booking DELETE failed:", error)
        return {
          success: false,
          message: `DELETE failed: ${error.message}`,
          timestamp: new Date().toISOString(),
          details: {
            error: error.message,
            code: error.code,
            hint: error.hint,
          },
        }
      }

      const deletedCount = data?.length || 0
      console.log(`✅ Booking cleanup successful - ${deletedCount} records deleted`)

      return {
        success: true,
        message: `Cleanup successful - ${deletedCount} test records deleted`,
        timestamp: new Date().toISOString(),
        details: { deletedRecords: deletedCount, deletedData: data },
      }
    } catch (error: any) {
      console.error("❌ Booking cleanup error:", error)
      return {
        success: false,
        message: `Cleanup error: ${error.message}`,
        timestamp: new Date().toISOString(),
        details: { error: error.message },
      }
    }
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
      authentication: await this.testAuthentication(),
      bookingPermissions: {
        insert: { success: false, message: "Not run", timestamp: new Date().toISOString() },
        select: { success: false, message: "Not run", timestamp: new Date().toISOString() },
        cleanup: { success: false, message: "Not run", timestamp: new Date().toISOString() },
      },
      storage: await this.testStorageAccess(),
      summary: {
        totalTests: 0,
        passedTests: 0,
        failedTests: 0,
        overallSuccess: false,
      },
    }

    // Only run booking tests if basic connection works
    if (results.database.success) {
      results.bookingPermissions.insert = await this.testBookingInsert()

      // Get the inserted record ID for SELECT test
      let insertedId: string | undefined
      if (results.bookingPermissions.insert.success && results.bookingPermissions.insert.details?.insertedRecord?.id) {
        insertedId = results.bookingPermissions.insert.details.insertedRecord.id
      }

      results.bookingPermissions.select = await this.testBookingSelect(insertedId)
      results.bookingPermissions.cleanup = await this.testBookingCleanup()
    }

    // Calculate summary
    const allTests = [
      results.environment,
      results.database,
      results.authentication,
      results.bookingPermissions.insert,
      results.bookingPermissions.select,
      results.bookingPermissions.cleanup,
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
