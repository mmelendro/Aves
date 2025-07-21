"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase, logAuditAction } from "@/lib/supabase-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Loader2, CheckCircle, XCircle, AlertTriangle, ArrowRight, Bug } from "lucide-react"

interface AuthStep {
  name: string
  status: "pending" | "loading" | "success" | "error"
  message?: string
  error?: string
}

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [steps, setSteps] = useState<AuthStep[]>([
    { name: "Validating Parameters", status: "pending" },
    { name: "Exchanging Authorization Code", status: "pending" },
    { name: "Creating User Session", status: "pending" },
    { name: "Setting Up User Profile", status: "pending" },
    { name: "Finalizing Authentication", status: "pending" },
  ])
  const [currentStep, setCurrentStep] = useState(0)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [debugInfo, setDebugInfo] = useState<any>({})

  useEffect(() => {
    handleAuthCallback()
  }, [])

  const updateStep = (index: number, updates: Partial<AuthStep>) => {
    setSteps((prev) => prev.map((step, i) => (i === index ? { ...step, ...updates } : step)))
  }

  const handleAuthCallback = async () => {
    const debug: any = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      searchParams: Object.fromEntries(searchParams.entries()),
      userAgent: navigator.userAgent,
      origin: window.location.origin,
    }

    try {
      // Step 1: Validate Parameters
      setCurrentStep(0)
      updateStep(0, { status: "loading", message: "Checking URL parameters..." })

      const code = searchParams.get("code")
      const error = searchParams.get("error")
      const errorDescription = searchParams.get("error_description")
      const next = searchParams.get("next") || "/dashboard"

      debug.parameters = { code: !!code, error, errorDescription, next }

      // Handle OAuth errors first
      if (error) {
        debug.oauthError = { error, errorDescription }
        updateStep(0, {
          status: "error",
          error: `OAuth Error: ${error}`,
          message: getOAuthErrorMessage(error, errorDescription),
        })
        setDebugInfo(debug)
        return
      }

      if (!code) {
        // Check if user is already authenticated
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          debug.sessionError = sessionError
          updateStep(0, {
            status: "error",
            error: "Session check failed",
            message: sessionError.message,
          })
          setDebugInfo(debug)
          return
        }

        if (session?.user) {
          debug.existingSession = { userId: session.user.id, email: session.user.email }
          updateStep(0, { status: "success", message: "Found existing session" })

          // Skip to profile setup
          setCurrentStep(3)
          await handleUserProfile(session.user, debug, next)
          return
        }

        updateStep(0, {
          status: "error",
          error: "No authorization code found",
          message: "Please try signing in again",
        })
        setDebugInfo(debug)
        return
      }

      updateStep(0, { status: "success", message: "Parameters validated successfully" })

      // Step 2: Exchange Authorization Code
      setCurrentStep(1)
      updateStep(1, { status: "loading", message: "Exchanging authorization code for session..." })

      debug.codeExchange = { codeLength: code.length, timestamp: new Date().toISOString() }

      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        debug.codeExchange.error = exchangeError
        updateStep(1, {
          status: "error",
          error: "Code exchange failed",
          message: exchangeError.message,
        })
        setDebugInfo(debug)
        return
      }

      if (!data.session || !data.user) {
        debug.codeExchange.error = "No session or user data returned"
        updateStep(1, {
          status: "error",
          error: "Invalid session data",
          message: "Authentication completed but no session was created",
        })
        setDebugInfo(debug)
        return
      }

      debug.codeExchange.success = {
        userId: data.user.id,
        email: data.user.email,
        provider: data.user.app_metadata?.provider,
      }

      updateStep(1, { status: "success", message: "Authorization code exchanged successfully" })

      // Step 3: Create User Session
      setCurrentStep(2)
      updateStep(2, { status: "loading", message: "Verifying user session..." })

      // Verify the session is properly set
      const {
        data: { session: newSession },
        error: sessionVerifyError,
      } = await supabase.auth.getSession()

      if (sessionVerifyError || !newSession) {
        debug.sessionVerification = { error: sessionVerifyError }
        updateStep(2, {
          status: "error",
          error: "Session verification failed",
          message: "Session was not properly established",
        })
        setDebugInfo(debug)
        return
      }

      debug.sessionVerification = { success: true, sessionId: newSession.access_token.substring(0, 10) + "..." }
      updateStep(2, { status: "success", message: "User session verified" })

      // Step 4: Set Up User Profile
      setCurrentStep(3)
      await handleUserProfile(data.user, debug, next)
    } catch (error: any) {
      console.error("Auth callback error:", error)
      debug.unexpectedError = { message: error.message, stack: error.stack }
      updateStep(currentStep, {
        status: "error",
        error: "Unexpected error occurred",
        message: error.message,
      })
      setDebugInfo(debug)
    }
  }

  const handleUserProfile = async (user: any, debug: any, next: string) => {
    updateStep(3, { status: "loading", message: "Setting up user profile..." })

    try {
      // Check if profile exists
      let { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      debug.profileLookup = { userId: user.id, found: !!profile, error: profileError?.code }

      // Create profile if it doesn't exist
      if (profileError && profileError.code === "PGRST116") {
        const profileData = {
          id: user.id,
          email: user.email!,
          full_name:
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            `${user.user_metadata?.given_name || ""} ${user.user_metadata?.family_name || ""}`.trim() ||
            user.email?.split("@")[0] ||
            "",
          first_name: user.user_metadata?.given_name || "",
          last_name: user.user_metadata?.family_name || "",
          avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || "",
          role: user.email === "info@aves.bio" ? "admin" : "user",
          experience_level: "Beginner birder",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        debug.profileCreation = { data: profileData }

        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert(profileData)
          .select()
          .single()

        if (createError) {
          debug.profileCreation.error = createError
          updateStep(3, {
            status: "error",
            error: "Profile creation failed",
            message: createError.message,
          })
          setDebugInfo(debug)
          return
        }

        profile = newProfile
        debug.profileCreation.success = true
      } else if (profileError) {
        debug.profileLookup.error = profileError
        updateStep(3, {
          status: "error",
          error: "Profile lookup failed",
          message: profileError.message,
        })
        setDebugInfo(debug)
        return
      } else {
        // Update existing profile with latest info
        const updateData = {
          last_login: new Date().toISOString(),
          avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || profile.avatar_url,
          updated_at: new Date().toISOString(),
        }

        await supabase.from("profiles").update(updateData).eq("id", user.id)

        debug.profileUpdate = { success: true }
      }

      setUserProfile(profile)
      debug.finalProfile = {
        id: profile.id,
        email: profile.email,
        role: profile.role,
        fullName: profile.full_name,
      }

      updateStep(3, { status: "success", message: "User profile configured" })

      // Step 5: Finalize Authentication
      setCurrentStep(4)
      updateStep(4, { status: "loading", message: "Finalizing authentication..." })

      // Log successful authentication
      await logAuditAction(user.id, "user_authenticated", {
        method: "oauth",
        provider: user.app_metadata?.provider || "google",
        email: user.email,
        timestamp: new Date().toISOString(),
        ip_address: debug.clientIP,
      })

      debug.auditLog = { success: true }
      updateStep(4, { status: "success", message: "Authentication completed successfully!" })

      setDebugInfo(debug)

      // Redirect after showing success
      setTimeout(() => {
        const redirectUrl = profile?.role === "admin" ? "/admin/dashboard" : next
        debug.redirect = { url: redirectUrl, timestamp: new Date().toISOString() }
        router.push(redirectUrl)
        router.refresh()
      }, 2000)
    } catch (error: any) {
      console.error("Profile setup error:", error)
      debug.profileSetupError = { message: error.message, stack: error.stack }
      updateStep(3, {
        status: "error",
        error: "Profile setup failed",
        message: error.message,
      })
      setDebugInfo(debug)
    }
  }

  const getOAuthErrorMessage = (error: string | null, description: string | null): string => {
    const errorMessages: Record<string, string> = {
      access_denied: "You cancelled the sign-in process. Please try again if you want to continue.",
      server_error: "A server error occurred during sign-in. Please try again later.",
      temporarily_unavailable:
        "The authentication service is temporarily unavailable. Please try again in a few minutes.",
      invalid_request: "Invalid authentication request. Please try signing in again.",
      unauthorized_client: "Google OAuth is not properly configured. Please contact support.",
      invalid_client: "OAuth client configuration error. Please contact support.",
      invalid_grant: "The authorization grant is invalid or expired. Please try again.",
      unsupported_response_type: "OAuth configuration error. Please contact support.",
    }

    return errorMessages[error || ""] || description || "An error occurred during sign-in. Please try again."
  }

  const getOverallStatus = () => {
    const errorStep = steps.find((step) => step.status === "error")
    if (errorStep) return "error"

    const allCompleted = steps.every((step) => step.status === "success")
    if (allCompleted) return "success"

    return "loading"
  }

  const getProgress = () => {
    const completedSteps = steps.filter((step) => step.status === "success").length
    return (completedSteps / steps.length) * 100
  }

  const handleRetry = () => {
    router.push("/")
  }

  const handleContinue = () => {
    const redirectUrl = userProfile?.role === "admin" ? "/admin/dashboard" : "/dashboard"
    router.push(redirectUrl)
  }

  const handleDebug = () => {
    router.push("/auth/diagnostics?" + searchParams.toString())
  }

  const overallStatus = getOverallStatus()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {overallStatus === "loading" && <Loader2 className="w-12 h-12 animate-spin text-emerald-600" />}
            {overallStatus === "success" && <CheckCircle className="w-12 h-12 text-green-600" />}
            {overallStatus === "error" && <XCircle className="w-12 h-12 text-red-600" />}
          </div>
          <CardTitle>
            {overallStatus === "loading" && "Completing Authentication..."}
            {overallStatus === "success" && "Welcome to AVES Colombia!"}
            {overallStatus === "error" && "Authentication Failed"}
          </CardTitle>
          <CardDescription>
            {overallStatus === "loading" && "Please wait while we complete your sign-in"}
            {overallStatus === "success" && "You'll be redirected to your dashboard shortly"}
            {overallStatus === "error" && "There was a problem completing your authentication"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(getProgress())}%</span>
            </div>
            <Progress value={getProgress()} className="w-full" />
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  step.status === "error"
                    ? "bg-red-50 border border-red-200"
                    : step.status === "success"
                      ? "bg-green-50 border border-green-200"
                      : step.status === "loading"
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {step.status === "loading" && <Loader2 className="w-4 h-4 animate-spin text-blue-600" />}
                  {step.status === "success" && <CheckCircle className="w-4 h-4 text-green-600" />}
                  {step.status === "error" && <XCircle className="w-4 h-4 text-red-600" />}
                  {step.status === "pending" && <div className="w-4 h-4 rounded-full border-2 border-gray-300" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium text-sm ${
                      step.status === "error"
                        ? "text-red-800"
                        : step.status === "success"
                          ? "text-green-800"
                          : step.status === "loading"
                            ? "text-blue-800"
                            : "text-gray-600"
                    }`}
                  >
                    {step.name}
                  </p>
                  {step.message && (
                    <p
                      className={`text-xs mt-1 ${
                        step.status === "error"
                          ? "text-red-600"
                          : step.status === "success"
                            ? "text-green-600"
                            : step.status === "loading"
                              ? "text-blue-600"
                              : "text-gray-500"
                      }`}
                    >
                      {step.message}
                    </p>
                  )}
                  {step.error && <p className="text-xs mt-1 text-red-600 font-medium">{step.error}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* User Profile Display */}
          {userProfile && overallStatus === "success" && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>
                <div className="flex items-center gap-3">
                  {userProfile.avatar_url && (
                    <img
                      src={userProfile.avatar_url || "/placeholder.svg"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium text-green-800">{userProfile.full_name}</p>
                    <p className="text-sm text-green-700">{userProfile.email}</p>
                    {userProfile.role === "admin" && (
                      <p className="text-xs text-emerald-600 font-medium">Administrator</p>
                    )}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Error Display */}
          {overallStatus === "error" && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium text-red-800">Authentication could not be completed</p>
                  <p className="text-sm text-red-700">
                    Please try signing in again. If the problem persists, contact support.
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            {overallStatus === "success" && (
              <Button onClick={handleContinue} className="w-full">
                Continue to {userProfile?.role === "admin" ? "Admin Dashboard" : "Dashboard"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}

            {overallStatus === "error" && (
              <>
                <Button onClick={handleRetry} className="w-full">
                  Try Again
                </Button>
                <Button onClick={handleDebug} variant="outline" className="w-full bg-transparent">
                  <Bug className="w-4 h-4 mr-2" />
                  View Diagnostics
                </Button>
              </>
            )}

            {overallStatus === "loading" && (
              <div className="text-center text-sm text-gray-600">
                <p>This process typically takes 5-10 seconds...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
