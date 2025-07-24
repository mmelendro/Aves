import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "./LoginForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Login | AVES Colombia",
  description: "Sign in to your AVES Colombia account to manage your birding adventures.",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-emerald-800">Welcome Back</CardTitle>
            <CardDescription className="text-gray-600">Sign in to your AVES Colombia account</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
