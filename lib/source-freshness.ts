/** Review age describes our source check, never live access, availability or safety. */
export function sourceFreshness(reviewedOn: string, now = Date.now(), maxAgeDays = 90) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(reviewedOn)) return "unknown" as const
  const date = Date.parse(`${reviewedOn}T00:00:00Z`)
  // Review records use the project’s Sydney calendar date, which can be ahead of UTC.
  const parts = new Intl.DateTimeFormat("en-CA", {timeZone:"Australia/Sydney", year:"numeric", month:"2-digit", day:"2-digit"}).formatToParts(now)
  const part = (type: string) => parts.find(item => item.type === type)?.value
  const today = `${part("year")}-${part("month")}-${part("day")}`
  if (!Number.isFinite(date) || new Date(date).toISOString().slice(0, 10) !== reviewedOn || reviewedOn > today) return "unknown" as const
  return now - date > maxAgeDays * 86400000 ? "review-due" as const : "reviewed" as const
}
