import type { Metadata } from "next"
import Link from "next/link"
import { SignupForm } from "./SignupForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Sign Up | AVES Colombia",
  description: "Create your AVES Colombia account to start your birding adventure.",
}

// Make this page dynamic to avoid static generation issues
export const dynamic = "force-dynamic"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-emerald-800">Join AVES Colombia</CardTitle>
            <CardDescription className="text-gray-600">
              Create your account to start your birding adventure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
