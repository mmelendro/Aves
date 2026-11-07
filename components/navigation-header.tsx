"use client"

import { BrandMark } from "@/components/brand-mark"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MobileNavigationOverlay } from "@/components/mobile-navigation-overlay"
import { cn } from "@/lib/utils"
import { sharedAccountHref } from "@/lib/shared-account"

interface NavigationHeaderProps {
  currentPage?: string
}

const navigationLinks = [
  { href: "/", label: "Destinations" },
  { href: "/aves-explorer", label: "Regions" },
  { href: "/tours", label: "Birding Experiences" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About AVES" },
  { href: sharedAccountHref(), label: "My Trips" },
] as const

export function NavigationHeader({ currentPage }: NavigationHeaderProps) {
  const pathname = usePathname()
  const activePath = pathname || currentPage || "/"
  const isActive = (href: string) => activePath === href || activePath.startsWith(href + "/") ||
    (href === "/aves-explorer" && (activePath === "/regions" || activePath.startsWith("/regions/")))

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-100 bg-white/95 shadow-sm backdrop-blur-md">
        <a
          href="#main-content"
          className="absolute left-4 top-3 z-10 flex min-h-11 -translate-y-24 items-center rounded-xl bg-emerald-800 px-4 font-semibold text-white focus:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          Skip to content
        </a>
        <div className="container mx-auto flex h-[72px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <BrandMark country="colombia" priority />

          <nav aria-label="Main navigation" className="hidden items-center gap-1 xl:flex xl:gap-2">
            {navigationLinks.map(({ href, label }) => {
              const NavigationLink = href.startsWith("/australia/") ? "a" : Link
              return <NavigationLink
                key={href}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center rounded-xl px-3 text-sm font-medium whitespace-nowrap transition-colors hover:bg-emerald-50 hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2",
                  isActive(href) ? "bg-emerald-50 text-emerald-900" : "text-gray-700",
                )}
              >
                {label}
              </NavigationLink>
            })}
            <Link
              href="/contact"
              aria-current={isActive("/contact") ? "page" : undefined}
              className="ml-2 flex min-h-11 items-center rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-5 text-sm font-semibold whitespace-nowrap text-white shadow-sm transition-colors hover:from-emerald-700 hover:to-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
            >
              Plan My Trip
            </Link>
          </nav>

          <MobileNavigationOverlay links={navigationLinks} currentPage={activePath} />
        </div>
      </header>
      <div aria-hidden="true" className="h-[72px]" />
    </>
  )
}
