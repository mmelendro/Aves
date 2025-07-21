"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase, createUserProfile } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

export default function AuthCallback() {
  const router = useRouter()
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

          // Check if profile exists
          const { data: existingProfile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

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
              setStatus("error")
              setMessage("Account created but profile setup failed. Please contact support.")
              return
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
          setStatus("error")
          setMessage("No user session found. Please try signing in again.")
        }
      } catch (error) {
        console.error("Unexpected error:", error)
        setStatus("error")
        setMessage("An unexpected error occurred. Please try again.")
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          {status === "loading" && (
            <>
              <Loader2 className="w-12 h-12 text-emerald-600 mx-auto mb-4 animate-spin" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Completing Sign In</h2>
              <p className="text-gray-600">Please wait while we set up your account...</p>
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
              <p className="text-gray-600 mb-4">{message}</p>
              <button onClick={() => router.push("/")} className="text-emerald-600 hover:text-emerald-700 underline">
                Return to Home
              </button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
