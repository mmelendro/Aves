/**
 * URLs for the shared AVES account portal.
 * The implementation lives in this application, but visitors use /account on the
 * main domain. These helpers normalize old account paths; they do not authorize
 * access or make arbitrary redirect input safe.
 */

import { SITE_BASE_PATH } from "./site-path"

// Public account URLs are global; assets, auth callbacks and APIs remain in the
// independently deployed Australian app. Use native links across that boundary.
/**
 * Normalize a legacy Australian account path to the shared root path; leave other paths unchanged.
 */
export function accountPath(path = "/account"): string {
  return /^\/australia\/account(?:[/?#]|$)/.test(path) ? path.slice(SITE_BASE_PATH.length) : path
}

/**
 * Build an absolute shared-account URL using the configured public website origin.
 */
export function accountUrl(path = "/account"): string {
  return new URL(accountPath(path), new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aves.bio").origin).href
}
