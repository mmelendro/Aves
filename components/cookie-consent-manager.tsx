"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"

export interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

interface CookieConsentContextType {
  preferences: CookiePreferences | null
  hasConsented: boolean
  updatePreferences: (prefs: Partial<CookiePreferences>) => void
  acceptAll: () => void
  rejectAll: () => void
  resetConsent: () => void
  showPreferenceCenter: boolean
  setShowPreferenceCenter: (show: boolean) => void
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true, // Always true, cannot be disabled
  analytics: false,
  marketing: false,
  functional: false,
}

const STORAGE_KEY = "aves-cookie-preferences"
const CONSENT_VERSION = "1.0"

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null)
  const [hasConsented, setHasConsented] = useState(false)
  const [showPreferenceCenter, setShowPreferenceCenter] = useState(false)

  // Load preferences from storage on mount
  useEffect(() => {
    loadPreferences()
  }, [])

  // Apply preferences when they change
  useEffect(() => {
    if (preferences && hasConsented) {
      applyPreferences(preferences)
    }
  }, [preferences, hasConsented])

  const loadPreferences = () => {
    try {
      // Try localStorage first
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        // Check if consent version matches (for future updates)
        if (data.version === CONSENT_VERSION) {
          setPreferences(data.preferences)
          setHasConsented(true)
          return
        }
      }
    } catch (error) {
      console.warn("Failed to load cookie preferences from localStorage:", error)
    }

    // Fallback to cookie storage
    try {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${STORAGE_KEY}=`))
        ?.split("=")[1]

      if (cookieValue) {
        const data = JSON.parse(decodeURIComponent(cookieValue))
        if (data.version === CONSENT_VERSION) {
          setPreferences(data.preferences)
          setHasConsented(true)
          return
        }
      }
    } catch (error) {
      console.warn("Failed to load cookie preferences from cookies:", error)
    }

    // No valid preferences found
    setPreferences(null)
    setHasConsented(false)
  }

  const savePreferences = (prefs: CookiePreferences) => {
    const data = {
      preferences: prefs,
      version: CONSENT_VERSION,
      timestamp: Date.now(),
    }

    try {
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.warn("Failed to save to localStorage:", error)
    }

    try {
      // Save to cookie as fallback (expires in 1 year)
      const expires = new Date()
      expires.setFullYear(expires.getFullYear() + 1)
      document.cookie = `${STORAGE_KEY}=${encodeURIComponent(
        JSON.stringify(data),
      )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure`
    } catch (error) {
      console.warn("Failed to save to cookies:", error)
    }
  }

  const applyPreferences = (prefs: CookiePreferences) => {
    // Apply analytics preferences
    if (prefs.analytics) {
      // Enable Google Analytics or other analytics
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("consent", "update", {
          analytics_storage: "granted",
        })
      }
    } else {
      // Disable analytics
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("consent", "update", {
          analytics_storage: "denied",
        })
      }
    }

    // Apply marketing preferences
    if (prefs.marketing) {
      // Enable marketing cookies
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("consent", "update", {
          ad_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
        })
      }
    } else {
      // Disable marketing cookies
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("consent", "update", {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        })
      }
    }

    // Dispatch custom event for other parts of the app
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("cookiePreferencesUpdated", {
          detail: prefs,
        }),
      )
    }
  }

  const updatePreferences = (newPrefs: Partial<CookiePreferences>) => {
    const updatedPrefs = {
      ...DEFAULT_PREFERENCES,
      ...preferences,
      ...newPrefs,
      essential: true, // Always keep essential cookies enabled
    }
    setPreferences(updatedPrefs)
    setHasConsented(true)
    savePreferences(updatedPrefs)
  }

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    setPreferences(allAccepted)
    setHasConsented(true)
    savePreferences(allAccepted)
    // Close the preference center after accepting all
    setShowPreferenceCenter(false)
  }

  const rejectAll = () => {
    const onlyEssential: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    setPreferences(onlyEssential)
    setHasConsented(true)
    savePreferences(onlyEssential)
    // Close the preference center after rejecting all
    setShowPreferenceCenter(false)
  }

  const resetConsent = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      // Remove cookie
      document.cookie = `${STORAGE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    } catch (error) {
      console.warn("Failed to reset consent:", error)
    }
    setPreferences(null)
    setHasConsented(false)
  }

  return (
    <CookieConsentContext.Provider
      value={{
        preferences,
        hasConsented,
        updatePreferences,
        acceptAll,
        rejectAll,
        resetConsent,
        showPreferenceCenter,
        setShowPreferenceCenter,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext)
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider")
  }
  return context
}
