import type { Metadata } from "next"
import ColombiaContact from "@/features/colombia/contact-page"
import SharedContact from "@/features/australia/contact-page"
import { contactTopic } from "@/content/contact-topics"
type Props = { searchParams: Promise<{ topic?: string | string[] }> }
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const topic = contactTopic((await searchParams).topic)
  return { title: topic ? topic.title : "Plan a Colombia Birding Journey",
    description: "Discuss a personally planned journey or contact AVES for account and planning support.",
    alternates: { canonical: "/contact" } }
}
export default async function ContactPage({ searchParams }: Props) {
  const topic = contactTopic((await searchParams).topic)
  return topic ? <SharedContact searchParams={searchParams} /> : <ColombiaContact />
}
