"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Zap, Users, Smartphone, Monitor, CheckCircle, AlertTriangle, Star } from "lucide-react"

interface PlacementOption {
  id: string
  name: string
  description: string
  pros: string[]
  cons: string[]
  impact: {
    visual: number
    performance: number
    readability: number
    engagement: number
    mobile: number
  }
  recommendation: "excellent" | "good" | "fair" | "poor"
}

const placementOptions: PlacementOption[] = [
  {
    id: "hero-background",
    name: "Hero Section Background",
    description: "Full background video for the main hero section with overlay content",
    pros: [
      "Maximum visual impact on first impression",
      "Immediate emotional connection",
      "Premium, cinematic feel",
      "Perfect for brand storytelling",
      "High user engagement potential",
    ],
    cons: [
      "May overshadow key messaging",
      "Higher bandwidth usage",
      "Potential accessibility concerns",
      "Risk of distraction from CTA",
      "Complex overlay optimization needed",
    ],
    impact: {
      visual: 95,
      performance: 75,
      readability: 70,
      engagement: 90,
      mobile: 80,
    },
    recommendation: "excellent",
  },
  {
    id: "full-page-background",
    name: "Full Page Background",
    description: "Video background spanning the entire homepage with fixed positioning",
    pros: [
      "Consistent visual theme throughout",
      "Unified brand experience",
      "Continuous engagement",
      "Seamless scrolling experience",
      "Strong brand memorability",
    ],
    cons: [
      "Overwhelming visual presence",
      "Significant performance impact",
      "Text readability challenges",
      "High bandwidth consumption",
      "Potential user fatigue",
    ],
    impact: {
      visual: 100,
      performance: 60,
      readability: 50,
      engagement: 85,
      mobile: 65,
    },
    recommendation: "fair",
  },
  {
    id: "why-colombia-background",
    name: "Why Colombia Section Background",
    description: "Current implementation - background for the biodiversity section",
    pros: [
      "Contextually relevant placement",
      "Supports section messaging",
      "Balanced visual impact",
      "Good text readability",
      "Optimal performance balance",
    ],
    cons: [
      "Limited first impression impact",
      "May not be immediately visible",
      "Reduced overall brand presence",
      "Less dramatic visual effect",
      "Potential scroll-dependent engagement",
    ],
    impact: {
      visual: 80,
      performance: 85,
      readability: 90,
      engagement: 75,
      mobile: 85,
    },
    recommendation: "good",
  },
  {
    id: "contained-showcase",
    name: "Contained Video Showcase",
    description: "Dedicated video section with controlled dimensions and prominent placement",
    pros: [
      "Focused attention on video content",
      "Easy to control and optimize",
      "Clear user intent",
      "Excellent mobile experience",
      "Minimal performance impact",
    ],
    cons: [
      "Less immersive experience",
      "Reduced visual impact",
      "Traditional presentation",
      "May feel disconnected",
      "Lower engagement potential",
    ],
    impact: {
      visual: 70,
      performance: 95,
      readability: 95,
      engagement: 65,
      mobile: 90,
    },
    recommendation: "good",
  },
  {
    id: "floating-overlay",
    name: "Floating Video Overlay",
    description: "Small floating video player that appears on scroll with expand option",
    pros: [
      "Non-intrusive presentation",
      "User-controlled experience",
      "Minimal performance impact",
      "Excellent accessibility",
      "Mobile-friendly design",
    ],
    cons: [
      "Very limited visual impact",
      "May be easily ignored",
      "Reduced brand presence",
      "Less emotional connection",
      "Minimal engagement boost",
    ],
    impact: {
      visual: 40,
      performance: 90,
      readability: 100,
      engagement: 45,
      mobile: 95,
    },
    recommendation: "fair",
  },
  {
    id: "split-hero",
    name: "Split Hero Layout",
    description: "Hero section with video on one side and content on the other",
    pros: [
      "Balanced content presentation",
      "Clear visual hierarchy",
      "Good text readability",
      "Moderate performance impact",
      "Professional appearance",
    ],
    cons: [
      "Reduced video prominence",
      "Less immersive experience",
      "Complex responsive design",
      "Potential mobile challenges",
      "Traditional layout approach",
    ],
    impact: {
      visual: 75,
      performance: 80,
      readability: 85,
      engagement: 70,
      mobile: 75,
    },
    recommendation: "good",
  },
]

export default function PlacementAnalysis() {
  const [selectedOption, setSelectedOption] = useState("hero-background")
  const [showComparison, setShowComparison] = useState(false)

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "excellent":
        return "text-green-600 bg-green-50"
      case "good":
        return "text-blue-600 bg-blue-50"
      case "fair":
        return "text-yellow-600 bg-yellow-50"
      case "poor":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    if (score >= 60) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <Badge className="bg-emerald-100 text-emerald-800">📹 Video Placement Analysis</Badge>
        <h1 className="text-4xl font-bold text-gray-900">Sierra Nevada & Tayrona Video Placement Evaluation</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive analysis of optimal placement options for the YouTube video showcasing Colombia's natural
          beauty, evaluating visual impact, performance, and user experience.
        </p>
      </div>

      <Tabs value={selectedOption} onValueChange={setSelectedOption} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          {placementOptions.map((option) => (
            <TabsTrigger key={option.id} value={option.id} className="text-xs lg:text-sm">
              {option.name.split(" ")[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {placementOptions.map((option) => (
          <TabsContent key={option.id} value={option.id} className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{option.name}</CardTitle>
                  <Badge className={getRecommendationColor(option.recommendation)}>
                    {option.recommendation.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-gray-600">{option.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Impact Scores */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Eye className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <div className={`text-2xl font-bold ${getScoreColor(option.impact.visual)}`}>
                      {option.impact.visual}
                    </div>
                    <div className="text-sm text-gray-600">Visual Impact</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                    <div className={`text-2xl font-bold ${getScoreColor(option.impact.performance)}`}>
                      {option.impact.performance}
                    </div>
                    <div className="text-sm text-gray-600">Performance</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Monitor className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className={`text-2xl font-bold ${getScoreColor(option.impact.readability)}`}>
                      {option.impact.readability}
                    </div>
                    <div className="text-sm text-gray-600">Readability</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <div className={`text-2xl font-bold ${getScoreColor(option.impact.engagement)}`}>
                      {option.impact.engagement}
                    </div>
                    <div className="text-sm text-gray-600">Engagement</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Smartphone className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                    <div className={`text-2xl font-bold ${getScoreColor(option.impact.mobile)}`}>
                      {option.impact.mobile}
                    </div>
                    <div className="text-sm text-gray-600">Mobile UX</div>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-green-700 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Advantages
                    </h3>
                    <ul className="space-y-2">
                      {option.pros.map((pro, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-red-700 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Considerations
                    </h3>
                    <ul className="space-y-2">
                      {option.cons.map((con, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Comparison Matrix */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-500" />
            Placement Comparison Matrix
          </CardTitle>
          <p className="text-gray-600">Side-by-side comparison of all placement options across key metrics</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Placement Option</th>
                  <th className="text-center p-3 font-semibold">Visual</th>
                  <th className="text-center p-3 font-semibold">Performance</th>
                  <th className="text-center p-3 font-semibold">Readability</th>
                  <th className="text-center p-3 font-semibold">Engagement</th>
                  <th className="text-center p-3 font-semibold">Mobile</th>
                  <th className="text-center p-3 font-semibold">Overall</th>
                </tr>
              </thead>
              <tbody>
                {placementOptions.map((option) => {
                  const overall = Math.round(
                    (option.impact.visual +
                      option.impact.performance +
                      option.impact.readability +
                      option.impact.engagement +
                      option.impact.mobile) /
                      5,
                  )
                  return (
                    <tr key={option.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{option.name}</span>
                          <Badge size="sm" className={getRecommendationColor(option.recommendation)}>
                            {option.recommendation}
                          </Badge>
                        </div>
                      </td>
                      <td className={`text-center p-3 font-semibold ${getScoreColor(option.impact.visual)}`}>
                        {option.impact.visual}
                      </td>
                      <td className={`text-center p-3 font-semibold ${getScoreColor(option.impact.performance)}`}>
                        {option.impact.performance}
                      </td>
                      <td className={`text-center p-3 font-semibold ${getScoreColor(option.impact.readability)}`}>
                        {option.impact.readability}
                      </td>
                      <td className={`text-center p-3 font-semibold ${getScoreColor(option.impact.engagement)}`}>
                        {option.impact.engagement}
                      </td>
                      <td className={`text-center p-3 font-semibold ${getScoreColor(option.impact.mobile)}`}>
                        {option.impact.mobile}
                      </td>
                      <td className={`text-center p-3 font-bold text-lg ${getScoreColor(overall)}`}>{overall}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-emerald-800">🎯 Strategic Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-green-700 mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Primary Recommendation
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Hero Section Background</strong> offers the optimal balance of visual impact and user
                experience, creating immediate emotional connection while maintaining excellent performance.
              </p>
              <Badge className="bg-green-100 text-green-800">Score: 82/100</Badge>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-blue-700 mb-3 flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Alternative Option
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Why Colombia Section</strong> (current) provides excellent contextual relevance and performance
                while supporting the section's biodiversity messaging.
              </p>
              <Badge className="bg-blue-100 text-blue-800">Score: 83/100</Badge>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-purple-700 mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Performance Focus
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Contained Showcase</strong> maximizes performance and accessibility while providing controlled,
                focused video presentation.
              </p>
              <Badge className="bg-purple-100 text-purple-800">Score: 83/100</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
