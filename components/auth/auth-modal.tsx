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
import { supabase, createUserProfile, logAdminAction } from "@/lib/supabase"
import { User, Mail, Eye, EyeOff, UserPlus, LogIn, AlertCircle, CheckCircle, Chrome } from "lucide-react"
import { useRouter } from "next/navigation"

interface AuthModalProps {
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

export function AuthModal({ isOpen, onClose, onSuccess, prefilledData, mode = "signup" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(mode)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
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
    marketingConsent: false,
    newsletterSubscribed: true,
    termsAccepted: false,
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  }

  const sanitizeInput = (input: string) => {
    return input.trim().replace(/[<>]/g, "")
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    // Validation
    if (!signUpForm.termsAccepted) {
      setMessage({ type: "error", text: "Please accept the Terms of Service and Privacy Policy" })
      setLoading(false)
      return
    }

    if (!validateEmail(signUpForm.email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" })
      setLoading(false)
      return
    }

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" })
      setLoading(false)
      return
    }

    if (!validatePassword(signUpForm.password)) {
      setMessage({
        type: "error",
        text: "Password must be at least 8 characters with uppercase, lowercase, and number",
      })
      setLoading(false)
      return
    }

    // Sanitize inputs
    const sanitizedData = {
      email: sanitizeInput(signUpForm.email.toLowerCase()),
      firstName: sanitizeInput(signUpForm.firstName),
      lastName: sanitizeInput(signUpForm.lastName),
      phone: sanitizeInput(signUpForm.phone),
      experienceLevel: signUpForm.experienceLevel,
    }

    try {
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", sanitizedData.email)
        .single()

      if (existingUser) {
        setMessage({ type: "error", text: "An account with this email already exists" })
        setLoading(false)
        return
      }

      const { data, error } = await supabase.auth.signUp({
        email: sanitizedData.email,
        password: signUpForm.password,
        options: {
          data: {
            full_name: `${sanitizedData.firstName} ${sanitizedData.lastName}`,
            first_name: sanitizedData.firstName,
            last_name: sanitizedData.lastName,
            phone: sanitizedData.phone,
            experience_level: sanitizedData.experienceLevel,
          },
        },
      })

      if (error) throw error

      if (data.user) {
        // Create comprehensive profile
        const profileData = {
          id: data.user.id,
          email: sanitizedData.email,
          full_name: `${sanitizedData.firstName} ${sanitizedData.lastName}`,
          phone: sanitizedData.phone || null,
          experience_level: sanitizedData.experienceLevel,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_admin: sanitizedData.email === "admin@aves.bio",
          registration_method: "form",
          marketing_consent: signUpForm.marketingConsent,
          newsletter_subscribed: signUpForm.newsletterSubscribed,
          last_login: new Date().toISOString(),
        }

        const { error: profileError } = await createUserProfile(profileData)

        if (profileError) {
          console.error("Profile creation error:", profileError)
          setMessage({ type: "error", text: "Account created but profile setup failed. Please contact support." })
        } else {
          setMessage({
            type: "success",
            text: "Account created successfully! Please check your email to verify your account.",
          })

          // Log the registration
          if (profileData.is_admin) {
            await logAdminAction(data.user.id, "ADMIN_ACCOUNT_CREATED", "profile", data.user.id, {
              email: sanitizedData.email,
              registration_method: "form",
            })
          }

          setTimeout(() => {
            onSuccess(data.user)
            onClose()
          }, 2000)
        }
      }
    } catch (error: any) {
      console.error("Sign up error:", error)
      setMessage({ type: "error", text: error.message || "An error occurred during sign up" })
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (!validateEmail(signInForm.email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" })
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: sanitizeInput(signInForm.email.toLowerCase()),
        password: signInForm.password,
      })

      if (error) throw error

      if (data.user) {
        // Update last login
        await supabase
          .from("profiles")
          .update({
            last_login: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", data.user.id)

        setMessage({ type: "success", text: "Successfully signed in!" })

        setTimeout(() => {
          onSuccess(data.user)
          onClose()
        }, 1000)
      }
    } catch (error: any) {
      console.error("Sign in error:", error)
      setMessage({ type: "error", text: error.message || "An error occurred during sign in" })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (error) throw error
    } catch (error: any) {
      console.error("Google sign in error:", error)
      setMessage({ type: "error", text: error.message || "An error occurred with Google sign in" })
      setLoading(false)
    }
  }

  const handleMagicLink = async () => {
    setLoading(true)
    setMessage(null)

    const email = activeTab === "signup" ? signUpForm.email : signInForm.email

    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address" })
      setLoading(false)
      return
    }

    if (!validateEmail(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" })
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: sanitizeInput(email.toLowerCase()),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      setMessage({
        type: "success",
        text: "Magic link sent! Check your email and click the link to sign in.",
      })
    } catch (error: any) {
      console.error("Magic link error:", error)
      setMessage({ type: "error", text: error.message || "An error occurred sending magic link" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600" />
            Join the AVES Flock
          </DialogTitle>
        </DialogHeader>

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
            <Alert className={message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              {message.type === "success" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={message.type === "success" ? "text-green-800" : "text-red-800"}>
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
                    minLength={8}
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
                <p className="text-xs text-gray-500 mt-1">
                  At least 8 characters with uppercase, lowercase, and number
                </p>
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
                  minLength={8}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="termsAccepted"
                    checked={signUpForm.termsAccepted}
                    onCheckedChange={(checked) => setSignUpForm({ ...signUpForm, termsAccepted: checked as boolean })}
                    disabled={loading}
                  />
                  <Label htmlFor="termsAccepted" className="text-sm">
                    I agree to the{" "}
                    <a href="/terms" className="text-emerald-600 hover:underline" target="_blank" rel="noreferrer">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-emerald-600 hover:underline" target="_blank" rel="noreferrer">
                      Privacy Policy
                    </a>{" "}
                    *
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletterSubscribed"
                    checked={signUpForm.newsletterSubscribed}
                    onCheckedChange={(checked) =>
                      setSignUpForm({ ...signUpForm, newsletterSubscribed: checked as boolean })
                    }
                    disabled={loading}
                  />
                  <Label htmlFor="newsletterSubscribed" className="text-sm">
                    Subscribe to our newsletter for birding tips and tour updates
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketingConsent"
                    checked={signUpForm.marketingConsent}
                    onCheckedChange={(checked) =>
                      setSignUpForm({ ...signUpForm, marketingConsent: checked as boolean })
                    }
                    disabled={loading}
                  />
                  <Label htmlFor="marketingConsent" className="text-sm">
                    I consent to receive marketing communications from AVES
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading || !signUpForm.termsAccepted}>
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
                  onCheckedChange={(checked) => setSignInForm({ ...signInForm, rememberMe: checked as boolean })}
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
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
