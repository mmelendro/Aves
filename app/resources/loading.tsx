import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ResourcesLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Skeleton */}
      <div className="h-16 bg-white border-b">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="hidden md:flex space-x-8">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="py-12 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-16 w-16 rounded-full mx-auto mb-6" />
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-6" />

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <Skeleton className="h-8 w-12 mb-2" />
                    <Skeleton className="h-4 w-20" />
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Skeleton className="h-12 w-48" />
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section Skeleton */}
      <section className="py-8 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-8 w-8 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 w-full max-w-3xl mx-auto mb-4" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <Skeleton className="h-10 w-96 mx-auto mb-4" />
              <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-6" />
              <Skeleton className="h-10 w-80 mx-auto" />
            </div>

            {/* Tabs Skeleton */}
            <div className="mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </div>

            {/* Content Cards Skeleton */}
            <div className="grid lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-12 w-12 rounded-lg" />
                      <div className="flex-1">
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-32 w-full mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-10 w-96 mx-auto mb-6 bg-white/20" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-6 bg-white/20" />
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Skeleton className="h-12 w-48 bg-white/20" />
              <Skeleton className="h-12 w-48 bg-white/20" />
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
