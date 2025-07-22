"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Database,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  Play,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  User,
  Calendar,
  Cloud,
  Settings,
  Shield,
  FileText,
  Copy,
} from "lucide-react"
import { supabaseConnectionTest, type TestResults, type ConnectionTestResult } from "@/lib/supabase-connection-test"
import { toast } from "sonner"

interface TestStatusProps {
  result: ConnectionTestResult
  title: string
  description?: string
}

function TestStatus({ result, title, description }: TestStatusProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getStatusIcon = () => {
    if (result.message === "Not run") {
      return <AlertTriangle className="h-4 w-4 text-gray-400" />
    }
    return result.success ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    )
  }

  const getStatusColor = () => {
    if (result.message === "Not run") return "bg-gray-50 border-gray-200"
    return result.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
  }

  const getStatusText = () => {
    if (result.message === "Not run") return "Not Run"
    return result.success ? "Passed" : "Failed"
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-gray-50 ${getStatusColor()}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon()}
              <div>
                <h4 className="font-medium text-gray-900">{title}</h4>
                {description && <p className="text-sm text-gray-600">{description}</p>}
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
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="space-y-2">
            <div>
              <span className="font-medium text-gray-700">Message:</span>
              <span className="ml-2 text-gray-900">{result.message}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Timestamp:</span>
              <span className="ml-2 text-gray-600">{new Date(result.timestamp).toLocaleString()}</span>
            </div>
            {result.details && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-700">Details:</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(JSON.stringify(result.details, null, 2))}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <pre className="p-2 bg-white rounded border text-xs overflow-auto max-h-40">
                  {JSON.stringify(result.details, null, 2)}
                </pre>
              </div>
            )}
            {result.details?.sqlScript && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-700">SQL Script to Fix:</span>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(result.details.sqlScript)}>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy SQL
                  </Button>
                </div>
                <pre className="p-2 bg-blue-50 rounded border text-xs overflow-auto max-h-60 border-blue-200">
                  {result.details.sqlScript}
                </pre>
              </div>
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function DatabaseConnectionTest() {
  const [testResults, setTestResults] = useState<TestResults | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [hasRun, setHasRun] = useState(false)

  const runTests = async () => {
    setIsRunning(true)
    setHasRun(false)
    toast.info("Starting comprehensive database tests...")

    try {
      const results = await supabaseConnectionTest.runFullConnectionTest()
      setTestResults(results)
      setHasRun(true)

      if (results.summary.overallSuccess) {
        toast.success(`All ${results.summary.totalTests} tests passed successfully!`)
      } else {
        toast.error(`${results.summary.failedTests} of ${results.summary.totalTests} tests failed`)
      }
    } catch (error) {
      console.error("Error running tests:", error)
      toast.error("Failed to run tests. Check console for details.")
    } finally {
      setIsRunning(false)
    }
  }

  const resetTests = () => {
    setTestResults(null)
    setHasRun(false)
    toast.info("Tests reset. Ready to run again.")
  }

  useEffect(() => {
    // Auto-run tests on component mount
    runTests()
  }, [])

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Database className="h-8 w-8 text-emerald-600" />
          <h1 className="text-4xl font-bold text-gray-900">Database Connection Test</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive testing of Supabase connectivity, schema validation, authentication, and CRUD operations
        </p>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        <Button onClick={runTests} disabled={isRunning} size="lg" className="min-w-32">
          {isRunning ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Run Tests
            </>
          )}
        </Button>
        <Button onClick={resetTests} variant="outline" size="lg" disabled={isRunning}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Test Results Summary */}
      {testResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Test Summary
            </CardTitle>
            <CardDescription>Overall test execution results including schema cache refresh</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{testResults.summary.totalTests}</div>
                <div className="text-sm text-gray-600">Total Tests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{testResults.summary.passedTests}</div>
                <div className="text-sm text-gray-600">Passed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{testResults.summary.failedTests}</div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
              <div className="text-center">
                <div
                  className={`text-2xl font-bold ${testResults.summary.overallSuccess ? "text-green-600" : "text-red-600"}`}
                >
                  {testResults.summary.overallSuccess ? "✓" : "✗"}
                </div>
                <div className="text-sm text-gray-600">Status</div>
              </div>
            </div>
            {testResults.summary.overallSuccess ? (
              <Alert className="mt-4 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  ✅ All database operations are working correctly! Schema cache has been refreshed and synchronized.
                  <br />
                  <strong>birding_experience</strong> and <strong>currency</strong> columns have been validated.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="mt-4 border-red-200 bg-red-50">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  ❌ Some tests failed. Check the detailed results below. Schema cache refresh may have identified
                  missing columns.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Detailed Test Results */}
      {testResults && (
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="schema">Schema</TabsTrigger>
            <TabsTrigger value="refresh">Cache</TabsTrigger>
            <TabsTrigger value="profiles">Profiles</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="raw">Raw Data</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Basic Connectivity Tests
                </CardTitle>
                <CardDescription>Environment, database connection, and authentication tests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TestStatus
                  result={testResults.environment}
                  title="Environment Variables"
                  description="Supabase URL and API key configuration"
                />
                <TestStatus
                  result={testResults.database}
                  title="Database Connection"
                  description="Basic connectivity to Supabase database"
                />
                <TestStatus
                  result={testResults.authentication}
                  title="Authentication Status"
                  description="User session and authentication state"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schema" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Schema Validation
                </CardTitle>
                <CardDescription>Database table structure and column validation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TestStatus
                  result={testResults.schemaValidation}
                  title="Schema Validation"
                  description="Verify tables have correct structure including birding_experience column"
                />
                {!testResults.schemaValidation.success && (
                  <Alert className="border-amber-200 bg-amber-50">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800">
                      <strong>Schema Issue Detected:</strong> The database schema needs to be set up or updated. Please
                      run the SQL script provided in the test details above in your Supabase SQL editor.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="refresh" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Schema Cache Refresh
                </CardTitle>
                <CardDescription>Comprehensive schema cache refresh and validation of critical columns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TestStatus
                  result={testResults.schemaRefresh}
                  title="Schema Cache Refresh"
                  description="Refresh cache and validate birding_experience and currency columns"
                />
                {testResults.schemaRefresh.success && testResults.schemaRefresh.details && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">birding_experience</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">
                        {testResults.schemaRefresh.details.birdingExperienceFound ? "✅ Found" : "❌ Missing"}
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">currency</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">
                        {testResults.schemaRefresh.details.currencyFound ? "✅ Found" : "❌ Missing"}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profiles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile CRUD Operations
                </CardTitle>
                <CardDescription>Create, Read, Update, Delete operations on user_profiles table</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TestStatus
                  result={testResults.profileOperations.create}
                  title="Create Profile"
                  description="Insert new profile record with user_id reference"
                />
                <TestStatus
                  result={testResults.profileOperations.read}
                  title="Read Profile"
                  description="Select profile record by user_id"
                />
                <TestStatus
                  result={testResults.profileOperations.update}
                  title="Update Profile"
                  description="Update profile record using user_id"
                />
                <TestStatus
                  result={testResults.profileOperations.delete}
                  title="Delete Profile"
                  description="Delete profile record by user_id"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Booking CRUD Operations
                </CardTitle>
                <CardDescription>Create, Read, Update, Delete operations on bookings table</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TestStatus
                  result={testResults.bookingOperations.create}
                  title="Create Booking"
                  description="Insert new booking record with user_id reference"
                />
                <TestStatus
                  result={testResults.bookingOperations.read}
                  title="Read Booking"
                  description="Select booking record by id and user_id"
                />
                <TestStatus
                  result={testResults.bookingOperations.update}
                  title="Update Booking"
                  description="Update booking record using id and user_id"
                />
                <TestStatus
                  result={testResults.bookingOperations.delete}
                  title="Delete Booking"
                  description="Delete booking record by id and user_id"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="storage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5" />
                  Storage Access Test
                </CardTitle>
                <CardDescription>Supabase storage bucket access and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <TestStatus
                  result={testResults.storage}
                  title="Storage Access"
                  description="List storage buckets and verify permissions"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="raw" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Raw Test Data</CardTitle>
                <CardDescription>Complete test results in JSON format for debugging</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(testResults, null, 2))
                      toast.success("Raw data copied to clipboard!")
                    }}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy All
                  </Button>
                </div>
                <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-auto max-h-96 border">
                  {JSON.stringify(testResults, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Loading State */}
      {isRunning && !testResults && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-emerald-600" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Running Database Tests</h3>
                <p className="text-gray-600">
                  Testing connectivity, schema validation, cache refresh, authentication, and CRUD operations...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800 space-y-2">
          <p>
            <strong>Schema Cache Refresh:</strong> The test now includes automatic schema cache refresh to ensure
            synchronization with the current database structure.
          </p>
          <p>
            <strong>Critical Columns:</strong> Special validation for <code>birding_experience</code> and{" "}
            <code>currency</code> columns that are essential for AVES functionality.
          </p>
          <p>
            <strong>Authentication:</strong> Some tests require user authentication. Sign in to test full CRUD
            operations.
          </p>
          <p>
            <strong>Console Logs:</strong> Open browser DevTools to see detailed operation logs and error messages.
          </p>
          <p>
            <strong>Test Data:</strong> All test records are automatically cleaned up after testing.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
