/**
 * Public South Island starting points, not a fixed route or confirmed inventory.
 * These short notes reuse the existing bird profiles and official DOC place
 * guides. Keep private guest preferences in their owned My Trips brief.
 * Official links were reviewed on 8 November 2026; recheck access before travel.
 */
export const southIslandBriefHref = "/account?country=new-zealand&region=south-island"

export const southIslandPlaces = [
  {
    id: "mountains",
    habitat: "Mountain country",
    name: "Arthur’s Pass",
    birds: "Kea, bellbirds and pīwakawaka",
    description: "Beech forest and alpine landscapes meet around the main divide. Start with the walks and habitats that suit your group rather than making altitude the goal.",
    balance: "Pair a birding morning with a short scenic walk and time to settle into your surroundings.",
    source: { title: "DOC — Arthur’s Pass National Park", url: "https://www.doc.govt.nz/parks-and-recreation/places-to-go/canterbury/places/arthurs-pass-national-park/" },
  },
  {
    id: "forest-and-lakes",
    habitat: "Beech forest & lakes",
    name: "Nelson Lakes",
    birds: "Kākā, korimako and forest birds",
    description: "The Rotoiti Nature Recovery Project offers a way into the birdlife of the northern South Island’s beech forest. Take time to listen before moving on.",
    balance: "Leave room for a lakeside wander, a relaxed meal and another night in the same base.",
    source: { title: "DOC — Nelson Lakes National Park", url: "https://www.doc.govt.nz/parks-and-recreation/places-to-go/nelson-tasman/places/nelson-lakes-national-park/" },
  },
  {
    id: "southern-forest",
    habitat: "Southern forest & rivers",
    name: "Fiordland",
    birds: "Kākā, toutouwai and whio in suitable habitat",
    description: "Forested valleys, rivers and lakes invite a different pace. Choose a few accessible habitats around your base, with local advice on conditions and places to look.",
    balance: "Combine forest time with an unhurried lakeside afternoon or a separately arranged landscape outing.",
    source: { title: "DOC — Fiordland National Park", url: "https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/places/fiordland-national-park/" },
  },
  {
    id: "coast",
    habitat: "Coastal landscapes",
    name: "Otago & the Catlins",
    birds: "Hoiho and other coastal birdlife",
    description: "Research managed wildlife viewing along the south-eastern coast. Penguin habitats need quiet, protected access; use designated viewing arrangements and follow current local guidance.",
    balance: "Enjoy coastal scenery, food and town time away from sensitive landing and nesting areas.",
    source: { title: "DOC — Yellow-eyed penguin / hoiho", url: "https://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/penguins/yellow-eyed-penguin-hoiho/" },
  },
] as const

/** Practical prompts, not a booked route or live conditions feed.
 * Official DOC and NZTA guidance checked 9 November 2026. Keep changing
 * access/road information at the source rather than copying it into AVES.
 */
export const southIslandPlanning = [
  {
    title: "Choose a base, leave room to explore",
    intro: "Start with the habitats that matter most to you, then choose a manageable area. Several nights in one base can leave more room for early outings, relaxed meals and a change of plans.",
    points: [
      "Compare mountain and forest time around Arthur’s Pass or Nelson Lakes with southern forest and lake outings in Fiordland, or a coastal focus around Otago and the Catlins.",
      "These are alternative starting areas, not a suggested driving circuit. Match your arrival and departure points to the areas you choose before arranging transport.",
      "Tell us your walking comfort, preferred stays and how much driving feels right. Access and accommodation suitability need individual confirmation.",
    ],
    link: { title: "Compare the habitats and places", href: "#places" },
  },
  {
    title: "Prepare for the day you are planning",
    intro: "Choose outings that suit your group and check current advice for the specific place. A scenic alternative or quieter day belongs in the plan too.",
    points: [
      "Review DOC’s access advice, alerts and weather guidance before heading out; conditions can change after an itinerary is drafted.",
      "Take suitable layers, food and the equipment your outing needs. Share your intentions and plan how to get help where reception is limited.",
      "Bird activity and viewing arrangements depend on place and season. Check local guidance, give wildlife space and keep sensitive nesting areas undisturbed.",
    ],
    link: { title: "DOC: prepare for an outdoor trip", href: "https://www.doc.govt.nz/parks-and-recreation/know-before-you-go/be-prepared/" },
  },
  {
    title: "Check the journey, not just the distance",
    intro: "Leave space between an arrival, a drive and an early birding start. Build the route around the pace you enjoy, rather than the number of stops you can fit in.",
    points: [
      "Use NZTA’s current journey information for travel times, roadworks and incidents; recheck before each travel day.",
      "Allow for breaks, weather and time at the places along the way. A map distance alone does not tell you how a day will feel.",
      "Keep dates, arrival and departure points, existing arrangements and your preferred pace in your private brief. Routes and reservations are confirmed separately.",
    ],
    link: { title: "NZTA: plan your journey", href: "https://nzta.govt.nz/travelling-on-our-roads/plan-your-journey" },
  },
] as const

/** Curated outbound resources, checked 9 November 2026 on publisher pages.
 * Linking does not grant media reuse rights: keep playback with the publisher.
 * Offshore conservation footage is labelled so it is not mistaken for trip access.
 */
export const southIslandResources = [
  { id: "mohua-podcast", kind: "Podcast", title: "Bird nerding with Graeme Elliott", publisher: "DOC · Sounds of Science · Episode 36", context: "Fiordland forest birds", description: "Hear a conservation scientist discuss mohua research and the relationship between beech seed cycles and bird conservation. A useful companion to exploring the island’s forest habitats.", href: "https://www.doc.govt.nz/news/podcast/", action: "Find episode 36 on DOC" },
  { id: "kiwi-podcast", kind: "Podcast", title: "Field yarns with Tim Raemaekers — part 2", publisher: "DOC · Sounds of Science · Episode 26", context: "Fiordland kiwi conservation", description: "A ranger’s perspective on monitoring tokoeka at Shy Lake and the challenges of protecting kiwi. Look for episode 26 in DOC’s episode list.", href: "https://www.doc.govt.nz/news/podcast/", action: "Find episode 26 on DOC" },
  { id: "kiwi-diaries", kind: "Documentary", title: "The Fiordland Kiwi Diaries", publisher: "Department of Conservation · Three-part series", context: "Fiordland", description: "Follow the rangers working to protect tokoeka in remote Fiordland. The series adds context to the landscape; its fieldwork locations are not a suggested visitor itinerary.", href: "https://www.doc.govt.nz/fiordland-kiwi-diaries", action: "Watch the series on DOC" },
  { id: "kakapo-highlights", kind: "Video", title: "Kākāpō Cam: Best from the nest", publisher: "Department of Conservation · Recorded highlights", context: "Whenua Hou · Offshore conservation context", description: "Watch nest-camera highlights from Whenua Hou / Codfish Island. This is recorded conservation footage, not a live feed or an ordinary South Island visitor stop.", href: "https://www.doc.govt.nz/kakapocam", action: "Watch highlights on DOC" },
  { id: "kea-reading", kind: "Reading", title: "Get to know the kea", publisher: "New Zealand Birds Online · Species reference", context: "South Island mountain country", description: "Read about identification, behaviour and the natural history of the mountain parrot featured in our carousel. Use it to learn the bird rather than to predict a sighting.", href: "https://www.nzbirdsonline.org.nz/species/kea", action: "Read the kea reference" },
  { id: "nelson-lakes-reading", kind: "Reading", title: "Explore Nelson Lakes on paper first", publisher: "Department of Conservation · Park guide", context: "Northern South Island", description: "Explore the park’s official visitor information and walking resources before deciding which forest-and-lake outings suit you. Recheck access advice when planning your day.", href: "https://www.doc.govt.nz/parks-and-recreation/places-to-go/nelson-tasman/places/nelson-lakes-national-park/", action: "Read the Nelson Lakes guide" },
] as const
