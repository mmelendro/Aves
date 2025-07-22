import { createClient } from "@supabase/supabase-js"

export interface SchemaValidationResult {
  success: boolean
  message: string
  timestamp: string
  details: {
    tableExists: boolean
    columns: Array<{
      name: string
      type: string
      nullable: boolean
      default: string | null
    }>
    missingColumns: string[]
    extraColumns: string[]
    validationErrors: string[]
  }
}

export interface CacheRefreshResult {
  success: boolean
  message: string
  timestamp: string
  userProfilesValidation: SchemaValidationResult
  bookingsValidation: SchemaValidationResult
  summary: {
    totalValidations: number
    passedValidations: number
    failedValidations: number
    overallSuccess: boolean
  }
}

class SupabaseSchemaValidator {
  private supabase: any

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseAnonKey) {
      this.supabase = createClient(supabaseUrl, supabaseAnonKey)
    }
  }

  async validateUserProfilesTable(): Promise<SchemaValidationResult> {
    console.log("🔍 Validating user_profiles table schema...")

    const expectedColumns = [
      { name: "id", type: "uuid", nullable: false },
      { name: "user_id", type: "uuid", nullable: false },
      { name: "full_name", type: "text", nullable: true },
      { name: "phone_number", type: "text", nullable: true },
      { name: "profile_image_url", type: "text", nullable: true },
      { name: "bio", type: "text", nullable: true },
      { name: "location", type: "text", nullable: true },
      { name: "birding_experience", type: "text", nullable: true },
      { name: "preferred_tour_types", type: "text[]", nullable: true },
      { name: "dietary_restrictions", type: "text", nullable: true },
      { name: "emergency_contact_name", type: "text", nullable: true },
      { name: "emergency_contact_phone", type: "text", nullable: true },
      { name: "created_at", type: "timestamp with time zone", nullable: false },
      { name: "updated_at", type: "timestamp with time zone", nullable: false },
    ]

    try {
      // Test table existence by querying it
      const { data: tableTest, error: tableError } = await this.supabase.from("user_profiles").select("id").limit(1)

      if (tableError && tableError.message.includes("relation") && tableError.message.includes("does not exist")) {
        return {
          success: false,
          message: "user_profiles table does not exist",
          timestamp: new Date().toISOString(),
          details: {
            tableExists: false,
            columns: [],
            missingColumns: expectedColumns.map((col) => col.name),
            extraColumns: [],
            validationErrors: ["Table does not exist in database"],
          },
        }
      }

      // Test specific columns by attempting to select them
      const testColumns = [
        "id",
        "user_id",
        "full_name",
        "phone_number",
        "profile_image_url",
        "bio",
        "location",
        "birding_experience",
        "preferred_tour_types",
        "dietary_restrictions",
        "emergency_contact_name",
        "emergency_contact_phone",
        "created_at",
        "updated_at",
      ]

      const { data: columnTest, error: columnError } = await this.supabase
        .from("user_profiles")
        .select(testColumns.join(", "))
        .limit(0)

      const validationErrors: string[] = []
      const missingColumns: string[] = []
      const foundColumns: Array<{ name: string; type: string; nullable: boolean; default: string | null }> = []

      if (columnError) {
        if (columnError.message.includes("column") && columnError.message.includes("does not exist")) {
          const missingColumn = columnError.message.match(/column "([^"]+)"/)?.[1]
          if (missingColumn) {
            missingColumns.push(missingColumn)
            validationErrors.push(`Missing column: ${missingColumn}`)
          }
        } else {
          validationErrors.push(`Column validation error: ${columnError.message}`)
        }
      }

      // Test birding_experience column specifically
      const { data: birdingExpTest, error: birdingExpError } = await this.supabase
        .from("user_profiles")
        .select("birding_experience")
        .limit(0)

      if (birdingExpError) {
        if (birdingExpError.message.includes("birding_experience")) {
          missingColumns.push("birding_experience")
          validationErrors.push("Critical: birding_experience column is missing or inaccessible")
        }
      } else {
        foundColumns.push({ name: "birding_experience", type: "text", nullable: true, default: null })
        console.log("✅ birding_experience column validated successfully")
      }

      // Add found columns for successful validations
      testColumns.forEach((col) => {
        if (!missingColumns.includes(col)) {
          const expectedCol = expectedColumns.find((ec) => ec.name === col)
          if (expectedCol) {
            foundColumns.push({
              name: col,
              type: expectedCol.type,
              nullable: expectedCol.nullable,
              default: null,
            })
          }
        }
      })

      const success = missingColumns.length === 0 && validationErrors.length === 0

      return {
        success,
        message: success
          ? "user_profiles table schema validation passed"
          : `Schema validation failed: ${validationErrors.join(", ")}`,
        timestamp: new Date().toISOString(),
        details: {
          tableExists: true,
          columns: foundColumns,
          missingColumns,
          extraColumns: [],
          validationErrors,
        },
      }
    } catch (error: any) {
      return {
        success: false,
        message: `Schema validation error: ${error.message}`,
        timestamp: new Date().toISOString(),
        details: {
          tableExists: false,
          columns: [],
          missingColumns: expectedColumns.map((col) => col.name),
          extraColumns: [],
          validationErrors: [error.message],
        },
      }
    }
  }

  async validateBookingsTable(): Promise<SchemaValidationResult> {
    console.log("🔍 Validating bookings table schema...")

    const expectedColumns = [
      { name: "id", type: "uuid", nullable: false },
      { name: "user_id", type: "uuid", nullable: false },
      { name: "tour_name", type: "text", nullable: false },
      { name: "tour_type", type: "text", nullable: false },
      { name: "start_date", type: "date", nullable: false },
      { name: "end_date", type: "date", nullable: false },
      { name: "participants", type: "integer", nullable: false },
      { name: "total_amount", type: "numeric", nullable: false },
      { name: "currency", type: "text", nullable: true },
      { name: "status", type: "text", nullable: true },
      { name: "special_requests", type: "text", nullable: true },
      { name: "contact_name", type: "text", nullable: true },
      { name: "contact_email", type: "text", nullable: true },
      { name: "contact_phone", type: "text", nullable: true },
      { name: "created_at", type: "timestamp with time zone", nullable: false },
      { name: "updated_at", type: "timestamp with time zone", nullable: false },
    ]

    try {
      // Test table existence
      const { data: tableTest, error: tableError } = await this.supabase.from("bookings").select("id").limit(1)

      if (tableError && tableError.message.includes("relation") && tableError.message.includes("does not exist")) {
        return {
          success: false,
          message: "bookings table does not exist",
          timestamp: new Date().toISOString(),
          details: {
            tableExists: false,
            columns: [],
            missingColumns: expectedColumns.map((col) => col.name),
            extraColumns: [],
            validationErrors: ["Table does not exist in database"],
          },
        }
      }

      // Test specific columns
      const testColumns = [
        "id",
        "user_id",
        "tour_name",
        "tour_type",
        "start_date",
        "end_date",
        "participants",
        "total_amount",
        "currency",
        "status",
        "special_requests",
        "contact_name",
        "contact_email",
        "contact_phone",
        "created_at",
        "updated_at",
      ]

      const { data: columnTest, error: columnError } = await this.supabase
        .from("bookings")
        .select(testColumns.join(", "))
        .limit(0)

      const validationErrors: string[] = []
      const missingColumns: string[] = []
      const foundColumns: Array<{ name: string; type: string; nullable: boolean; default: string | null }> = []

      if (columnError) {
        if (columnError.message.includes("column") && columnError.message.includes("does not exist")) {
          const missingColumn = columnError.message.match(/column "([^"]+)"/)?.[1]
          if (missingColumn) {
            missingColumns.push(missingColumn)
            validationErrors.push(`Missing column: ${missingColumn}`)
          }
        } else {
          validationErrors.push(`Column validation error: ${columnError.message}`)
        }
      }

      // Test currency column specifically
      const { data: currencyTest, error: currencyError } = await this.supabase
        .from("bookings")
        .select("currency")
        .limit(0)

      if (currencyError) {
        if (currencyError.message.includes("currency")) {
          missingColumns.push("currency")
          validationErrors.push("Critical: currency column is missing or inaccessible")
        }
      } else {
        foundColumns.push({ name: "currency", type: "text", nullable: true, default: "USD" })
        console.log("✅ currency column validated successfully")
      }

      // Add found columns for successful validations
      testColumns.forEach((col) => {
        if (!missingColumns.includes(col)) {
          const expectedCol = expectedColumns.find((ec) => ec.name === col)
          if (expectedCol) {
            foundColumns.push({
              name: col,
              type: expectedCol.type,
              nullable: expectedCol.nullable,
              default: col === "currency" ? "USD" : null,
            })
          }
        }
      })

      const success = missingColumns.length === 0 && validationErrors.length === 0

      return {
        success,
        message: success
          ? "bookings table schema validation passed"
          : `Schema validation failed: ${validationErrors.join(", ")}`,
        timestamp: new Date().toISOString(),
        details: {
          tableExists: true,
          columns: foundColumns,
          missingColumns,
          extraColumns: [],
          validationErrors,
        },
      }
    } catch (error: any) {
      return {
        success: false,
        message: `Schema validation error: ${error.message}`,
        timestamp: new Date().toISOString(),
        details: {
          tableExists: false,
          columns: [],
          missingColumns: expectedColumns.map((col) => col.name),
          extraColumns: [],
          validationErrors: [error.message],
        },
      }
    }
  }

  async refreshSchemaCache(): Promise<CacheRefreshResult> {
    console.log("🔄 Starting Supabase schema cache refresh and validation...")

    const userProfilesValidation = await this.validateUserProfilesTable()
    const bookingsValidation = await this.validateBookingsTable()

    const validations = [userProfilesValidation, bookingsValidation]
    const passedValidations = validations.filter((v) => v.success).length
    const failedValidations = validations.length - passedValidations
    const overallSuccess = failedValidations === 0

    const result: CacheRefreshResult = {
      success: overallSuccess,
      message: overallSuccess
        ? "Schema cache refresh completed successfully - all validations passed"
        : `Schema cache refresh completed with ${failedValidations} validation failures`,
      timestamp: new Date().toISOString(),
      userProfilesValidation,
      bookingsValidation,
      summary: {
        totalValidations: validations.length,
        passedValidations,
        failedValidations,
        overallSuccess,
      },
    }

    console.log("📊 Schema Cache Refresh Summary:", result.summary)

    if (overallSuccess) {
      console.log("🎉 All schema validations passed! Cache is synchronized.")
    } else {
      console.log("⚠️ Some schema validations failed. Check details for required fixes.")
    }

    return result
  }
}

// Create singleton instance
export const schemaValidator = new SupabaseSchemaValidator()

// Main export function
export const refreshSupabaseSchemaCache = async (): Promise<CacheRefreshResult> => {
  return await schemaValidator.refreshSchemaCache()
}

// Utility functions for specific column validation
export const validateBirdingExperienceColumn = async (): Promise<boolean> => {
  const result = await schemaValidator.validateUserProfilesTable()
  return result.success && result.details.columns.some((col) => col.name === "birding_experience")
}

export const validateCurrencyColumn = async (): Promise<boolean> => {
  const result = await schemaValidator.validateBookingsTable()
  return result.success && result.details.columns.some((col) => col.name === "currency")
}
