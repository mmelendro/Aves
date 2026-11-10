/** Eligibility is a display guard, never proof of certification or impact. */
import pilot from "@/content/bcorp-south-island-pilot.json"
export type BcorpPilotRecord = {
  id: string; country: string; region: string
  certification: { review: string; profileUrl: string; checkedAt: string }
  location: { review: string; sourceUrl: string; checkedAt: string; coordinates: {latitude:number;longitude:number} | null; coordinateReview: string; coordinateSourceUrl: string | null }
}
function https(value: string | null) {
  try { return value !== null && new URL(value).protocol === "https:" } catch { return false }
}
function reviewedRecently(value: string, now: number, maxAgeDays: number) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const at=Date.parse(`${value}T00:00:00Z`)
  return Number.isFinite(at) && new Date(at).toISOString().slice(0,10) === value && now >= at && now-at <= maxAgeDays*86400000
}
export function bcorpPinEligible(record: BcorpPilotRecord, now=Date.now(), maxAgeDays=90) {
  let profile: URL
  try { profile=new URL(record.certification.profileUrl) } catch { return false }
  const point=record.location.coordinates
  return record.certification.review === "verified-profile"
    && profile.protocol === "https:" && profile.hostname === "www.bcorporation.net"
    && /^\/en-us\/find-a-b-corp\/company\/[^/]+\/$/.test(profile.pathname)
    && record.location.review === "verified-owner-page" && https(record.location.sourceUrl)
    && reviewedRecently(record.certification.checkedAt,now,maxAgeDays)
    && reviewedRecently(record.location.checkedAt,now,maxAgeDays)
    && record.location.coordinateReview === "verified-public-location" && https(record.location.coordinateSourceUrl)
    && point !== null && Number.isFinite(point.latitude) && Math.abs(point.latitude)<=90
    && Number.isFinite(point.longitude) && Math.abs(point.longitude)<=180
}
export function eligibleBcorpPilotPins(country: string, region: string, now=Date.now()) {
  return (pilot.records as BcorpPilotRecord[]).filter(record=>record.country===country && record.region===region && bcorpPinEligible(record,now))
}
