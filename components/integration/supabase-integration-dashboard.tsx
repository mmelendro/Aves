"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronRight,
  Download,
  RefreshCw,
  Shield,
  Zap,
  Database,
  AlertCircle,
  TrendingUp,
} from "lucide-react"
import {
  SupabaseIntegrationAnalyzer,
  type AnalysisReport,
  type AnalysisResult,
} from "@/lib/supabase-integration-analysis"

const statusIcons = {
  pass: <CheckCircle className="h-4 w-4 text-green-500" />,
  fail: <XCircle className="h-4 w-4 text-red-500" />,
  warning: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
  info: <Info className="h-4 w-4 text-blue-500" />,
}

const priorityColors = {
  critical: "bg-red-100 text-red-800 border-red-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
}

const categoryIcons = {
  functionality: <Database className="h-5 w-5" />,
  performance: <Zap className="h-5 w-5" />,
  security: <Shield className="h-5 w-5" />,
  "error-handling": <AlertCircle className="h-5 w-5" />,
  scalability: <TrendingUp className="h-5 w-5" />,
}

function ResultCard({ result }: { result: AnalysisResult }) {
  const [isOpen, setIsOpen] = useState(false)

  const safeStringify = (obj: any): string => {
    try {
      if (typeof obj === "string") return obj
      if (typeof obj === "number" || typeof obj === "boolean") return String(obj)
      if (obj === null || obj === undefined) return "null"

      // Handle arrays
      if (Array.isArray(obj)) {
        return `[${obj.map((item) => safeStringify(item)).join(", ")}]`
      }

      // Handle objects
      if (typeof obj === "object") {
        const entries = Object.entries(obj)
          .map(([key, value]) => `${key}: ${safeStringify(value)}`)
          .join(", ")
        return `{${entries}}`
      }

      return String(obj)
    } catch (error) {
      return "[Display Error]"
    }
  }

  return (
    <Card className="mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {statusIcons[result.status]}
                <div>
                  <CardTitle className="text-sm font-medium">{result.test}</CardTitle>
                  <CardDescription className="text-xs">{result.message}</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={`text-xs ${priorityColors[result.priority]}`}>{result.priority}</Badge>
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            {Object.keys(result.details).length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Details:</h4>
                <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                  {Object.entries(result.details).map(([key, value]) => (
                    <div key={key} className="mb-1">
                      <span className="font-semibold">{key}:</span> {safeStringify(value)}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {result.recommendations.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Recommendations:</h4>
                <ul className="text-sm space-y-1">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

function SummaryCard({ report }: { report: AnalysisReport }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Health Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{report.summary.healthScore}%</div>
          <Progress value={report.summary.healthScore} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Tests Passed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {report.summary.passed}/{report.summary.total}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{report.summary.criticalIssues}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Warnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{report.summary.warnings}</div>
        </CardContent>
      </Card>
    </div>
  )
}

export function SupabaseIntegrationDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const {
    data: report,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["supabase-analysis"],
    queryFn: async () => {
      const analyzer = new SupabaseIntegrationAnalyzer()
      return await analyzer.runCompleteAnalysis()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const filteredResults =
    report?.results.filter((result) => selectedCategory === "all" || result.category === selectedCategory) || []

  const categories = [
    { id: "all", label: "All Tests", icon: <Database className="h-4 w-4" /> },
    { id: "functionality", label: "Functionality", icon: categoryIcons.functionality },
    { id: "performance", label: "Performance", icon: categoryIcons.performance },
    { id: "security", label: "Security", icon: categoryIcons.security },
    { id: "error-handling", label: "Error Handling", icon: categoryIcons["error-handling"] },
    { id: "scalability", label: "Scalability", icon: categoryIcons.scalability },
  ]

  const exportResults = () => {
    if (!report) return

    const dataStr = JSON.stringify(report, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `supabase-analysis-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-6 w-6 animate-spin mr-2" />
        <span>Running Supabase integration analysis...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Alert className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Analysis Failed</AlertTitle>
        <AlertDescription>
          Failed to run the integration analysis. Please check your Supabase configuration and try again.
          <br />
          <Button onClick={() => refetch()} className="mt-2" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Analysis
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!report) {
    return (
      <div className="p-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>No Analysis Data</AlertTitle>
          <AlertDescription>
            No analysis data available. Click the button below to run a new analysis.
            <br />
            <Button onClick={() => refetch()} className="mt-2" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Run Analysis
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Supabase Integration Analysis</h1>
          <p className="text-gray-600 mt-1">
            Comprehensive analysis completed at {new Date(report.timestamp).toLocaleString()}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => refetch()} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={exportResults} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <SummaryCard report={report} />

      {report.summary.criticalIssues > 0 && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Critical Issues Found</AlertTitle>
          <AlertDescription className="text-red-700">
            {report.summary.criticalIssues} critical issue(s) require immediate attention. Please review the
            recommendations below.
          </AlertDescription>
        </Alert>
      )}

      {report.recommendations.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <span>Priority Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {report.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-1">
              {category.icon}
              <span className="hidden sm:inline">{category.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="space-y-4">
              {filteredResults.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500">No results found for this category.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredResults.map((result) => <ResultCard key={result.id} result={result} />)
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
