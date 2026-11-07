/**
 * Root route loading fallback. Returning null intentionally adds no separate spinner;
 * Next.js may display this while a child route is being prepared.
 */
export default function Loading() {
  return null
}
