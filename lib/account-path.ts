import { SITE_BASE_PATH } from "./site-path"

// Public account URLs are global; assets, auth callbacks and APIs remain in the
// independently deployed Australian app. Use native links across that boundary.
export function accountPath(path = "/account"): string {
  return /^\/australia\/account(?:[/?#]|$)/.test(path) ? path.slice(SITE_BASE_PATH.length) : path
}

export function accountUrl(path = "/account"): string {
  return new URL(accountPath(path), new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aves.bio").origin).href
}
