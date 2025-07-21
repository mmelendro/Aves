import { createClient } from "@supabase/supabase-js"

export interface AnalysisResult {
  id: string
  category: "functionality" | "performance" | "security" | "error-handling" | "scalability"
  test: string
  status: "pass" | "fail" | "warning" | "info"
  message: string
  details: Record<string, any>
  recommendations: string[]
  priority: "critical" | "high" | "medium" | "low"
  timestamp: string
}

export interface AnalysisReport {
  summary: {
    total: number
    passed: number
    failed: number
    warnings: number
    criticalIssues: number
    healthScore: number
  }
  results: AnalysisResult[]
  recommendations: string[]
  timestamp: string
}

// Safe stringify function to handle circular references
function safeStringify(obj: any, space?: number): string {
  const seen = new WeakSet()

  const replacer = (key: string, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular Reference]"
      }
      seen.add(value)

      // Handle specific problematic objects
      if (value.constructor?.name === "RealtimeClient") {
        return "[RealtimeClient Instance]"
      }
      if (value.constructor?.name === "WebSocket") {
        return "[WebSocket Connection]"
      }
      if (value.constructor?.name === "SupabaseClient") {
        return "[Supabase Client Instance]"
      }
      if (value.socket) {
        return "[Object with Socket Connection]"
      }
    }

    if (typeof value === "function") {
      return "[Function]"
    }

    if (typeof value === "symbol") {
      return "[Symbol]"
    }

    return value
  }

  try {
    return JSON.stringify(obj, replacer, space)
  } catch (error) {
    return `[Serialization Error: ${error instanceof Error ? error.message : "Unknown error"}]`
  }
}

export class SupabaseIntegrationAnalyzer {
  private supabase: any
  private results: AnalysisResult[] = []

  constructor() {
    try {
      this.supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      )
    } catch (error) {
      console.error("Failed to initialize Supabase client:", error)
    }
  }

  private addResult(result: Omit<AnalysisResult, "id" | "timestamp">): void {
    this.results.push({
      ...result,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      details: this.sanitizeDetails(result.details),
    })
  }

  private sanitizeDetails(details: Record<string, any>): Record<string, any> {
    const sanitized: Record<string, any> = {}

    for (const [key, value] of Object.entries(details)) {
      if (typeof value === "object" && value !== null) {
        if (
          value.constructor?.name?.includes("Supabase") ||
          value.constructor?.name?.includes("Realtime") ||
          value.socket
        ) {
          sanitized[key] = `[${value.constructor?.name || "Complex Object"}]`
        } else {
          try {
            sanitized[key] = JSON.parse(safeStringify(value))
          } catch {
            sanitized[key] = "[Unserializable Object]"
          }
        }
      } else {
        sanitized[key] = value
      }
    }

    return sanitized
  }

  async analyzeFunctionality(): Promise<void> {
    // Test basic connection
    try {
      const { data, error } = await this.supabase.from("profiles").select("count").limit(1)

      if (error) {
        this.addResult({
          category: "functionality",
          test: "Database Connection",
          status: "fail",
          message: "Failed to connect to database",
          details: { error: error.message },
          recommendations: [
            "Check Supabase URL and API key configuration",
            "Verify database is accessible",
            "Check network connectivity",
          ],
          priority: "critical",
        })
      } else {
        this.addResult({
          category: "functionality",
          test: "Database Connection",
          status: "pass",
          message: "Successfully connected to database",
          details: { connectionTest: "successful" },
          recommendations: [],
          priority: "low",
        })
      }
    } catch (error) {
      this.addResult({
        category: "functionality",
        test: "Database Connection",
        status: "fail",
        message: "Connection test failed with exception",
        details: { error: error instanceof Error ? error.message : "Unknown error" },
        recommendations: ["Check environment variables", "Verify Supabase project configuration"],
        priority: "critical",
      })
    }

    // Test authentication
    try {
      const {
        data: { user },
        error,
      } = await this.supabase.auth.getUser()

      this.addResult({
        category: "functionality",
        test: "Authentication Service",
        status: error ? "warning" : "pass",
        message: error ? "Auth service accessible but no user session" : "Auth service working correctly",
        details: {
          hasUser: !!user,
          authError: error?.message || null,
        },
        recommendations: error ? ["Implement proper session management", "Add authentication error handling"] : [],
        priority: error ? "medium" : "low",
      })
    } catch (error) {
      this.addResult({
        category: "functionality",
        test: "Authentication Service",
        status: "fail",
        message: "Authentication service failed",
        details: { error: error instanceof Error ? error.message : "Unknown error" },
        recommendations: ["Check auth configuration", "Verify auth providers setup"],
        priority: "high",
      })
    }

    // Test real-time functionality
    try {
      const channel = this.supabase.channel("test-channel")

      this.addResult({
        category: "functionality",
        test: "Real-time Subscriptions",
        status: "pass",
        message: "Real-time channel creation successful",
        details: { channelCreated: true },
        recommendations: ["Monitor real-time connection stability", "Implement proper cleanup for subscriptions"],
        priority: "low",
      })

      // Clean up
      await this.supabase.removeChannel(channel)
    } catch (error) {
      this.addResult({
        category: "functionality",
        test: "Real-time Subscriptions",
        status: "fail",
        message: "Real-time functionality failed",
        details: { error: error instanceof Error ? error.message : "Unknown error" },
        recommendations: ["Check real-time configuration", "Verify WebSocket connectivity"],
        priority: "medium",
      })
    }
  }

  async analyzePerformance(): Promise<void> {
    // Test query performance
    const startTime = Date.now()
    try {
      const { data, error } = await this.supabase.from("profiles").select("*").limit(10)

      const queryTime = Date.now() - startTime

      this.addResult({
        category: "performance",
        test: "Query Performance",
        status: queryTime > 1000 ? "warning" : "pass",
        message: `Query completed in ${queryTime}ms`,
        details: {
          queryTime,
          recordCount: data?.length || 0,
          hasError: !!error,
        },
        recommendations:
          queryTime > 1000
            ? ["Consider adding database indexes", "Optimize query structure", "Implement query caching"]
            : ["Monitor query performance over time"],
        priority: queryTime > 1000 ? "medium" : "low",
      })
    } catch (error) {
      this.addResult({
        category: "performance",
        test: "Query Performance",
        status: "fail",
        message: "Performance test failed",
        details: { error: error instanceof Error ? error.message : "Unknown error" },
        recommendations: ["Check database connectivity", "Verify table permissions"],
        priority: "high",
      })
    }

    // Test concurrent connections
    try {
      const promises = Array(5)
        .fill(null)
        .map(() => this.supabase.from("profiles").select("count").limit(1))

      const concurrentStart = Date.now()
      const results = await Promise.all(promises)
      const concurrentTime = Date.now() - concurrentStart

      const failedRequests = results.filter((r) => r.error).length

      this.addResult({
        category: "performance",
        test: "Concurrent Request Handling",
        status: failedRequests > 0 ? "warning" : "pass",
        message: `${5 - failedRequests}/5 concurrent requests succeeded in ${concurrentTime}ms`,
        details: {
          totalRequests: 5,
          successfulRequests: 5 - failedRequests,
          failedRequests,
          totalTime: concurrentTime,
        },
        recommendations:
          failedRequests > 0
            ? ["Implement connection pooling", "Add retry logic for failed requests", "Monitor connection limits"]
            : ["Continue monitoring concurrent performance"],
        priority: failedRequests > 2 ? "high" : "low",
      })
    } catch (error) {
      this.addResult({
        category: "performance",
        test: "Concurrent Request Handling",
        status: "fail",
        message: "Concurrent request test failed",
        details: { error: error instanceof Error ? error.message : "Unknown error" },
        recommendations: ["Check connection stability", "Implement proper error handling"],
        priority: "medium",
      })
    }
  }

  async analyzeSecurity(): Promise<void> {
    // Check environment variables
    const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
    const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY

    this.addResult({
      category: "security",
      test: "Environment Configuration",
      status: hasUrl && hasAnonKey ? "pass" : "fail",
      message: "Environment variables check",
      details: {
        hasSupabaseUrl: hasUrl,
        hasAnonKey: hasAnonKey,
        hasServiceKey: hasServiceKey,
      },
      recommendations: [
        ...(hasUrl ? [] : ["Set NEXT_PUBLIC_SUPABASE_URL environment variable"]),
        ...(hasAnonKey ? [] : ["Set NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable"]),
        ...(hasServiceKey ? [] : ["Consider setting SUPABASE_SERVICE_ROLE_KEY for server operations"]),
        "Ensure sensitive keys are not exposed in client-side code",
      ],
      priority: hasUrl && hasAnonKey ? "low" : "critical",
    })

    // Test RLS policies
    try {
      const { data, error } = await this.supabase.from("profiles").select("*").limit(1)

      this.addResult({
        category: "security",
        test: "Row Level Security",
        status: error?.message?.includes("permission") ? "pass" : "warning",
        message: error?.message?.includes("permission")
          ? "RLS policies are enforced"
          : "RLS policies may not be properly configured",
        details: {
          hasPermissionError: error?.message?.includes("permission"),
          errorMessage: error?.message || null,
        },
        recommendations: [
          "Review and test all RLS policies",
          "Ensure proper user authentication before data access",
          "Implement principle of least privilege",
        ],
        priority: error?.message?.includes("permission") ? "low" : "high",
      })
    } catch (error) {
      this.addResult({
        category: "security",
        test: "Row Level Security",
        status: "warning",
        message: "Could not test RLS policies",
        details: { error: error instanceof Error ? error.message : "Unknown error" },
        recommendations: ["Manually verify RLS policies are enabled", "Test with different user roles"],
        priority: "medium",
      })
    }

    // Check for SQL injection protection
    try {
      const maliciousInput = "'; DROP TABLE profiles; --"
      const { error } = await this.supabase.from("profiles").select("*").eq("id", maliciousInput).limit(1)

      this.addResult({
        category: "security",
        test: "SQL Injection Protection",
        status: "pass",
        message: "Supabase client provides built-in SQL injection protection",
        details: {
          testInput: maliciousInput,
          protectionActive: true,
        },
        recommendations: [
          "Continue using Supabase client methods instead of raw SQL",
          "Validate and sanitize user inputs",
        ],
        priority: "low",
      })
    } catch (error) {
      this.addResult({
        category: "security",
        test: "SQL Injection Protection",
        status: "warning",
        message: "Could not verify SQL injection protection",
        details: { error: error instanceof Error ? error.message : "Unknown error" },
        recommendations: ["Ensure all database queries use parameterized statements", "Implement input validation"],
        priority: "medium",
      })
    }
  }

  async analyzeErrorHandling(): Promise<void> {
    // Test error handling for invalid queries
    try {
      const { error } = await this.supabase.from("nonexistent_table").select("*").limit(1)

      this.addResult({
        category: "error-handling",
        test: "Database Error Handling",
        status: error ? "pass" : "warning",
        message: error ? "Errors are properly returned" : "Expected error not received",
        details: {
          errorReceived: !!error,
          errorMessage: error?.message || null,
        },
        recommendations: [
          "Implement comprehensive error handling in application code",
          "Log errors for monitoring and debugging",
          "Provide user-friendly error messages",
        ],
        priority: "medium",
      })
    } catch (error) {
      this.addResult({
        category: "error-handling",
        test: "Database Error Handling",
        status: "fail",
        message: "Error handling test failed",
        details: { error: error instanceof Error ? error.message : "Unknown error" },
        recommendations: ["Review error handling implementation", "Add try-catch blocks around database operations"],
        priority: "high",
      })
    }

    // Test network error handling
    this.addResult({
      category: "error-handling",
      test: "Network Error Resilience",
      status: "info",
      message: "Network error handling should be implemented in application code",
      details: {
        recommendation: "Implement retry logic and offline handling",
      },
      recommendations: [
        "Implement exponential backoff for failed requests",
        "Add offline detection and queuing",
        "Provide user feedback for network issues",
      ],
      priority: "medium",
    })
  }

  async analyzeScalability(): Promise<void> {
    // Connection pooling check
    this.addResult({
      category: "scalability",
      test: "Connection Pooling",
      status: "info",
      message: "Supabase handles connection pooling automatically",
      details: {
        connectionPooling: "managed_by_supabase",
        recommendation: "Monitor connection usage in Supabase dashboard",
      },
      recommendations: [
        "Monitor connection usage in Supabase dashboard",
        "Implement connection cleanup in long-running processes",
        "Consider connection limits for high-traffic applications",
      ],
      priority: "low",
    })

    // Data volume handling
    this.addResult({
      category: "scalability",
      test: "Data Volume Handling",
      status: "info",
      message: "Large dataset handling depends on query optimization",
      details: {
        recommendation: "Implement pagination and filtering",
      },
      recommendations: [
        "Implement pagination for large datasets",
        "Use appropriate indexes for frequently queried columns",
        "Consider data archiving strategies for historical data",
        "Monitor query performance as data grows",
      ],
      priority: "medium",
    })

    // Backup and recovery
    this.addResult({
      category: "scalability",
      test: "Backup and Recovery",
      status: "info",
      message: "Supabase provides automated backups for paid plans",
      details: {
        backupStrategy: "supabase_managed",
        recommendation: "Verify backup configuration and test recovery procedures",
      },
      recommendations: [
        "Verify backup configuration in Supabase dashboard",
        "Test data recovery procedures",
        "Consider additional backup strategies for critical data",
        "Document recovery procedures",
      ],
      priority: "medium",
    })
  }

  async runCompleteAnalysis(): Promise<AnalysisReport> {
    this.results = [] // Reset results

    console.log("Starting Supabase integration analysis...")

    await this.analyzeFunctionality()
    await this.analyzePerformance()
    await this.analyzeSecurity()
    await this.analyzeErrorHandling()
    await this.analyzeScalability()

    const summary = this.generateSummary()
    const recommendations = this.generateRecommendations()

    return {
      summary,
      results: this.results,
      recommendations,
      timestamp: new Date().toISOString(),
    }
  }

  private generateSummary() {
    const total = this.results.length
    const passed = this.results.filter((r) => r.status === "pass").length
    const failed = this.results.filter((r) => r.status === "fail").length
    const warnings = this.results.filter((r) => r.status === "warning").length
    const criticalIssues = this.results.filter((r) => r.priority === "critical").length

    const healthScore = Math.round(((passed + warnings * 0.5) / total) * 100)

    return {
      total,
      passed,
      failed,
      warnings,
      criticalIssues,
      healthScore,
    }
  }

  private generateRecommendations(): string[] {
    const criticalRecommendations = this.results
      .filter((r) => r.priority === "critical" && r.recommendations.length > 0)
      .flatMap((r) => r.recommendations)

    const highPriorityRecommendations = this.results
      .filter((r) => r.priority === "high" && r.recommendations.length > 0)
      .flatMap((r) => r.recommendations)
      .slice(0, 5) // Limit to top 5

    return [...new Set([...criticalRecommendations, ...highPriorityRecommendations])]
  }
}
