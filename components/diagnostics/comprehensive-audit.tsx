"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SupabaseAudit, type AuditResult } from "@/lib/supabase-audit"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  RefreshCw,
  Download,
  Database,
  Shield,
  Code,
  TestTube,
  Network,
  Bug,
  Zap,
} from "lucide-react"

export function ComprehensiveAudit() {
  const [audit] = useState(new SupabaseAudit())
  const [results, setResults] = useState<AuditResult[]>([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTest, setCurrentTest] = useState("")
  const [lastRun, setLastRun] = useState<Date | null>(null)

  const runAudit = async () => {
    setLoading(true)
    setProgress(0)
    setResults([])

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 2, 95))
      }, 100)

      const auditResults = await audit.runFullAudit()

      clearInterval(progressInterval)
      setProgress(100)
      setResults(auditResults)
      setLastRun(new Date())
    } catch (error) {
      console.error("Audit failed:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runAudit()
  }, [])

  const getStatusIcon = (status: AuditResult["status"]) => {
    switch (status) {
      case "PASS":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "FAIL":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "WARNING":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "INFO":
        return <Info className="w-4 h-4 text-blue-600" />
    }
  }

  const getStatusColor = (status: AuditResult["status"]) => {
    switch (status) {
      case "PASS":
        return "bg-green-100 text-green-800 border-green-200"
      case "FAIL":
        return "bg-red-100 text-red-800 border-red-200"
      case "WARNING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "INFO":
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "credentials":
        return <Shield className="w-5 h-5" />
      case "network":
        return <Network className="w-5 h-5" />
      case "authentication":
        return <Shield className="w-5 h-5" />
      case "code review":
        return <Code className="w-5 h-5" />
      case "error handling":
        return <Bug className="w-5 h-5" />
      case "testing":
        return <TestTube className="w-5 h-5" />
      case "api endpoints":
        return <Zap className="w-5 h-5" />
      default:
        return <Database className="w-5 h-5" />
    }
  }

  const summary = results.reduce(
    (acc, result) => {
      acc[result.status]++
      return acc
    },
    { PASS: 0, FAIL: 0, WARNING: 0, INFO: 0 },
  )

  const criticalIssues = results.filter((r) => r.status === "FAIL")
  const warnings = results.filter((r) => r.status === "WARNING")

  const resultsByCategory = results.reduce(
    (acc, result) => {
      if (!acc[result.category]) {
        acc[result.category] = []
      }
      acc[result.category].push(result)
      return acc
    },
    {} as Record<string, AuditResult[]>,
  )

  const downloadReport = () => {
    const report = audit.generateReport()
    const blob = new Blob([report], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `aves-supabase-audit-${new Date().toISOString().split("T")[0]}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const overallStatus = criticalIssues.length > 0 ? "CRITICAL" : warnings.length > 0 ? "WARNING" : "HEALTHY"

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="w-6 h-6" />
              Comprehensive Supabase Audit
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge
                className={
                  overallStatus === "CRITICAL"
                    ? "bg-red-100 text-red-800 border-red-200"
                    : overallStatus === "WARNING"
                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                      : "bg-green-100 text-green-800 border-green-200"
                }
              >
                {overallStatus}
              </Badge>
              <Button onClick={runAudit} disabled={loading} size="sm" variant="outline">
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                {loading ? "Running..." : "Re-run Audit"}
              </Button>
              {results.length > 0 && (
                <Button onClick={downloadReport} size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              )}
            </div>
          </div>
          {lastRun && <p className="text-sm text-gray-600">Last run: {lastRun.toLocaleString()}</p>}
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Running comprehensive audit...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
              {currentTest && <p className="text-xs text-gray-500">Current: {currentTest}</p>}
            </div>
          )}

          {results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{summary.PASS}</div>
                <div className="text-sm text-gray-600">Passed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{summary.FAIL}</div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{summary.WARNING}</div>
                <div className="text-sm text-gray-600">Warnings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{summary.INFO}</div>
                <div className="text-sm text-gray-600">Info</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Critical Issues Alert */}
      {criticalIssues.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>{criticalIssues.length} critical issues found</strong> that need immediate attention. These issues
            may prevent the application from functioning correctly.
          </AlertDescription>
        </Alert>
      )}

      {/* Results Tabs */}
      {results.length > 0 && (
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Results</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            {/* Critical Issues */}
            {criticalIssues.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Critical Issues ({criticalIssues.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {criticalIssues.map((issue, index) => (
                    <div key={index} className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-medium text-red-900">
                        {issue.category}: {issue.test}
                      </h4>
                      <p className="text-red-700 text-sm">{issue.message}</p>
                      {issue.recommendation && (
                        <p className="text-red-600 text-sm mt-1">
                          <strong>Fix:</strong> {issue.recommendation}
                        </p>
                      )}
                      {issue.codeExample && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-red-600 text-sm">View Code Example</summary>
                          <pre className="mt-2 p-2 bg-red-50 rounded text-xs overflow-x-auto">
                            <code>{issue.codeExample}</code>
                          </pre>
                        </details>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Warnings */}
            {warnings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-yellow-800 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Warnings ({warnings.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {warnings.map((warning, index) => (
                    <div key={index} className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-medium text-yellow-900">
                        {warning.category}: {warning.test}
                      </h4>
                      <p className="text-yellow-700 text-sm">{warning.message}</p>
                      {warning.recommendation && (
                        <p className="text-yellow-600 text-sm mt-1">
                          <strong>Recommendation:</strong> {warning.recommendation}
                        </p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            {Object.entries(resultsByCategory).map(([category, categoryResults]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getCategoryIcon(category)}
                    {category} ({categoryResults.length} tests)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryResults.map((result, index) => (
                      <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex items-start gap-3 flex-1">
                          {getStatusIcon(result.status)}
                          <div className="flex-1">
                            <h4 className="font-medium">{result.test}</h4>
                            <p className="text-sm text-gray-600">{result.message}</p>
                            {result.recommendation && (
                              <p className="text-sm text-blue-600 mt-1">💡 {result.recommendation}</p>
                            )}
                          </div>
                        </div>
                        <Badge variant="outline" className={getStatusColor(result.status)}>
                          {result.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="detailed" className="space-y-4">
            {results.map((result, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {getStatusIcon(result.status)}
                      {result.category}: {result.test}
                    </CardTitle>
                    <Badge variant="outline" className={getStatusColor(result.status)}>
                      {result.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700">{result.message}</p>

                  {result.recommendation && (
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Recommendation:</strong> {result.recommendation}
                      </AlertDescription>
                    </Alert>
                  )}

                  {result.details && (
                    <details className="text-sm">
                      <summary className="cursor-pointer text-gray-500 hover:text-gray-700 font-medium">
                        View Technical Details
                      </summary>
                      <pre className="mt-2 p-3 bg-gray-50 rounded overflow-x-auto">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </details>
                  )}

                  {result.codeExample && (
                    <details className="text-sm">
                      <summary className="cursor-pointer text-gray-500 hover:text-gray-700 font-medium">
                        View Code Example
                      </summary>
                      <pre className="mt-2 p-3 bg-gray-900 text-gray-100 rounded overflow-x-auto">
                        <code>{result.codeExample}</code>
                      </pre>
                    </details>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
