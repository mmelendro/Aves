"use client"

import { useState, useEffect } from "react"
import { SecurityAudit, type SecurityAuditResult } from "@/lib/security-audit"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  RefreshCw,
  Eye,
  Lock,
  Database,
  Bug,
  FileText,
  TrendingUp,
  Activity,
} from "lucide-react"

export function SecurityAuditDashboard() {
  const [auditResults, setAuditResults] = useState<SecurityAuditResult[]>([])
  const [loading, setLoading] = useState(false)
  const [lastAuditTime, setLastAuditTime] = useState<Date | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const runSecurityAudit = async () => {
    setLoading(true)
    try {
      const audit = new SecurityAudit()
      const results = await audit.runFullSecurityAudit()
      setAuditResults(results)
      setLastAuditTime(new Date())
    } catch (error) {
      console.error("Security audit failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportReport = () => {
    const audit = new SecurityAudit()
    // Set results for report generation
    audit["results"] = auditResults
    const report = audit.generateSecurityReport()

    const blob = new Blob([report], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `aves-security-audit-${new Date().toISOString().split("T")[0]}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    runSecurityAudit()
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-100 text-red-800 border-red-200"
      case "HIGH":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "LOW":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PASS":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "FAIL":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "WARNING":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      default:
        return <Eye className="w-4 h-4 text-blue-600" />
    }
  }

  const getCategoryIcon = (category: string) => {
    if (category.includes("Authentication") || category.includes("Session")) return <Lock className="w-4 h-4" />
    if (category.includes("Data") || category.includes("Storage")) return <Database className="w-4 h-4" />
    if (category.includes("Vulnerability") || category.includes("Penetration")) return <Bug className="w-4 h-4" />
    if (category.includes("Compliance") || category.includes("GDPR")) return <FileText className="w-4 h-4" />
    return <Shield className="w-4 h-4" />
  }

  const summary = auditResults.reduce(
    (acc, result) => {
      acc[result.severity]++
      acc[result.status]++
      return acc
    },
    { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0, INFO: 0, PASS: 0, FAIL: 0, WARNING: 0 },
  )

  const riskScore =
    auditResults.length > 0
      ? Math.max(
          0,
          100 -
            Math.round(
              (auditResults
                .filter((r) => r.status === "FAIL")
                .reduce((sum, r) => {
                  const weights = { CRITICAL: 25, HIGH: 15, MEDIUM: 5, LOW: 1 }
                  return sum + (weights[r.severity as keyof typeof weights] || 0)
                }, 0) /
                (auditResults.length * 25)) *
                100,
            ),
        )
      : 0

  const getRiskLevel = (score: number) => {
    if (score >= 90) return { level: "LOW RISK", color: "text-green-600" }
    if (score >= 70) return { level: "MEDIUM RISK", color: "text-yellow-600" }
    if (score >= 50) return { level: "HIGH RISK", color: "text-orange-600" }
    return { level: "CRITICAL RISK", color: "text-red-600" }
  }

  const risk = getRiskLevel(riskScore)

  const categories = ["all", ...new Set(auditResults.map((r) => r.category))]
  const filteredResults =
    selectedCategory === "all" ? auditResults : auditResults.filter((r) => r.category === selectedCategory)

  const criticalIssues = auditResults.filter((r) => r.severity === "CRITICAL" && r.status === "FAIL")
  const highIssues = auditResults.filter((r) => r.severity === "HIGH" && r.status === "FAIL")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-8 h-8 text-emerald-600" />
            Security Audit Dashboard
          </h1>
          <p className="text-gray-600">AVES Colombia - Comprehensive Security Assessment</p>
          {lastAuditTime && <p className="text-sm text-gray-500 mt-1">Last audit: {lastAuditTime.toLocaleString()}</p>}
        </div>
        <div className="flex gap-2">
          <Button onClick={runSecurityAudit} disabled={loading} variant="outline">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Running Audit..." : "Run Audit"}
          </Button>
          <Button onClick={exportReport} disabled={auditResults.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Risk Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-2 border-emerald-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{riskScore}/100</div>
            <div className={`text-sm font-medium ${risk.color}`}>{risk.level}</div>
            <Progress value={riskScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Total Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{auditResults.length}</div>
            <div className="text-sm text-gray-600">Security checks performed</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Passed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{summary.PASS}</div>
            <div className="text-sm text-gray-600">Tests passed</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{summary.FAIL}</div>
            <div className="text-sm text-gray-600">Tests failed</div>
          </CardContent>
        </Card>
      </div>

      {/* Severity Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { severity: "CRITICAL", count: summary.CRITICAL, color: "bg-red-500" },
          { severity: "HIGH", count: summary.HIGH, color: "bg-orange-500" },
          { severity: "MEDIUM", count: summary.MEDIUM, color: "bg-yellow-500" },
          { severity: "LOW", count: summary.LOW, color: "bg-blue-500" },
          { severity: "INFO", count: summary.INFO, color: "bg-green-500" },
        ].map(({ severity, count, color }) => (
          <Card key={severity}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-sm text-gray-600">{severity}</div>
                </div>
                <div className={`w-3 h-3 rounded-full ${color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Critical Issues Alert */}
      {criticalIssues.length > 0 && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>{criticalIssues.length} Critical Security Issues</strong> require immediate attention. These
            vulnerabilities pose significant risk to the application and user data.
          </AlertDescription>
        </Alert>
      )}

      {/* High Priority Issues Alert */}
      {highIssues.length > 0 && (
        <Alert className="mb-6 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>{highIssues.length} High Priority Issues</strong> should be addressed within one week.
          </AlertDescription>
        </Alert>
      )}

      {/* Detailed Results */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="critical">Critical Issues</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Results</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Security Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Security Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories
                    .filter((c) => c !== "all")
                    .map((category) => {
                      const categoryResults = auditResults.filter((r) => r.category === category)
                      const failed = categoryResults.filter((r) => r.status === "FAIL").length
                      const total = categoryResults.length
                      const percentage = total > 0 ? Math.round(((total - failed) / total) * 100) : 100

                      return (
                        <div key={category} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(category)}
                            <span className="text-sm font-medium">{category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm text-gray-600">{percentage}%</div>
                            <Progress value={percentage} className="w-16" />
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Issues */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {auditResults
                    .filter((r) => r.status === "FAIL")
                    .slice(0, 5)
                    .map((result, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        {getStatusIcon(result.status)}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{result.test}</div>
                          <div className="text-xs text-gray-600">{result.category}</div>
                        </div>
                        <Badge className={getSeverityColor(result.severity)}>{result.severity}</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="critical" className="space-y-4">
          <div className="space-y-4">
            {criticalIssues.concat(highIssues).map((result, index) => (
              <Card key={index} className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getCategoryIcon(result.category)}
                        {result.test}
                      </CardTitle>
                      <div className="text-sm text-gray-600 mt-1">{result.category}</div>
                    </div>
                    <Badge className={getSeverityColor(result.severity)}>{result.severity}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <span className="font-medium">{result.message}</span>
                  </div>

                  {result.vulnerability && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        <strong>Vulnerability:</strong> {result.vulnerability}
                      </AlertDescription>
                    </Alert>
                  )}

                  {result.remediation && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Remediation</h4>
                      <p className="text-blue-800 text-sm">{result.remediation}</p>
                    </div>
                  )}

                  {result.codeExample && (
                    <div className="bg-gray-50 border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Code Example</h4>
                      <pre className="text-sm text-gray-800 overflow-x-auto">
                        <code>{result.codeExample}</code>
                      </pre>
                    </div>
                  )}

                  {result.compliance && result.compliance.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {result.compliance.map((standard, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {standard}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredResults.map((result, index) => (
              <Card key={index} className={`${result.status === "FAIL" ? "border-l-4 border-l-red-500" : ""}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(result.status)}
                      <span className="font-medium">{result.test}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(result.severity)}>{result.severity}</Badge>
                      <Badge variant="outline">{result.category}</Badge>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-2">{result.message}</p>

                  {result.details && (
                    <details className="text-xs text-gray-600">
                      <summary className="cursor-pointer hover:text-gray-800">Details</summary>
                      <pre className="mt-2 p-2 bg-gray-50 rounded overflow-x-auto">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </details>
                  )}

                  {result.compliance && result.compliance.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {result.compliance.map((standard, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {standard}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* GDPR Compliance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">GDPR Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                {["GDPR-Article-6", "GDPR-Article-7", "GDPR-Article-32"].map((standard) => {
                  const relatedResults = auditResults.filter((r) => r.compliance?.includes(standard))
                  const failed = relatedResults.filter((r) => r.status === "FAIL").length
                  const total = relatedResults.length
                  const percentage = total > 0 ? Math.round(((total - failed) / total) * 100) : 100

                  return (
                    <div key={standard} className="flex items-center justify-between mb-3">
                      <span className="text-sm">{standard}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{percentage}%</span>
                        <Progress value={percentage} className="w-16" />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* OWASP Top 10 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">OWASP Top 10 2021</CardTitle>
              </CardHeader>
              <CardContent>
                {Array.from({ length: 10 }, (_, i) => `OWASP-A${String(i + 1).padStart(2, "0")}:2021`).map(
                  (standard) => {
                    const relatedResults = auditResults.filter((r) =>
                      r.compliance?.some((c) => c.startsWith(standard.split(":")[0])),
                    )
                    const failed = relatedResults.filter((r) => r.status === "FAIL").length
                    const total = relatedResults.length
                    const percentage = total > 0 ? Math.round(((total - failed) / total) * 100) : 100

                    return (
                      <div key={standard} className="flex items-center justify-between mb-3">
                        <span className="text-sm">{standard.split(":")[0]}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{percentage}%</span>
                          <Progress value={percentage} className="w-16" />
                        </div>
                      </div>
                    )
                  },
                )}
              </CardContent>
            </Card>

            {/* NIST Framework */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">NIST Framework</CardTitle>
              </CardHeader>
              <CardContent>
                {["IDENTIFY", "PROTECT", "DETECT", "RESPOND", "RECOVER"].map((function_name) => {
                  const relatedResults = auditResults.filter((r) =>
                    r.compliance?.some((c) => c.includes(`NIST-CSF-${function_name}`)),
                  )
                  const failed = relatedResults.filter((r) => r.status === "FAIL").length
                  const total = relatedResults.length
                  const percentage = total > 0 ? Math.round(((total - failed) / total) * 100) : 100

                  return (
                    <div key={function_name} className="flex items-center justify-between mb-3">
                      <span className="text-sm">{function_name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{percentage}%</span>
                        <Progress value={percentage} className="w-16" />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
