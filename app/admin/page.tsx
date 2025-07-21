"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Loader2, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      // Get current session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        throw sessionError
      }

      if (!session?.user) {
        setError("Please sign in to access the admin panel.")
        setLoading(false)
        return
      }

      // Check if user has admin role
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("email, role, full_name")
        .eq("id", session.user.id)
        .single()

      if (profileError) {
        if (profileError.code === "PGRST116") {
          setError("User profile not found. Please complete your registration.")
        } else {
          throw profileError
        }
        setLoading(false)
        return
      }

      if (profile.email !== "info@aves.bio" || profile.role !== "admin") {
        setError("Access denied. Admin privileges required.")
        setLoading(false)
        return
      }

      setUser({ ...session.user, ...profile })
    } catch (error: any) {
      console.error("Admin access check failed:", error)

      if (error.message?.includes("Tenant or user not found")) {
        setError("Database connection failed. Please check the system diagnostics.")
      } else {
        setError(error.message || "Failed to verify admin access.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = () => {
    router.push("/shopping")
  }

  const handleDiagnostics = () => {
    router.push("/diagnostics")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600" />
              <h2 className="text-xl font-semibold">Verifying Admin Access</h2>
              <p className="text-gray-600">Please wait while we check your permissions...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <Shield className="w-12 h-12 mx-auto text-red-600" />
              <h2 className="text-xl font-semibold text-red-800">Access Restricted</h2>

              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>

              <div className="flex flex-col gap-2">
                <Button onClick={handleSignIn} className="w-full">
                  Sign In
                </Button>
                <Button onClick={handleDiagnostics} variant="outline" className="w-full bg-transparent">
                  System Diagnostics
                </Button>
              </div>

              <div className="text-xs text-gray-600 mt-4">
                <p>Admin access is restricted to info@aves.bio</p>
                <p>If you believe this is an error, please contact support.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <AdminDashboard user={user} />
}
