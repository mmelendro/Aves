"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { testSupabaseConnection, signInWithGoogle, signInWithMagicLink, supabase } from "@/lib/enhanced-supabase"
import { CheckCircle, XCircle, AlertTriangle, Loader2, Database, RefreshCw } from "lucide-react"

interface DiagnosticResult {
  test: string
  status: "pass" | "fail" | "warning" | "info"
  message: string
  details?: any
  timestamp: string
}

export function ConnectionDiagnostics() {
  const [results, setResults] = useState<DiagnosticResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [testEmail, setTestEmail] = useState("")

  const addResult = (result: Omit<DiagnosticResult, "timestamp">) => {
    setResults((prev) => [...prev, { ...result, timestamp: new Date().toISOString() }])
  }

  const runDiagnostics = async () => {
    setIsRunning(true)
    setResults([])
    setProgress(0)

    const tests = [
      { name: "Database Connection", weight: 20 },
      { name: "Authentication Service", weight: 20 },
      { name: "User Session", weight: 15 },
      { name: "RLS Policies", weight: 15 },
      { name: "Environment Variables", weight: 10 },
      { name: "Google OAuth Config", weight: 10 },
      { name: "Magic Link Config", weight: 10 },
    ]

    let currentProgress = 0

    try {
      // Test 1: Database Connection
      addResult({
        test: "Database Connection",
        status: "info",
        message: "Testing database connectivity...",
      })

      const connectionResult = await testSupabaseConnection()
      currentProgress += tests[0].weight
      setProgress(currentProgress)

      if (connectionResult.success) {
        addResult({
          test: "Database Connection",
          status: "pass",
          message: "Successfully connected to database",
          details: connectionResult.details,
        })
      } else {
        addResult({
          test: "Database Connection",
          status: "fail",
          message: connectionResult.error || "Failed to connect to database",
          details: connectionResult.details,
        })
      }

      // Test 2: Authentication Service
      addResult({
        test: "Authentication Service",
        status: "info",
        message: "Testing authentication service...",
      })

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()
      currentProgress += tests[1].weight
      setProgress(currentProgress)

      if (authError) {
        addResult({
          test: "Authentication Service",
          status: "warning",
          message: "Auth service accessible but has issues",
          details: { error: authError.message },
        })
      } else {
        addResult({
          test: "Authentication Service",
          status: "pass",
          message: user ? "User authenticated" : "Auth service working (no user session)",
          details: { hasUser: !!user, userEmail: user?.email },
        })
      }

      // Test 3: User Session
      addResult({
        test: "User Session",
        status: "info",
        message: "Checking user session...",
      })

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()
      currentProgress += tests[2].weight
      setProgress(currentProgress)

      if (sessionError) {
        addResult({
          test: "User Session",
          status: "fail",
          message: "Session check failed",
          details: { error: sessionError.message },
        })
      } else if (session) {
        addResult({
          test: "User Session",
          status: "pass",
          message: "Valid user session found",
          details: {
            userId: session.user.id,
            email: session.user.email,
            expiresAt: session.expires_at,
          },
        })
      } else {
        addResult({
          test: "User Session",
          status: "info",
          message: "No active user session",
          details: { message: "User not logged in" },
        })
      }

      // Test 4: RLS Policies
      addResult({
        test: "RLS Policies",
        status: "info",
        message: "Testing Row Level Security policies...",
      })

      try {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("count", { count: "exact", head: true })

        currentProgress += tests[3].weight
        setProgress(currentProgress)

        if (profileError) {
          addResult({
            test: "RLS Policies",
            status: "warning",
            message: "RLS policies may need configuration",
            details: { error: profileError.message },
          })
        } else {
          addResult({
            test: "RLS Policies",
            status: "pass",
            message: "RLS policies working correctly",
            details: { profileCount: profileData?.count || 0 },
          })
        }
      } catch (rlsError: any) {
        addResult({
          test: "RLS Policies",
          status: "fail",
          message: "RLS policy error detected",
          details: { error: rlsError.message },
        })
      }

      // Test 5: Environment Variables
      addResult({
        test: "Environment Variables",
        status: "info",
        message: "Checking environment configuration...",
      })

      const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
      const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      const hasSiteUrl = !!process.env.NEXT_PUBLIC_SITE_URL

      currentProgress += tests[4].weight
      setProgress(currentProgress)

      if (hasSupabaseUrl && hasAnonKey) {
        addResult({
          test: "Environment Variables",
          status: "pass",
          message: "Required environment variables present",
          details: {
            hasSupabaseUrl,
            hasAnonKey,
            hasSiteUrl,
            siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
          },
        })
      } else {
        addResult({
          test: "Environment Variables",
          status: "fail",
          message: "Missing required environment variables",
          details: { hasSupabaseUrl, hasAnonKey, hasSiteUrl },
        })
      }

      // Test 6: Google OAuth Config
      addResult({
        test: "Google OAuth Config",
        status: "info",
        message: "Testing Google OAuth configuration...",
      })

      try {
        // This will fail if Google OAuth is not configured, but won't throw an error
        const googleResult = await signInWithGoogle()
        currentProgress += tests[5].weight
        setProgress(currentProgress)

        if (googleResult.success) {
          addResult({
            test: "Google OAuth Config",
            status: "pass",
            message: "Google OAuth is properly configured",
          })
        } else if (googleResult.error?.includes("provider is not enabled")) {
          addResult({
            test: "Google OAuth Config",
            status: "warning",
            message: "Google OAuth provider is not enabled in Supabase",
            details: { error: googleResult.error },
          })
        } else {
          addResult({
            test: "Google OAuth Config",
            status: "fail",
            message: "Google OAuth configuration issue",
            details: { error: googleResult.error },
          })
        }
      } catch (googleError: any) {
        addResult({
          test: "Google OAuth Config",
          status: "fail",
          message: "Google OAuth test failed",
          details: { error: googleError.message },
        })
      }

      // Test 7: Magic Link Config
      addResult({
        test: "Magic Link Config",
        status: "info",
        message: "Testing magic link configuration...",
      })

      if (testEmail) {
        try {
          const magicResult = await signInWithMagicLink(testEmail)
          currentProgress += tests[6].weight
          setProgress(currentProgress)

          if (magicResult.success) {
            addResult({
              test: "Magic Link Config",
              status: "pass",
              message: "Magic link sent successfully",
              details: { email: testEmail },
            })
          } else {
            addResult({
              test: "Magic Link Config",
              status: "fail",
              message: "Magic link failed to send",
              details: { error: magicResult.error, email: testEmail },
            })
          }
        } catch (magicError: any) {
          addResult({
            test: "Magic Link Config",
            status: "fail",
            message: "Magic link test failed",
            details: { error: magicError.message, email: testEmail },
          })
        }
      } else {
        currentProgress += tests[6].weight
        setProgress(currentProgress)

        addResult({
          test: "Magic Link Config",
          status: "info",
          message: "Skipped - no test email provided",
          details: { message: "Provide an email to test magic link functionality" },
        })
      }

      setProgress(100)
    } catch (error: any) {
      addResult({
        test: "Diagnostic Runner",
        status: "fail",
        message: "Diagnostic test suite failed",
        details: { error: error.message },
      })
    } finally {
      setIsRunning(false)
    }
  }

  const getStatusIcon = (status: DiagnosticResult["status"]) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "fail":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "info":
        return <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: DiagnosticResult["status"]) => {
    const variants = {
      pass: "default",
      fail: "destructive",
      warning: "secondary",
      info: "outline",
    } as const

    return (
      <Badge variant={variants[status]} className="ml-2">
        {status.toUpperCase()}
      </Badge>
    )
  }

  const getSummary = () => {
    const total = results.length
    const passed = results.filter((r) => r.status === "pass").length
    const failed = results.filter((r) => r.status === "fail").length
    const warnings = results.filter((r) => r.status === "warning").length

    return { total, passed, failed, warnings }
  }

  const summary = getSummary()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Authentication & Database Diagnostics
          </CardTitle>
          <CardDescription>
            Comprehensive testing of authentication, database connectivity, and configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label htmlFor="testEmail" className="block text-sm font-medium mb-1">
                Test Email (for Magic Link test)
              </label>
              <input
                id="testEmail"
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="your-email@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button onClick={runDiagnostics} disabled={isRunning} className="mt-6">
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Running Tests...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Run Diagnostics
                </>
              )}
            </Button>
          </div>

          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{summary.total}</div>
                  <div className="text-sm text-gray-600">Total Tests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{summary.passed}</div>
                  <div className="text-sm text-gray-600">Passed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{summary.failed}</div>
                  <div className="text-sm text-gray-600">Failed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{summary.warnings}</div>
                  <div className="text-sm text-gray-600">Warnings</div>
                </div>
              </div>

              <div className="space-y-2">
                {results.map((result, index) => (
                  <Alert key={index} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        {getStatusIcon(result.status)}
                        <div className="ml-3">
                          <div className="flex items-center">
                            <span className="font-medium">{result.test}</span>
                            {getStatusBadge(result.status)}
                          </div>
                          <AlertDescription className="mt-1">{result.message}</AlertDescription>
                          {result.details && (
                            <details className="mt-2">
                              <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                                View Details
                              </summary>
                              <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                                {JSON.stringify(result.details, null, 2)}
                              </pre>
                            </details>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{new Date(result.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </Alert>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
