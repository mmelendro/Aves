import { CookieManagementButton } from "@/components/cookie-management-button"
import { CookieManagementLink } from "@/components/cookie-management-link"

export default function CookiesPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-6">Our Cookie Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="mb-4">
          This Cookie Policy explains how we use cookies and similar technologies to recognize you when you visit our
          website. It explains what these technologies are and why we use them, as well as your rights to control our
          use of them.
        </p>
        <p>
          Cookies are small data files that are placed on your computer or mobile device when you visit a website.
          Cookies are widely used by website owners in order to make their websites work, or to work more efficiently,
          as well as to provide reporting information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
        <p className="mb-4">
          We use first-party and third-party cookies for several purposes. First-party cookies are set by us, while
          third-party cookies are set by third-party domains.
        </p>
        <ul>
          <li>
            <strong>Strictly necessary cookies:</strong> These cookies are essential to enable you to browse our website
            and use its features.
          </li>
          <li>
            <strong>Performance cookies:</strong> These cookies collect information about how visitors use our website,
            such as which pages are visited most often.
          </li>
          <li>
            <strong>Functionality cookies:</strong> These cookies allow our website to remember choices you make (such
            as your language or region) and provide enhanced features.
          </li>
          <li>
            <strong>Targeting cookies:</strong> These cookies are used to deliver advertisements that are more relevant
            to you and your interests.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Managing Your Cookie Preferences</h2>
        <p className="mb-4">
          You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by
          using our cookie consent manager. You can set or amend your web browser controls to accept or refuse cookies.
        </p>
        <p>
          If you choose to reject cookies, you may still use our website though your access to some functionality and
          areas of our website may be restricted.
        </p>
      </section>

      <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-lg mb-8">
        <div className="flex items-center mb-4">
          <span className="mr-3 text-sm font-bold bg-emerald-600 text-white px-2 py-1 rounded">B</span>
          <h3 className="text-xl font-semibold text-emerald-800">Manage Your Preferences Now</h3>
        </div>
        <p className="text-emerald-700 mb-4">
          Take control of your privacy. Use our preference center to customize your cookie settings according to your
          preferences.
        </p>
        <CookieManagementButton variant="default" size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
          Open Cookie Preference Center
        </CookieManagementButton>
      </div>

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
