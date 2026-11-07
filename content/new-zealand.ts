/** Public inspiration only. Private guest plans must never be included here. */
export const newZealandRegions = [
  {
    id: "north-island", name: "North Island", subtitle: "Forest, islands and living culture",
    description: "Begin with native bush and island sanctuaries. Tiritiri Matangi brings conservation close, with opportunities to encounter tūī, bellbirds and takahē.",
    birds: "Tūī, pīwakawaka and sanctuary populations of takahē",
    balance: "Leave time for museums, galleries, local food and Māori-led cultural experiences that welcome visitors.",
    source: "https://www.doc.govt.nz/tiritirimatangi",
  },
  {
    id: "south-island", name: "South Island", subtitle: "Mountains, native forest and wild coasts",
    description: "Follow the landscape from beech forest to alpine country. Arthur’s Pass offers a setting for kea and forest birds; Nelson Lakes and the northwest coast can inspire a slower northern journey.",
    birds: "Kea in mountain country; tūī and pīwakawaka in suitable forest habitat",
    balance: "Combine nature with art, regional food, scenic walks and unhurried stays. Choose a manageable area rather than racing around the island.",
    source: "https://www.doc.govt.nz/parks-and-recreation/places-to-go/canterbury/places/arthurs-pass-national-park/",
  },
  {
    id: "rakiura", name: "Stewart Island / Rakiura", subtitle: "Southern forest and island birdlife",
    description: "Rakiura and nearby Ulva Island / Te Wharawhara offer forest and coastal encounters. Ulva’s birdlife includes tūī, bellbirds, tīeke and mohua, with tokoeka an elusive possibility.",
    birds: "Tokoeka, tūī and a rich community of forest birds",
    balance: "Allow time for island travel, weather and quiet coastal exploration. This is a separate southern extension, not a quick stop on a northern route.",
    source: "https://www.doc.govt.nz/parks-and-recreation/places-to-go/southland/places/stewart-island-rakiura/ulva-island-te-wharawhara",
  },
] as const

export const newZealandBirds = [
  { name: "Kea", scientific: "Nestor notabilis", habitat: "Mountains", where: "South Island mountain country, including Arthur’s Pass National Park.", note: "An inquisitive parrot worth watching patiently. Keep food and belongings secure, and never feed it.", source: "https://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/kea/" },
  { name: "Tūī", scientific: "Prosthemadera novaeseelandiae", habitat: "Forest & gardens", where: "Native forest and flowering vegetation across the North, South and Stewart Islands.", note: "Listen as well as look: its varied calls can turn a gentle forest walk into a memorable encounter.", source: "https://www.doc.govt.nz/tui/" },
  { name: "Pīwakawaka / New Zealand fantail", scientific: "Rhipidura fuliginosa", habitat: "Woodland", where: "Widespread in suitable habitat; Arthur’s Pass and Ulva Island are examples of places to look.", note: "Watch for quick movements and a fanned tail as it catches small insects.", source: "https://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/fantail-piwakawaka/" },
  { name: "Takahē", scientific: "Porphyrio hochstetteri", habitat: "Conservation sanctuaries", where: "Selected protected sites, including Tiritiri Matangi in the North Island.", note: "Also known as South Island takahē. The name does not limit its present-day sanctuary locations to that island.", source: "https://www.doc.govt.nz/tiritirimatangi" },
  { name: "Kororā / Little penguin", scientific: "Eudyptula minor", habitat: "Coast", where: "Coastal areas around New Zealand, including offshore islands such as Tiritiri Matangi.", note: "Plan around a site's viewing guidance and season. Give birds space and keep clear of nesting areas.", source: "https://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/penguins/little-penguin-korora/" },
  { name: "Tokoeka / Southern brown kiwi", scientific: "Apteryx australis", habitat: "Forest & southern landscapes", where: "Haast, Fiordland and Rakiura; viewing opportunities vary considerably between locations.", note: "A special possibility, never a promised sighting. Follow local guidance and let wildlife set the pace.", source: "https://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/kiwi/tokoeka/" },
] as const

export const newZealandContactHref = "/australia/contact?topic=new-zealand#inquiry"

// Existing Cornell/other published links verified on 7 November 2026.
// These are outbound resources, not a live eBird data or media integration.
export const newZealandEbirdLinks: Readonly<Record<string, string>> = {
  "Prosthemadera novaeseelandiae": "https://ebird.org/species/tui1",
  "Rhipidura fuliginosa": "https://ebird.org/species/nezfan1",
  "Porphyrio hochstetteri": "https://ebird.org/species/takahe3",
  "Eudyptula minor": "https://ebird.org/species/litpen1",
  "Apteryx australis": "https://ebird.org/species/sobkiw1/",
}
