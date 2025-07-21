import { SecurityAuditDashboard } from "@/components/security/security-audit-dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Security Audit - AVES Colombia",
  description: "Comprehensive security audit dashboard for AVES Colombia application",
  robots: "noindex, nofollow",
}

export default function SecurityAuditPage() {
  return <SecurityAuditDashboard />
}
