import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">Return Home</Button>
          </Link>

          <div className="text-sm text-gray-500">
            <Link href="/tours" className="hover:text-green-600 mx-2">
              Tours
            </Link>
            <Link href="/about" className="hover:text-green-600 mx-2">
              About
            </Link>
            <Link href="/contact" className="hover:text-green-600 mx-2">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
