"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CheckCircle, XCircle, AlertCircle, ChevronDown, Database, Shield, Cloud, User, Loader2 } from "lucide-react"
import { supabaseConnectionTest, type TestResults } from "@/lib/supabase-connection-test"

export function DatabaseConnectionTest() {
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<TestResults | null>(null)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const runTests = async () => {
    setIsRunning(true)
    setResults(null)

    try {
      console.log("🚀 Starting comprehensive database tests...")
      const testResults = await supabaseConnectionTest.runFullConnectionTest()
      setResults(testResults)
      console.log("✅ All tests completed")
    } catch (error) {
      console.error("❌ Test execution error:", error)
    } finally {
      setIsRunning(false)
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const getStatusIcon = (success: boolean) => {
    return success ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />
  }

  const getStatusBadge = (success: boolean) => {
    return (
      <Badge variant={success ? "default" : "destructive"} className={success ? "bg-green-500" : ""}>
        {success ? "PASSED" : "FAILED"}
      </Badge>
    )
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  const TestResultCard = ({
    title,
    result,
    icon,
  }: {
    title: string
    result: { success: boolean; message: string; timestamp: string; details?: any }
    icon: React.ReactNode
  }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(result.success)}
            {getStatusBadge(result.success)}
          </div>
        </div>
        <CardDescription>
          {result.message} • {formatTimestamp(result.timestamp)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible open={expandedSections[title]} onOpenChange={() => toggleSection(title)}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0">
              <span>View Details</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections[title] ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm overflow-auto max-h-64 whitespace-pre-wrap">
                {JSON.stringify(result.details, null, 2)}
              </pre>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )

  const BookingPermissionsCard = ({ permissions }: { permissions: TestResults["bookingPermissions"] }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle className="text-lg">Booking Table Permissions</CardTitle>
          </div>
        </div>
        <CardDescription>Testing INSERT, SELECT, and DELETE operations on bookings table</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col p-3 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">INSERT Test</div>
              <div className="flex items-center gap-2">
                {getStatusIcon(permissions.insert.success)}
                {getStatusBadge(permissions.insert.success)}
              </div>
            </div>
            <div className="text-sm text-gray-600">{permissions.insert.message}</div>
            <div className="text-xs text-gray-500 mt-1">{formatTimestamp(permissions.insert.timestamp)}</div>
          </div>

          <div className="flex flex-col p-3 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">SELECT Test</div>
              <div className="flex items-center gap-2">
                {getStatusIcon(permissions.select.success)}
                {getStatusBadge(permissions.select.success)}
              </div>
            </div>
            <div className="text-sm text-gray-600">{permissions.select.message}</div>
            <div className="text-xs text-gray-500 mt-1">{formatTimestamp(permissions.select.timestamp)}</div>
          </div>

          <div className="flex flex-col p-3 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Cleanup Test</div>
              <div className="flex items-center gap-2">
                {getStatusIcon(permissions.cleanup.success)}
                {getStatusBadge(permissions.cleanup.success)}
              </div>
            </div>
            <div className="text-sm text-gray-600">{permissions.cleanup.message}</div>
            <div className="text-xs text-gray-500 mt-1">{formatTimestamp(permissions.cleanup.timestamp)}</div>
          </div>
        </div>

        <Collapsible
          open={expandedSections["booking-permissions"]}
          onOpenChange={() => toggleSection("booking-permissions")}
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0">
              <span>View Detailed Results</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${expandedSections["booking-permissions"] ? "rotate-180" : ""}`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">INSERT Operation Details</h4>
              <pre className="text-sm overflow-auto max-h-32 whitespace-pre-wrap">
                {JSON.stringify(permissions.insert.details, null, 2)}
              </pre>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">SELECT Operation Details</h4>
              <pre className="text-sm overflow-auto max-h-32 whitespace-pre-wrap">
                {JSON.stringify(permissions.select.details, null, 2)}
              </pre>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Cleanup Operation Details</h4>
              <pre className="text-sm overflow-auto max-h-32 whitespace-pre-wrap">
                {JSON.stringify(permissions.cleanup.details, null, 2)}
              </pre>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Supabase Database Connection Test</h1>
        <p className="text-gray-600">Comprehensive testing of database connectivity, permissions, and operations</p>
      </div>

      <div className="mb-6">
        <Button onClick={runTests} disabled={isRunning} size="lg" className="w-full md:w-auto">
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running Tests...
            </>
          ) : (
            "Run Connection Tests"
          )}
        </Button>
      </div>

      {results && (
        <div className="space-y-6">
          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Test Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{results.summary.totalTests}</div>
                  <div className="text-sm text-blue-800">Total Tests</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{results.summary.passedTests}</div>
                  <div className="text-sm text-green-800">Passed</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{results.summary.failedTests}</div>
                  <div className="text-sm text-red-800">Failed</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">
                    {Math.round((results.summary.passedTests / results.summary.totalTests) * 100)}%
                  </div>
                  <div className="text-sm text-gray-800">Success Rate</div>
                </div>
              </div>

              {results.summary.overallSuccess ? (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertTitle className="text-green-800">All Tests Passed!</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Your Supabase configuration is working correctly. All database operations are functioning as
                    expected.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="border-red-200 bg-red-50">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <AlertTitle className="text-red-800">Some Tests Failed</AlertTitle>
                  <AlertDescription className="text-red-700">
                    {results.summary.failedTests} of {results.summary.totalTests} tests failed. Please check the
                    detailed results below to identify and fix issues.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="connection">Connection</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <TestResultCard
                title="Environment Variables"
                result={results.environment}
                icon={<Database className="h-5 w-5" />}
              />
              <TestResultCard
                title="Database Connection"
                result={results.database}
                icon={<Database className="h-5 w-5" />}
              />
              <TestResultCard
                title="Authentication Status"
                result={results.authentication}
                icon={<User className="h-5 w-5" />}
              />
              <TestResultCard title="Storage Access" result={results.storage} icon={<Cloud className="h-5 w-5" />} />
            </TabsContent>

            <TabsContent value="connection" className="space-y-4">
              <TestResultCard
                title="Environment Configuration"
                result={results.environment}
                icon={<Database className="h-5 w-5" />}
              />
              <TestResultCard
                title="Database Connectivity"
                result={results.database}
                icon={<Database className="h-5 w-5" />}
              />
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4">
              <TestResultCard
                title="User Authentication"
                result={results.authentication}
                icon={<User className="h-5 w-5" />}
              />
              <BookingPermissionsCard permissions={results.bookingPermissions} />
            </TabsContent>

            <TabsContent value="storage" className="space-y-4">
              <TestResultCard
                title="Storage Bucket Access"
                result={results.storage}
                icon={<Cloud className="h-5 w-5" />}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}

      {isRunning && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Running comprehensive database tests...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few moments...</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Named export as required
