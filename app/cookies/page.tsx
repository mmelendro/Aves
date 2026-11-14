/**
 * Cookie-policy copy within the shared public layout. CookieManagementButton opens
 * the shared preference center provided by the root layout. Editing this prose does
 * not change what scripts, cookies or embeds actually run.
 */
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Settings, Eye, Target, Users } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { PageIntroduction } from "@/components/page-introduction"
import { CookieManagementButton } from "@/components/cookie-management-button"
import { Footer } from "@/components/footer"

export default function CookiesPage() {

  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/cookies" />
      <main id="main-content" tabIndex={-1}>
      <PageIntroduction title="Our Cookie Policy" eyebrow="Privacy & Transparency" description="We believe in transparency about how we collect and use data. Learn about our cookie practices and how you can control your privacy preferences." />

      {/* Cookie Policy Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <Card className="mb-12 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Introduction</h2>
                </div>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    This Cookie Policy explains how AVES Tours uses cookies and similar technologies to recognize you
                    when you visit our website. It explains what these technologies are and why we use them, as well as
                    your rights to control our use of them.
                  </p>
                  <p>
                    Cookies are small data files that are placed on your computer or mobile device when you visit a
                    website. Cookies are widely used by website owners to make their websites work, or to work more
                    efficiently, as well as to provide reporting information.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Types of Cookies */}
            <Card className="mb-12 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <Settings className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Types of Cookies We Use</h2>
                </div>
                <p className="text-gray-600 mb-8">
                  We use first-party and third-party cookies for several purposes. First-party cookies are set by us,
                  while third-party cookies are set by third-party domains.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Shield className="w-6 h-6 text-emerald-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">Strictly Necessary</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      These cookies are essential to enable you to browse our website and use its features, such as
                      accessing secure areas.
                    </p>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Eye className="w-6 h-6 text-blue-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      The current AVES application does not install a performance analytics loader. This preference
                      records your choice for a future supported integration; it does not start tracking.
                    </p>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Settings className="w-6 h-6 text-purple-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">Functionality</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      These cookies allow our website to remember choices you make and provide enhanced, personalized
                      features.
                    </p>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Target className="w-6 h-6 text-orange-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">Targeting</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      The current AVES application does not install an advertising or retargeting loader. Marketing
                      consent is optional and does not itself load advertisements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Managing Preferences */}
            <Card className="mb-12 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Managing Your Cookie Preferences</h2>
                </div>
                <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                  <p>
                    You have the right to decide whether to accept or reject cookies. You can exercise your cookie
                    preferences by using our cookie consent manager. You can set or amend your web browser controls to
                    accept or refuse cookies.
                  </p>
                  <p>
                    If you choose to reject cookies, you may still use our website though your access to some
                    functionality and areas of our website may be restricted.
                  </p>
                </div>

                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <span className="mr-3 text-sm font-bold bg-emerald-600 text-white px-2 py-1 rounded">B</span>
                    <h3 className="text-xl font-semibold text-emerald-800">Manage Your Preferences Now</h3>
                  </div>
                  <p className="text-emerald-700 mb-4">
                    Take control of your privacy. Use our preference center to customize your cookie settings according
                    to your preferences.
                  </p>
                  <CookieManagementButton
                    variant="default"
                    size="lg"
                    className="h-auto min-h-11 w-full whitespace-normal bg-emerald-600 px-4 py-3 text-white hover:bg-emerald-700 sm:w-auto sm:px-8"
                  >
                    Open Cookie Preference Center
                  </CookieManagementButton>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      </main>
      <Footer />
    </div>
  )
}
