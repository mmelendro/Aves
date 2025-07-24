export const dynamic = "force-dynamic"

import SignupForm from "./SignupForm"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a href="/auth/login" className="font-medium text-emerald-600 hover:text-emerald-500">
              sign in to your existing account
            </a>
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}
