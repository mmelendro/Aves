/**
 * Public Australian region-guide content: landscapes, seasons, birds and planning notes.
 * The Region type names the fields used by app/regions/[slug]/page.tsx.
 * IDs connect guides, maps and inquiry presets; changing an ID can break those links.
 */
export type Region = {
  id: string
  state: string
  name: string
  landscape: string
  category: "Rainforest" | "Coast & bush" | "Island wilds" | "Wetlands & woodland" | "Lagoons & coast" | "Tropical wetlands" | "Forest & highlands"
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
  birds: { name: string; note: string; whereFound: string }[]
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
      { name: "Victoria’s riflebird", note: "A rainforest bird recorded at Crater Lakes. Queensland Parks notes that males may display on exposed perches in summer.", whereFound: "Rainforest at Crater Lakes National Park, on Queensland’s Atherton Tablelands." },
      { name: "Chowchilla", note: "A forest-floor specialist at Crater Lakes. Listen for groups calling and moving through the leaf litter without leaving the track to follow them.", whereFound: "The rainforest floor at Crater Lakes National Park, Atherton Tablelands, Queensland." },
      { name: "Magpie goose", note: "One of the waterbirds recorded at Hasties Swamp. Water levels and food availability influence what a visit reveals.", whereFound: "Seasonal freshwater wetlands at Hasties Swamp National Park near Atherton, Queensland." },
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
      { name: "Superb lyrebird", note: "Sydney’s forest birdlife includes this remarkable mimic. NSW Environment records it in rainforest habitats, including Royal National Park.", whereFound: "Sheltered forest and rainforest in Royal National Park, south of Sydney, New South Wales." },
      { name: "Glossy black-cockatoo", note: "Listed among the birds visiting Mitchell Park’s woodland. A record of a species is a reason to learn about its habitat, not a promise of an encounter.", whereFound: "Woodland around Mitchell Park in Cattai National Park, north-west of Sydney, New South Wales." },
      { name: "Laughing kookaburra", note: "An unmistakable voice of open woodland and forest, included in NSW Parks’ wildlife information for Cattai.", whereFound: "Open forest and woodland in Cattai National Park, New South Wales." },
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
      { name: "Forty-spotted pardalote", note: "A Tasmanian endemic associated with white-gum woodland. This small bird’s specialised habitat deserves careful, low-disturbance observation.", whereFound: "White-gum woodland on Bruny Island and a small number of other sites in south-eastern Tasmania." },
      { name: "Dusky robin", note: "Another Tasmanian endemic, found in woodland, eucalypt forest and coastal heath. Tasmania Parks documents it on Bruny Island.", whereFound: "Woodland, eucalypt forest and coastal heath on Bruny Island, Tasmania." },
      { name: "Black-headed honeyeater", note: "An endemic honeyeater documented on Bruny Island by Tasmania Parks. Spend time getting to know the island’s birds rather than treating them as a checklist.", whereFound: "Eucalypt habitats on Bruny Island, within its Tasmanian range." },
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
  {
    id: "victoria", state: "Victoria", name: "Pause beside the wetlands", landscape: "Melbourne & Serendip Sanctuary",
    category: "Wetlands & woodland", image: "/images/region-victoria.jpg", alt: "A gravel path through open grassland and scattered trees at Serendip Sanctuary",
    photoCaption: "Open grassland at Serendip Sanctuary near Lara, Victoria.",
    description: "Begin near Melbourne and Geelong, where Serendip Sanctuary brings grassland, woodland and changing wetlands into a compact landscape.",
    detail: "This Victorian starting point favours time at one place over a long driving circuit. Serendip’s shallow seasonal wetlands and permanent North Arm offer different settings for observation. Build a visit around water levels, the paths open on the day and your preferred pace.",
    source: "https://www.parks.vic.gov.au/places-to-see/parks/serendip-sanctuary",
    gateway: "Melbourne or Geelong, with Serendip near Lara",
    planningLength: "1–3 days as a planning starting point",
    season: {
      summary: "Let rainfall and wetland conditions guide the plan",
      detail: "Water levels change the habitats available to birds at Serendip. Check current conditions rather than assuming the wetlands look the same throughout the year. On hot days, discuss an earlier start and shorter outings; leave room to adapt your route.",
    },
    pace: "Four linked walking trails are each no more than 2 km return. Choose a route and allow time at the hides. Check current works and the exact path surface when discussing mobility needs.",
    habitats: ["Seasonal freshwater wetlands", "Permanent open water", "Open grassland", "Woodland"],
    birds: [
      { name: "Yellow-billed spoonbill", note: "Parks Victoria records this wetland bird at Serendip. Watch quietly from established viewing areas.", whereFound: "Shallow wetlands at Serendip Sanctuary near Lara, Victoria." },
      { name: "Cape Barren goose", note: "One of the geese documented at the sanctuary, where grassland and freshwater habitat meet.", whereFound: "Open ground and shallow freshwater wetlands at Serendip Sanctuary, Victoria." },
      { name: "Whistling kite", note: "Look above the wetlands as well as across the water; the park lists this raptor among its birds.", whereFound: "Skies above the wetlands and woodland at Serendip Sanctuary, Victoria." },
    ],
    places: [
      { name: "Serendip walking trails", detail: "Linked routes and observation hides let you shape a shorter visit without treating every trail as a requirement." },
      { name: "Lake Serendip and North Arm", detail: "Seasonal and permanent water provide contrasting places to pause. Use the routes and viewing areas currently open to visitors." },
    ],
    planningNotes: [
      "Tell us whether you are based in Melbourne or Geelong so travel fits comfortably around the visit.",
      "Share your walking and access needs before choosing a trail. Confirm current construction notices, opening arrangements and facilities with Parks Victoria.",
      "This is a starting point for an enquiry. Dates, guiding arrangements and availability need to be confirmed individually.",
    ],
    sources: [
      { title: "Parks Victoria — Serendip Sanctuary habitats and wildlife", url: "https://www.parks.vic.gov.au/places-to-see/parks/serendip-sanctuary" },
      { title: "Parks Victoria — walks at Serendip Sanctuary", url: "https://www.parks.vic.gov.au/places-to-see/parks/serendip-sanctuary/things-to-do/walks-at-serendip-sanctuary" },
    ],
  },
  {
    id: "south-australia", state: "South Australia", name: "Follow the lagoon light", landscape: "Adelaide & the Coorong",
    category: "Lagoons & coast", image: "/images/region-south-australia.jpg", alt: "Water and coastal vegetation in the Coorong, with the dunes of the Younghusband Peninsula beyond",
    photoCaption: "The Coorong and the dunes of the Younghusband Peninsula, South Australia.",
    description: "Travel from Adelaide towards the Coorong for long lagoon views, pelicans and shorebirds shaped by changing water conditions.",
    detail: "The Coorong is a long landscape, so a good plan begins by choosing a manageable section. Meningie offers a gateway to this lagoon focus. Spend time at established observation points instead of trying to cover the whole national park in a day.",
    source: "https://www.parks.sa.gov.au/parks/coorong-national-park",
    gateway: "Adelaide, travelling towards Meningie and the Coorong",
    planningLength: "2–4 days as a planning starting point",
    season: {
      summary: "Summer adds migratory waterbirds; conditions still shape each visit",
      detail: "The park highlights summer for waterbirds, including migrants. Summer and autumn are generally warm and dry. Keep your itinerary responsive to water levels, heat and current access advice rather than assuming a particular flock will be present.",
    },
    pace: "Combine observation stops with selected short walks. The Jack Point observatory walk is 1.2 km return; longer routes are separate choices. Allow for driving between sites and for unhurried time with binoculars.",
    habitats: ["Coastal lagoons", "Shallow shorebird feeding areas", "Dunes", "Mallee and ephemeral lakes"],
    birds: [
      { name: "Australian pelican", note: "The park’s established observatory gives a distant view towards breeding islands without approaching them.", whereFound: "Coorong breeding islands viewed from Jack Point observatory, South Australia." },
      { name: "Red-necked stint", note: "A small migratory shorebird documented in the Coorong. Give feeding and resting birds plenty of space.", whereFound: "Shallow lagoon margins in Coorong National Park, South Australia." },
      { name: "Banded stilt", note: "One of the waterbirds associated with the lagoon landscape; numbers and locations vary with conditions.", whereFound: "Lagoon shorelines around Parnka Point in Coorong National Park, South Australia." },
    ],
    places: [
      { name: "Jack Point observatory", detail: "An established viewing point overlooking pelican breeding islands. Bring binoculars rather than expecting close access." },
      { name: "Parnka Point", detail: "A lagoon-side starting point for observation or a selected walk, depending on your time and comfort." },
      { name: "Lakes Nature Trail", detail: "A different setting off Loop Road, passing mallee, dunes and seasonal lakes." },
    ],
    planningNotes: [
      "Share your arrival point and the number of nights available; the Coorong rewards a realistic driving plan.",
      "Use designated access and consult current park alerts. Beach driving is not assumed in this suggested focus.",
      "Your enquiry starts a discussion about dates and arrangements; it does not reserve a departure or promise particular birds.",
    ],
    sources: [
      { title: "National Parks South Australia — Coorong National Park", url: "https://www.parks.sa.gov.au/parks/coorong-national-park" },
      { title: "National Parks South Australia — planning a Coorong visit", url: "https://www.parks.sa.gov.au/insider-tips/coorong-itinerary" },
    ],
  },
  {
    id: "western-australia", state: "Western Australia", name: "Listen in the west", landscape: "Perth & Yanchep woodland",
    category: "Wetlands & woodland", image: "/images/region-western-australia.jpg", alt: "Blue lake water bordered by trees and reeds at Yanchep National Park",
    photoCaption: "A lakeside view in Yanchep National Park, north of Perth.",
    description: "Start with Perth’s northern wetlands and Yanchep’s woodland, where western parrots and fairywrens give familiar habitats a different character.",
    detail: "Western Australia is vast; this focus keeps the first conversation close to Perth. Yanchep combines wetland and woodland settings, while Yellagonga’s lakes offer another option nearer the city. Choose time to listen and observe before adding distance to the itinerary.",
    source: "https://www.destinationperth.com.au/blog/post/perths-birds-and-where-to-find-them/",
    gateway: "Perth, with outings north to Yanchep and Yellagonga",
    planningLength: "2–4 days as a planning starting point",
    season: {
      summary: "August–October adds Yanchep’s wildflower season",
      detail: "The park’s visitor guide highlights August to October for wildflowers. That is one useful planning window, rather than a guarantee of bird activity. Water, flowering and daily weather still matter; in hotter conditions, favour shorter outings and discuss early starts.",
    },
    pace: "Yanchep has routes of very different lengths. Choose the actual walk with your distance and access needs in mind; a mention of the park does not imply the longer Ghost House trail is part of your plan.",
    habitats: ["Banksia and eucalypt woodland", "Paperbark wetland margins", "Open lakes", "Bushland"],
    birds: [
      { name: "Carnaby’s black-cockatoo", note: "Destination Perth records this distinctive western cockatoo at Yanchep. Allow space for birds to feed undisturbed.", whereFound: "Woodland in Yanchep National Park, north of Perth, Western Australia." },
      { name: "Western rosella", note: "A western parrot listed among Yanchep’s birds. Its presence is a possibility to plan around, not an assured sighting.", whereFound: "Woodland in Yanchep National Park, Western Australia." },
      { name: "Splendid fairywren", note: "Spend time watching the lower vegetation as well as the canopy; this species is documented at Yanchep.", whereFound: "Bushland and woodland in Yanchep National Park, Western Australia." },
    ],
    places: [
      { name: "Yanchep National Park", detail: "Discuss a route that combines woodland and wetland observation. The visitor centre is a useful place to check current information and the park’s bird list." },
      { name: "Yellagonga Regional Park", detail: "Lake Joondalup and Lake Goollelal provide a second wetland-and-bushland focus within the Perth area." },
    ],
    planningNotes: [
      "Tell us whether you want a Perth-based visit or a wider Western Australian journey; these require very different amounts of travel time.",
      "Check official park alerts, opening and entry arrangements before setting out. Route length and surface should be agreed before a walk is proposed.",
      "Dates, guiding and availability remain subject to individual confirmation through your enquiry.",
    ],
    sources: [
      { title: "Destination Perth — Perth’s birds and where to find them", url: "https://www.destinationperth.com.au/blog/post/perths-birds-and-where-to-find-them/" },
      { title: "WA Parks and Wildlife — Yanchep National Park visitor guide", url: "https://exploreparks.dbca.wa.gov.au/sites/default/files/2022-06/yanchep-national-park-visitor-guide.pdf" },
    ],
  },
  {
    id: "northern-territory", state: "Northern Territory", name: "Watch the wetlands change", landscape: "Darwin, Fogg Dam & Kakadu",
    category: "Tropical wetlands", image: "/images/region-northern-territory.jpg", alt: "A dark storm cloud and curtain of rain above the green wetlands of Fogg Dam",
    photoCaption: "A storm over Fogg Dam near Darwin during the build-up to the wet season.",
    description: "Begin around Darwin’s wetlands, then allow time for Kakadu’s billabongs and floodplains, where water and season set the rhythm.",
    detail: "Fogg Dam and Kakadu belong in a carefully paced Top End plan, not a rushed list of stops. Each wetland changes as water spreads or retreats. Start with your travel dates, heat tolerance and available days, then select places that are open and suitable at that time.",
    source: "https://nt.gov.au/parks/find-a-park/fogg-dam-conservation-area",
    gateway: "Darwin, with separate time for Fogg Dam and Kakadu",
    planningLength: "4–7 days as a planning starting point",
    season: {
      summary: "May–October is a useful dry-season starting point",
      detail: "Kakadu describes May to October as the dry season, when most sites are accessible. Later in the dry, birds can gather around remaining water. Tropical summer brings a different landscape and some flood-related closures; consult current access reports before choosing a route.",
    },
    pace: "Favour early observation and time at established hides, with breaks from the heat. Longer walks and any boat excursion need separate discussion and confirmation. Follow current crocodile safety advice and stay within permitted viewing areas.",
    habitats: ["Seasonal floodplains", "Billabongs", "Freshwater wetlands", "Monsoon forest edges"],
    birds: [
      { name: "Magpie goose", note: "Kakadu’s Mamukala wetland is a documented place to watch these birds as conditions change through the dry season.", whereFound: "Mamukala wetlands in Kakadu National Park, Northern Territory." },
      { name: "Comb-crested jacana", note: "Listed by Parks Australia among Mamukala’s wetland birds. Scan the vegetated water slowly from the viewing area.", whereFound: "Vegetated billabong habitat at Mamukala, Kakadu National Park, Northern Territory." },
      { name: "Brolga", note: "A crane of Kakadu’s floodplains. Parks Australia identifies the Yellow Water area as one place to look as water recedes.", whereFound: "Yellow Water and surrounding floodplain habitat in Kakadu National Park, Northern Territory." },
    ],
    places: [
      { name: "Fogg Dam Conservation Area", detail: "Wetland observation near Darwin, with lookouts and designated walks. Early morning is the park’s suggested time for more bird activity." },
      { name: "Mamukala wetlands", detail: "A viewing shelter offers a way to spend time with the wetland before deciding whether an additional walk suits the conditions." },
      { name: "Yellow Water, Kakadu", detail: "Billabong and floodplain scenery that can form a separate part of the trip. Any cruise depends on the operator’s current arrangements and availability." },
    ],
    planningNotes: [
      "Allow time for the road journey from Darwin and for staying within the Kakadu area; these are not all adjacent stops.",
      "Check park passes, road access, weather and local safety advice close to departure. Keep alternatives for closures or uncomfortable heat.",
      "This regional focus is inspiration for an enquiry; guiding, permits, dates and activities must be confirmed before a trip is agreed.",
    ],
    sources: [
      { title: "Northern Territory Government — Fogg Dam Conservation Area", url: "https://nt.gov.au/parks/find-a-park/fogg-dam-conservation-area" },
      { title: "Parks Australia — Mamukala wetlands", url: "https://kakadu.gov.au/things-do/activities/walks/mamukala-wetlands-walk/" },
      { title: "Parks Australia — when to visit Kakadu", url: "https://kakadu.gov.au/plan/when-to-come/" },
      { title: "Parks Australia — brolga", url: "https://kakadu.gov.au/discover/nature/birds/brolga/" },
    ],
  },
  {
    id: "australian-capital-territory", state: "Australian Capital Territory", name: "Step beyond the capital", landscape: "Canberra wetlands & forest",
    category: "Forest & highlands", image: "/images/region-australian-capital-territory.jpg", alt: "Trees and reeds reflected in a pond at the Sanctuary in Tidbinbilla Nature Reserve",
    photoCaption: "The Sanctuary wetland precinct at Tidbinbilla Nature Reserve, ACT.",
    description: "Use Canberra as a base for quiet wetlands, Tidbinbilla’s sheltered habitats and the wetter forests of Namadgi.",
    detail: "A compact territory can still offer very different outings. Tidbinbilla’s Sanctuary and the forests around Warks Road should be chosen for their individual terrain and conditions. Plan a few places well, leaving time to listen rather than moving quickly between them.",
    source: "https://www.parks.act.gov.au/things-to-do/birdwatching",
    gateway: "Canberra, with outings to Tidbinbilla and Namadgi",
    planningLength: "2–4 days as a planning starting point",
    season: {
      summary: "Choose habitats for the season and the day’s conditions",
      detail: "ACT Parks highlights autumn honeyeater movements along the Murrumbidgee corridor. Forest and wetland outings offer other possibilities through the year. Build your plan around current weather and road or track access, with layers and flexibility for the higher country.",
    },
    pace: "Tidbinbilla describes the Sanctuary’s 2.1 km path as wheelchair accessible. That does not describe every trail in the reserve or Namadgi: discuss each route and check current access before settling the plan.",
    habitats: ["Protected wetlands", "Wet eucalypt forest", "River corridors", "Woodland"],
    birds: [
      { name: "Superb lyrebird", note: "ACT Parks identifies Tidbinbilla as a place for this forest species. Listening quietly is part of the experience.", whereFound: "Wet forest in Tidbinbilla Nature Reserve, Australian Capital Territory." },
      { name: "Rose robin", note: "One of the birds documented in the wetter forests of Namadgi. A local record does not guarantee an encounter.", whereFound: "Wet forest around Warks Road in Namadgi National Park, Australian Capital Territory." },
      { name: "Tawny frogmouth", note: "ACT Parks lists this camouflaged bird among the local wildlife at Tharwa Sandwash.", whereFound: "Trees around Tharwa Sandwash beside the Murrumbidgee River, Australian Capital Territory." },
    ],
    places: [
      { name: "The Sanctuary, Tidbinbilla", detail: "A pond-based wetland precinct with a continuous path, suitable for an unhurried introduction to the reserve." },
      { name: "Warks Road, Namadgi", detail: "A wet-forest focus to consider separately from the Sanctuary. Check the route and current road conditions before visiting." },
      { name: "Tharwa Sandwash", detail: "A Murrumbidgee river-corridor option where quiet observation can take precedence over distance walked." },
    ],
    planningNotes: [
      "Share your Canberra base and transport plans so the outings fit the time you have available.",
      "Tell us about walking distance, terrain and mobility needs; suitability is assessed by route, not by the region’s name.",
      "Check current reserve alerts and entry arrangements. Dates, guiding and availability are confirmed through an individual enquiry.",
    ],
    sources: [
      { title: "ACT Parks — birdwatching locations and species", url: "https://www.parks.act.gov.au/things-to-do/birdwatching" },
      { title: "Tidbinbilla — the Sanctuary", url: "https://www.tidbinbilla.act.gov.au/do/the-sanctuary" },
    ],
  },
  {
    id: "jervis-bay-territory", state: "Jervis Bay Territory", name: "Where forest meets the bay", landscape: "Booderee coast, heath & forest",
    category: "Coast & bush", image: "/images/region-jervis-bay-territory.jpg", alt: "Pale sand and turquoise water beside the shoreline at Jervis Bay Village",
    photoCaption: "Jervis Bay Village / HMAS Cresswell shoreline: a view of the territory’s coastal setting, rather than a proposed tour stop.",
    description: "Explore the separate Jervis Bay Territory through Booderee’s coastal forest and heath, with time for birds between the beach views.",
    detail: "This focus is Booderee, rather than the entire Jervis Bay region. Forest around Green Patch, flowering heath and a coastal lookout offer different ways to experience the territory. Let your interests and walking needs decide which settings belong in the plan.",
    source: "https://booderee.gov.au/discover/nature/birds/",
    gateway: "Sydney or Canberra, travelling by road to Jervis Bay",
    planningLength: "2–3 days as a planning starting point",
    season: {
      summary: "A year-round coastal option, with spring flowering in the heath",
      detail: "Booderee is open throughout the year, subject to closures. New Holland honeyeaters are present year-round, with spring flowering offering a useful focus in the heath. Summer is popular, so plan accommodation ahead and keep layers for changing coastal weather.",
    },
    pace: "Combine selected garden or forest walks with stationary coastal observation. Discuss the actual track and access conditions before choosing an outing; an ocean lookout and a sheltered garden walk are different experiences.",
    habitats: ["Coastal blackbutt forest", "Flowering heath", "Botanic garden habitats", "Ocean-facing headlands"],
    birds: [
      { name: "White-bellied sea-eagle", note: "Parks Australia identifies the lighthouse area as a place to look for this coastal raptor. Watch from established visitor areas.", whereFound: "The coast around Cape St George lighthouse in Booderee National Park, Jervis Bay Territory." },
      { name: "Crimson rosella", note: "Booderee’s forest offers a setting for this colourful parrot. Leave birds to forage without feeding or approaching them.", whereFound: "Blackbutt woodland at Green Patch in Booderee National Park, Jervis Bay Territory." },
      { name: "New Holland honeyeater", note: "A year-round park resident associated with flowering banksias and grevilleas in the heath.", whereFound: "The Heath Trail at Booderee Botanic Gardens, Jervis Bay Territory." },
    ],
    places: [
      { name: "Booderee Botanic Gardens", detail: "The Heath Trail is a useful focus for flowering plants and honeyeaters. Choose the route with current garden information." },
      { name: "Green Patch", detail: "Coastal forest offers a different birding setting from the open shore. Keep to visitor paths and give feeding birds space." },
      { name: "Cape St George lighthouse", detail: "An exposed coastal viewpoint to consider when weather and access permit, with time to watch the sky above the sea." },
    ],
    planningNotes: [
      "Allow for the road journey from your starting city and tell us where you expect to stay.",
      "Check Booderee’s current closures, park passes and visitor advice. The park asks visitors not to use recorded bird calls to attract wildlife.",
      "Any guided arrangements require confirmation, including appropriate park permissions. This enquiry does not confirm a booking or availability.",
    ],
    sources: [
      { title: "Parks Australia — birds of Booderee", url: "https://booderee.gov.au/discover/nature/birds/" },
      { title: "Parks Australia — white-bellied sea-eagle", url: "https://booderee.gov.au/discover/nature/birds/white-bellied-sea-eagle/" },
      { title: "Parks Australia — crimson rosella", url: "https://booderee.gov.au/discover/nature/birds/crimson-rosella/" },
      { title: "Parks Australia — New Holland honeyeater", url: "https://booderee.gov.au/discover/nature/birds/new-holland-honeyeater/" },
      { title: "Parks Australia — when to visit Booderee", url: "https://booderee.gov.au/plan/when-to-come/" },
      { title: "Parks Australia — getting to Booderee", url: "https://booderee.gov.au/plan/getting-here/" },
    ],
  },
]
