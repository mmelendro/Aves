import type { Metadata } from "next"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { ContactFormSection } from "@/components/contact-form-section"
import { canonicalUrl } from "@/lib/site-path"
import { contactTopic } from "@/content/contact-topics"
import { ContactFooter, ContactNavigation } from "@/components/contact-navigation"

type Props = { searchParams: Promise<{ topic?: string | string[] }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const topic = contactTopic((await searchParams).topic)
  return { title: topic ? { absolute: `${topic.title} | AVES` } : "Plan Your Australian Journey", alternates: { canonical: canonicalUrl("/contact") } }
}

export default async function ContactPage({ searchParams }: Props) {
  const requestedTopic = (await searchParams).topic
  const topic = typeof requestedTopic === "string" && contactTopic(requestedTopic) ? requestedTopic : undefined
  return <>{topic ? <ContactNavigation /> : <NavigationHeader currentPage="/contact" />}<main id="main-content" tabIndex={-1}><ContactFormSection showFAQ={!topic} variant="contact-page" initialTopic={topic} /></main>{topic ? <ContactFooter /> : <Footer />}</>
}
