"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("Processing authentication...")
  const [details, setDetails] = useState<string>("")

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const code = searchParams.get("code")
        const error = searchParams.get("error")
        const errorDescription = searchParams.get("error_description")
        const next = searchParams.get("next") || "/shopping"

        console.log("Auth callback params:", { code: !!code, error, errorDescription })

        // Handle OAuth errors
        if (error) {
          console.error("OAuth error:", error, errorDescription)
          setStatus("error")
          setMessage("Authentication failed")
          setDetails(errorDescription || error)
          return
        }

        // Handle the authorization code
        if (code) {
          setMessage("Exchanging authorization code...")

          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

          if (exchangeError) {
            console.error("Code exchange error:", exchangeError)
            setStatus("error")
            setMessage("Failed to complete authentication")
            setDetails(exchangeError.message)
            return
          }

          if (data.session && data.user) {
            console.log("Authentication successful:", data.user.email)

            // Create or update user profile
            const { error: profileError } = await supabase.from("profiles").upsert(
              {
                id: data.user.id,
                email: data.user.email!,
                full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || "",
                first_name: data.user.user_metadata?.given_name || "",
                last_name: data.user.user_metadata?.family_name || "",
                avatar_url: data.user.user_metadata?.avatar_url || "",
                last_login: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
              {
                onConflict: "id",
              },
            )

            if (profileError) {
              console.warn("Profile upsert warning:", profileError)
            }

            setStatus("success")
            setMessage("Authentication successful!")
            setDetails("Redirecting to your dashboard...")

            // Redirect after a short delay
            setTimeout(() => {
              router.push(next)
              router.refresh()
            }, 2000)
          } else {
            setStatus("error")
            setMessage("Authentication incomplete")
            setDetails("No session data received")
          }
        } else {
          // No code - check for existing session
          const {
            data: { session },
            error: sessionError,
          } = await supabase.auth.getSession()

          if (sessionError) {
            console.error("Session error:", sessionError)
            setStatus("error")
            setMessage("Session verification failed")
            setDetails(sessionError.message)
            return
          }

          if (session) {
            setStatus("success")
            setMessage("Already authenticated!")
            setDetails("Redirecting...")

            setTimeout(() => {
              router.push(next)
              router.refresh()
            }, 1000)
          } else {
            setStatus("error")
            setMessage("No authentication data found")
            setDetails("Please try signing in again")
          }
        }
      } catch (error: any) {
        console.error("Auth callback error:", error)
        setStatus("error")
        setMessage("Unexpected error occurred")
        setDetails(error.message || "Please try again")
      }
    }

    handleAuthCallback()
  }, [router, searchParams])

  const handleRetry = () => {
    router.push("/shopping")
  }

  const handleGoHome = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {status === "loading" && (
              <>
                <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Authenticating</h2>
                  <p className="text-gray-600">{message}</p>
                  {details && <p className="text-sm text-gray-500 mt-2">{details}</p>}
                </div>
              </>
            )}

            {status === "success" && (
              <>
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                <div>
                  <h2 className="text-xl font-semibold text-green-800 mb-2">Welcome to AVES!</h2>
                  <p className="text-green-700">{message}</p>
                  {details && <p className="text-sm text-green-600 mt-2">{details}</p>}
                </div>
              </>
            )}

            {status === "error" && (
              <>
                <XCircle className="w-12 h-12 text-red-600 mx-auto" />
                <div>
                  <h2 className="text-xl font-semibold text-red-800 mb-2">Authentication Failed</h2>
                  <p className="text-red-700 mb-2">{message}</p>
                  {details && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                      <div className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-red-800">{details}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={handleRetry} className="flex-1">
                      Try Again
                    </Button>
                    <Button onClick={handleGoHome} variant="outline" className="flex-1 bg-transparent">
                      Go Home
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
