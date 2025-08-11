import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

export default function DeckLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/deck" />

      {/* Main Content */}
      <main className="pt-16">
        {/* Header Section Loading */}
        <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-8 lg:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-4 max-w-2xl mx-auto"></div>
              <div className="h-6 bg-gray-200 rounded-lg animate-pulse mb-6 max-w-xl mx-auto"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded-lg animate-pulse max-w-2xl mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded-lg animate-pulse max-w-lg mx-auto"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Loading Presentation */}
        <section className="py-6 lg:py-8 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                <div className="p-4 bg-gradient-to-r from-emerald-600 to-emerald-700">
                  <div className="h-6 bg-emerald-500 rounded animate-pulse max-w-md mx-auto"></div>
                </div>
                <div className="aspect-video w-full bg-gradient-to-br from-emerald-50 to-blue-50 animate-pulse flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto mb-6"></div>
                    <div className="text-xl font-semibold text-gray-700 mb-2">Loading Investor Presentation</div>
                    <div className="text-gray-500">Preparing interactive deck...</div>
                  </div>
                </div>
              </div>

              {/* Loading Information Cards */}
              <div className="mt-8 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="h-8 bg-gray-200 rounded-lg animate-pulse mb-4 max-w-xs"></div>
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse mt-0.5"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                            <div className="h-3 bg-gray-200 rounded animate-pulse max-w-3/4"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg p-6 border border-emerald-200">
                    <div className="h-8 bg-emerald-200 rounded-lg animate-pulse mb-4 max-w-xs"></div>
                    <div className="space-y-3 mb-6">
                      <div className="h-4 bg-emerald-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-emerald-200 rounded animate-pulse max-w-5/6"></div>
                      <div className="h-4 bg-emerald-200 rounded animate-pulse max-w-4/5"></div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-12 bg-emerald-200 rounded-lg animate-pulse"></div>
                      <div className="h-12 bg-emerald-200 rounded-lg animate-pulse"></div>
                      <div className="h-12 bg-emerald-200 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loading Highlights */}
              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-200">
                    <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mx-auto mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse mb-2 max-w-16 mx-auto"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse max-w-24 mx-auto"></div>
                  </div>
                ))}
              </div>

              {/* Loading CTA */}
              <div className="mt-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl shadow-2xl overflow-hidden">
                <div className="px-8 py-12 text-center">
                  <div className="h-8 bg-emerald-500 rounded-lg animate-pulse mb-4 max-w-md mx-auto"></div>
                  <div className="space-y-2 mb-8">
                    <div className="h-5 bg-emerald-500 rounded animate-pulse max-w-2xl mx-auto"></div>
                    <div className="h-5 bg-emerald-500 rounded animate-pulse max-w-xl mx-auto"></div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="h-12 w-64 bg-emerald-500 rounded-lg animate-pulse"></div>
                    <div className="h-12 w-48 bg-emerald-500 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
