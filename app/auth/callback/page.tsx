"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/enhanced-supabase"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("Processing authentication...")

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the code from URL parameters
        const code = searchParams.get("code")
        const error = searchParams.get("error")
        const errorDescription = searchParams.get("error_description")
        const next = searchParams.get("next") || "/shopping"

        // Handle OAuth errors
        if (error) {
          console.error("OAuth error:", error, errorDescription)
          setStatus("error")
          setMessage(errorDescription || "Authentication failed. Please try again.")

          setTimeout(() => {
            router.push("/shopping?error=auth_failed")
          }, 3000)
          return
        }

        // Handle magic link or OAuth callback with code
        if (code) {
          setMessage("Completing authentication...")

          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

          if (exchangeError) {
            console.error("Code exchange error:", exchangeError)
            setStatus("error")
            setMessage("Failed to complete authentication. The link may have expired.")

            setTimeout(() => {
              router.push("/shopping?error=auth_expired")
            }, 3000)
            return
          }

          if (data.session && data.user) {
            setStatus("success")
            setMessage("Authentication successful! Redirecting...")

            // Log the successful authentication
            console.log("User authenticated:", data.user.email)

            // Redirect to the intended page
            setTimeout(() => {
              router.push(next)
            }, 1500)
          } else {
            setStatus("error")
            setMessage("Authentication completed but no session was created.")

            setTimeout(() => {
              router.push("/shopping?error=no_session")
            }, 3000)
          }
        } else {
          // No code parameter - check if user is already authenticated
          const {
            data: { session },
            error: sessionError,
          } = await supabase.auth.getSession()

          if (sessionError) {
            console.error("Session error:", sessionError)
            setStatus("error")
            setMessage("Failed to verify authentication status.")

            setTimeout(() => {
              router.push("/shopping?error=session_error")
            }, 3000)
            return
          }

          if (session) {
            setStatus("success")
            setMessage("Already authenticated! Redirecting...")

            setTimeout(() => {
              router.push(next)
            }, 1500)
          } else {
            setStatus("error")
            setMessage("No authentication code found. Please try signing in again.")

            setTimeout(() => {
              router.push("/shopping?error=no_code")
            }, 3000)
          }
        }
      } catch (error: any) {
        console.error("Auth callback error:", error)
        setStatus("error")
        setMessage("An unexpected error occurred during authentication.")

        setTimeout(() => {
          router.push("/shopping?error=unexpected")
        }, 3000)
      }
    }

    handleAuthCallback()
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          {status === "loading" && (
            <>
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
              <h2 className="text-lg font-semibold mb-2">Authenticating</h2>
              <p className="text-gray-600">{message}</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
              <h2 className="text-lg font-semibold text-green-600 mb-2">Success!</h2>
              <p className="text-gray-600">{message}</p>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="w-8 h-8 text-red-600 mb-4" />
              <h2 className="text-lg font-semibold text-red-600 mb-2">Authentication Failed</h2>
              <p className="text-gray-600 mb-4">{message}</p>
              <p className="text-sm text-gray-500">You will be redirected to the login page shortly.</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
