/** Eligibility is a display guard, never proof of certification or impact. */
import pilot from "@/content/bcorp-south-island-pilot.json"
import {sourceFreshness} from "./source-freshness"
export const bcorpBusinessCategories = [
  { id: "accommodation", label: "Accommodation & farm experiences" },
  { id: "food-and-drink", label: "Food & drink" },
  { id: "guiding", label: "Guided tours & tour transport" },
  { id: "retail", label: "Retail" },
] as const
export function bcorpCategoryLabel(category: string) {
  return bcorpBusinessCategories.find(item => item.id === category)?.label || "Business"
}
export type BcorpPilotRecord = {
  id: string; name: string; company: string; category: string; country: string; region: string; limitations: string
  certification: { review: string; profileUrl: string; checkedAt: string; scopeNote: string }
  location: { review: string; address: string; precision: string; sourceUrl: string; checkedAt: string; coordinates: {latitude:number;longitude:number} | null; coordinateReview: string; coordinateSourceUrl: string | null }
}
function https(value: string | null) {
  try { return value !== null && new URL(value).protocol === "https:" } catch { return false }
}
function reviewedRecently(value: string, now: number, maxAgeDays: number) {
  return sourceFreshness(value,now,maxAgeDays)==="reviewed"
}
export function bcorpPinEligible(record: BcorpPilotRecord, now=Date.now(), maxAgeDays=90) {
  let profile: URL
  try { profile=new URL(record.certification.profileUrl) } catch { return false }
  const point=record.location.coordinates
  return record.certification.review === "verified-profile"
    && bcorpBusinessCategories.some(category => category.id === record.category)
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
  return pilot.accessReview.mapLayerEnabled ? (pilot.records as BcorpPilotRecord[]).filter(record=>record.country===country && record.region===region && bcorpPinEligible(record,now)) : []
}
