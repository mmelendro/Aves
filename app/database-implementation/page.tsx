import type { Metadata } from "next"
import DatabaseImplementationOrchestrator from "@/components/database-implementation-orchestrator"

export const metadata: Metadata = {
  title: "Database Implementation - AVES Colombia",
  description: "Execute the 5-phase implementation plan for Supabase database enhancements",
}

export default function DatabaseImplementationPage() {
  return <DatabaseImplementationOrchestrator />
}
