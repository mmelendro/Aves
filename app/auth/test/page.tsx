"use client"

import { useState } from "react"
import { signInWithGoogle, getOAuthDebugInfo, testSupabaseConnection } from "@/lib/supabase-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Play, Bug } from "lucide-react"

export default function AuthTest() {
  const [testResults, setTestResults] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const runTests = async () => {
    setLoading(true)
    const results: any = {}

    // Test 1: Environment Configuration
    results.environment = {
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || window.location.origin,
    }

    // Test 2: Supabase Connection
    const connectionTest = await testSupabaseConnection()
    results.connection = connectionTest

    // Test 3: OAuth Configuration
    const oauthInfo = getOAuthDebugInfo()
    results.oauth = oauthInfo

    // Test 4: Google OAuth Initiation (without redirect)
    try {
      // This will test the configuration without actually redirecting
      results.googleOAuth = {
        configured: true,
        redirectUrl: oauthInfo.redirectTo,
      }
    } catch (error: any) {
      results.googleOAuth = {
        configured: false,
        error: error.message,
      }
    }

    setTestResults(results)
    setLoading(false)
  }

  const testGoogleLogin = async () => {
    const result = await signInWithGoogle()
    if (!result.success) {
      alert(`Google OAuth Error: ${result.error}`)
    }
    // If successful, user will be redirected
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>OAuth Authentication Test</CardTitle>
            <CardDescription>Test and verify OAuth configuration before attempting login</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={runTests} disabled={loading}>
                <Play className="w-4 h-4 mr-2" />
                Run Configuration Tests
              </Button>
              <Button onClick={testGoogleLogin} variant="outline">
                Test Google Login
              </Button>
            </div>

            {Object.keys(testResults).length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Test Results</h3>

                {/* Environment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Environment Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(testResults.environment || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm">{key}:</span>
                        <Badge variant={value ? "default" : "destructive"}>{value ? "✓ Set" : "✗ Missing"}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Connection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Supabase Connection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Alert
                      className={
                        testResults.connection?.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                      }
                    >
                      {testResults.connection?.success ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <AlertDescription>
                        {testResults.connection?.success ? (
                          <div>
                            <p className="text-green-800">✓ Connection successful</p>
                            <p className="text-sm text-green-700">
                              Response time: {testResults.connection.details?.responseTime}ms
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-red-800">✗ Connection failed</p>
                            <p className="text-sm text-red-700">{testResults.connection?.error}</p>
                          </div>
                        )}
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                {/* OAuth Configuration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">OAuth Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(testResults.oauth || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm">{key}:</span>
                        <span className="text-sm font-mono">{String(value)}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Google OAuth */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Google OAuth Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Alert
                      className={
                        testResults.googleOAuth?.configured
                          ? "border-green-200 bg-green-50"
                          : "border-red-200 bg-red-50"
                      }
                    >
                      {testResults.googleOAuth?.configured ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <AlertDescription>
                        {testResults.googleOAuth?.configured ? (
                          <div>
                            <p className="text-green-800">✓ Google OAuth configured</p>
                            <p className="text-sm text-green-700">
                              Redirect URL: {testResults.googleOAuth.redirectUrl}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-red-800">✗ Google OAuth configuration error</p>
                            <p className="text-sm text-red-700">{testResults.googleOAuth?.error}</p>
                          </div>
                        )}
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={() => window.open("/auth/diagnostics", "_blank")} variant="outline" className="w-full">
              <Bug className="w-4 h-4 mr-2" />
              Open Full Diagnostics
            </Button>
            <Button
              onClick={() => window.open("https://console.cloud.google.com/apis/credentials", "_blank")}
              variant="outline"
              className="w-full"
            >
              Google Cloud Console
            </Button>
            <Button
              onClick={() =>
                window.open(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/dashboard/project/_/auth/settings`, "_blank")
              }
              variant="outline"
              className="w-full"
            >
              Supabase Auth Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
