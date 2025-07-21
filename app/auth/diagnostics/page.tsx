"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, AlertTriangle, Info, Copy, RefreshCw, Eye, EyeOff } from "lucide-react"

export default function AuthDiagnostics() {
  const searchParams = useSearchParams()
  const [diagnostics, setDiagnostics] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [showSensitive, setShowSensitive] = useState(false)

  useEffect(() => {
    runDiagnostics()
  }, [])

  const runDiagnostics = async () => {
    setLoading(true)
    const results: any = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      searchParams: Object.fromEntries(searchParams.entries()),
      environment: {},
      supabase: {},
      session: {},
      errors: [],
    }

    try {
      // Environment checks
      results.environment = {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✓ Set" : "✗ Missing",
        supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✓ Set" : "✗ Missing",
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "Not set",
        origin: window.location.origin,
        userAgent: navigator.userAgent,
      }

      // Supabase connection test
      try {
        const { data, error } = await supabase.from("profiles").select("count", { count: "exact", head: true })
        results.supabase.connection = error ? `✗ Failed: ${error.message}` : "✓ Connected"
        results.supabase.recordCount = data?.length || 0
      } catch (error: any) {
        results.supabase.connection = `✗ Error: ${error.message}`
        results.errors.push(`Supabase connection: ${error.message}`)
      }

      // Auth session check
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()
        results.session = {
          hasSession: !!session,
          user: session?.user
            ? {
                id: session.user.id,
                email: session.user.email,
                emailConfirmed: session.user.email_confirmed_at ? "✓ Confirmed" : "✗ Not confirmed",
                lastSignIn: session.user.last_sign_in_at,
                provider: session.user.app_metadata?.provider || "Unknown",
              }
            : null,
          error: error?.message || null,
        }
      } catch (error: any) {
        results.session.error = error.message
        results.errors.push(`Session check: ${error.message}`)
      }

      // OAuth specific checks
      const code = searchParams.get("code")
      const error = searchParams.get("error")
      const errorDescription = searchParams.get("error_description")

      if (code) {
        results.oauth = {
          hasCode: "✓ Present",
          codeLength: code.length,
          codePreview: `${code.substring(0, 8)}...${code.substring(code.length - 8)}`,
        }

        // Try code exchange
        try {
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
          if (exchangeError) {
            results.oauth.exchangeError = exchangeError.message
            results.errors.push(`Code exchange: ${exchangeError.message}`)
          } else {
            results.oauth.exchangeSuccess = "✓ Success"
            results.oauth.newSession = !!data.session
          }
        } catch (error: any) {
          results.oauth.exchangeError = error.message
          results.errors.push(`Code exchange exception: ${error.message}`)
        }
      }

      if (error) {
        results.oauth = {
          ...results.oauth,
          oauthError: error,
          oauthErrorDescription: errorDescription,
        }
        results.errors.push(`OAuth error: ${error} - ${errorDescription}`)
      }

      // Google OAuth configuration check
      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
            queryParams: {
              access_type: "offline",
              prompt: "consent",
            },
          },
        })

        results.googleOAuth = {
          configurationTest: error ? `✗ Failed: ${error.message}` : "✓ Configuration OK",
        }
      } catch (error: any) {
        results.googleOAuth = {
          configurationTest: `✗ Error: ${error.message}`,
        }
        results.errors.push(`Google OAuth config: ${error.message}`)
      }
    } catch (error: any) {
      results.errors.push(`General error: ${error.message}`)
    }

    setDiagnostics(results)
    setLoading(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getStatusIcon = (status: string) => {
    if (status.startsWith("✓")) return <CheckCircle className="w-4 h-4 text-green-600" />
    if (status.startsWith("✗")) return <XCircle className="w-4 h-4 text-red-600" />
    return <Info className="w-4 h-4 text-blue-600" />
  }

  const DiagnosticItem = ({ label, value, sensitive = false }: { label: string; value: any; sensitive?: boolean }) => (
    <div className="flex justify-between items-center py-2">
      <span className="font-medium text-sm">{label}:</span>
      <div className="flex items-center gap-2">
        {typeof value === "string" && (value.startsWith("✓") || value.startsWith("✗")) && getStatusIcon(value)}
        <span className={`text-sm ${sensitive && !showSensitive ? "blur-sm" : ""}`}>
          {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}
        </span>
        {sensitive && (
          <Button variant="ghost" size="sm" onClick={() => setShowSensitive(!showSensitive)}>
            {showSensitive ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              OAuth Authentication Diagnostics
            </CardTitle>
            <CardDescription>Comprehensive analysis of the authentication flow and configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Badge variant={diagnostics.errors?.length > 0 ? "destructive" : "default"}>
                {diagnostics.errors?.length || 0} Issues Found
              </Badge>
              <Button onClick={runDiagnostics} disabled={loading} size="sm">
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>

            {diagnostics.errors?.length > 0 && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription>
                  <div className="space-y-1">
                    <p className="font-medium text-red-800">Issues Detected:</p>
                    {diagnostics.errors.map((error: string, index: number) => (
                      <p key={index} className="text-sm text-red-700">
                        • {error}
                      </p>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* URL Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>URL Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <DiagnosticItem label="Current URL" value={diagnostics.url} />
            <DiagnosticItem label="Origin" value={diagnostics.environment?.origin} />
            <Separator />
            <div className="space-y-1">
              <p className="font-medium text-sm">URL Parameters:</p>
              {Object.entries(diagnostics.searchParams || {}).map(([key, value]) => (
                <DiagnosticItem key={key} label={key} value={value as string} sensitive={key === "code"} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Environment Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(diagnostics.environment || {}).map(([key, value]) => (
              <DiagnosticItem
                key={key}
                label={key}
                value={value as string}
                sensitive={key.includes("Key") || key.includes("Url")}
              />
            ))}
          </CardContent>
        </Card>

        {/* Supabase Connection */}
        <Card>
          <CardHeader>
            <CardTitle>Supabase Connection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(diagnostics.supabase || {}).map(([key, value]) => (
              <DiagnosticItem key={key} label={key} value={value as string} />
            ))}
          </CardContent>
        </Card>

        {/* Session Information */}
        <Card>
          <CardHeader>
            <CardTitle>Session Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <DiagnosticItem label="Has Session" value={diagnostics.session?.hasSession ? "✓ Yes" : "✗ No"} />
            {diagnostics.session?.user && (
              <>
                <Separator />
                <p className="font-medium text-sm">User Details:</p>
                {Object.entries(diagnostics.session.user).map(([key, value]) => (
                  <DiagnosticItem
                    key={key}
                    label={key}
                    value={value as string}
                    sensitive={key === "id" || key === "email"}
                  />
                ))}
              </>
            )}
            {diagnostics.session?.error && <DiagnosticItem label="Session Error" value={diagnostics.session.error} />}
          </CardContent>
        </Card>

        {/* OAuth Specific */}
        {diagnostics.oauth && (
          <Card>
            <CardHeader>
              <CardTitle>OAuth Flow Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(diagnostics.oauth).map(([key, value]) => (
                <DiagnosticItem
                  key={key}
                  label={key}
                  value={value as string}
                  sensitive={key.includes("code") || key.includes("Code")}
                />
              ))}
            </CardContent>
          </Card>
        )}

        {/* Google OAuth Configuration */}
        {diagnostics.googleOAuth && (
          <Card>
            <CardHeader>
              <CardTitle>Google OAuth Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(diagnostics.googleOAuth).map(([key, value]) => (
                <DiagnosticItem key={key} label={key} value={value as string} />
              ))}
            </CardContent>
          </Card>
        )}

        {/* Raw Data */}
        <Card>
          <CardHeader>
            <CardTitle>Raw Diagnostic Data</CardTitle>
            <CardDescription>Complete diagnostic information for debugging</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Button
                onClick={() => copyToClipboard(JSON.stringify(diagnostics, null, 2))}
                className="absolute top-2 right-2 z-10"
                size="sm"
                variant="outline"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-auto max-h-96">
                {JSON.stringify(diagnostics, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
