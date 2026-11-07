"use client"

/**
 * Browser Supabase client for sign-in, recovery and sign-out.
 * It uses a publishable key and this browser's session, not administrator access.
 * Privileged database and email calls belong in server-only modules.
 */

import { createBrowserClient } from "@supabase/ssr"
import { authCookieOptions, publicSupabaseConfig } from "./config"

/**
 * Return a browser Auth/data client with public configuration and shared session-cookie settings.
 */
export function createClient() {
  const { url, key } = publicSupabaseConfig()
  return createBrowserClient(url, key, { cookieOptions: authCookieOptions })
}
