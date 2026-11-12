/*
 * Server-rendered contact entry point. A recognised topic selects neutral AVES navigation
 * for general/support messages; ordinary visits keep the Australian destination framing.
 * ContactFormSection owns fields, browser state and submission; the server API validates and saves.
 */
import { australiaMetadata } from "@/features/australia/lib/metadata"
import type { Metadata } from "next"
import { NavigationHeader } from "@/features/australia/components/navigation-header"
import { Footer } from "@/features/australia/components/footer"
import { ContactFormSection } from "@/features/australia/components/contact-form-section"
import { canonicalUrl } from "@/features/australia/lib/site-path"
import { enquiryContext, enquiryParams } from "@/lib/enquiry-entry"
import { contactTopic } from "@/content/contact-topics"
import { ContactFooter, ContactNavigation } from "@/features/australia/components/contact-navigation"

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

// Only a recognised contact-topic record supplies a title; arbitrary query text is not used as copy.
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = await searchParams
  const context = enquiryContext(enquiryParams(query), "australia")
  const topic = contactTopic(query.topic) || (context.country === "new-zealand" ? contactTopic("new-zealand") : null)
  return australiaMetadata({ title: topic ? { absolute: `${topic.title} | AVES` } : "Plan Your Australian Journey", description: topic ? "Contact AVES for planning information, account support and information requests." : "Share your Australian birding interests, preferred regions and travel ideas with AVES. Arrangements are discussed before booking.", alternates: { canonical: canonicalUrl("/contact") } })
}

// Decide the page framing on the server, then hand the selected topic to the interactive form.
export default async function ContactPage({ searchParams }: Props) {
  const query = await searchParams
  const context = enquiryContext(enquiryParams(query), "australia")
  const requestedTopic = typeof query.topic === "string" && contactTopic(query.topic) ? query.topic : context.country === "new-zealand" ? "new-zealand" : undefined
  const topic = typeof requestedTopic === "string" && contactTopic(requestedTopic) ? requestedTopic : undefined
  return <>{topic ? <ContactNavigation /> : <NavigationHeader currentPage="/contact" />}<main id="main-content" tabIndex={-1}><ContactFormSection showFAQ={!topic} variant="contact-page" initialTopic={topic} initialCountry={context.country} initialRegion={context.region} /></main>{topic ? <ContactFooter /> : <Footer />}</>
}
