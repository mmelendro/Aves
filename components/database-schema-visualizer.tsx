"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Database,
  Table,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  ChevronDown,
  ChevronRight,
  Loader2,
  Eye,
  Code,
} from "lucide-react"
import {
  databaseSchemaService,
  type DatabaseSchema,
  type SchemaGap,
  type DatabaseTable,
} from "@/lib/database-schema-service"

interface ExecutionLog {
  id: string
  timestamp: Date
  type: "info" | "success" | "error" | "warning"
  message: string
  sql?: string
}

export default function DatabaseSchemaVisualizer() {
  const [currentSchema, setCurrentSchema] = useState<DatabaseSchema | null>(null)
  const [expectedSchema, setExpectedSchema] = useState<DatabaseSchema | null>(null)
  const [gaps, setGaps] = useState<SchemaGap[]>([])
  const [loading, setLoading] = useState(true)
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([])
  const [implementingGaps, setImplementingGaps] = useState<Set<string>>(new Set())
  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadSchemas()
  }, [])

  const addLog = (type: ExecutionLog["type"], message: string, sql?: string) => {
    const log: ExecutionLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type,
      message,
      sql,
    }
    setExecutionLogs((prev) => [log, ...prev])
  }

  const loadSchemas = async () => {
    try {
      setLoading(true)
      addLog("info", "Loading database schemas...")

      const [current, expected] = await Promise.all([
        databaseSchemaService.getCurrentSchema(),
        Promise.resolve(databaseSchemaService.getExpectedSchema()),
      ])

      setCurrentSchema(current)
      setExpectedSchema(expected)

      const schemaGaps = databaseSchemaService.analyzeSchemaGaps(current, expected)
      setGaps(schemaGaps)

      addLog("success", `Loaded schemas. Found ${schemaGaps.length} gaps to address.`)
    } catch (error) {
      addLog("error", `Failed to load schemas: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const implementGap = async (gap: SchemaGap) => {
    const gapKey = `${gap.type}-${gap.item_name}`
    setImplementingGaps((prev) => new Set([...prev, gapKey]))

    try {
      addLog("info", `Implementing ${gap.type}: ${gap.item_name}`, gap.sql_fix)

      const result = await databaseSchemaService.executeSQL(gap.sql_fix)

      if (result.success) {
        addLog("success", `Successfully implemented ${gap.type}: ${gap.item_name}`)

        // Verify the implementation
        const verification = await databaseSchemaService.verifyImplementation(gap)

        if (verification.success) {
          addLog("success", `Verified ${gap.type}: ${gap.item_name}`)

          // Update the gap as implemented
          setGaps((prev) =>
            prev.map((g) => (g.item_name === gap.item_name && g.type === gap.type ? { ...g, implemented: true } : g)),
          )

          // Reload schemas to reflect changes
          await loadSchemas()
        } else {
          addLog("warning", `Implementation completed but verification failed for ${gap.type}: ${gap.item_name}`)
        }
      } else {
        addLog("error", `Failed to implement ${gap.type}: ${gap.item_name} - ${result.error}`)
      }
    } catch (error) {
      addLog(
        "error",
        `Error implementing ${gap.type}: ${gap.item_name} - ${error instanceof Error ? error.message : "Unknown error"}`,
      )
    } finally {
      setImplementingGaps((prev) => {
        const newSet = new Set(prev)
        newSet.delete(gapKey)
        return newSet
      })
    }
  }

  const toggleTableExpansion = (tableName: string) => {
    setExpandedTables((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(tableName)) {
        newSet.delete(tableName)
      } else {
        newSet.add(tableName)
      }
      return newSet
    })
  }

  const renderTable = (table: DatabaseTable, isExpected = false) => {
    const isExpanded = expandedTables.has(table.table_name)

    return (
      <Card key={table.table_name} className="mb-4">
        <Collapsible>
          <CollapsibleTrigger className="w-full" onClick={() => toggleTableExpansion(table.table_name)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <Table className="h-4 w-4" />
                <CardTitle className="text-sm font-medium">{table.table_name}</CardTitle>
                <Badge variant={isExpected ? "default" : "secondary"}>{table.columns.length} columns</Badge>
              </div>
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="space-y-2">
                {table.columns.map((column) => (
                  <div key={column.column_name} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm">{column.column_name}</span>
                      <Badge variant="outline" className="text-xs">
                        {column.data_type}
                      </Badge>
                      {column.is_nullable === "NO" && (
                        <Badge variant="destructive" className="text-xs">
                          NOT NULL
                        </Badge>
                      )}
                    </div>
                    {column.column_default && (
                      <span className="text-xs text-muted-foreground font-mono">DEFAULT: {column.column_default}</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    )
  }

  const renderGapsList = () => {
    const implementedCount = gaps.filter((g) => g.implemented).length
    const totalCount = gaps.length
    const progress = totalCount > 0 ? (implementedCount / totalCount) * 100 : 0

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Schema Gaps Analysis</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {implementedCount} / {totalCount} implemented
            </span>
            <Progress value={progress} className="w-32" />
          </div>
        </div>

        {gaps.length === 0 ? (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>No schema gaps detected. Your database schema is up to date!</AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-3">
            {gaps.map((gap, index) => {
              const gapKey = `${gap.type}-${gap.item_name}`
              const isImplementing = implementingGaps.has(gapKey)

              return (
                <Card key={index} className={gap.implemented ? "border-green-200 bg-green-50" : ""}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {gap.implemented ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        )}
                        <CardTitle className="text-sm">{gap.description}</CardTitle>
                        <Badge
                          variant={
                            gap.priority === "high"
                              ? "destructive"
                              : gap.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {gap.priority}
                        </Badge>
                      </div>
                      {!gap.implemented && (
                        <Button size="sm" onClick={() => implementGap(gap)} disabled={isImplementing}>
                          {isImplementing ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <Play className="h-4 w-4 mr-2" />
                          )}
                          {isImplementing ? "Implementing..." : "Implement"}
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                          <Code className="h-4 w-4 mr-2" />
                          View SQL
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                          <code>{gap.sql_fix}</code>
                        </pre>
                      </CollapsibleContent>
                    </Collapsible>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  const renderExecutionLogs = () => (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Execution Logs</h3>
      <div className="max-h-96 overflow-y-auto space-y-2">
        {executionLogs.length === 0 ? (
          <p className="text-muted-foreground text-sm">No logs yet...</p>
        ) : (
          executionLogs.map((log) => (
            <Alert
              key={log.id}
              className={
                log.type === "success"
                  ? "border-green-200 bg-green-50"
                  : log.type === "error"
                    ? "border-red-200 bg-red-50"
                    : log.type === "warning"
                      ? "border-yellow-200 bg-yellow-50"
                      : ""
              }
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    {log.type === "success" && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {log.type === "error" && <XCircle className="h-4 w-4 text-red-600" />}
                    {log.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                    {log.type === "info" && <Eye className="h-4 w-4 text-blue-600" />}
                    <span className="text-sm font-medium">{log.message}</span>
                  </div>
                  {log.sql && (
                    <Collapsible className="mt-2">
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-xs">
                          <Code className="h-3 w-3 mr-1" />
                          View SQL
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-1">
                        <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                          <code>{log.sql}</code>
                        </pre>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{log.timestamp.toLocaleTimeString()}</span>
              </div>
            </Alert>
          ))
        )}
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading database schemas...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <Database className="h-8 w-8" />
            <span>Database Schema Analysis</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Interactive database schema visualization and gap analysis for Supabase implementation
          </p>
        </div>
        <Button onClick={loadSchemas} disabled={loading}>
          <Database className="h-4 w-4 mr-2" />
          Refresh Schemas
        </Button>
      </div>

      <Tabs defaultValue="gaps" className="space-y-4">
        <TabsList>
          <TabsTrigger value="gaps">Gap Analysis</TabsTrigger>
          <TabsTrigger value="current">Current Schema</TabsTrigger>
          <TabsTrigger value="expected">Expected Schema</TabsTrigger>
          <TabsTrigger value="logs">Execution Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="gaps" className="space-y-4">
          {renderGapsList()}
        </TabsContent>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Database Schema</CardTitle>
              <CardDescription>Current state of your Supabase database schema</CardDescription>
            </CardHeader>
            <CardContent>{currentSchema?.tables.map((table) => renderTable(table, false))}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expected" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expected Database Schema</CardTitle>
              <CardDescription>Target schema for full booking functionality</CardDescription>
            </CardHeader>
            <CardContent>{expectedSchema?.tables.map((table) => renderTable(table, true))}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Execution Logs</CardTitle>
              <CardDescription>Real-time logs of all database operations and implementations</CardDescription>
            </CardHeader>
            <CardContent>{renderExecutionLogs()}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
