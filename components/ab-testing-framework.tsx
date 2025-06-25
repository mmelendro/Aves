"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Target, BarChart3 } from "lucide-react"

interface ABTestVariant {
  id: string
  name: string
  description: string
  traffic: number
  conversions: number
  conversionRate: number
  isActive: boolean
}

interface ABTest {
  id: string
  name: string
  description: string
  status: "draft" | "running" | "completed"
  startDate: string
  endDate?: string
  variants: ABTestVariant[]
  primaryMetric: string
  secondaryMetrics: string[]
}

export function ABTestingFramework() {
  const [tests, setTests] = useState<ABTest[]>([
    {
      id: "hero-cta-test",
      name: "Hero Section CTA Optimization",
      description: "Testing different CTA button texts and colors in the hero section",
      status: "running",
      startDate: "2024-01-15",
      primaryMetric: "Click-through Rate",
      secondaryMetrics: ["Time on Page", "Scroll Depth"],
      variants: [
        {
          id: "control",
          name: "Control - 'Explore Our Tours'",
          description: "Original green button with 'Explore Our Tours' text",
          traffic: 2847,
          conversions: 142,
          conversionRate: 4.99,
          isActive: true,
        },
        {
          id: "variant-a",
          name: "Variant A - 'Start Your Adventure'",
          description: "Green button with 'Start Your Adventure' text",
          traffic: 2891,
          conversions: 167,
          conversionRate: 5.78,
          isActive: true,
        },
        {
          id: "variant-b",
          name: "Variant B - 'Book Now & Save'",
          description: "Orange button with urgency text",
          traffic: 2756,
          conversions: 189,
          conversionRate: 6.86,
          isActive: true,
        },
      ],
    },
    {
      id: "pricing-display-test",
      name: "Tour Pricing Display",
      description: "Testing different ways to display tour pricing information",
      status: "completed",
      startDate: "2024-01-01",
      endDate: "2024-01-14",
      primaryMetric: "Tour Detail Page Views",
      secondaryMetrics: ["Contact Form Submissions", "Bounce Rate"],
      variants: [
        {
          id: "control",
          name: "Control - Starting From Price",
          description: "Show 'Starting from $X' pricing",
          traffic: 1847,
          conversions: 89,
          conversionRate: 4.82,
          isActive: false,
        },
        {
          id: "variant-a",
          name: "Variant A - Average Price",
          description: "Show 'Average $X per person' pricing",
          traffic: 1923,
          conversions: 127,
          conversionRate: 6.61,
          isActive: false,
        },
      ],
    },
    {
      id: "social-proof-test",
      name: "Social Proof Placement",
      description: "Testing different locations for testimonials and reviews",
      status: "draft",
      startDate: "2024-02-01",
      primaryMetric: "Contact Form Submissions",
      secondaryMetrics: ["Trust Score", "Page Engagement"],
      variants: [
        {
          id: "control",
          name: "Control - Below Hero",
          description: "Testimonials section below hero section",
          traffic: 0,
          conversions: 0,
          conversionRate: 0,
          isActive: false,
        },
        {
          id: "variant-a",
          name: "Variant A - Floating Testimonial",
          description: "Floating testimonial card in hero section",
          traffic: 0,
          conversions: 0,
          conversionRate: 0,
          isActive: false,
        },
      ],
    },
  ])

  const [selectedTest, setSelectedTest] = useState<ABTest | null>(tests[0])

  const getStatusColor = (status: ABTest["status"]) => {
    switch (status) {
      case "running":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getWinningVariant = (variants: ABTestVariant[]) => {
    return variants.reduce((prev, current) => (prev.conversionRate > current.conversionRate ? prev : current))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">A/B Testing Dashboard</h2>
          <p className="text-gray-600">Monitor and optimize homepage conversion performance</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Target className="mr-2 w-4 h-4" />
          Create New Test
        </Button>
      </div>

      {/* Test Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Tests</p>
                <p className="text-2xl font-bold text-gray-900">{tests.filter((t) => t.status === "running").length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Visitors Tested</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tests
                    .reduce(
                      (sum, test) =>
                        sum + test.variants.reduce((variantSum, variant) => variantSum + variant.traffic, 0),
                      0,
                    )
                    .toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Conversion Lift</p>
                <p className="text-2xl font-bold text-emerald-600">+23.4%</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test List */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Tests</h3>
            <div className="space-y-4">
              {tests.map((test) => (
                <div
                  key={test.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedTest?.id === test.id
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedTest(test)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{test.name}</h4>
                    <Badge className={getStatusColor(test.status)}>{test.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{test.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Primary: {test.primaryMetric}</span>
                    <span>{test.variants.length} variants</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Test Details */}
        {selectedTest && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedTest.name}</h3>
                <Badge className={getStatusColor(selectedTest.status)}>{selectedTest.status}</Badge>
              </div>

              <p className="text-gray-600 mb-6">{selectedTest.description}</p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Test Variants</h4>
                  <div className="space-y-3">
                    {selectedTest.variants.map((variant) => (
                      <div key={variant.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{variant.name}</h5>
                          <div className="flex items-center space-x-2">
                            {variant.conversionRate ===
                              Math.max(...selectedTest.variants.map((v) => v.conversionRate)) && (
                              <Badge className="bg-green-100 text-green-800 text-xs">Winner</Badge>
                            )}
                            <span className="text-sm font-bold text-emerald-600">
                              {variant.conversionRate.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{variant.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Traffic:</span>
                            <span className="ml-1 font-medium">{variant.traffic.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Conversions:</span>
                            <span className="ml-1 font-medium">{variant.conversions}</span>
                          </div>
                        </div>

                        {/* Conversion Rate Bar */}
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${(variant.conversionRate / Math.max(...selectedTest.variants.map((v) => v.conversionRate))) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Test Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Primary Metric:</span>
                      <span className="font-medium">{selectedTest.primaryMetric}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Date:</span>
                      <span className="font-medium">{selectedTest.startDate}</span>
                    </div>
                    {selectedTest.endDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">End Date:</span>
                        <span className="font-medium">{selectedTest.endDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedTest.status === "running" && (
                  <div className="flex space-x-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      Pause Test
                    </Button>
                    <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                      Declare Winner
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recommendations */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Recommendations</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-green-900">Implement Winning CTA</h4>
                <p className="text-sm text-green-700">
                  The "Book Now & Save" variant is showing a 37% improvement in conversion rate. Consider implementing
                  this as the new default.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Test Social Proof Placement</h4>
                <p className="text-sm text-blue-700">
                  Based on user behavior data, testing testimonial placement near the tour selection could improve trust
                  and conversion rates.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <BarChart3 className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium text-amber-900">Mobile Optimization Needed</h4>
                <p className="text-sm text-amber-700">
                  Mobile conversion rates are 23% lower than desktop. Consider testing mobile-specific layouts and
                  simplified forms.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
