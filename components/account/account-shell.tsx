import type { ReactNode } from "react"
import { PageShell } from "@/components/page-shell"

export function AccountShell({ title, description, children, compact = false }: { title: string; description: string; children: ReactNode; compact?: boolean }) {
  return <PageShell path="/account" title={title} description={description} eyebrow="Your AVES Australia">
    <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-12 lg:py-20">
      <div className={`container mx-auto px-4 ${compact ? "max-w-xl" : "max-w-7xl"}`}>{children}</div>
    </section>
  </PageShell>
}
