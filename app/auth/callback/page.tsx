"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase, createUserProfile } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"

export default function AuthCallback() {
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    handleAuthCallback()
  }, [])

  const handleAuthCallback = async () => {
    try {
      setStatus("loading")
      setMessage("Processing authentication...")

      // Wait a moment for the URL to be processed
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error("Auth callback error:", error)
        throw new Error(`Authentication failed: ${error.message}`)
      }

      if (data.session?.user) {
        const user = data.session.user
        setMessage("Creating your profile...")

        // Check if profile exists
        const { data: existingProfile, error: profileCheckError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileCheckError && profileCheckError.code !== "PGRST116") {
          console.error("Profile check error:", profileCheckError)
          throw new Error("Failed to verify profile")
        }

        if (!existingProfile) {
          // Create profile for OAuth users
          const profileData = {
            id: user.id,
            email: user.email!,
            full_name: user.user_metadata?.full_name || user.user_metadata?.name || "",
            avatar_url: user.user_metadata?.avatar_url || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            is_admin: user.email === "admin@aves.bio",
            registration_method: user.app_metadata?.provider || "oauth",
            marketing_consent: false,
            newsletter_subscribed: true,
            last_login: new Date().toISOString(),
          }

          const { error: profileError } = await createUserProfile(profileData)

          if (profileError) {
            console.error("Profile creation error:", profileError)
            throw new Error("Account created but profile setup failed")
          }
        } else {
          // Update last login for existing users
          await supabase
            .from("profiles")
            .update({
              last_login: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("id", user.id)
        }

        setStatus("success")
        setMessage("Successfully authenticated! Redirecting...")

        // Redirect after a short delay
        setTimeout(() => {
          const redirectTo = new URLSearchParams(window.location.search).get("redirectTo")
          router.push(redirectTo || "/shopping")
        }, 2000)
      } else {
        throw new Error("No user session found")
      }
    } catch (error: any) {
      console.error("Auth callback error:", error)
      setStatus("error")

      let errorMessage = "Authentication failed. "

      if (error.message?.includes("fetch")) {
        errorMessage += "Network connection issue. Please check your internet connection."
      } else if (error.message?.includes("DNS")) {
        errorMessage += "DNS resolution failed. Please check your network settings."
      } else {
        errorMessage += error.message || "Please try signing in again."
      }

      setMessage(errorMessage)
    }
  }

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1)
    handleAuthCallback()
  }

  const handleGoHome = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          {status === "loading" && (
            <>
              <Loader2 className="w-12 h-12 text-emerald-600 mx-auto mb-4 animate-spin" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Completing Sign In</h2>
              <p className="text-gray-600">{message}</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome to AVES!</h2>
              <p className="text-gray-600">{message}</p>
            </>
          )}

          {status === "error" && (
            <>
              <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Error</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="flex gap-3 justify-center">
                <Button onClick={handleRetry} variant="outline" className="flex items-center gap-2 bg-transparent">
                  <RefreshCw className="w-4 h-4" />
                  Retry {retryCount > 0 && `(${retryCount})`}
                </Button>
                <Button onClick={handleGoHome} className="bg-emerald-600 hover:bg-emerald-700">
                  Return Home
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
