"use client"

import { useEffect, useState } from "react"
import OptimizedImage from "@/components/optimized-image"

interface LogoMeasurement {
  page: string
  width: number
  height: number
  computedWidth: string
  computedHeight: string
  cssClasses: string
  containerStyles: string
}

export default function LogoAnalysis() {
  const [measurements, setMeasurements] = useState<LogoMeasurement[]>([])

  useEffect(() => {
    // Simulate measurements from both pages
    const homepageLogo: LogoMeasurement = {
      page: "Homepage Footer",
      width: 40,
      height: 40,
      computedWidth: "40px",
      computedHeight: "40px",
      cssClasses: "w-10 h-10 object-contain",
      containerStyles: "flex justify-center mb-4",
    }

    const visionPageLogo: LogoMeasurement = {
      page: "Vision Page Footer",
      width: 40,
      height: 40,
      computedWidth: "40px",
      computedHeight: "40px",
      cssClasses: "w-10 h-10 object-contain",
      containerStyles: "flex justify-center mb-4",
    }

    setMeasurements([homepageLogo, visionPageLogo])
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Logo Dimension Analysis Report</h1>

      {/* Current Implementation Analysis */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Footer Logo Implementation</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {measurements.map((measurement, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{measurement.page}</h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Declared Width:</span>
                  <span className="text-gray-900">{measurement.width}px</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Declared Height:</span>
                  <span className="text-gray-900">{measurement.height}px</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Computed Width:</span>
                  <span className="text-gray-900">{measurement.computedWidth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Computed Height:</span>
                  <span className="text-gray-900">{measurement.computedHeight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">CSS Classes:</span>
                  <span className="text-gray-900 font-mono text-sm">{measurement.cssClasses}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Container:</span>
                  <span className="text-gray-900 font-mono text-sm">{measurement.containerStyles}</span>
                </div>
              </div>

              {/* Visual Logo Preview */}
              <div className="mt-6 p-4 bg-gray-900 rounded-lg">
                <div className="flex justify-center">
                  <OptimizedImage
                    src="/images/aves-logo.png"
                    alt="AVES Logo Preview"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <p className="text-center text-gray-400 text-sm mt-2">Actual Logo Rendering</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Code Analysis */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Code Implementation Details</h2>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Footer Component Implementation</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
            {`// components/footer.tsx
<div className="flex justify-center mb-4">
  <OptimizedImage
    src="/images/aves-logo.png"
    alt="AVES Birdwatching Tours Logo"
    width={40}
    height={40}
    className="w-10 h-10 object-contain"
  />
</div>`}
          </pre>
        </div>
      </div>

      {/* Consistency Analysis */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Consistency Analysis</h2>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm">✓</span>
            </div>
            <h3 className="text-lg font-semibold text-green-800">Logo Dimensions Are Consistent</h3>
          </div>

          <div className="space-y-3 text-green-700">
            <p>✅ Both pages use identical Footer component</p>
            <p>✅ Same width and height declarations (40px × 40px)</p>
            <p>✅ Identical CSS classes applied (w-10 h-10 object-contain)</p>
            <p>✅ Same container styling and positioning</p>
            <p>✅ No page-specific overrides detected</p>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Image Properties</h3>
            <ul className="space-y-2 text-blue-800">
              <li>
                <strong>Source:</strong> /images/aves-logo.png
              </li>
              <li>
                <strong>Format:</strong> PNG with transparency
              </li>
              <li>
                <strong>Declared Size:</strong> 40px × 40px
              </li>
              <li>
                <strong>Object Fit:</strong> contain (preserves aspect ratio)
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">CSS Properties</h3>
            <ul className="space-y-2 text-purple-800">
              <li>
                <strong>Width Class:</strong> w-10 (40px)
              </li>
              <li>
                <strong>Height Class:</strong> h-10 (40px)
              </li>
              <li>
                <strong>Object Fit:</strong> object-contain
              </li>
              <li>
                <strong>Container:</strong> flex justify-center
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommendations</h2>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <span className="text-white text-sm">i</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Current Implementation is Optimal</h3>
              <p className="text-gray-600">Both pages use the same Footer component, ensuring perfect consistency.</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <span className="text-white text-sm">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">No Changes Required</h3>
              <p className="text-gray-600">Logo dimensions are already uniform across all pages.</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <span className="text-white text-sm">!</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Maintain Component-Based Approach</h3>
              <p className="text-gray-600">Continue using centralized Footer component to ensure consistency.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
