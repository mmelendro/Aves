import { CookieManagementButton } from "@/components/cookie-management-button"
import { CookieManagementLink } from "@/components/cookie-management-link"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-6 text-emerald-800">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-700">Information We Collect</h2>
        <p className="mb-2">We collect the following types of information:</p>
        <ul className="list-disc pl-5">
          <li>Personal Information: Name, email address, etc.</li>
          <li>Usage Data: Information about how you use our services.</li>
          <li>Cookies: Data collected through cookies and similar technologies.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-700">How We Use Your Information</h2>
        <p className="mb-2">We use your information for the following purposes:</p>
        <ul className="list-disc pl-5">
          <li>To provide and improve our services.</li>
          <li>To personalize your experience.</li>
          <li>To communicate with you.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-700">Your Rights</h2>
        <p className="mb-2">You have the following rights regarding your personal information:</p>
        <ul className="list-disc pl-5">
          <li>The right to access your information.</li>
          <li>The right to correct your information.</li>
          <li>The right to delete your information.</li>
        </ul>
        <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
          <h4 className="font-semibold text-emerald-800 mb-2">Manage Your Cookie Preferences</h4>
          <p className="text-emerald-700 text-sm mb-3">
            You can review and modify your cookie preferences at any time using our preference center.
          </p>
          <CookieManagementButton
            variant="outline"
            className="bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-600"
          >
            Open Cookie Preferences
          </CookieManagementButton>
        </div>
      </section>

      <footer className="mt-12 border-t pt-6 text-sm text-gray-500">
        <div className="flex justify-between">
          <div>&copy; 2023 My Company</div>
          <div className="space-x-4">
            <a href="#" className="hover:text-emerald-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-emerald-600 transition-colors">
              Privacy Policy
            </a>
            <CookieManagementLink className="hover:text-emerald-600 transition-colors">
              Cookie Preferences
            </CookieManagementLink>
          </div>
        </div>
      </footer>
    </div>
  )
}
