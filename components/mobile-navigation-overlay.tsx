"use client"

import { useEffect, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MobileNavigationOverlayProps {
  currentPage: string
  links: readonly { href: string; label: string }[]
}

export function MobileNavigationOverlay({ currentPage, links }: MobileNavigationOverlayProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const desktop = window.matchMedia("(min-width: 1024px)")
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false)
    }
    closeOnDesktop()
    desktop.addEventListener("change", closeOnDesktop)
    return () => desktop.removeEventListener("change", closeOnDesktop)
  }, [open])

  const isActive = (href: string) => currentPage === href || currentPage.startsWith(href + "/") ||
    (href === "/aves-explorer" && (currentPage === "/regions" || currentPage.startsWith("/regions/")))

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="flex min-h-11 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 lg:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
          Menu
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-emerald-950/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-x-4 top-4 z-[80] mx-auto max-h-[calc(100dvh_-_2rem)] max-w-md overflow-y-auto rounded-2xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50 to-blue-50 p-5 shadow-2xl focus:outline-none sm:inset-x-auto sm:right-6 sm:w-[calc(100%_-_3rem)]">
          <div className="mb-5 flex items-center justify-between gap-3">
            <Dialog.Title className="text-lg font-semibold text-emerald-900">AVES Australia</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl border border-emerald-200 bg-white px-3 text-sm font-semibold text-emerald-900 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              >
                <X className="h-5 w-5" aria-hidden="true" />
                Close
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Explore Australian regions, plan your trip, or visit your saved plans.
          </Dialog.Description>
          <nav aria-label="Mobile navigation" className="space-y-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={isActive(href) ? "page" : undefined}
                className={cn(
                  "flex min-h-12 items-center rounded-xl px-4 text-base font-medium transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700",
                  isActive(href) ? "bg-emerald-100 text-emerald-950" : "text-gray-800",
                )}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              aria-current={isActive("/contact") ? "page" : undefined}
              className="!mt-4 flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 font-semibold text-white shadow-sm hover:from-emerald-700 hover:to-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
            >
              Plan My Trip
            </Link>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
