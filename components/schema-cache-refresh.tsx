"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  Database,
  Table,
  Columns,
  ChevronDown,
  ChevronRight,
  Copy,
  ExternalLink,
} from "lucide-react"
import {
  refreshSupabaseSchemaCache,
  validateBirdingExperienceColumn,
  validateCurrencyColumn,
  type CacheRefreshResult,
  type SchemaValidationResult,
} from "@/lib/schema-cache-refresh"
import { toast } from "sonner"

interface ValidationDisplayProps {
  result: SchemaValidationResult
  title: string
  description: string
  criticalColumn?: string
}

function ValidationDisplay({ result, title, description, criticalColumn }: ValidationDisplayProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getStatusIcon = () => {
    return result.success ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    )
  }

  const getStatusColor = () => {
    return result.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
  }

  const getStatusText = () => {
    return result.success ? "Valid" : "Invalid"
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  const hasCriticalColumn = criticalColumn && result.details.columns.some((col) => col.name === criticalColumn)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-gray-50 ${getStatusColor()}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon()}
              <div>
                <h4 className="font-medium text-gray-900">{title}</h4>
                <p className="text-sm text-gray-600">{description}</p>
                {criticalColumn && (
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={hasCriticalColumn ? "default" : "destructive"} className="text-xs">
                      {criticalColumn}: {hasCriticalColumn ? "Found" : "Missing"}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={result.success ? "default" : "destructive"}>{getStatusText()}</Badge>
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </div>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
          <div>
            <span className="font-medium text-gray-700">Status:</span>
            <span className="ml-2 text-gray-900">{result.message}</span>
          </div>

          <div>
            <span className="font-medium text-gray-700">Table Exists:</span>
            <Badge variant={result.details.tableExists ? "default" : "destructive"} className="ml-2">
              {result.details.tableExists ? "Yes" : "No"}
            </Badge>
          </div>

          {result.details.columns.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700">Found Columns ({result.details.columns.length}):</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(result.details.columns.map((c) => c.name).join(", "))}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {result.details.columns.map((col, index) => (
                  <Badge
                    key={index}
                    variant={col.name === criticalColumn ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {col.name}
                    {col.name === criticalColumn && " ⭐"}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {result.details.missingColumns.length > 0 && (
            <div>
              <span className="font-medium text-red-700">
                Missing Columns ({result.details.missingColumns.length}):
              </span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {result.details.missingColumns.map((col, index) => (
                  <Badge key={index} variant="destructive" className="text-xs">
                    {col}
                    {col === criticalColumn && " ⚠️"}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {result.details.validationErrors.length > 0 && (
            <div>
              <span className="font-medium text-red-700">Validation Errors:</span>
              <ul className="mt-1 space-y-1">
                {result.details.validationErrors.map((error, index) => (
                  <li key={index} className="text-sm text-red-600 flex items-start gap-2">
                    <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="text-xs text-gray-500">Validated at: {new Date(result.timestamp).toLocaleString()}</div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function SchemaCacheRefresh() {
  const [refreshResult, setRefreshResult] = useState<CacheRefreshResult | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [specificValidations, setSpecificValidations] = useState<{
    birdingExperience: boolean | null
    currency: boolean | null
  }>({ birdingExperience: null, currency: null })

  const handleRefreshCache = async () => {
    setIsRefreshing(true)
    toast.info("Starting schema cache refresh and validation...")

    try {
      const result = await refreshSupabaseSchemaCache()
      setRefreshResult(result)

      // Also run specific column validations
      const [birdingExp, currency] = await Promise.all([validateBirdingExperienceColumn(), validateCurrencyColumn()])

      setSpecificValidations({
        birdingExperience: birdingExp,
        currency: currency,
      })

      if (result.success) {
        toast.success("Schema cache refresh completed successfully!")
      } else {
        toast.error(`Schema validation failed: ${result.summary.failedValidations} issues found`)
      }
    } catch (error) {
      console.error("Schema refresh error:", error)
      toast.error("Failed to refresh schema cache. Check console for details.")
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleSpecificValidation = async (column: "birding_experience" | "currency") => {
    toast.info(`Validating ${column} column...`)

    try {
      let result: boolean
      if (column === "birding_experience") {
        result = await validateBirdingExperienceColumn()
        setSpecificValidations((prev) => ({ ...prev, birdingExperience: result }))
      } else {
        result = await validateCurrencyColumn()
        setSpecificValidations((prev) => ({ ...prev, currency: result }))
      }

      toast.success(`${column} column validation: ${result ? "Found" : "Missing"}`)
    } catch (error) {
      toast.error(`Failed to validate ${column} column`)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <RefreshCw className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Supabase Schema Cache Refresh</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Validate and refresh the Supabase schema cache for the AVES project, ensuring all required columns are present
          and accessible
        </p>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        <Button onClick={handleRefreshCache} disabled={isRefreshing} size="lg" className="min-w-48">
          {isRefreshing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Refreshing Cache...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Schema Cache
            </>
          )}
        </Button>
      </div>

      {/* Critical Column Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Columns className="h-5 w-5" />
            Critical Column Status
          </CardTitle>
          <CardDescription>Real-time validation of the most important columns for AVES functionality</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">birding_experience</h4>
                <Button variant="outline" size="sm" onClick={() => handleSpecificValidation("birding_experience")}>
                  Validate
                </Button>
              </div>
              <p className="text-sm text-gray-600 mb-2">user_profiles table</p>
              <Badge
                variant={
                  specificValidations.birdingExperience === null
                    ? "secondary"
                    : specificValidations.birdingExperience
                      ? "default"
                      : "destructive"
                }
              >
                {specificValidations.birdingExperience === null
                  ? "Not Tested"
                  : specificValidations.birdingExperience
                    ? "✅ Found"
                    : "❌ Missing"}
              </Badge>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">currency</h4>
                <Button variant="outline" size="sm" onClick={() => handleSpecificValidation("currency")}>
                  Validate
                </Button>
              </div>
              <p className="text-sm text-gray-600 mb-2">bookings table</p>
              <Badge
                variant={
                  specificValidations.currency === null
                    ? "secondary"
                    : specificValidations.currency
                      ? "default"
                      : "destructive"
                }
              >
                {specificValidations.currency === null
                  ? "Not Tested"
                  : specificValidations.currency
                    ? "✅ Found"
                    : "❌ Missing"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Refresh Results */}
      {refreshResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Schema Validation Results
            </CardTitle>
            <CardDescription>Comprehensive validation results for all database tables and columns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{refreshResult.summary.totalValidations}</div>
                <div className="text-sm text-gray-600">Total Validations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{refreshResult.summary.passedValidations}</div>
                <div className="text-sm text-gray-600">Passed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{refreshResult.summary.failedValidations}</div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
              <div className="text-center">
                <div
                  className={`text-2xl font-bold ${refreshResult.summary.overallSuccess ? "text-green-600" : "text-red-600"}`}
                >
                  {refreshResult.summary.overallSuccess ? "✓" : "✗"}
                </div>
                <div className="text-sm text-gray-600">Status</div>
              </div>
            </div>

            {refreshResult.summary.overallSuccess ? (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  ✅ Schema cache refresh completed successfully! All required columns are present and accessible.
                  <br />
                  <strong>birding_experience</strong> and <strong>currency</strong> columns have been validated.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-red-200 bg-red-50">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  ❌ Schema validation found issues. Please review the detailed results below and run the necessary SQL
                  scripts to fix missing columns.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Detailed Results */}
      {refreshResult && (
        <Tabs defaultValue="user-profiles" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="user-profiles">User Profiles</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="raw-data">Raw Data</TabsTrigger>
          </TabsList>

          <TabsContent value="user-profiles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Table className="h-5 w-5" />
                  User Profiles Table Validation
                </CardTitle>
                <CardDescription>
                  Schema validation for user_profiles table including the critical birding_experience column
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ValidationDisplay
                  result={refreshResult.userProfilesValidation}
                  title="user_profiles Table"
                  description="User profile data structure validation"
                  criticalColumn="birding_experience"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Table className="h-5 w-5" />
                  Bookings Table Validation
                </CardTitle>
                <CardDescription>
                  Schema validation for bookings table including the critical currency column
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ValidationDisplay
                  result={refreshResult.bookingsValidation}
                  title="bookings Table"
                  description="Booking data structure validation"
                  criticalColumn="currency"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="raw-data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Raw Validation Data</CardTitle>
                <CardDescription>Complete validation results in JSON format for debugging</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(refreshResult, null, 2))
                      toast.success("Raw data copied to clipboard!")
                    }}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy All
                  </Button>
                </div>
                <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-auto max-h-96 border">
                  {JSON.stringify(refreshResult, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Loading State */}
      {isRefreshing && !refreshResult && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Refreshing Schema Cache</h3>
                <p className="text-gray-600">Validating database structure and synchronizing schema cache...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions and Preview URL */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Verification Instructions</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800 space-y-3">
          <p>
            <strong>Schema Validation:</strong> This tool validates the existence and accessibility of critical columns
            in your Supabase database.
          </p>
          <p>
            <strong>Critical Columns:</strong>
            <code className="bg-blue-100 px-1 rounded">birding_experience</code> in user_profiles and
            <code className="bg-blue-100 px-1 rounded">currency</code> in bookings are essential for AVES functionality.
          </p>
          <p>
            <strong>Cache Refresh:</strong> The validation process automatically refreshes the schema cache to ensure
            synchronization with the current database structure.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <ExternalLink className="h-4 w-4" />
            <span className="font-medium">Preview URL:</span>
            <code className="bg-blue-100 px-2 py-1 rounded text-sm">
              https://your-project.vercel.app/schema-refresh
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
