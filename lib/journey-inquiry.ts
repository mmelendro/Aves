import destinations from "@/content/contact-destinations.json"

export type ContactCountry = keyof typeof destinations
export type ContactMode = "journey" | "message" | "updates"
export const contactDestinations = destinations
export const contactReasons = {
  general: "A question or idea", account: "Account or proposal help", partnership: "Working with AVES",
  privacy: "My information and privacy", unsubscribe: "Stop optional updates",
} as const
export const contactInterests = { birds: "Birds and wildlife", scenery: "Scenery and gentle walks", photography: "Photography", food: "Food and local produce", culture: "Art, history and host-led culture", water: "Coasts and water activities", wellness: "Wellness and downtime" } as const
export const contactChoices = {
  pace: { open: "Help me decide", relaxed: "Relaxed, with free time", balanced: "Outings and downtime", active: "Active, with full days" },
  birding: { open: "Help me decide", occasional: "A few special outings", alternate: "Every other day", daily: "Birding most days" },
  comfort: { open: "Help me decide", simple: "Simple and comfortable", comfortable: "Comfortable hotels or lodges", special: "Some special stays" },
  experience: { open: "Help me decide", new: "New to birding", casual: "Casual birder", experienced: "Experienced birder" },
} as const
export const contactCurrencies = ["AUD", "NZD", "USD", "CAD", "EUR", "GBP", "COP"] as const
export type JourneyAnswers = {
  country: ContactCountry; regions: string[]; interests: string[]; travelWhen: string; duration: string; partySize: string; ages: string
  pace: string; birding: string; comfort: string; experience: string; targets: string; budget: string; currency: string; practical: string
}
export type ContactDetails = { name: string; email: string; phone: string; reply: string; language: string; message: string; updates: boolean; website: string }
export const isContactCountry = (value: unknown): value is ContactCountry => typeof value === "string" && Object.hasOwn(destinations, value)
const aliases: Record<string,string> = {"sierra-nevada":"sierra-nevada-de-santa-marta", "pacific-choco":"pacific", "eastern-plains":"llanos", amazon:"amazonia", "cauca-river":"cauca-valley"}
export function initialJourney(country: ContactCountry): JourneyAnswers {
  return {country,regions:[],interests:[],travelWhen:"",duration:"",partySize:"",ages:"",pace:"open",birding:"open",comfort:"open",experience:"open",targets:"",budget:"",currency:country === "colombia" ? "USD" : country === "new-zealand" ? "NZD" : "AUD",practical:""}
}
export function inquiryHints(search: string, defaultCountry: ContactCountry, initialTopic?: string) {
  const query = new URLSearchParams(search)
  const topic = initialTopic || query.get("topic") || ""
  const requested = query.get("country") || (topic === "new-zealand" ? "new-zealand" : "")
  const country = isContactCountry(requested) ? requested : defaultCountry
  const reason = Object.hasOwn(contactReasons, topic) ? topic as keyof typeof contactReasons : "general"
  const mode: ContactMode = topic && Object.hasOwn(contactReasons, topic) ? "message" : query.get("intent") === "waitlist" ? "updates" : "journey"
  const answers = initialJourney(country)
  answers.regions = [...new Set((query.get("region") || query.get("regions") || "").split(",").map(value => country === "colombia" && Object.hasOwn(aliases,value) ? aliases[value] : value).filter(value => destinations[country].regions.some(region => region.id === value))) ]
  const tour = query.get("tour") || query.get("preset")
  if (tour === "vision") answers.interests = ["photography"]
  else if (tour === "adventure") answers.interests = ["birds", "scenery"]
  else if (tour === "souls") answers.interests = ["culture", "wellness"]
  else if (tour === "elevate") answers.interests = ["scenery", "wellness"]
  return {answers,mode,reason}
}
const line = (value: string, max: number) => value.trim().replace(/[\u0000-\u001f\u007f]/g," ").slice(0,max)
const optional = (label: string, value: string) => value ? `${label}: ${value}` : ""
export function journeySummary(answers: JourneyAnswers) {
  const country = destinations[answers.country]
  return [
    {label:"Destination",value:country.label},
    {label:"Regions",value:country.regions.filter(region=>answers.regions.includes(region.id)).map(region=>region.label).join(", ") || "Open to suggestions"},
    {label:"When",value:line(answers.travelWhen,160)||"Flexible"},
    {label:"Duration",value:answers.duration ? `${answers.duration} days` : "Open to suggestions"},
    {label:"Travellers",value:answers.partySize || "Still deciding"},
    {label:"Interests",value:Object.entries(contactInterests).filter(([id])=>answers.interests.includes(id)).map(([,label])=>label).join(", ") || "Open to suggestions"},
    ...(["pace","birding","comfort","experience"] as const).map(key=>({label:({pace:"Holiday pace",birding:"Birding frequency",comfort:"Accommodation",experience:"Birding experience"})[key],value:contactChoices[key][answers[key] as keyof typeof contactChoices[typeof key]] || "Help me decide"})),
    {label:"Indicative budget",value:answers.budget ? `${answers.currency} ${answers.budget} per person for the trip, excluding international flights` : "Discuss together"},
    ...(answers.ages ? [{label:"Children / age groups",value:line(answers.ages,80)}] : []),
    ...(answers.targets ? [{label:"Birds, wildlife or places you would love to see",value:answers.targets.trim()}] : []),
    ...(answers.practical ? [{label:"Practical preferences",value:answers.practical.trim()}] : []),
  ]
}
/** A single existing contact API contract, with planning details in a bounded readable message. No database, mail or browser storage side effects. */
export function makeJourneyInquiry(mode: ContactMode, answers: JourneyAnswers, details: ContactDetails, reason: keyof typeof contactReasons = "general") {
  if (!isContactCountry(answers.country)) throw new Error("Choose an available destination.")
  for (const [value,max] of [[details.name,120],[details.email,254],[details.message,1200],[details.phone,60],[answers.targets,500],[answers.practical,500],[answers.travelWhen,160],[answers.ages,80]] as const) if(value.length>max) throw new Error("One of your answers is too long. Please shorten it before sending.")
  if (!["email","phone","whatsapp"].includes(details.reply)) throw new Error("Choose an available reply method.")
  const name=line(details.name,120),email=line(details.email,254)
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Enter your name and a valid email address.")
  if (mode === "updates" && !details.updates) throw new Error("Choose whether you would like updates before joining the list.")
  if (mode === "message" && !details.message.trim()) throw new Error("Add a message so we know how to help.")
  if (mode !== "updates" && details.reply !== "email" && !line(details.phone,60)) throw new Error("Add a phone number for your preferred reply method, or choose email.")
  if (!Object.hasOwn(contactReasons,reason)) throw new Error("Choose a recognised contact reason.")
  const selected=destinations[answers.country].regions.filter(region=>answers.regions.includes(region.id))
  if (mode === "journey") {
    for (const [value,max,label] of [[answers.duration,120,"duration"],[answers.partySize,50,"group size"]] as const) if(value && (!/^\d+$/.test(value)||Number(value)<1||Number(value)>max)) throw new Error(`Check your ${label}.`)
    if (answers.budget && (!/^\d+(\.\d{1,2})?$/.test(answers.budget)||Number(answers.budget)<=0||Number(answers.budget)>1e9||!contactCurrencies.includes(answers.currency as typeof contactCurrencies[number]))) throw new Error("Check the budget amount and currency.")
  }
  const text=details.message.trim().slice(0,1200)
  const message = mode === "updates" ? "" : [
    mode === "journey" ? "Journey planning enquiry" : `Request: ${contactReasons[reason]}`,
    ...(mode === "journey" ? journeySummary(answers).map(row=>`${row.label}: ${row.value}`) : []),
    optional("Preferred reply",line(details.reply,20)),optional("Phone",line(details.phone,60)),optional("Preferred language",line(details.language,40)),text,
  ].filter(Boolean).join("\n\n")
  if(message.length>5000) throw new Error("Please shorten your request before sending.")
  return {country:answers.country,intent:mode === "updates" ? "waitlist" as const : "inquiry" as const,name,email,
    region:mode === "journey" && selected.length===1 ? selected[0].id : "",travelWhen:mode === "journey" ? line(answers.travelWhen,160) : "",
    partySize:mode === "journey" && answers.partySize ? Number(answers.partySize) : "",message,updates:mode !== "message" && details.updates,website:details.website}
}
