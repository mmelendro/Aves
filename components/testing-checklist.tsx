"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface TestResult {
  name: string
  status: "pass" | "fail" | "warning"
  message: string
}

export function TestingChecklist() {
  const [tests, setTests] = useState<TestResult[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === "development") {
      setIsVisible(true)
      runTests()
    }
  }, [])

  const runTests = () => {
    const testResults: TestResult[] = []

    // Test 1: Check if all images have alt text
    const images = document.querySelectorAll("img")
    const imagesWithoutAlt = Array.from(images).filter((img) => !img.alt || img.alt.trim() === "")
    testResults.push({
      name: "Image Alt Text",
      status: imagesWithoutAlt.length === 0 ? "pass" : "fail",
      message:
        imagesWithoutAlt.length === 0
          ? "All images have alt text"
          : `${imagesWithoutAlt.length} images missing alt text`,
    })

    // Test 2: Check for proper heading hierarchy
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    const h1Count = document.querySelectorAll("h1").length
    testResults.push({
      name: "Heading Hierarchy",
      status: h1Count === 1 ? "pass" : h1Count === 0 ? "fail" : "warning",
      message: h1Count === 1 ? "Proper H1 usage" : h1Count === 0 ? "No H1 found" : "Multiple H1 tags found",
    })

    // Test 3: Check for form labels
    const inputs = document.querySelectorAll("input, textarea, select")
    const inputsWithoutLabels = Array.from(inputs).filter((input) => {
      const id = input.getAttribute("id")
      return !id || !document.querySelector(`label[for="${id}"]`)
    })
    testResults.push({
      name: "Form Labels",
      status: inputsWithoutLabels.length === 0 ? "pass" : "fail",
      message:
        inputsWithoutLabels.length === 0
          ? "All form inputs have labels"
          : `${inputsWithoutLabels.length} inputs missing labels`,
    })

    // Test 4: Check for ARIA attributes on interactive elements
    const buttons = document.querySelectorAll("button")
    const buttonsWithoutAria = Array.from(buttons).filter((button) => {
      return !button.getAttribute("aria-label") && !button.textContent?.trim()
    })
    testResults.push({
      name: "Button Accessibility",
      status: buttonsWithoutAria.length === 0 ? "pass" : "warning",
      message:
        buttonsWithoutAria.length === 0
          ? "All buttons have accessible names"
          : `${buttonsWithoutAria.length} buttons may need aria-label`,
    })

    // Test 5: Check for external links with proper attributes
    const externalLinks = document.querySelectorAll('a[href^="http"]')
    const externalLinksWithoutRel = Array.from(externalLinks).filter((link) => {
      return !link.getAttribute("rel")?.includes("noopener")
    })
    testResults.push({
      name: "External Link Security",
      status: externalLinksWithoutRel.length === 0 ? "pass" : "warning",
      message:
        externalLinksWithoutRel.length === 0
          ? "External links are secure"
          : `${externalLinksWithoutRel.length} external links missing rel="noopener"`,
    })

    setTests(testResults)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            🧪 Accessibility Tests
            <Badge variant="outline" className="ml-2 text-xs">
              DEV
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {tests.map((test, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              {test.status === "pass" && <CheckCircle className="w-4 h-4 text-green-600" />}
              {test.status === "fail" && <XCircle className="w-4 h-4 text-red-600" />}
              {test.status === "warning" && <AlertCircle className="w-4 h-4 text-yellow-600" />}
              <div>
                <div className="font-medium">{test.name}</div>
                <div className="text-gray-600">{test.message}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
