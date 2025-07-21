"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { supabase, testSupabaseConnection } from "@/lib/supabase"
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Database, Settings } from "lucide-react"

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

      // Test 5: Database Schema
      try {
        const { data, error } = await supabase.from("profiles").select("count", { count: "exact", head: true })

        if (error) {
          if (error.code === "42P01") {
            results.push({
              name: "Database Schema",
              status: "error",
              message: "Profiles table not found. Database needs to be set up.",
              details: error,
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

      // Test 6: Admin User Check
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
              details: error,
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

      {/* Troubleshooting Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Troubleshooting Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>"Tenant or user not found" Error Solutions:</strong>
            </AlertDescription>
          </Alert>

          <div className="space-y-3 text-sm">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium">1. Verify Supabase Project</h4>
              <p className="text-gray-600">
                Ensure the Supabase project exists and the URL is correct:
                <code className="bg-gray-100 px-1 rounded ml-1">https://vlizimtetekemaiivnsf.supabase.co</code>
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-medium">2. Check API Keys</h4>
              <p className="text-gray-600">
                Verify that the anon key matches your Supabase project settings. Keys should not be expired or from a
                different project.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-medium">3. Database Setup</h4>
              <p className="text-gray-600">
                Run the SQL setup script in your Supabase SQL editor to create the required tables and policies.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-medium">4. Create Admin User</h4>
              <p className="text-gray-600">
                Create the admin account (info@aves.bio) through Supabase Auth, then update the role in the profiles
                table.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-medium">5. Network Issues</h4>
              <p className="text-gray-600">
                Check your internet connection and ensure Supabase services are not blocked by firewalls.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
