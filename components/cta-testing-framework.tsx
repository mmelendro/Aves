"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"

interface CTATest {
  id: string
  name: string
  description: string
  test: () => Promise<boolean>
  status: "pending" | "running" | "passed" | "failed"
  error?: string
}

export default function CTATestingFramework() {
  const [tests, setTests] = useState<CTATest[]>([
    {
      id: "section-exists",
      name: "Comparison Section Exists",
      description: "Verify that the comparison section element exists in the DOM",
      test: async () => {
        const element = document.getElementById("comparison")
        return element !== null
      },
      status: "pending",
    },
    {
      id: "smooth-scroll",
      name: "Smooth Scroll Support",
      description: "Check if browser supports smooth scrolling behavior",
      test: async () => {
        return "scrollBehavior" in document.documentElement.style
      },
      status: "pending",
    },
    {
      id: "scroll-functionality",
      name: "Scroll to Section",
      description: "Test actual scrolling to the comparison section",
      test: async () => {
        const element = document.getElementById("comparison")
        if (!element) return false

        const initialPosition = window.pageYOffset
        element.scrollIntoView({ behavior: "smooth" })

        // Wait for scroll to complete
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const finalPosition = window.pageYOffset
        return Math.abs(finalPosition - initialPosition) > 100
      },
      status: "pending",
    },
    {
      id: "hash-navigation",
      name: "Hash Navigation",
      description: "Test hash-based navigation as fallback",
      test: async () => {
        const originalHash = window.location.hash
        window.location.hash = "#comparison"
        const hashSet = window.location.hash === "#comparison"
        window.location.hash = originalHash
        return hashSet
      },
      status: "pending",
    },
    {
      id: "mobile-compatibility",
      name: "Mobile Compatibility",
      description: "Check if scrolling works on mobile devices",
      test: async () => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        if (!isMobile) return true // Skip on desktop

        const element = document.getElementById("comparison")
        if (!element) return false

        try {
          element.scrollIntoView({ behavior: "smooth" })
          return true
        } catch (error) {
          return false
        }
      },
      status: "pending",
    },
  ])

  const [isRunning, setIsRunning] = useState(false)

  const runTests = async () => {
    setIsRunning(true)

    for (let i = 0; i < tests.length; i++) {
      setTests((prev) => prev.map((test, index) => (index === i ? { ...test, status: "running" } : test)))

      try {
        const result = await tests[i].test()
        setTests((prev) =>
          prev.map((test, index) =>
            index === i
              ? {
                  ...test,
                  status: result ? "passed" : "failed",
                  error: result ? undefined : "Test assertion failed",
                }
              : test,
          ),
        )
      } catch (error) {
        setTests((prev) =>
          prev.map((test, index) =>
            index === i
              ? {
                  ...test,
                  status: "failed",
                  error: error instanceof Error ? error.message : "Unknown error",
                }
              : test,
          ),
        )
      }

      // Small delay between tests
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    setIsRunning(false)
  }

  const resetTests = () => {
    setTests((prev) =>
      prev.map((test) => ({
        ...test,
        status: "pending" as const,
        error: undefined,
      })),
    )
  }

  const getStatusIcon = (status: CTATest["status"]) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "running":
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const passedTests = tests.filter((test) => test.status === "passed").length
  const failedTests = tests.filter((test) => test.status === "failed").length

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">CTA Button Diagnostic Tests</h3>
            <p className="text-sm text-gray-600">Testing the "Compare All Tours" button functionality</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={runTests} disabled={isRunning} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Running...
                </>
              ) : (
                "Run Tests"
              )}
            </Button>
            <Button onClick={resetTests} disabled={isRunning} size="sm" variant="outline">
              Reset
            </Button>
          </div>
        </div>

        {/* Test Results Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{tests.length}</div>
            <div className="text-xs text-gray-600">Total Tests</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{passedTests}</div>
            <div className="text-xs text-gray-600">Passed</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{failedTests}</div>
            <div className="text-xs text-gray-600">Failed</div>
          </div>
        </div>

        {/* Individual Test Results */}
        <div className="space-y-3">
          {tests.map((test) => (
            <div
              key={test.id}
              className={`p-4 rounded-lg border ${
                test.status === "passed"
                  ? "bg-green-50 border-green-200"
                  : test.status === "failed"
                    ? "bg-red-50 border-red-200"
                    : test.status === "running"
                      ? "bg-blue-50 border-blue-200"
                      : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-start space-x-3">
                {getStatusIcon(test.status)}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{test.name}</div>
                  <div className="text-sm text-gray-600">{test.description}</div>
                  {test.error && <div className="text-sm text-red-600 mt-1">Error: {test.error}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        {failedTests > 0 && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-medium text-amber-800 mb-2">Recommendations</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Ensure the comparison section has the correct ID attribute</li>
              <li>• Check for JavaScript errors in the browser console</li>
              <li>• Test on different browsers and devices</li>
              <li>• Verify smooth scrolling polyfill is working</li>
              <li>• Consider using a scroll library for better compatibility</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
