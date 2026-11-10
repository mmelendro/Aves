import type { Metadata } from "next"
import { canonicalUrl } from "@/lib/site-path"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { ContactFormSection } from "@/components/contact-form-section"

export const metadata: Metadata = {title:"Plan your journey or contact AVES",alternates:{canonical:canonicalUrl("/contact")}}

export default function ContactPage() {
  return <><NavigationHeader currentPage="/contact"/><main id="main-content" tabIndex={-1}><ContactFormSection variant="contact-page" showFAQ initialCountry="colombia"/></main><Footer/></>
}
