import { SiteLink as Link } from "@/components/site-link"
import { BrandMark } from "@/components/brand-mark"

export function ContactNavigation() {
  return <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/95 backdrop-blur-sm">
    <a href="#main-content" className="sr-only fixed left-4 top-4 z-50 rounded-lg bg-white px-5 py-3 text-emerald-900 shadow-lg focus:not-sr-only">Skip to content</a>
    <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-2 px-3 sm:px-6 lg:px-8">
      <BrandMark priority />
      <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-4">
        <a href="https://aves.bio/#destinations" className="inline-flex min-h-11 items-center rounded-full px-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50">Destinations</a>
        <Link href="/account" className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full border border-emerald-200 px-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50">My Trips</Link>
      </nav>
    </div>
  </header>
}

export function ContactFooter() {
  return <footer className="bg-gray-900 py-10 text-gray-200"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <BrandMark inverse size="footer" />
    <p className="mt-4 text-sm">Birding, nature and journeys rooted in place.</p>
    <nav aria-label="Contact footer" className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
      <a href="https://aves.bio/" className="inline-flex min-h-11 items-center underline">All destinations</a>
      <Link href="/privacy" className="inline-flex min-h-11 items-center underline">Privacy</Link>
      <Link href="/terms" className="inline-flex min-h-11 items-center underline">Terms</Link>
    </nav>
  </div></footer>
}
