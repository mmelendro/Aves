"use client"

import type React from "react"
import { useCookieConsent } from "./cookie-consent-manager"
import { cn } from "@/lib/utils"

interface CookieManagementLinkProps {
  className?: string
  children?: React.ReactNode
}

export function CookieManagementLink({ className, children = "Cookie Preferences" }: CookieManagementLinkProps) {
  const { setShowPreferenceCenter } = useCookieConsent()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowPreferenceCenter(true)
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "text-left hover:text-emerald-600 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0 font-inherit",
        className,
      )}
      aria-label="Open cookie preferences"
      role="button"
      tabIndex={0}
    >
      {children}
    </button>
  )
}
