import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DeckLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Navigation Skeleton */}
      <div className="h-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="flex items-center gap-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <Skeleton className="w-28 h-28 rounded-full bg-white/20" />
            </div>
            <Skeleton className="h-16 w-3/4 mx-auto mb-6 bg-white/20" />
            <Skeleton className="h-8 w-2/3 mx-auto mb-8 bg-white/20" />

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-8 w-16 mx-auto mb-2 bg-white/20" />
                  <Skeleton className="h-4 w-20 mx-auto bg-white/20" />
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Skeleton className="h-14 w-48 bg-white/20" />
              <Skeleton className="h-14 w-48 bg-white/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Business Highlights Skeleton */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Skeleton className="h-12 w-96 mx-auto mb-4" />
              <Skeleton className="h-6 w-2/3 mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Skeleton className="w-12 h-12 rounded-lg mb-4" />
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-4/5" />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Presentation Skeleton */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Skeleton className="h-12 w-96 mx-auto mb-4" />
              <Skeleton className="h-6 w-2/3 mx-auto mb-6" />

              {/* Controls Info Skeleton */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 mb-8 border border-emerald-200">
                <div className="flex items-center justify-center gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="w-4 h-4" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Presentation Frame Skeleton */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-emerald-200">
              <CardContent className="p-0">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading presentation...</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary Cards Skeleton */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-5 h-5" />
                      <Skeleton className="h-6 w-40" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <Skeleton className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <Skeleton className="h-4 flex-1" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investment CTA Skeleton */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-12 w-3/4 mx-auto mb-6 bg-white/20" />
            <Skeleton className="h-8 w-2/3 mx-auto mb-8 bg-white/20" />

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                  <Skeleton className="h-8 w-20 mx-auto mb-2 bg-white/20" />
                  <Skeleton className="h-4 w-24 mx-auto bg-white/20" />
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Skeleton className="h-14 w-64 bg-white/20" />
              <Skeleton className="h-14 w-48 bg-white/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <div className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-6 w-24 mb-4 bg-gray-700" />
                <div className="space-y-2">
                  {[...Array(4)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-20 bg-gray-700" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
