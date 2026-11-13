/**
 * Cookie preference opener used on /cookies. It changes provider state instead of navigating
 * to another page or saving consent immediately.
 */
"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import { useCookieConsent } from "./cookie-consent-manager"
import { cn } from "@/lib/utils"

interface CookieManagementButtonProps {
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg"
  className?: string
  showIcon?: boolean
  children?: React.ReactNode
}

export function CookieManagementButton({
  variant = "ghost",
  size = "sm",
  className,
  showIcon = true,
  children = "Manage Cookies",
}: CookieManagementButtonProps) {
  const { setShowPreferenceCenter } = useCookieConsent()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowPreferenceCenter(true)
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn("cursor-pointer", className)}
      aria-label="Open cookie preferences"
      role="button"
      tabIndex={0}
    >
      {showIcon && <Settings className="w-4 h-4 mr-2" />}
      {children}
    </Button>
  )
}
