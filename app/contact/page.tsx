import type { Metadata } from "next"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { ContactFormSection } from "@/components/contact-form-section"
import { canonicalUrl } from "@/lib/site-path"

export const metadata: Metadata = { title: "Plan Your Australian Journey", alternates: { canonical: canonicalUrl("/contact") } }
export default function ContactPage() {
  return <><NavigationHeader currentPage="/contact" /><main className="pt-12 md:pt-16"><ContactFormSection showFAQ variant="contact-page" /></main><Footer /></>
}
