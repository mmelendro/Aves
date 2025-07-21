"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase, logAuditAction } from "@/lib/supabase-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, AlertTriangle, ArrowRight } from "lucide-react"

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const [userProfile, setUserProfile] = useState<any>(null)

  useEffect(() => {
    handleAuthCallback()
  }, [])

  const handleAuthCallback = async () => {
    try {
      // Get the code and error from URL parameters
      const code = searchParams.get("code")
      const error = searchParams.get("error")
      const errorDescription = searchParams.get("error_description")
      const next = searchParams.get("next") || "/dashboard"

      // Handle OAuth errors
      if (error) {
        console.error("OAuth error:", error, errorDescription)
        setStatus("error")
        setMessage(getOAuthErrorMessage(error, errorDescription))
        return
      }

      // Handle the auth code exchange
      if (code) {
        const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

        if (exchangeError) {
          console.error("Code exchange error:", exchangeError)
          setStatus("error")
          setMessage("Failed to complete authentication. Please try again.")
          return
        }

        if (data.user) {
          // Get or create user profile
          let { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user.id)
            .single()

          // If profile doesn't exist, create it
          if (profileError && profileError.code === "PGRST116") {
            const { data: newProfile, error: createError } = await supabase
              .from("profiles")
              .insert({
                id: data.user.id,
                email: data.user.email!,
                full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || "",
                first_name: data.user.user_metadata?.given_name || "",
                last_name: data.user.user_metadata?.family_name || "",
                avatar_url: data.user.user_metadata?.avatar_url || "",
                role: data.user.email === "info@aves.bio" ? "admin" : "user",
              })
              .select()
              .single()

            if (createError) {
              console.error("Profile creation error:", createError)
              setStatus("error")
              setMessage("Failed to create user profile. Please contact support.")
              return
            }

            profile = newProfile
          } else if (profileError) {
            console.error("Profile fetch error:", profileError)
            setStatus("error")
            setMessage("Failed to load user profile. Please try again.")
            return
          }

          setUserProfile(profile)

          // Log successful authentication
          await logAuditAction(data.user.id, "user_authenticated", {
            method: "oauth",
            provider: "google",
            email: data.user.email,
            timestamp: new Date().toISOString(),
          })

          setStatus("success")
          setMessage(`Welcome back, ${profile?.full_name || data.user.email}!`)

          // Redirect after a short delay
          setTimeout(() => {
            if (profile?.role === "admin") {
              router.push("/admin/dashboard")
            } else {
              router.push(next)
            }
          }, 2000)
        }
      } else {
        // No code parameter, check if user is already authenticated
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user) {
          const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

          setUserProfile(profile)
          setStatus("success")
          setMessage(`Welcome back, ${profile?.full_name || user.email}!`)

          setTimeout(() => {
            if (profile?.role === "admin") {
              router.push("/admin/dashboard")
            } else {
              router.push(next)
            }
          }, 1500)
        } else {
          setStatus("error")
          setMessage("No authentication session found. Please try signing in again.")
        }
      }
    } catch (error: any) {
      console.error("Auth callback error:", error)
      setStatus("error")
      setMessage("An unexpected error occurred during authentication. Please try again.")
    }
  }

  const getOAuthErrorMessage = (error: string | null, description: string | null): string => {
    switch (error) {
      case "access_denied":
        return "You cancelled the sign-in process. Please try again if you want to continue."
      case "server_error":
        return "A server error occurred during sign-in. Please try again later."
      case "temporarily_unavailable":
        return "The authentication service is temporarily unavailable. Please try again in a few minutes."
      case "invalid_request":
        return "Invalid authentication request. Please try signing in again."
      case "unauthorized_client":
        return "Google OAuth is not properly configured. Please contact support."
      default:
        return description || "An error occurred during sign-in. Please try again."
    }
  }

  const handleRetry = () => {
    router.push("/")
  }

  const handleContinue = () => {
    if (userProfile?.role === "admin") {
      router.push("/admin/dashboard")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {status === "loading" && <Loader2 className="w-12 h-12 animate-spin text-emerald-600" />}
            {status === "success" && <CheckCircle className="w-12 h-12 text-green-600" />}
            {status === "error" && <XCircle className="w-12 h-12 text-red-600" />}
          </div>
          <CardTitle>
            {status === "loading" && "Completing Sign In..."}
            {status === "success" && "Sign In Successful!"}
            {status === "error" && "Sign In Failed"}
          </CardTitle>
          <CardDescription>
            {status === "loading" && "Please wait while we complete your authentication"}
            {status === "success" && "You'll be redirected shortly"}
            {status === "error" && "There was a problem with your sign in"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {message && (
            <Alert className={status === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
              {status === "error" ? (
                <AlertTriangle className="h-4 w-4 text-red-600" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
              <AlertDescription className={status === "error" ? "text-red-800" : "text-green-800"}>
                {message}
              </AlertDescription>
            </Alert>
          )}

          {userProfile && status === "success" && (
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                {userProfile.avatar_url && (
                  <img
                    src={userProfile.avatar_url || "/placeholder.svg"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium">{userProfile.full_name}</p>
                  <p className="text-sm text-gray-600">{userProfile.email}</p>
                  {userProfile.role === "admin" && (
                    <p className="text-xs text-emerald-600 font-medium">Administrator</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {status === "success" && (
              <Button onClick={handleContinue} className="w-full">
                Continue to {userProfile?.role === "admin" ? "Admin Dashboard" : "Dashboard"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}

            {status === "error" && (
              <Button onClick={handleRetry} className="w-full">
                Try Again
              </Button>
            )}

            {status === "loading" && (
              <div className="text-center text-sm text-gray-600">
                <p>This may take a few seconds...</p>
              </div>
            )}
          </div>

          {status === "error" && (
            <div className="text-center">
              <Button variant="outline" onClick={() => router.push("/")} className="w-full">
                Return to Home
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
