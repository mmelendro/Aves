import type { Metadata } from "next"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Investor Deck - AVES: Colombia's Premier Birding Experience",
  description:
    "Explore AVES comprehensive investor presentation. Discover Colombia's premier birding experience with 2,000+ bird species, expert-guided tours, and sustainable eco-tourism opportunities.",
  keywords: [
    "AVES investor deck",
    "Colombia birding investment",
    "eco-tourism presentation",
    "birding tours business",
    "sustainable tourism investment",
    "Colombia biodiversity",
    "ornithology tours",
    "B Corp birding",
    "premium eco-tourism",
    "bird watching investment",
  ],
  openGraph: {
    title: "Investor Deck - AVES: Colombia's Premier Birding Experience",
    description:
      "Explore AVES comprehensive investor presentation showcasing Colombia's premier birding experience and investment opportunities.",
    type: "website",
    url: "https://aves.bio/deck",
    images: [
      {
        url: "/images/aves-logo.png",
        width: 1200,
        height: 630,
        alt: "AVES Colombia Investor Deck",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Investor Deck - AVES: Colombia's Premier Birding Experience",
    description: "Explore AVES comprehensive investor presentation showcasing Colombia's premier birding experience.",
    images: ["/images/aves-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function InvestorDeckPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/deck" />

      {/* Main Content */}
      <main className="pt-16">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-8 lg:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
                AVES Investor Presentation
              </h1>
              <h2 className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
                Colombia's Premier Birding Experience - Comprehensive Business Overview
              </h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto">
                Explore our detailed investor presentation showcasing market opportunities, business model, financial
                projections, and growth strategy in Colombia's thriving eco-tourism sector.
              </p>
            </div>
          </div>
        </section>

        {/* Embedded Presentation Section */}
        <section className="py-6 lg:py-8 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Presentation Container */}
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Presentation Header */}
                <div className="p-4 bg-gradient-to-r from-emerald-600 to-emerald-700">
                  <h3 className="text-xl font-bold text-white text-center">
                    AVES: Colombia's Premier Birding Experience - Interactive Presentation
                  </h3>
                </div>

                {/* Embedded Presentation */}
                <div className="relative bg-gray-100">
                  <div className="w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      src="https://aves-colombias-premier-b-p39lhi8.gamma.site/"
                      className="absolute inset-0 w-full h-full border-0"
                      title="AVES Colombia Premier Birding Experience - Investor Presentation Deck"
                      allowFullScreen
                      loading="eager"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                      referrerPolicy="strict-origin-when-cross-origin"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation allow-top-navigation-by-user-activation allow-downloads"
                      style={{
                        border: "none",
                        outline: "none",
                        background: "transparent",
                      }}
                    />
                  </div>

                  {/* Loading Fallback */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center opacity-0 transition-opacity duration-500 pointer-events-none"
                    id="presentation-loading"
                  >
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto mb-6"></div>
                      <h4 className="text-xl font-semibold text-gray-700 mb-2">Loading Investor Presentation</h4>
                      <p className="text-gray-500">Please wait while we load the interactive deck...</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Presentation Information */}
              <div className="mt-8 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Presentation Features */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-emerald-600 font-bold">📊</span>
                      </span>
                      Interactive Presentation Features
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                        </span>
                        <span>
                          <strong className="text-gray-900">Full Navigation:</strong> Use arrow keys or click to
                          navigate through slides
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                        </span>
                        <span>
                          <strong className="text-gray-900">Interactive Elements:</strong> All buttons, links, and
                          animations are fully functional
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                        </span>
                        <span>
                          <strong className="text-gray-900">Fullscreen Mode:</strong> Click the fullscreen button for
                          optimal viewing experience
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                        </span>
                        <span>
                          <strong className="text-gray-900">Mobile Responsive:</strong> Optimized for viewing on all
                          devices
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                        </span>
                        <span>
                          <strong className="text-gray-900">External Links:</strong> All external references and
                          resources are accessible
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg p-6 border border-emerald-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">💼</span>
                      </span>
                      Investment Inquiries
                    </h4>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Interested in learning more about investment opportunities with AVES? Our team is ready to discuss
                      partnership possibilities and answer your questions.
                    </p>
                    <div className="space-y-4">
                      <a
                        href="/contact"
                        className="block w-full text-center px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        📧 Contact Investment Team
                      </a>
                      <a
                        href="mailto:investors@aves.bio"
                        className="block w-full text-center px-6 py-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold rounded-lg transition-all duration-300"
                      >
                        ✉️ investors@aves.bio
                      </a>
                      <a
                        href="/about"
                        className="block w-full text-center px-6 py-4 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-all duration-300"
                      >
                        🏢 Learn More About AVES
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🦅</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-600 mb-2">2,000+</div>
                  <div className="text-sm text-gray-600">Bird Species in Colombia</div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">80</div>
                  <div className="text-sm text-gray-600">Endemic Species Access</div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-2">4</div>
                  <div className="text-sm text-gray-600">Maximum Guests per Tour</div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-2">B Corp</div>
                  <div className="text-sm text-gray-600">Certified Sustainable</div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl shadow-2xl overflow-hidden">
                <div className="px-8 py-12 text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">Ready to Explore Investment Opportunities?</h3>
                  <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                    Join us in building Colombia's premier birding experience while supporting conservation efforts and
                    sustainable tourism development.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Schedule Investment Meeting
                    </a>
                    <a
                      href="/tours"
                      className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-bold rounded-lg transition-all duration-300"
                    >
                      Explore Our Tours
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Loading Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Show loading indicator initially
            document.addEventListener('DOMContentLoaded', function() {
              const loadingElement = document.getElementById('presentation-loading');
              if (loadingElement) {
                loadingElement.style.opacity = '1';
                loadingElement.style.pointerEvents = 'auto';
                
                // Hide loading after iframe loads
                setTimeout(function() {
                  loadingElement.style.opacity = '0';
                  loadingElement.style.pointerEvents = 'none';
                }, 3000);
              }
            });
          `,
        }}
      />
    </div>
  )
}
