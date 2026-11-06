import type { ReactNode } from "react"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"

export function AccountShell({ title, description, children, compact = false }: { title: string; description: string; children: ReactNode; compact?: boolean }) {
  const footer = <footer className="border-t border-emerald-100 bg-white py-8"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><p className="font-semibold text-emerald-900 mb-3">One AVES account. Colombia and Australia.</p><nav aria-label="Account footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-emerald-800"><a className="flex min-h-11 items-center underline" href="https://aves.bio/">All destinations</a><a className="flex min-h-11 items-center underline" href="https://aves.bio/colombia">Colombia</a><a className="flex min-h-11 items-center underline" href="https://aves.bio/australia">Australia</a><Link className="flex min-h-11 items-center underline" href="/privacy">Privacy</Link><Link className="flex min-h-11 items-center underline" href="/terms">Terms</Link><a className="flex min-h-11 items-center underline" href="mailto:mmelendro@gmail.com">Contact AVES</a></nav></div></footer>
  return <PageShell path="/account" title={title} description={description} eyebrow="Your AVES Account" footer={footer}>
    <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-12 lg:py-20">
      <div className={`container mx-auto px-4 ${compact ? "max-w-xl" : "max-w-7xl"}`}>{children}</div>
    </section>
  </PageShell>
}
