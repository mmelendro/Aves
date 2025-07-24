"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Mail, Lock, User, Phone, Chrome, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "@/hooks/use-auth-enhanced"

interface SignupFormProps {
  redirectTo?: string
}

const EXPERIENCE_LEVELS = ["Beginner birder", "Intermediate birder", "Advanced birder", "Expert/Professional"]

export function SignupForm({ redirectTo }: SignupFormProps) {
  const router = useRouter()
  const { signUp, signInWithOAuth } = useAuth()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    experienceLevel: "Beginner birder",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" })
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters long" })
      setLoading(false)
      return
    }

    const { data, error } = await signUp(formData.email, formData.password, {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      experience_level: formData.experienceLevel,
    })

    if (error) {
      setMessage({ type: "error", text: error })
    } else {
      setMessage({
        type: "success",
        text: "Account created successfully! Please check your email to verify your account.",
      })
      setTimeout(() => {
        router.push("/auth/verify-email")
      }, 2000)
    }

    setLoading(false)
  }

  const handleOAuthSignIn = async (provider: "google") => {
    setLoading(true)
    setMessage(null)

    const { error } = await signInWithOAuth(provider)

    if (error) {
      setMessage({ type: "error", text: error })
      setLoading(false)
    }
    // OAuth will redirect, so we don't need to handle success here
  }

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <Card className="border-2 border-emerald-200 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Create Account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {message && (
          <Alert
            className={`${message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
          >
            {message.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={`${message.type === "success" ? "text-green-800" : "text-red-800"}`}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  placeholder="First name"
                  className="pl-10"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange("lastName")}
                placeholder="Last name"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                placeholder="Enter your email"
                className="pl-10"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange("phone")}
                placeholder="Enter your phone number"
                className="pl-10"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experienceLevel">Birding Experience Level</Label>
            <Select
              value={formData.experienceLevel}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, experienceLevel: value }))}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent>
                {EXPERIENCE_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange("password")}
                placeholder="Create a password"
                className="pl-10 pr-10"
                required
                minLength={6}
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
            <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange("confirmPassword")}
              placeholder="Confirm your password"
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => handleOAuthSignIn("google")}
          disabled={loading}
          className="w-full"
        >
          <Chrome className="mr-2 h-4 w-4" />
          Google
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <Link
            href={`/auth/login${redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}
            className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>

        <div className="text-xs text-center text-gray-600 px-2">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="text-emerald-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-emerald-600 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
