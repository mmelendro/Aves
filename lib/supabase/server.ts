/**
 * Supabase client bound to the current request's session cookies.
 * Running on the server does not make this an administrator client: visitor RLS
 * still applies. account-service.ts is the separate privileged RPC transport.
 */

import "server-only"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { authCookieOptions, publicSupabaseConfig } from "./config"

/**
 * Return a visitor-scoped client; cookie updates work only in write-capable server contexts.
 */
export async function createClient() {
  const { url, key } = publicSupabaseConfig()
  const cookieStore = await cookies()
  return createServerClient(url, key, {
    cookieOptions: authCookieOptions,
    cookies: {
      getAll: () => cookieStore.getAll(),
      // Server Components may read cookies but cannot always write them. The
      // middleware refresh path handles cookie updates in that context.
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, { ...options, path: authCookieOptions.path }))
        } catch {
          // Server Components cannot write cookies; middleware refreshes them.
        }
      },
    },
  })
}
