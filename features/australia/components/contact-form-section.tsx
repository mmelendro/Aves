"use client"
import { useReadOnlyPreview } from "@/components/preview-mode"

/*
 * Interactive inquiry / launch-list form, also reused for general AVES contact topics.
 * Browser checks and disabled buttons improve usability; the server at app/api/contact/route.ts
 * is responsible for validation, abuse controls and saving. Never put a private API key here.
 * See docs/frontend-code-tour.md for the complete submission reading path.
 */

import { useEffect, useId, useRef, useState } from "react"
import { SiteLink as Link } from "@/features/australia/components/site-link"
import { ArrowRight, Award, CheckCircle, Globe, Mail, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { sitePath } from "@/features/australia/lib/site-path"
import { regionLabels, regionOptions } from "@/content/region-options"
import { contactTopic } from "@/content/contact-topics"

type Intent = "inquiry" | "waitlist"
type Props = { showTitle?: boolean; showFAQ?: boolean; variant?: "homepage" | "contact-page"; className?: string; initialTopic?: string }

export function ContactFormSection({ showTitle = true, showFAQ = false, variant = "homepage", className = "", initialTopic }: Props) {
  const topic = contactTopic(initialTopic)
  // Local UI state chooses the form mode and displays progress; no submitted client details are persisted here.
  const readOnly = useReadOnlyPreview()
  const [intent, setIntent] = useState<Intent>("inquiry")
  const [region, setRegion] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [feedback, setFeedback] = useState("")
  const [tourStyle, setTourStyle] = useState("")
  const Title = variant === "contact-page" ? "h1" : "h2"
  // A ref blocks same-tick double submits. The request key is reused when retrying an unchanged body.
  const inFlight = useRef(false)
  const submission = useRef<{ body: string; key: string } | null>(null)
  const prefix = useId()
  const id = (name: string) => `${prefix}-${name}`

  // Read known URL hints once in the browser. They prefill context, not permission or confirmed availability.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (!topic && params.get("intent") === "waitlist") setIntent("waitlist")
    const requested = params.get("region")
    if (requested && Object.hasOwn(regionLabels, requested)) setRegion(regionLabels[requested])
    const tour = params.get("tour")
    const tourNames: Record<string, string> = { adventure: "Adventure Tours", vision: "Vision Tours", elevate: "Elevate Tours", souls: "Souls Tours" }
    if (tour && Object.hasOwn(tourNames, tour)) setTourStyle(tourNames[tour])
  }, [topic])

  // Send only the form payload to our same-site API. The browser never connects directly with a private DB key.
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (readOnly) { setFeedback("Sending is disabled in this preview. Please use live AVES."); return }
    if (inFlight.current) return
    const form = event.currentTarget
    const values = new FormData(form)
    const submittedIntent = topic ? "inquiry" : intent
    inFlight.current = true
    setStatus("sending")
    setFeedback("")
    try {
      // General/support messages use the existing shared service inbox. A topic
      // labels the message; it does not register a new destination or trip plan.
      const body = JSON.stringify({
        intent: submittedIntent, name: values.get("name"), email: values.get("email"), region: topic ? "" : region,
        travelWhen: values.get("travelWhen") || "", partySize: values.get("partySize") || "",
        message: submittedIntent === "inquiry" ? `${topic ? `Request: ${topic.subject}\n\n` : tourStyle ? `Tour style: ${tourStyle}\n\n` : ""}${values.get("message") || ""}` : "", updates: !topic && values.get("updates") === "on", website: values.get("website") || "",
      })
      // Idempotency lets the server recognise a retry; a changed message receives a new unique request key.
      if (submission.current?.body !== body) submission.current = { body, key: crypto.randomUUID() }
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": submission.current.key }, body })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result?.error || "Your request could not be accepted. Please try again shortly.")
      // Only report success after an explicit stored response, not merely any HTTP 200 or email attempt.
      if (result?.success !== true || result?.status !== "stored" || result?.intent !== submittedIntent) {
        throw new Error("Your request could not be confirmed. Please try again shortly.")
      }
      // The success copy promises saving for review, not delivery, a priced quote or a confirmed booking.
      submission.current = null
      setStatus("success")
      setFeedback(topic ? "Your message has been saved for AVES to review. We will reply to the email address you provided." : submittedIntent === "waitlist" ? "Your Australian launch-list request and email preference have been saved. Thank you for being part of the beginning." : "Your inquiry has been saved for AVES to review. Thank you for sharing your Australian travel interests.")
      form.reset()
      setRegion("")
    } catch (error) {
      setStatus("error")
      setFeedback(error instanceof Error ? error.message : "Please try again shortly.")
    } finally { inFlight.current = false }
  }

  return <section id="inquiry" className={`bg-gradient-to-br from-emerald-50 to-blue-50 py-16 lg:py-24 ${className}`}>
    <div className="container mx-auto px-4">
      {showTitle && <div className="text-center mb-12"><Title className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{topic?.title || "Plan Your Australian Birding Adventure"}</Title><p className="text-lg text-gray-600 max-w-2xl mx-auto">{topic?.description || "Tell us about your interests, or join the launch list as our Australian journeys take shape."}</p></div>}
      <div className="max-w-7xl mx-auto"><div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2"><Card className="border-0 shadow-xl bg-white"><CardContent className="p-6 lg:p-8">
          {!topic && <div className="grid grid-cols-2 gap-3 mb-8" aria-label="Choose inquiry or launch list">{(["inquiry", "waitlist"] as const).map(mode => <Button type="button" key={mode} variant={intent === mode ? "default" : "outline"} className={intent === mode ? "bg-emerald-600 hover:bg-emerald-700" : "border-emerald-600 text-emerald-700"} aria-pressed={intent === mode} onClick={() => { setIntent(mode); setStatus("idle"); setFeedback("") }} disabled={readOnly || status === "sending"}>{mode === "inquiry" ? "Plan My Trip" : "Join the Launch List"}</Button>)}</div>}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{topic ? "Send a Message" : intent === "inquiry" ? "Tell Us About Your Birding Interests" : "Be Part of Our Australian Beginning"}</h3>
          <p className="text-gray-600 mb-8">{topic ? "Your message goes directly to AVES for a personal response." : intent === "inquiry" ? "Share your ideas so we can discuss a journey around your interests. No fixed plans needed." : "Receive launch news and updates as our Australian journeys develop."}</p>
          {/* Editable fields. Keep name attributes aligned with the payload builder and server validation. */}
          {readOnly && <p className="mb-4 text-sm text-amber-800">Sending is disabled in this preview.</p>}
          <form className="space-y-6" onSubmit={submit}>
            {!topic && tourStyle && intent === "inquiry" && <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">Your interest: <strong>{tourStyle}</strong></p>}
            <div className="grid md:grid-cols-2 gap-4"><div><label htmlFor={id("name")} className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label><Input id={id("name")} name="name" autoComplete="name" placeholder="Your name" maxLength={100} required /></div><div><label htmlFor={id("email")} className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label><Input id={id("email")} name="email" type="email" autoComplete="email" placeholder="Your email address" maxLength={254} required /></div></div>
            {!topic && intent === "inquiry" && <><div><label htmlFor={id("region")} className="block text-sm font-medium text-gray-700 mb-2">Preferred Australian Region</label><select id={id("region")} value={region} onChange={event => setRegion(event.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="">I'm open to inspiration</option>{regionOptions.map(item => <option key={item.id}>{item.label}</option>)}<option>Several Australian regions</option><option>Somewhere else in Australia</option></select></div><div className="grid md:grid-cols-2 gap-4"><div><label htmlFor={id("travelWhen")} className="block text-sm font-medium text-gray-700 mb-2">Preferred Travel Time</label><Input id={id("travelWhen")} name="travelWhen" placeholder="A month, a season, or flexible" maxLength={100} /></div><div><label htmlFor={id("partySize")} className="block text-sm font-medium text-gray-700 mb-2">Group Size</label><select id={id("partySize")} name="partySize" defaultValue="" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="">Still deciding</option><option>1 person</option><option>2 people</option><option>3–4 people</option><option>5+ people</option></select></div></div><div><label htmlFor={id("message")} className="block text-sm font-medium text-gray-700 mb-2">Special Interests or Requests</label><Textarea id={id("message")} name="message" rows={4} maxLength={3000} placeholder="Tell us about the birds, places, photography interests or experiences you have in mind…" /></div></>}
            {topic && <div><label htmlFor={id("message")} className="block text-sm font-medium text-gray-700 mb-2">Your Message *</label><Textarea id={id("message")} name="message" rows={4} maxLength={3000} required placeholder="How can we help?" /></div>}
            {/* Honeypot for basic spam detection; server-side controls remain necessary. */}
            <div className="hidden" aria-hidden="true"><label htmlFor={id("website")}>Website</label><input id={id("website")} name="website" autoComplete="off" tabIndex={-1} /></div>
            {/* Marketing updates are optional for inquiries and explicitly required for the launch list. */}
            {!topic && <label className="flex items-start gap-3 text-sm text-gray-700"><input className="mt-1 accent-emerald-600" type="checkbox" name="updates" required={intent === "waitlist"} key={intent} /><span>{intent === "waitlist" ? "Yes, email me AVES Australia launch news and trip updates. I can unsubscribe at any time." : "Email me Australian launch news and trip updates. (Optional; unsubscribe at any time.)"}</span></label>}
            <p className="text-sm text-gray-500">We'll use your details to respond to this request. Read <Link href="/privacy" className="text-emerald-700 underline">how we care for your information</Link>.</p>
            {/* Disable repeat clicks while sending; accessible feedback distinguishes failures from saved requests. */}
            <div className="pt-4"><Button type="submit" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={readOnly || status === "sending"}><Mail className="mr-2 w-5 h-5" />{status === "sending" ? "Sending…" : topic ? "Send My Message" : intent === "waitlist" ? "Join the Launch List" : "Send My Inquiry"}<ArrowRight className="ml-2 w-4 h-4" /></Button>
              {feedback && <p className={`text-sm text-center mt-4 ${status === "error" ? "text-red-700" : "text-emerald-700 font-medium"}`} role={status === "error" ? "alert" : "status"}>{feedback}</p>}
            </div>
          </form>
        </CardContent></Card></div>
        <div className="space-y-6">{!topic && <Card className="border-0 shadow-lg bg-emerald-50"><CardContent className="p-6"><h4 className="text-lg font-bold text-gray-900 mb-4">Your Australian Journey</h4><div className="space-y-4">{[{icon:CheckCircle,title:"Built Around Your Interests",text:"Share what you'd love to see and how you like to travel."},{icon:Users,title:"Your Pace, Your People",text:"Tell us your group size, experience and preferred pace."},{icon:Award,title:"Pursuing B Corp Certification",text:"An ongoing journey. AVES is not yet certified."},{icon:Globe,title:"Across Australia",text:"Choose any state or mainland territory, or tell us about an island journey."}].map(item => <div className="flex items-start space-x-3" key={item.title}><item.icon className="text-emerald-600 flex-shrink-0 w-5 h-5 mt-0.5" /><div><div className="font-semibold text-gray-900">{item.title}</div><div className="text-sm text-gray-600">{item.text}</div></div></div>)}</div></CardContent></Card>}
          <Card className="border-0 shadow-lg bg-white"><CardContent className="p-6"><h4 className="text-lg font-bold text-gray-900 mb-4">A Personal Conversation</h4><div className="space-y-4"><div className="flex items-start space-x-3"><Mail className="text-emerald-600 flex-shrink-0 w-5 h-5 mt-0.5" /><div><div className="font-semibold text-gray-900">Contact AVES</div><p className="text-sm text-gray-600">Use the form to send your message. We will reply to the email address you provide.</p></div></div>{!topic && <div className="flex items-start space-x-3"><MapPin className="text-emerald-600 flex-shrink-0 w-5 h-5 mt-0.5" /><div><div className="font-semibold text-gray-900">Australia, a New Chapter</div><p className="text-sm text-gray-600">Inquiries are open. Dates, guides, pricing and availability will be confirmed personally before booking.</p></div></div>}</div></CardContent></Card>
          {topic ? <Card className="border-0 shadow-lg bg-white"><CardContent className="p-6"><h4 className="text-lg font-bold text-gray-900 mb-4">Explore AVES</h4><nav aria-label="Destinations" className="space-y-2">{[["https://aves.bio/colombia", "Colombia"], ["https://aves.bio/australia", "Australia"], ["https://aves.bio/new-zealand", "New Zealand"]].map(([href, label]) => <a key={href} href={href} className="flex min-h-11 items-center gap-2 rounded text-sm font-medium text-emerald-700 underline"><ArrowRight className="h-4 w-4" aria-hidden="true" />{label}</a>)}</nav></CardContent></Card> : <Card className="border-0 shadow-lg bg-white"><CardContent className="p-6"><h4 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h4><div className="space-y-3">{[["/aves-explorer","Explore Australian Regions"],["/species","Discover Australian Birdlife"],["/about","About AVES Australia"]].map(([href,label]) => <Link key={href} href={href} className="flex items-center text-emerald-600 hover:text-emerald-700 text-sm"><ArrowRight className="w-4 h-4 mr-2" />{label}</Link>)}</div></CardContent></Card>}</div>
      </div></div>
      {showFAQ && <div className="mt-16 max-w-4xl mx-auto space-y-6"><h3 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h3>{[["Can I book a tour now?","We are welcoming inquiries while our Australian offering takes shape. Arrangements, availability and pricing will be confirmed personally before any booking."],["Do I need birding experience?","Curiosity is a good starting point. Tell us about your interests and experience so we can discuss an appropriate journey."],["What will the launch list send me?","Australian launch news and trip updates. To leave the list, use the unsubscribe request linked from our privacy notice."]].map(([question,answer]) => <Card className="border-0 shadow-lg bg-white" key={question}><CardContent className="p-6"><h4 className="text-lg font-semibold text-gray-900 mb-3">{question}</h4><p className="text-gray-600 leading-relaxed">{answer}</p></CardContent></Card>)}</div>}
    </div>
  </section>
}
