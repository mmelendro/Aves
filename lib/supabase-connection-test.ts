import { createClientSupabaseClient } from "./supabase-client"
import { bookingService } from "./booking-service"
import { profileService } from "./profile-service"

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
    console.log("🗄️ Testing database connection...")

    try {
      // Test connection with user_profiles table using user_id field
      const { data, error } = await this.supabase.from("user_profiles").select("user_id").limit(1)

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

      // CREATE test
      const testProfile = await profileService.createUserProfile({
        user_id: user.id,
        full_name: "Test User - Connection Test",
        phone_number: "+1234567890",
      })

      if (testProfile) {
        console.log("✅ Profile CREATE successful")
        results.create = {
          success: true,
          message: "Profile CREATE successful",
          timestamp: new Date().toISOString(),
          details: { profileId: testProfile.user_id },
        }

        // READ test
        console.log("📖 Testing profile READ...")
        const readProfile = await profileService.getCurrentUserProfile()
        if (readProfile && readProfile.user_id === user.id) {
          console.log("✅ Profile READ successful")
          results.read = {
            success: true,
            message: "Profile READ successful",
            timestamp: new Date().toISOString(),
            details: { profileId: readProfile.user_id },
          }

          // UPDATE test
          console.log("✏️ Testing profile UPDATE...")
          const updatedProfile = await profileService.updateUserProfile({
            full_name: "Updated Test User - Connection Test",
          })
          if (updatedProfile) {
            console.log("✅ Profile UPDATE successful")
            results.update = {
              success: true,
              message: "Profile UPDATE successful",
              timestamp: new Date().toISOString(),
              details: { profileId: updatedProfile.user_id },
            }
          }
        }

        // DELETE test
        console.log("🗑️ Testing profile DELETE...")
        const deleteSuccess = await profileService.deleteUserProfile()
        if (deleteSuccess) {
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

      // CREATE test
      console.log("📝 Testing booking CREATE...")
      const testBooking = await bookingService.createTestBooking()

      if (testBooking) {
        console.log("✅ Booking CREATE successful")
        results.create = {
          success: true,
          message: "Booking CREATE successful",
          timestamp: new Date().toISOString(),
          details: { bookingId: testBooking.id },
        }

        // READ test
        console.log("📖 Testing booking READ...")
        const readBooking = await bookingService.getBookingById(testBooking.id)
        if (readBooking && readBooking.id === testBooking.id) {
          console.log("✅ Booking READ successful")
          results.read = {
            success: true,
            message: "Booking READ successful",
            timestamp: new Date().toISOString(),
            details: { bookingId: readBooking.id },
          }

          // UPDATE test
          console.log("✏️ Testing booking UPDATE...")
          const updatedBooking = await bookingService.updateBooking(testBooking.id, {
            special_requests: "Updated test booking - Connection Test",
          })
          if (updatedBooking) {
            console.log("✅ Booking UPDATE successful")
            results.update = {
              success: true,
              message: "Booking UPDATE successful",
              timestamp: new Date().toISOString(),
              details: { bookingId: updatedBooking.id },
            }
          }
        }

        // DELETE test
        console.log("🗑️ Testing booking DELETE...")
        const deleteSuccess = await bookingService.deleteBooking(testBooking.id)
        if (deleteSuccess) {
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

    // Only run CRUD tests if basic connection works
    if (results.database.success) {
      results.profileOperations = await this.testProfileOperations()
      results.bookingOperations = await this.testBookingOperations()
    }

    // Calculate summary
    const allTests = [
      results.environment,
      results.database,
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
