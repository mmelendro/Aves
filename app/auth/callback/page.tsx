"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase, logUserAction } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Auth callback error:", error)
          setStatus("error")
          setMessage("Authentication failed. Please try again.")
          return
        }

        if (data.session?.user) {
          const user = data.session.user

          // Update last login
          await supabase.from("profiles").update({ last_login: new Date().toISOString() }).eq("id", user.id)

          // Log successful authentication
          await logUserAction(user.id, "auth_callback_success", {
            provider: user.app_metadata?.provider || "email",
            email: user.email,
          })

          setStatus("success")
          setMessage("Authentication successful! Redirecting...")

          // Redirect to the next page or shopping page
          const nextUrl = searchParams.get("next") || "/shopping"
          setTimeout(() => {
            router.push(nextUrl)
          }, 2000)
        } else {
          setStatus("error")
          setMessage("No user session found. Please try signing in again.")
        }
      } catch (error) {
        console.error("Unexpected error in auth callback:", error)
        setStatus("error")
        setMessage("An unexpected error occurred. Please try again.")
      }
    }

    handleAuthCallback()
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            {status === "loading" && (
              <>
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600" />
                <h2 className="text-xl font-semibold">Authenticating...</h2>
                <p className="text-gray-600">Please wait while we complete your sign-in.</p>
              </>
            )}

            {status === "success" && (
              <>
                <CheckCircle className="w-8 h-8 mx-auto text-green-600" />
                <h2 className="text-xl font-semibold text-green-800">Success!</h2>
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">{message}</AlertDescription>
                </Alert>
              </>
            )}

            {status === "error" && (
              <>
                <AlertCircle className="w-8 h-8 mx-auto text-red-600" />
                <h2 className="text-xl font-semibold text-red-800">Authentication Failed</h2>
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{message}</AlertDescription>
                </Alert>
                <button
                  onClick={() => router.push("/shopping")}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Return to Shopping
                </button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
