"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import {
  supabase,
  handleSupabaseError,
  logUserAction,
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signInWithMagicLink,
} from "@/lib/supabase"
import {
  User,
  Mail,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  AlertCircle,
  CheckCircle,
  Chrome,
  Shield,
  Info,
  Settings,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface EnhancedAuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (user: any) => void
  prefilledData?: {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    experienceLevel?: string
  }
  mode?: "signup" | "signin"
}

export function EnhancedAuthModal({
  isOpen,
  onClose,
  onSuccess,
  prefilledData,
  mode = "signup",
}: EnhancedAuthModalProps) {
  const [activeTab, setActiveTab] = useState(mode)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null)
  const [showDiagnostics, setShowDiagnostics] = useState(false)
  const router = useRouter()

  // Form states
  const [signUpForm, setSignUpForm] = useState({
    email: prefilledData?.email || "",
    password: "",
    confirmPassword: "",
    firstName: prefilledData?.firstName || "",
    lastName: prefilledData?.lastName || "",
    phone: prefilledData?.phone || "",
    experienceLevel: prefilledData?.experienceLevel || "Beginner birder",
    gdprConsent: false,
    marketingConsent: false,
  })

  const [signInForm, setSignInForm] = useState({
    email: prefilledData?.email || "",
    password: "",
    rememberMe: false,
  })

  useEffect(() => {
    if (prefilledData) {
      setSignUpForm((prev) => ({
        ...prev,
        email: prefilledData.email || prev.email,
        firstName: prefilledData.firstName || prev.firstName,
        lastName: prefilledData.lastName || prev.lastName,
        phone: prefilledData.phone || prev.phone,
        experienceLevel: prefilledData.experienceLevel || prev.experienceLevel,
      }))
      setSignInForm((prev) => ({
        ...prev,
        email: prefilledData.email || prev.email,
      }))
    }
  }, [prefilledData])

  const validateForm = () => {
    if (activeTab === "signup") {
      if (!signUpForm.firstName.trim()) {
        setMessage({ type: "error", text: "First name is required" })
        return false
      }
      if (!signUpForm.lastName.trim()) {
        setMessage({ type: "error", text: "Last name is required" })
        return false
      }
      if (!signUpForm.email.trim()) {
        setMessage({ type: "error", text: "Email is required" })
        return false
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpForm.email)) {
        setMessage({ type: "error", text: "Please enter a valid email address" })
        return false
      }
      if (signUpForm.password.length < 6) {
        setMessage({ type: "error", text: "Password must be at least 6 characters long" })
        return false
      }
      if (signUpForm.password !== signUpForm.confirmPassword) {
        setMessage({ type: "error", text: "Passwords do not match" })
        return false
      }
      if (!signUpForm.gdprConsent) {
        setMessage({ type: "error", text: "You must accept the Privacy Policy to create an account" })
        return false
      }
    } else {
      if (!signInForm.email.trim()) {
        setMessage({ type: "error", text: "Email is required" })
        return false
      }
      if (!signInForm.password.trim()) {
        setMessage({ type: "error", text: "Password is required" })
        return false
      }
    }
    return true
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (!validateForm()) {
      setLoading(false)
      return
    }

    try {
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", signUpForm.email.toLowerCase())
        .single()

      if (existingUser) {
        setMessage({ type: "error", text: "An account with this email already exists. Please sign in instead." })
        setLoading(false)
        return
      }

      // Use the enhanced sign up function
      const result = await signUpWithEmail({
        email: signUpForm.email,
        password: signUpForm.password,
        firstName: signUpForm.firstName,
        lastName: signUpForm.lastName,
        phone: signUpForm.phone,
        experienceLevel: signUpForm.experienceLevel,
      })

      if (!result.success) {
        throw new Error(result.error)
      }

      if (result.data?.user) {
        // Create profile in profiles table
        const { error: profileError } = await supabase.from("profiles").insert({
          id: result.data.user.id,
          email: signUpForm.email.toLowerCase(),
          full_name: `${signUpForm.firstName} ${signUpForm.lastName}`,
          phone: signUpForm.phone,
          experience_level: signUpForm.experienceLevel,
          gdpr_consent: signUpForm.gdprConsent,
          marketing_consent: signUpForm.marketingConsent,
          role: "user",
          created_at: new Date().toISOString(),
        })

        if (profileError) {
          console.error("Profile creation error:", profileError)
          // Don't fail the signup if profile creation fails
        }

        // Log the signup action
        await logUserAction(result.data.user.id, "user_signup", {
          email: signUpForm.email,
          experience_level: signUpForm.experienceLevel,
          gdpr_consent: signUpForm.gdprConsent,
          marketing_consent: signUpForm.marketingConsent,
        })

        setMessage({
          type: "success",
          text: "Account created successfully! Please check your email to verify your account before signing in.",
        })

        setTimeout(() => {
          setActiveTab("signin")
          setMessage({ type: "info", text: "Please verify your email before signing in." })
        }, 3000)
      }
    } catch (error: any) {
      const errorMessage = handleSupabaseError(error)
      setMessage({ type: "error", text: errorMessage })

      if (
        error?.message?.includes("Tenant or user not found") ||
        error?.message?.includes("provider is not enabled") ||
        error?.message?.includes("SMTP")
      ) {
        setShowDiagnostics(true)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (!validateForm()) {
      setLoading(false)
      return
    }

    try {
      const result = await signInWithEmail(signInForm.email, signInForm.password)

      if (!result.success) {
        throw new Error(result.error)
      }

      if (result.data?.user) {
        // Update last login
        await supabase.from("profiles").update({ last_login: new Date().toISOString() }).eq("id", result.data.user.id)

        // Log the signin action
        await logUserAction(result.data.user.id, "user_signin", {
          email: signInForm.email,
          remember_me: signInForm.rememberMe,
        })

        setMessage({ type: "success", text: "Successfully signed in!" })

        setTimeout(() => {
          onSuccess(result.data.user)
          onClose()
        }, 1000)
      }
    } catch (error: any) {
      const errorMessage = handleSupabaseError(error)
      setMessage({ type: "error", text: errorMessage })

      if (error?.message?.includes("Tenant or user not found") || error?.message?.includes("Email not confirmed")) {
        setShowDiagnostics(true)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const result = await signInWithGoogle()

      if (!result.success) {
        throw new Error(result.error)
      }

      // Log the OAuth attempt
      await logUserAction(null, "oauth_signin_attempt", {
        provider: "google",
        redirect_to: "/shopping",
      })

      // The redirect will happen automatically
    } catch (error: any) {
      const errorMessage = handleSupabaseError(error)
      setMessage({ type: "error", text: errorMessage })
      setLoading(false)

      if (error?.message?.includes("provider is not enabled")) {
        setShowDiagnostics(true)
      }
    }
  }

  const handleMagicLink = async () => {
    setLoading(true)
    setMessage(null)

    const email = activeTab === "signup" ? signUpForm.email : signInForm.email

    if (!email.trim()) {
      setMessage({ type: "error", text: "Please enter your email address" })
      setLoading(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" })
      setLoading(false)
      return
    }

    try {
      const result = await signInWithMagicLink(email)

      if (!result.success) {
        throw new Error(result.error)
      }

      // Log the magic link request
      await logUserAction(null, "magic_link_request", {
        email: email.toLowerCase(),
      })

      setMessage({
        type: "success",
        text: "Magic link sent! Check your email and click the link to sign in. The link will expire in 1 hour.",
      })
    } catch (error: any) {
      const errorMessage = handleSupabaseError(error)
      setMessage({ type: "error", text: errorMessage })

      if (error?.message?.includes("SMTP") || error?.message?.includes("rate limit")) {
        setShowDiagnostics(true)
      }
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSignUpForm({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      experienceLevel: "Beginner birder",
      gdprConsent: false,
      marketingConsent: false,
    })
    setSignInForm({
      email: "",
      password: "",
      rememberMe: false,
    })
    setMessage(null)
    setShowDiagnostics(false)
  }

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600" />
            Join the AVES Flock
          </DialogTitle>
        </DialogHeader>

        {showDiagnostics && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <Settings className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <div className="flex items-center justify-between">
                <span>Authentication issues detected. Check diagnostics for solutions.</span>
                <Button size="sm" variant="outline" onClick={() => router.push("/diagnostics")} className="ml-2">
                  View Diagnostics
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Sign Up
            </TabsTrigger>
            <TabsTrigger value="signin" className="flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Sign In
            </TabsTrigger>
          </TabsList>

          {message && (
            <Alert
              className={
                message.type === "success"
                  ? "border-green-200 bg-green-50"
                  : message.type === "info"
                    ? "border-blue-200 bg-blue-50"
                    : "border-red-200 bg-red-50"
              }
            >
              {message.type === "success" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : message.type === "info" ? (
                <Info className="h-4 w-4 text-blue-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription
                className={
                  message.type === "success"
                    ? "text-green-800"
                    : message.type === "info"
                      ? "text-blue-800"
                      : "text-red-800"
                }
              >
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={signUpForm.firstName}
                    onChange={(e) => setSignUpForm({ ...signUpForm, firstName: e.target.value })}
                    required
                    disabled={loading}
                    maxLength={50}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={signUpForm.lastName}
                    onChange={(e) => setSignUpForm({ ...signUpForm, lastName: e.target.value })}
                    required
                    disabled={loading}
                    maxLength={50}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="signupEmail">Email *</Label>
                <Input
                  id="signupEmail"
                  type="email"
                  value={signUpForm.email}
                  onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                  required
                  disabled={loading}
                  maxLength={100}
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={signUpForm.phone}
                  onChange={(e) => setSignUpForm({ ...signUpForm, phone: e.target.value })}
                  disabled={loading}
                  maxLength={20}
                />
              </div>

              <div>
                <Label htmlFor="experienceLevel">Birding Experience</Label>
                <select
                  id="experienceLevel"
                  value={signUpForm.experienceLevel}
                  onChange={(e) => setSignUpForm({ ...signUpForm, experienceLevel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled={loading}
                >
                  <option value="Beginner birder">Beginner birder</option>
                  <option value="Intermediate birder">Intermediate birder</option>
                  <option value="Advanced birder">Advanced birder</option>
                  <option value="Expert/Professional">Expert/Professional</option>
                </select>
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={signUpForm.password}
                    onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                    required
                    disabled={loading}
                    minLength={6}
                    maxLength={100}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={signUpForm.confirmPassword}
                  onChange={(e) => setSignUpForm({ ...signUpForm, confirmPassword: e.target.value })}
                  required
                  disabled={loading}
                  minLength={6}
                  maxLength={100}
                />
              </div>

              {/* GDPR Compliance */}
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Shield className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <h4 className="font-medium text-gray-900 mb-2">Data Privacy & Consent</h4>

                    <div className="flex items-start space-x-2 mb-3">
                      <Checkbox
                        id="gdprConsent"
                        checked={signUpForm.gdprConsent}
                        onCheckedChange={(checked) => setSignUpForm({ ...signUpForm, gdprConsent: !!checked })}
                        disabled={loading}
                      />
                      <Label htmlFor="gdprConsent" className="text-xs leading-relaxed">
                        I agree to the{" "}
                        <a
                          href="/privacy"
                          target="_blank"
                          className="text-emerald-600 hover:underline"
                          rel="noreferrer"
                        >
                          Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a href="/terms" target="_blank" className="text-emerald-600 hover:underline" rel="noreferrer">
                          Terms of Service
                        </a>
                        . I understand my data will be processed securely and I can request deletion at any time. *
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="marketingConsent"
                        checked={signUpForm.marketingConsent}
                        onCheckedChange={(checked) => setSignUpForm({ ...signUpForm, marketingConsent: !!checked })}
                        disabled={loading}
                      />
                      <Label htmlFor="marketingConsent" className="text-xs leading-relaxed">
                        I would like to receive marketing communications about tours, special offers, and birding tips.
                        (Optional)
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading || !signUpForm.gdprConsent}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="signinEmail">Email</Label>
                <Input
                  id="signinEmail"
                  type="email"
                  value={signInForm.email}
                  onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                  required
                  disabled={loading}
                  maxLength={100}
                />
              </div>

              <div>
                <Label htmlFor="signinPassword">Password</Label>
                <div className="relative">
                  <Input
                    id="signinPassword"
                    type={showPassword ? "text" : "password"}
                    value={signInForm.password}
                    onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                    required
                    disabled={loading}
                    maxLength={100}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={signInForm.rememberMe}
                  onCheckedChange={(checked) => setSignInForm({ ...signInForm, rememberMe: !!checked })}
                  disabled={loading}
                />
                <Label htmlFor="rememberMe" className="text-sm">
                  Remember me
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full bg-transparent"
              >
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleMagicLink}
                disabled={loading}
                className="w-full bg-transparent"
              >
                <Mail className="mr-2 h-4 w-4" />
                Magic Link
              </Button>
            </div>

            <div className="text-xs text-center text-gray-600">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Shield className="w-3 h-3" />
                <span>Secured by Supabase • GDPR Compliant</span>
              </div>
              Your data is encrypted and stored securely. We never share your information with third parties.
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
