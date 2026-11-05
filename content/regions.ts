export type Region = {
  id: string
  state: string
  name: string
  landscape: string
  category: "Rainforest" | "Coast & bush" | "Island wilds"
  image: string
  alt: string
  photoCaption?: string
  description: string
  detail: string
  source: string
  gateway: string
  planningLength: string
  season: { summary: string; detail: string }
  pace: string
  habitats: string[]
  birds: { name: string; note: string }[]
  places: { name: string; detail: string }[]
  planningNotes: string[]
  sources: { title: string; url: string }[]
}

// Regional facts draw on the linked park, tourism and BirdLife sources.
// Suggested lengths and pacing are AVES planning ideas, not published tour products.
export const regions: Region[] = [
  {
    id: "queensland", state: "Queensland", name: "Into the green", landscape: "Cairns & the Atherton Tablelands",
    category: "Rainforest", image: "/images/queensland.jpg", alt: "A shaded creek beneath palms and dense leaves in the Daintree rainforest, north of Cairns",
    photoCaption: "Daintree rainforest, north of Cairns, in the wider Wet Tropics. Our planning focus here is Cairns and the Atherton Tablelands.",
    description: "Begin around Cairns and the Atherton Tablelands, where rainforest, crater lakes and open wetlands invite very different ways of watching birds.",
    detail: "Our Queensland focus is the Wet Tropics around Cairns and the Atherton Tablelands. A quiet forest walk can be paired with time at a wetland hide, leaving room to listen, watch and return to a favourite place. This is a starting point within a much larger state; routes and arrangements will be shaped around your interests.",
    source: "https://www.birdlifenq.org/birding",
    gateway: "Cairns, with time based on the Atherton Tablelands",
    planningLength: "4–6 days as a planning starting point",
    season: {
      summary: "Consider the drier months, or plan specifically for the wet season",
      detail: "April–October is a useful starting point for a drier-season conversation. Queensland Parks identifies November–March as the main wet season around Atherton. Summer can bring riflebird displays at Crater Lakes, while changing water levels reshape the birdlife at Hasties Swamp. Timing depends on your interests, rainfall and current access—not a guaranteed species list.",
    },
    pace: "Allow unhurried time at hides and along forest tracks. Choose walking distances around your comfort with gradients, wet ground and warm conditions; a short walk can still deserve a long pause.",
    habitats: ["Upland rainforest", "Crater-lake margins", "Seasonal freshwater wetlands", "Woodland edges"],
    birds: [
      { name: "Victoria’s riflebird", note: "A rainforest bird recorded at Crater Lakes. Queensland Parks notes that males may display on exposed perches in summer." },
      { name: "Chowchilla", note: "A forest-floor specialist at Crater Lakes. Listen for groups calling and moving through the leaf litter without leaving the track to follow them." },
      { name: "Magpie goose", note: "One of the waterbirds recorded at Hasties Swamp. Water levels and food availability influence what a visit reveals." },
    ],
    places: [
      { name: "Cairns and its surrounds", detail: "A gateway to this part of Queensland. BirdLife Northern Queensland separates Cairns and the Atherton Tablelands into useful birding areas; allow travel time rather than treating every habitat as one stop." },
      { name: "Lake Eacham and Lake Barrine", detail: "The two sections of Crater Lakes National Park combine rainforest tracks with lake margins. Lake Barrine’s shallower, vegetated edges offer a different waterbird setting from Lake Eacham." },
      { name: "Hasties Swamp National Park", detail: "A wetland near Atherton with a bird hide. Queensland Parks lists the lower hide floor and toilets as wheelchair-accessible; check the current approach and facilities against your own needs." },
    ],
    planningNotes: [
      "Tell us whether your priority is rainforest birds, waterbirds, photography or a little of each. That choice matters more than fitting the most stops into a day.",
      "Pack for changing conditions between coast and tablelands. Atherton can have cool winter nights even when the coast feels warm.",
      "Check Queensland Parks alerts before travel, and leave flexibility for rain, track conditions and any seasonal closures.",
    ],
    sources: [
      { title: "BirdLife Northern Queensland — birding regions", url: "https://www.birdlifenq.org/birding" },
      { title: "Queensland Parks — Crater Lakes National Park", url: "https://parks.qld.gov.au/parks/crater-lakes" },
      { title: "Queensland Parks — Crater Lakes wildlife", url: "https://parks.qld.gov.au/parks/crater-lakes/about/culture" },
      { title: "Queensland Parks — Hasties Swamp wildlife", url: "https://parks.qld.gov.au/parks/hasties-swamp/about/culture" },
      { title: "Queensland Parks — Hasties Swamp access and climate", url: "https://parks.qld.gov.au/parks/hasties-swamp/visiting-safely" },
    ],
  },
  {
    id: "new-south-wales", state: "New South Wales", name: "A wilder kind of blue", landscape: "Sydney coast & woodland",
    category: "Coast & bush", image: "/images/new-south-wales.jpg", alt: "Tall trees and grass trees in Royal National Park near Otford Lookout",
    photoCaption: "Bushland near Otford Lookout in Royal National Park, south of Sydney.",
    description: "Look beyond the city to Royal National Park’s forest and coast, then inland to the woodland and wetlands of the Hawkesbury area.",
    detail: "Our New South Wales focus begins in Sydney and its surrounds. Royal National Park to the south and Cattai National Park to the north-west offer contrasting habitats, best considered as separate outings. There is no need to cover the whole state to give your birding day a change of scene.",
    source: "https://www.nationalparks.nsw.gov.au/visit-a-park/parks/royal-national-park",
    gateway: "Sydney, with separate outings south and north-west",
    planningLength: "2–4 days as a planning starting point",
    season: {
      summary: "A year-round starting point, with a different emphasis each season",
      detail: "Royal National Park can be explored in every season. Spring adds heathland wildflowers; cooler winter days can suit coastal walking. Woodland and wetland visits depend on recent weather and access. In hotter conditions, plan shorter walks and check fire and park alerts rather than relying on a season label alone.",
    },
    pace: "Mix time beside water with forest or woodland walks. Royal’s Forest path is a 4.4 km Grade 3 loop; Mitchell Park offers several linked options. Choose a specific track before judging whether an outing suits your walking or access needs.",
    habitats: ["Coastal heath", "Sheltered rainforest", "Eucalypt and ironbark woodland", "Creek margins and wetlands"],
    birds: [
      { name: "Superb lyrebird", note: "Sydney’s forest birdlife includes this remarkable mimic. NSW Environment records it in rainforest habitats, including Royal National Park." },
      { name: "Glossy black-cockatoo", note: "Listed among the birds visiting Mitchell Park’s woodland. A record of a species is a reason to learn about its habitat, not a promise of an encounter." },
      { name: "Laughing kookaburra", note: "An unmistakable voice of open woodland and forest, included in NSW Parks’ wildlife information for Cattai." },
    ],
    places: [
      { name: "Royal National Park: Forest path", detail: "A loop beside Bola Creek and the Hacking River, with cabbage-tree palms and forest shade. Allow extra time beyond the park’s walking estimate if you want to stop and observe." },
      { name: "Royal National Park: the coast", detail: "Heathland and ocean-facing landscapes offer a different setting from the forest. Pick an appropriate section and consult current track advice; exposed coastal walking is a separate choice from a sheltered birding stop." },
      { name: "Mitchell Park, Cattai National Park", detail: "Linked tracks pass through woodland, remnant rainforest and wetlands near Windsor. The park describes shorter and longer loops, making route choice an important part of planning." },
    ],
    planningNotes: [
      "Share where you are staying in Sydney. Travel across the city and between parks needs to be part of the day, not an afterthought.",
      "Tell us your comfortable walking distance and any access needs. A park’s easy-sounding description does not mean every track is step-free.",
      "Check the official park pages for alerts, track information and entry arrangements close to your visit. Leave birds space around nests and feeding areas.",
    ],
    sources: [
      { title: "NSW Parks — Royal National Park visitor information", url: "https://www.nationalparks.nsw.gov.au/visit-a-park/parks/royal-national-park/visitor-info" },
      { title: "NSW Parks — Forest path", url: "https://www.nationalparks.nsw.gov.au/things-to-do/walking-tracks/forest-path" },
      { title: "NSW Parks — Mitchell Park walking tracks", url: "https://www.nationalparks.nsw.gov.au/things-to-do/walking-tracks/mitchell-park-walking-tracks" },
      { title: "NSW Parks — Cattai habitats and wildlife", url: "https://www.nationalparks.nsw.gov.au/visit-a-park/parks/cattai-national-park/learn-more" },
      { title: "NSW Environment — Sydney’s native biodiversity", url: "https://www.environment.nsw.gov.au/about-us/get-involved/sydney-nature/native-biodiversity" },
    ],
  },
  {
    id: "tasmania", state: "Tasmania", name: "Take the slow way", landscape: "Hobart & Bruny Island",
    category: "Island wilds", image: "/images/bruny-island.jpg", alt: "Golden beach, blue water and coastal scrub seen from The Neck towards Adventure Bay on Bruny Island",
    photoCaption: "Looking from The Neck towards Adventure Bay on Bruny Island.",
    description: "Start from Hobart and give Bruny Island room in your plans: quiet woodland, coastal heath and birds found nowhere beyond Tasmania.",
    detail: "Our Tasmanian starting point is Hobart and Bruny Island, rather than a race around the whole state. Eucalypt forest, heath and shorelines can shape a slower journey with time to notice the differences between habitats. An island crossing is part of the experience—and part of the time you need to allow.",
    source: "https://parks.tas.gov.au/explore-our-parks/south-bruny-national-park",
    gateway: "Hobart, then Kettering for the Bruny Island ferry",
    planningLength: "4–6 days as a planning starting point",
    season: {
      summary: "Spring and summer offer longer days; stay flexible in every season",
      detail: "Tasmania’s spring runs from September to November and summer from December to February. These are useful starting points for more daylight and time outdoors, rather than a guarantee of warm weather or particular birds. Autumn and winter can also suit a slower visit; plan around shorter days and changing conditions, especially on exposed coasts.",
    },
    pace: "Make room for the ferry and for time on Bruny itself. Discuss gentle observation stops separately from longer coastal walks, and keep an alternative for days when wind or weather changes your plans.",
    habitats: ["Dry eucalypt woodland", "Taller eucalypt forest", "Coastal heath and scrub", "Beaches and sheltered shorelines"],
    birds: [
      { name: "Forty-spotted pardalote", note: "A Tasmanian endemic associated with white-gum woodland. This small bird’s specialised habitat deserves careful, low-disturbance observation." },
      { name: "Dusky robin", note: "Another Tasmanian endemic, found in woodland, eucalypt forest and coastal heath. Tasmania Parks documents it on Bruny Island." },
      { name: "Black-headed honeyeater", note: "An endemic honeyeater documented on Bruny Island by Tasmania Parks. Spend time getting to know the island’s birds rather than treating them as a checklist." },
    ],
    places: [
      { name: "Hobart and the crossing from Kettering", detail: "Hobart is the starting point for this southern focus. Bruny Island is reached by vehicle and passenger ferry from Kettering; check the operator’s current timetable and allow for peak-period queues." },
      { name: "Adventure Bay and South Bruny", detail: "An introduction to the island’s coastal setting, with access to walks in South Bruny National Park. Choose routes for their terrain and conditions as well as the view." },
      { name: "South Bruny’s forest, heath and shores", detail: "The national park protects distinct eucalypt and coastal habitats. Beach-nesting birds share this landscape: respect protective fencing and give birds and nesting areas a wide berth." },
    ],
    planningNotes: [
      "Leave time between your mainland arrival, the ferry and your first walk. Check current ferry arrangements rather than building a tight connection around an assumed crossing time.",
      "Bring layers and weather protection. A sunny start does not remove the need to prepare for wind or changing coastal conditions.",
      "Check park passes and alerts, stay on permitted routes and minimise driving at night, when wildlife shares the roads. Specific dates, guides and availability still need to be agreed.",
    ],
    sources: [
      { title: "Tasmania Parks — South Bruny National Park", url: "https://parks.tas.gov.au/explore-our-parks/south-bruny-national-park" },
      { title: "Tasmania Parks — birds and their habitats", url: "https://parks.tas.gov.au/discovery-and-learning/wildlife/birds" },
      { title: "Tourism Tasmania — Bruny Island", url: "https://www.discovertasmania.com.au/regions/hobart-and-south/bruny-island/" },
      { title: "Tourism Tasmania — seasons", url: "https://www.discovertasmania.com.au/planning/seasons/" },
      { title: "Tasmania Parks — seabirds and shorebirds", url: "https://parks.tas.gov.au/discovery-and-learning/wildlife/seabirds-and-shorebirds" },
    ],
  },
]
