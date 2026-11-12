"use client"

import { ColombiaHomeLanguageToggle, useColombiaHomeCopy } from "@/components/colombia-home-language"
import { useEffect, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Menu, X } from "lucide-react"
import { useHeaderLandscape } from "@/components/header-landscape-context"
import { selectedHeaderProfile } from "@/lib/header-landscape.mjs"
import { BrandMark, type BrandCountry } from "@/components/brand-mark"
import { HeaderContour } from "@/components/header-contour"
import { usePathname } from "next/navigation"
import { brandContext } from "@/lib/brand-context"

const links = [
  { href: "/#destinations", label: "Destinations" },
  { href: "/#planning", label: "How it works" },
  { href: "/account", label: "My Trips" },
  { href: "/site-map", label: "Site map" },
  { href: "/search", label: "Search" },
]
const linkClass = "inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-emerald-800 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"

export interface PublicNavigationLink { href: string; label: string }

export function NewZealandHeader({ country = "new-zealand", navigationLinks, surface = "public", currentPage }: {
  country?: BrandCountry | "global"
  navigationLinks?: readonly PublicNavigationLink[]
  surface?: "public" | "account"
  currentPage?: string
}) {
  const localizeHome = useColombiaHomeCopy()
  const pathname = usePathname() || currentPage || "/"
  const { selection } = useHeaderLandscape()
  const context = surface === "account" ? brandContext(pathname, "global") : brandContext(pathname, country === "global" ? selection?.country : country, selection)
  const activeCountry = context.country === "global" ? undefined : context.country as BrandCountry
  const selected = context
  const isActive = (href: string) => {
    if (href.includes("#")) return false
    const target = href.split("?")[0]
    return pathname === target || (target === "/aves-explorer" && (pathname === "/regions" || pathname.startsWith("/regions/"))) || (target !== "/" && pathname.startsWith(target + "/"))
  }
  const menuLinks = navigationLinks ? [...navigationLinks,{href:"/search",label:"Search"}] : links
  const desktopLinks = navigationLinks?.filter(link => link.href !== "/site-map") ?? links.slice(0, 3)
  const hasCountryNavigation = !!navigationLinks
  const desktopClass = hasCountryNavigation ? "xl:flex" : "sm:flex"
  const mobileClass = hasCountryNavigation ? "xl:hidden" : "sm:hidden"
  const profile = activeCountry ? selectedHeaderProfile(activeCountry,selected?.regionId,selected?.placeId) : {terrain:"wooded-ranges",water:"none"}
  const title = surface === "account" ? "Account" : activeCountry === "new-zealand" ? "New Zealand" : activeCountry === "australia" ? "Australia" : activeCountry === "colombia" ? "Colombia" : "Explore the world"
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const desktop = window.matchMedia(hasCountryNavigation ? "(min-width: 1280px)" : "(min-width: 640px)")
    const close = () => { if (desktop.matches) setOpen(false) }
    desktop.addEventListener("change", close)
    return () => desktop.removeEventListener("change", close)
  }, [hasCountryNavigation])
  const tree = <>
    <a href="#main-content" className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-white px-5 py-3 font-medium text-emerald-900 shadow-lg focus:not-sr-only">Skip to content</a>
    <header data-site-header="true" className="sticky top-0 z-40 h-[132px] isolate">
      <HeaderContour profile={profile} country={activeCountry ?? "global"} regionId={selected?.regionId} placeId={selected?.placeId} />
      <div className="relative mx-auto flex max-w-7xl items-start justify-between gap-4 px-3 pt-2 sm:px-6 lg:px-8">
        <BrandMark country={activeCountry ?? "global"} priority unifiedHeaderContour nativeCountryLink={country === "global"} label={surface === "account" ? "Your Account" : undefined} labelHref={surface === "account" ? "/account" : undefined} />
        <div data-contour-navigation="true" className="mt-1 flex shrink-0 items-start gap-2">
          {pathname === "/colombia" && <ColombiaHomeLanguageToggle />}
          <nav aria-label={surface === "account" ? "Account and country navigation" : "Main navigation"} className={`hidden items-center gap-1 ${desktopClass}`}>
            {desktopLinks.map(({ href, label }) => <a key={href} href={href} aria-current={isActive(href) ? "page" : undefined} className={`${linkClass} ${label === "My Trips" ? "border border-emerald-200 px-5 font-semibold" : ""}`}>{label}</a>)}
          </nav>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild><button type="button" aria-label="Open navigation menu" className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${mobileClass}`}><Menu aria-hidden="true" className="h-5 w-5" /></button></Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[70] bg-emerald-950/40" />
              <Dialog.Content className="fixed inset-x-4 top-4 z-[80] mx-auto max-h-[calc(100dvh-2rem)] max-w-md overflow-y-auto rounded-2xl border border-emerald-100 bg-white p-5 shadow-xl">
                <div className="flex items-center justify-between gap-3"><Dialog.Title className="font-semibold text-emerald-900">AVES {title}</Dialog.Title><Dialog.Close asChild><button type="button" aria-label="Close navigation menu" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-emerald-800 focus-visible:outline focus-visible:outline-2"><X aria-hidden="true" className="h-5 w-5" /></button></Dialog.Close></div>
                <Dialog.Description className="sr-only">{surface === "account" ? "Your shared trip plans and all AVES destinations." : "Choose a destination, learn how AVES works, or open My Trips."}</Dialog.Description>
                <nav aria-label="Mobile navigation" className="mt-3 flex flex-col items-start gap-2">{menuLinks.map(({ href, label }) => <a key={href} href={href} aria-current={isActive(href) ? "page" : undefined} onClick={() => setOpen(false)} className={linkClass}>{label}</a>)}</nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  </>
  return country === "colombia" || pathname === "/colombia" ? localizeHome(tree) : tree
}
