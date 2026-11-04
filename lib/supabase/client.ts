"use client"
import { createBrowserClient } from "@supabase/ssr"
import { authCookieOptions, publicSupabaseConfig } from "./config"

export function createClient() {
  const { url, key } = publicSupabaseConfig()
  return createBrowserClient(url, key, { cookieOptions: authCookieOptions })
}
