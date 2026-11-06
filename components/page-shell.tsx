import type { ReactNode } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"

export function PageShell({ title, description, children, path = "", eyebrow = "AVES Colombia" }: { title: string; description: string; children: ReactNode; path?: string; eyebrow?: string }) {
  return <div className="min-h-screen bg-white"><NavigationHeader currentPage={path} /><main id="main-content" tabIndex={-1}><section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12 lg:py-16"><div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"><Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-5">🌿 {eyebrow}</Badge><h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">{title}</h1><p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{description}</p></div></section>{children}</main><Footer /></div>
}
