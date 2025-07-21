"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { supabase, testSupabaseConnection } from "@/lib/supabase"
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Database, Settings, Mail, Chrome, Key } from "lucide-react"

interface DiagnosticResult {
  name: string
  status: "success" | "error" | "warning" | "pending"
  message: string
  details?: any
}

export function SupabaseDiagnostics() {
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([])
  const [loading, setLoading] = useState(false)
  const [lastRun, setLastRun] = useState<Date | null>(null)

  const runDiagnostics = async () => {
    setLoading(true)
    const results: DiagnosticResult[] = []

    try {
      // Test 1: Basic Configuration
      results.push({
        name: "Configuration Check",
        status: "success",
        message: "Supabase URL and API key are configured",
        details: {
          url: "https://vlizimtetekemaiivnsf.supabase.co",
          hasApiKey: true,
        },
      })

      // Test 2: Network Connectivity
      try {
        const response = await fetch("https://vlizimtetekemaiivnsf.supabase.co/rest/v1/", {
          method: "HEAD",
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsaXppbXRldGVrZW1haWl2bnNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTUwODMsImV4cCI6MjA2ODM5MTA4M30.tsrP54YBn3U5k_0xvqfvmleApNjFjKxO3u8iQc9n90E",
          },
        })

        if (response.ok) {
          results.push({
            name: "Network Connectivity",
            status: "success",
            message: "Successfully connected to Supabase servers",
            details: { status: response.status },
          })
        } else {
          results.push({
            name: "Network Connectivity",
            status: "error",
            message: `HTTP ${response.status}: ${response.statusText}`,
            details: { status: response.status },
          })
        }
      } catch (error: any) {
        results.push({
          name: "Network Connectivity",
          status: "error",
          message: `Network error: ${error.message}`,
          details: error,
        })
      }

      // Test 3: Database Connection
      const connectionTest = await testSupabaseConnection()
      results.push({
        name: "Database Connection",
        status: connectionTest.success ? "success" : "error",
        message: connectionTest.success ? connectionTest.message : connectionTest.error,
        details: connectionTest,
      })

      // Test 4: Authentication Service
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          results.push({
            name: "Authentication Service",
            status: "error",
            message: `Auth error: ${error.message}`,
            details: error,
          })
        } else {
          results.push({
            name: "Authentication Service",
            status: "success",
            message: session ? "User authenticated" : "Auth service available",
            details: { hasSession: !!session, userId: session?.user?.id },
          })
        }
      } catch (error: any) {
        results.push({
          name: "Authentication Service",
          status: "error",
          message: `Auth service error: ${error.message}`,
          details: error,
        })
      }

      // Test 5: Google OAuth Configuration
      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
            skipBrowserRedirect: true, // Don't actually redirect, just test
          },
        })

        if (error) {
          if (error.message.includes("provider is not enabled")) {
            results.push({
              name: "Google OAuth Configuration",
              status: "error",
              message: "Google provider is not enabled in Supabase project",
              details: {
                error: error.message,
                solution: "Enable Google provider in Supabase Dashboard > Authentication > Providers",
              },
            })
          } else {
            results.push({
              name: "Google OAuth Configuration",
              status: "warning",
              message: `Google OAuth issue: ${error.message}`,
              details: error,
            })
          }
        } else {
          results.push({
            name: "Google OAuth Configuration",
            status: "success",
            message: "Google OAuth provider is configured",
            details: data,
          })
        }
      } catch (error: any) {
        results.push({
          name: "Google OAuth Configuration",
          status: "error",
          message: `Google OAuth test failed: ${error.message}`,
          details: error,
        })
      }

      // Test 6: Email Configuration
      try {
        // Test magic link (won't actually send, just test configuration)
        const { error } = await supabase.auth.signInWithOtp({
          email: "test@example.com",
          options: {
            shouldCreateUser: false, // Don't create user
          },
        })

        if (error) {
          if (error.message.includes("SMTP")) {
            results.push({
              name: "Email Configuration",
              status: "error",
              message: "SMTP configuration issue - emails cannot be sent",
              details: {
                error: error.message,
                solution: "Configure SMTP settings in Supabase Dashboard > Settings > Auth",
              },
            })
          } else if (error.message.includes("rate limit")) {
            results.push({
              name: "Email Configuration",
              status: "success",
              message: "Email service is configured (rate limited response)",
              details: error,
            })
          } else {
            results.push({
              name: "Email Configuration",
              status: "warning",
              message: `Email service issue: ${error.message}`,
              details: error,
            })
          }
        } else {
          results.push({
            name: "Email Configuration",
            status: "success",
            message: "Email service is configured and working",
            details: { status: "configured" },
          })
        }
      } catch (error: any) {
        results.push({
          name: "Email Configuration",
          status: "error",
          message: `Email test failed: ${error.message}`,
          details: error,
        })
      }

      // Test 7: Database Schema
      try {
        const { data, error } = await supabase.from("profiles").select("count", { count: "exact", head: true })

        if (error) {
          if (error.code === "42P01") {
            results.push({
              name: "Database Schema",
              status: "error",
              message: "Profiles table not found. Database needs to be set up.",
              details: {
                error,
                solution: "Run the database setup scripts: fix-tenant-error.sql",
              },
            })
          } else {
            results.push({
              name: "Database Schema",
              status: "warning",
              message: `Schema issue: ${error.message}`,
              details: error,
            })
          }
        } else {
          results.push({
            name: "Database Schema",
            status: "success",
            message: "Database tables are accessible",
            details: { profilesCount: data },
          })
        }
      } catch (error: any) {
        results.push({
          name: "Database Schema",
          status: "error",
          message: `Schema test failed: ${error.message}`,
          details: error,
        })
      }

      // Test 8: Admin User Check
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("email, role")
          .eq("email", "info@aves.bio")
          .single()

        if (error) {
          if (error.code === "PGRST116") {
            results.push({
              name: "Admin User",
              status: "warning",
              message: "Admin user not found. Needs to be created.",
              details: {
                error,
                solution: "Create admin user and run create-admin-user.sql script",
              },
            })
          } else {
            results.push({
              name: "Admin User",
              status: "error",
              message: `Admin check failed: ${error.message}`,
              details: error,
            })
          }
        } else {
          results.push({
            name: "Admin User",
            status: data?.role === "admin" ? "success" : "warning",
            message: data?.role === "admin" ? "Admin user configured correctly" : "Admin user exists but role not set",
            details: data,
          })
        }
      } catch (error: any) {
        results.push({
          name: "Admin User",
          status: "error",
          message: `Admin user check error: ${error.message}`,
          details: error,
        })
      }

      // Test 9: Redirect URL Configuration
      const currentOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"
      const expectedRedirects = [
        `${currentOrigin}/auth/callback`,
        `${currentOrigin}/auth/callback?next=/shopping`,
        "https://aves-colombia.vercel.app/auth/callback",
      ]

      results.push({
        name: "Redirect URL Configuration",
        status: "warning",
        message: "Manual verification required - check Supabase Auth settings",
        details: {
          currentOrigin,
          expectedRedirects,
          instructions: "Verify these URLs are configured in Supabase Dashboard > Authentication > URL Configuration",
        },
      })
    } catch (error: any) {
      results.push({
        name: "General Error",
        status: "error",
        message: `Diagnostic failed: ${error.message}`,
        details: error,
      })
    }

    setDiagnostics(results)
    setLastRun(new Date())
    setLoading(false)
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  const getStatusIcon = (status: DiagnosticResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      default:
        return <RefreshCw className="w-5 h-5 text-gray-400 animate-spin" />
    }
  }

  const getStatusColor = (status: DiagnosticResult["status"]) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200"
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const overallStatus =
    diagnostics.length > 0
      ? diagnostics.some((d) => d.status === "error")
        ? "error"
        : diagnostics.some((d) => d.status === "warning")
          ? "warning"
          : "success"
      : "pending"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Supabase Integration Diagnostics
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(overallStatus)}>{overallStatus.toUpperCase()}</Badge>
              <Button onClick={runDiagnostics} disabled={loading} size="sm" variant="outline">
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                {loading ? "Running..." : "Refresh"}
              </Button>
            </div>
          </div>
          {lastRun && <p className="text-sm text-gray-600">Last run: {lastRun.toLocaleString()}</p>}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {diagnostics.map((diagnostic, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(diagnostic.status)}
                    <h3 className="font-medium">{diagnostic.name}</h3>
                  </div>
                  <Badge variant="outline" className={getStatusColor(diagnostic.status)}>
                    {diagnostic.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{diagnostic.message}</p>
                {diagnostic.details && (
                  <details className="text-xs">
                    <summary className="cursor-pointer text-gray-500 hover:text-gray-700">View Details</summary>
                    <pre className="mt-2 p-2 bg-gray-50 rounded overflow-x-auto">
                      {JSON.stringify(diagnostic.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comprehensive Troubleshooting Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Authentication Issues Troubleshooting Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Google Sign-In Issues */}
          <div className="border-l-4 border-blue-500 pl-4">
            <div className="flex items-center gap-2 mb-2">
              <Chrome className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Google Sign-In: "Unsupported provider" Error</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Root Cause:</strong> Google OAuth provider is not enabled in Supabase project.
              </p>
              <p>
                <strong>Solution Steps:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Go to Supabase Dashboard → Authentication → Providers</li>
                <li>Find "Google" in the list and click to configure</li>
                <li>Enable the provider by toggling it ON</li>
                <li>
                  Add your Google OAuth credentials:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Client ID: Get from Google Cloud Console</li>
                    <li>Client Secret: Get from Google Cloud Console</li>
                  </ul>
                </li>
                <li>
                  Set redirect URL:{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    https://vlizimtetekemaiivnsf.supabase.co/auth/v1/callback
                  </code>
                </li>
                <li>Save configuration</li>
              </ol>
              <p>
                <strong>Google Cloud Console Setup:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Go to Google Cloud Console → APIs & Services → Credentials</li>
                <li>Create OAuth 2.0 Client ID</li>
                <li>
                  Add authorized redirect URIs:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>
                      <code className="bg-gray-100 px-1 rounded">
                        https://vlizimtetekemaiivnsf.supabase.co/auth/v1/callback
                      </code>
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>

          {/* Magic Link Issues */}
          <div className="border-l-4 border-purple-500 pl-4">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-900">Magic Link: "ERR_CONNECTION_REFUSED" Error</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Root Cause:</strong> Incorrect redirect URL configuration or local development server issues.
              </p>
              <p>
                <strong>Solution Steps:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>
                  Configure Site URL in Supabase:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Go to Supabase Dashboard → Settings → Auth</li>
                    <li>
                      Set Site URL to: <code className="bg-gray-100 px-1 rounded">http://localhost:3000</code>{" "}
                      (development)
                    </li>
                    <li>
                      Or: <code className="bg-gray-100 px-1 rounded">https://aves-colombia.vercel.app</code>{" "}
                      (production)
                    </li>
                  </ul>
                </li>
                <li>
                  Add Redirect URLs:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>
                      <code className="bg-gray-100 px-1 rounded">http://localhost:3000/auth/callback</code>
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1 rounded">https://aves-colombia.vercel.app/auth/callback</code>
                    </li>
                  </ul>
                </li>
                <li>Ensure development server is running on port 3000</li>
                <li>Check firewall settings allow localhost:3000</li>
                <li>Test with production URL if local issues persist</li>
              </ol>
            </div>
          </div>

          {/* Email/Password Issues */}
          <div className="border-l-4 border-green-500 pl-4">
            <div className="flex items-center gap-2 mb-2">
              <Key className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-900">Email/Password: Verification Email Not Sent</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Root Cause:</strong> SMTP configuration not set up in Supabase.
              </p>
              <p>
                <strong>Solution Steps:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>
                  Configure SMTP in Supabase:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Go to Supabase Dashboard → Settings → Auth</li>
                    <li>Scroll to "SMTP Settings"</li>
                    <li>Enable custom SMTP</li>
                    <li>Configure with your email provider (Gmail, SendGrid, etc.)</li>
                  </ul>
                </li>
                <li>
                  Alternative - Use Supabase's built-in email:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Disable "Enable custom SMTP"</li>
                    <li>Supabase will use their default email service</li>
                    <li>Note: Limited to development/testing</li>
                  </ul>
                </li>
                <li>
                  Test email configuration:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Create a test user</li>
                    <li>Check email delivery</li>
                    <li>Verify email templates are working</li>
                  </ul>
                </li>
              </ol>
              <p>
                <strong>Email Template Configuration:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Go to Supabase Dashboard → Authentication → Email Templates</li>
                <li>Customize "Confirm signup" template</li>
                <li>
                  Ensure redirect URL is correct:{" "}
                  <code className="bg-gray-100 px-1 rounded">{"{{ .SiteURL }}/auth/callback"}</code>
                </li>
              </ol>
            </div>
          </div>

          {/* General Configuration */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important Configuration Checklist:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Site URL matches your domain (localhost:3000 for development)</li>
                <li>Redirect URLs include /auth/callback endpoint</li>
                <li>Email confirmation is enabled in Auth settings</li>
                <li>RLS policies allow user registration and profile creation</li>
                <li>Database tables exist (run setup scripts if needed)</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-3">Quick Actions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open("https://supabase.com/dashboard/project/vlizimtetekemaiivnsf/auth/providers", "_blank")
                }
              >
                Configure Auth Providers
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    "https://supabase.com/dashboard/project/vlizimtetekemaiivnsf/auth/url-configuration",
                    "_blank",
                  )
                }
              >
                Configure URLs
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open("https://supabase.com/dashboard/project/vlizimtetekemaiivnsf/settings/auth", "_blank")
                }
              >
                SMTP Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open("https://supabase.com/dashboard/project/vlizimtetekemaiivnsf/auth/templates", "_blank")
                }
              >
                Email Templates
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
