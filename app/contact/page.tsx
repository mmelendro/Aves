/*
 * Server-rendered contact entry point. A recognised topic selects neutral AVES navigation
 * for general/support messages; ordinary visits keep the Australian destination framing.
 * ContactFormSection owns fields, browser state and submission; the server API validates and saves.
 */
import type { Metadata } from "next"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { ContactFormSection } from "@/components/contact-form-section"
import { canonicalUrl } from "@/lib/site-path"
import { contactTopic } from "@/content/contact-topics"
import { ContactFooter, ContactNavigation } from "@/components/contact-navigation"

type Props = { searchParams: Promise<{ topic?: string | string[] }> }

// Only a recognised contact-topic record supplies a title; arbitrary query text is not used as copy.
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const topic = contactTopic((await searchParams).topic)
  return { title: topic ? { absolute: `${topic.title} | AVES` } : "Plan Your Australian Journey", alternates: { canonical: canonicalUrl("/contact") } }
}

// Decide the page framing on the server, then hand the selected topic to the interactive form.
export default async function ContactPage({ searchParams }: Props) {
  const requestedTopic = (await searchParams).topic
  const topic = typeof requestedTopic === "string" && contactTopic(requestedTopic) ? requestedTopic : undefined
  return <>{topic ? <ContactNavigation /> : <NavigationHeader currentPage="/contact" />}<main id="main-content" tabIndex={-1}><ContactFormSection showFAQ={!topic} variant="contact-page" initialTopic={topic} /></main>{topic ? <ContactFooter /> : <Footer />}</>
}
