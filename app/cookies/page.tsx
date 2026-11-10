/** One current cookie policy and preference control, using the global navigation. */
import { GlobalHeader, GlobalFooter } from "@/components/global-navigation"
import { CookieManagementButton } from "@/components/cookie-management-button"
import { cookiePolicy } from "@/content/cookie-policy"

export default function CookiesPage() {
  return <div className="min-h-screen bg-white"><GlobalHeader/>
    <main id="main-content" tabIndex={-1} className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
      <h1 className="text-3xl font-medium text-emerald-950 sm:text-4xl">{cookiePolicy.title}</h1>
      <p className="mt-4 text-lg leading-7 text-gray-600">{cookiePolicy.description}</p>
      <div className="mt-8"><CookieManagementButton/></div>
      <div className="mt-10 space-y-8">{cookiePolicy.sections.map(section=><section key={section.title}><h2 className="text-xl font-semibold text-emerald-950">{section.title}</h2><p className="mt-3 leading-7 text-gray-600">{section.text}</p></section>)}</div>
    </main><GlobalFooter/>
  </div>
}
