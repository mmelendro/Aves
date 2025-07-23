import type { Metadata } from "next"
import DatabaseSchemaVisualizer from "@/components/database-schema-visualizer"

export const metadata: Metadata = {
  title: "Database Schema Analysis - AVES Colombia",
  description: "Interactive database schema visualization and gap analysis for Supabase implementation",
}

export default function DatabaseImplementationPage() {
  return <DatabaseSchemaVisualizer />
}
