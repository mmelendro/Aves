import "server-only"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { authCookieOptions, publicSupabaseConfig } from "./config"

export async function createClient() {
  const { url, key } = publicSupabaseConfig()
  const cookieStore = await cookies()
  return createServerClient(url, key, {
    cookieOptions: authCookieOptions,
    cookies: {
      getAll: () => cookieStore.getAll(),
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
