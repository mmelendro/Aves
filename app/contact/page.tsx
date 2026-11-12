import { publicMetadata } from "@/lib/public-metadata"
import type { Metadata } from "next"
import ColombiaContact from "@/features/colombia/contact-page"
import SharedContact from "@/features/australia/contact-page"
import { enquiryContext, enquiryParams } from "@/lib/enquiry-entry"
import { contactTopic } from "@/content/contact-topics"
type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = await searchParams
  const context = enquiryContext(enquiryParams(query), contactTopic(query.topic) && query.topic !== "new-zealand" ? "australia" : "colombia")
  const topic = contactTopic(query.topic) || (context.country === "new-zealand" ? contactTopic("new-zealand") : null)
  return publicMetadata({ title: topic ? topic.title : context.country === "australia" ? "Plan Your Australian Journey" : "Plan a Colombia Birding Journey",
    description: "Discuss a personally planned journey or contact AVES for account and planning support.",
    alternates: { canonical: "/contact" } })
}
export default async function ContactPage({ searchParams }: Props) {
  const query = await searchParams
  const context = enquiryContext(enquiryParams(query), contactTopic(query.topic) && query.topic !== "new-zealand" ? "australia" : "colombia")
  const topic = contactTopic(query.topic) || (context.country === "new-zealand" ? contactTopic("new-zealand") : null)
  return topic || context.country !== "colombia" ? <SharedContact searchParams={Promise.resolve({ ...query, country: context.country, ...(context.country === "new-zealand" && !contactTopic(query.topic) ? { topic: "new-zealand" } : {}) })} /> : <ColombiaContact />
}
