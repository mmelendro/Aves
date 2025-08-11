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
import { supabase } from "@/lib/supabase"
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
  ArrowRight,
  Sparkles,
} from "lucide-react"
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
  title?: string
  subtitle?: string
}

export function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  prefilledData,
  mode = "signup",
  title,
  subtitle,
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(mode)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
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
  })

  const [signInForm, setSignInForm] = useState({
    email: prefilledData?.email || "",
    password: "",
  })

  // Update forms when prefilled data changes
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

  // Update active tab when mode changes
  useEffect(() => {
    setActiveTab(mode)
  }, [mode])

  // Dynamic tab switching with smooth transition
  const handleTabChange = (newTab: string) => {
    setIsTransitioning(true)
    setMessage(null)

    setTimeout(() => {
      setActiveTab(newTab)
      setIsTransitioning(false)
    }, 150)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    // Validation
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" })
      setLoading(false)
      return
    }

    if (signUpForm.password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters long" })
      setLoading(false)
      return
    }

    if (!signUpForm.firstName.trim() || !signUpForm.lastName.trim()) {
      setMessage({ type: "error", text: "First and last name are required" })
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signUpForm.email,
        password: signUpForm.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/shopping`,
          data: {
            full_name: `${signUpForm.firstName} ${signUpForm.lastName}`,
            first_name: signUpForm.firstName,
            last_name: signUpForm.lastName,
            phone: signUpForm.phone,
            experience_level: signUpForm.experienceLevel,
          },
        },
      })

      if (error) throw error

      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: data.user.id,
          email: signUpForm.email,
          full_name: `${signUpForm.firstName} ${signUpForm.lastName}`,
          phone: signUpForm.phone,
          experience_level: signUpForm.experienceLevel,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        if (profileError) {
          console.error("Profile creation error:", profileError)
        }

        setMessage({
          type: "success",
          text: "Account created successfully! Please check your email to verify your account.",
        })

        setTimeout(() => {
          onSuccess(data.user)
          onClose()
        }, 2000)
      }
    } catch (error: any) {
      console.error("Sign-up error:", error)
      setMessage({
        type: "error",
        text: error.message || "An error occurred during sign up. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInForm.email,
        password: signInForm.password,
      })

      if (error) throw error

      if (data.user) {
        setMessage({ type: "success", text: "Successfully signed in!" })
        setTimeout(() => {
          onSuccess(data.user)
          onClose()
        }, 1000)
      }
    } catch (error: any) {
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
          redirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/shopping?auth=success`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (error) throw error

      setMessage({
        type: "success",
        text: "Redirecting to Google for authentication...",
      })
    } catch (error: any) {
      console.error("Google sign-in error:", error)
      setMessage({
        type: "error",
        text: error.message || "Failed to sign in with Google. Please try again.",
      })
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

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/shopping?auth=success`,
        },
      })

      if (error) throw error

      setMessage({
        type: "success",
        text: "Magic link sent! Check your email and click the link to sign in.",
      })
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "An error occurred sending magic link" })
    } finally {
      setLoading(false)
    }
  }

  // Clear messages when switching tabs
  useEffect(() => {
    setMessage(null)
  }, [activeTab])

  // Dynamic content based on active tab
  const getModalTitle = () => {
    if (title) return title
    return activeTab === "signup" ? "Join the AVES Flock" : "Welcome Back"
  }

  const getModalSubtitle = () => {
    if (subtitle) return subtitle
    return activeTab === "signup"
      ? "Create your account to start your Colombian birding adventure"
      : "Sign in to continue your birding journey"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md sm:max-w-lg max-h-[95vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            {activeTab === "signup" ? (
              <Sparkles className="w-5 h-5 text-emerald-600" />
            ) : (
              <User className="w-5 h-5 text-emerald-600" />
            )}
            {getModalTitle()}
          </DialogTitle>
          <p className="text-sm text-gray-600">{getModalSubtitle()}</p>
        </DialogHeader>

        <div className={`transition-opacity duration-150 ${isTransitioning ? "opacity-50" : "opacity-100"}`}>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            {/* Dynamic Tab Switcher */}
            <div className="relative mb-6">
              <TabsList className="grid w-full grid-cols-2 h-12 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  value="signup"
                  className="flex items-center gap-2 text-sm sm:text-base py-2 px-3 rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Create Account</span>
                  <span className="sm:hidden">Sign Up</span>
                </TabsTrigger>
                <TabsTrigger
                  value="signin"
                  className="flex items-center gap-2 text-sm sm:text-base py-2 px-3 rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </TabsTrigger>
              </TabsList>

              {/* Quick Switch Button */}
              <div className="absolute -bottom-8 right-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleTabChange(activeTab === "signup" ? "signin" : "signup")}
                  className="text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 p-2 h-auto"
                  disabled={loading}
                >
                  {activeTab === "signup" ? "Already have an account?" : "Need an account?"}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>

            {/* Alert Messages */}
            {message && (
              <Alert
                className={`mb-4 transition-all duration-200 ${
                  message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription
                  className={`text-sm ${message.type === "success" ? "text-green-800" : "text-red-800"}`}
                >
                  {message.text}
                </AlertDescription>
              </Alert>
            )}

            {/* Sign Up Form */}
            <TabsContent value="signup" className="space-y-4 mt-8">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={signUpForm.firstName}
                      onChange={(e) => setSignUpForm({ ...signUpForm, firstName: e.target.value })}
                      required
                      disabled={loading}
                      className="h-11 transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={signUpForm.lastName}
                      onChange={(e) => setSignUpForm({ ...signUpForm, lastName: e.target.value })}
                      required
                      disabled={loading}
                      className="h-11 transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signupEmail" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="signupEmail"
                    type="email"
                    value={signUpForm.email}
                    onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                    required
                    disabled={loading}
                    className="h-11 transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number (Optional)
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={signUpForm.phone}
                    onChange={(e) => setSignUpForm({ ...signUpForm, phone: e.target.value })}
                    disabled={loading}
                    className="h-11 transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experienceLevel" className="text-sm font-medium">
                    Birding Experience Level
                  </Label>
                  <select
                    id="experienceLevel"
                    value={signUpForm.experienceLevel}
                    onChange={(e) => setSignUpForm({ ...signUpForm, experienceLevel: e.target.value })}
                    className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    disabled={loading}
                  >
                    <option value="Beginner birder">Beginner birder</option>
                    <option value="Intermediate birder">Intermediate birder</option>
                    <option value="Advanced birder">Advanced birder</option>
                    <option value="Expert/Professional">Expert/Professional</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={signUpForm.password}
                      onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                      required
                      disabled={loading}
                      minLength={6}
                      className="h-11 pr-10 transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                      placeholder="Create a secure password"
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
                  <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={signUpForm.confirmPassword}
                    onChange={(e) => setSignUpForm({ ...signUpForm, confirmPassword: e.target.value })}
                    required
                    disabled={loading}
                    minLength={6}
                    className="h-11 transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                    placeholder="Confirm your password"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium bg-emerald-600 hover:bg-emerald-700 transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Create Account
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Sign In Form */}
            <TabsContent value="signin" className="space-y-4 mt-8">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signinEmail" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="signinEmail"
                    type="email"
                    value={signInForm.email}
                    onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                    required
                    disabled={loading}
                    className="h-11 transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signinPassword" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="signinPassword"
                      type={showPassword ? "text" : "password"}
                      value={signInForm.password}
                      onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                      required
                      disabled={loading}
                      className="h-11 pr-10 transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                      placeholder="Enter your password"
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

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium bg-emerald-600 hover:bg-emerald-700 transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing In...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Alternative Sign In Methods */}
            <div className="space-y-4 mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full h-12 bg-transparent hover:bg-gray-50 transition-all duration-200"
                >
                  <Chrome className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleMagicLink}
                  disabled={loading}
                  className="w-full h-12 bg-transparent hover:bg-gray-50 transition-all duration-200"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Magic Link
                </Button>
              </div>

              <div className="text-xs text-center text-gray-600 px-2">
                By {activeTab === "signup" ? "creating an account" : "signing in"}, you agree to our{" "}
                <a href="/terms" className="text-emerald-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-emerald-600 hover:underline">
                  Privacy Policy
                </a>
              </div>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
