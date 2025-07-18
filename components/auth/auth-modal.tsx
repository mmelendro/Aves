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
  })

  const [signInForm, setSignInForm] = useState({
    email: prefilledData?.email || "",
    password: "",
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

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

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signUpForm.email,
        password: signUpForm.password,
        options: {
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
        setMessage({
          type: "success",
          text: "Account created successfully! Please check your email to verify your account.",
        })

        // Create profile in profiles table
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          email: signUpForm.email,
          full_name: `${signUpForm.firstName} ${signUpForm.lastName}`,
          phone: signUpForm.phone,
          experience_level: signUpForm.experienceLevel,
          created_at: new Date().toISOString(),
        })

        if (profileError) {
          console.error("Profile creation error:", profileError)
        }

        setTimeout(() => {
          onSuccess(data.user)
          onClose()
        }, 2000)
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "An error occurred during sign up" })
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
          redirectTo: `${window.location.origin}/shopping?auth=success`,
        },
      })

      if (error) throw error
    } catch (error: any) {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
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
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
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
              By creating an account, you agree to our{" "}
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
      </DialogContent>
    </Dialog>
  )
}
