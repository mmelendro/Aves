import { publicMetadata } from "@/lib/public-metadata"
/**
 * Public privacy notice. The sections array supplies the editable paragraphs and
 * optional links. This file explains data handling; enforcement belongs in the shared
 * account API, authentication and database policies, not in these words.
 */
import type { Metadata } from "next"
import Link from "next/link"
import { PageIntroduction } from "@/components/page-introduction"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { canonicalUrl } from "@/lib/site-path"

export const metadata: Metadata = publicMetadata({
  title: "Privacy Notice",
  description: "How AVES handles inquiries, shared accounts, saved plans and proposals for Colombia and Australia.",
  alternates: { canonical: canonicalUrl("/privacy") },
})

const sections = [
  { title: "What You Share", text: "Inquiry forms collect your name, email and travel preferences, with optional details such as phone number, timing, group size, birding experience and a message. An account stores your email, saved plans, quote requests and proposal history. The optional New Zealand planning questionnaire stores your pace, birding frequency, accommodation preference, interests, desired bird species and notes in your private trip plan. Unsaved bird choices use this browser tab’s session storage for up to one day so you can carry them into a signed-in draft; only species identifiers and an expiry timestamp are stored there. Questionnaire answers and contact details are not stored in this browser basket. Saving the draft is a separate action, and signing out clears the basket. You choose when to share a submitted copy with authorized AVES staff; answers are not published. New Zealand notification emails link to the private owner inbox without including your answers. Share only the information needed for your trip conversation." },
  { title: "How AVES Uses It", text: "We use this information to respond to inquiries, manage your account, prepare proposals and keep a record of the conversation and your update preferences. A saved inquiry or quote request is not a booking or payment." },
  { title: "One Account Across Destinations", text: "Australia, Colombia and New Zealand use one AVES account and database. Private account records are not public; signed-in clients can access their own records. The authorised AVES owner can review submitted requests and prepare proposals. Draft plans can be edited or deleted in your account." },
  { title: "Your Private Trip Workspace", text: "A saved trip can hold your preparation checklist, completion state, optional due dates, reference links, journal notes, dates and selected public place labels. You can choose to upload private photo copies and audio recordings, with captions, creator details, dates, display order and notes. Supabase stores these files in a private bucket. Account ownership checks protect the workspace and file requests; sharing a planning brief does not include these records in a submitted copy or the AVES quote inbox. Files have no public gallery or community sharing option. Photos selected through the website are prepared as smaller JPEG copies; your original files stay unchanged. Removing a checklist or journal item keeps it recoverable in Removed Items. Permanently removing an upload deletes that stored copy and its details, while leaving your journal entry and original file. Remove a trip’s uploads before deleting its draft. No email, receipt or conversation import happens automatically." },
  { title: "Database and Sign-In", text: "Supabase provides account sign-in, confirmation, recovery and database storage. Our primary project database is in Sydney, Australia. Hosting and email providers may also process information outside Australia.", href: "https://supabase.com/privacy", link: "Supabase Privacy Policy" },
  { title: "Optional Google Sign-In", text: "If you choose Google sign-in, Google shares your account identifier, email and basic profile details, such as your name and profile picture, with Supabase to authenticate your AVES account. We request only identity permissions (openid, email and profile). We do not request access to Gmail messages, contacts, Drive or Calendar. AVES uses these details for sign-in, account management and the account and trip communications described in this notice; our service providers process them to provide those functions. We do not sell Google account information or use it for targeted advertising. You can revoke the Google connection in your Google Account settings. Revoking it does not automatically delete your AVES records; contact AVES through the privacy form below to request deletion.", href: "https://myaccount.google.com/connections", link: "Manage Your Google Connections" },
  { title: "Website Hosting", text: "Vercel hosts the website and may process technical request information, including IP addresses and device information, to operate and protect the service.", href: "https://vercel.com/legal/privacy-notice", link: "Vercel Privacy Notice" },
  { title: "Service Emails", text: "Resend sends account and proposal messages and notifications to AVES. Messages sent to AVES are received in the owner's Gmail inbox. Email providers process recipient addresses and message content. Delivery can fail or be delayed; saved proposals remain available in your account.", href: "https://resend.com/legal/privacy-policy", link: "Resend Privacy Policy" },
  { title: "Optional Updates", text: "Trip news and launch updates are optional and separate from account or proposal messages. We record the country and wording associated with your choice. You can request to unsubscribe through our contact form.", href: "/australia/contact?topic=unsubscribe#inquiry", link: "Request to Unsubscribe" },
  { title: "Cookies and Your Information", text: "The website remembers cookie preferences and uses essential sign-in cookies for the shared account portal. You can edit or delete draft plans in your account. For access to, correction of, or deletion of other information, or a privacy question, use our contact form.", href: "/australia/contact?topic=privacy#inquiry", link: "Contact AVES About Your Information" },
]

export default function PrivacyPage() {
  return <div className="min-h-screen bg-white">
    <NavigationHeader currentPage="/privacy" />
    <main id="main-content" tabIndex={-1}>
      <PageIntroduction title="Privacy Notice" eyebrow="AVES" description="How AVES handles inquiries, accounts and trip planning, including the New Zealand planning beta.">
        <p className="text-sm text-gray-500">Updated: 12 November 2026</p>
      </PageIntroduction>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 mb-8"><p className="text-emerald-700 mb-0">This notice describes the information used by our website and shared trip-planning service. For questions, <a href="/australia/contact?topic=privacy#inquiry" className="underline">contact AVES through the form</a>.</p></div>
          {sections.map(section => <section className="mb-8" key={section.title}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
            <p className="mb-4">{section.text}</p>
            {section.href && <a href={section.href} className="text-emerald-700 underline">{section.link}</a>}
          </section>)}
          <p><Link href="/terms" className="text-emerald-700 underline">Read about inquiries and proposals</Link>.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
}
