/**
 * Associates catalogue bird IDs with region-specific occurrence notes and sources.
 * A regional carousel reuses the main photograph/recording while showing these local
 * notes. The location of a media recording can differ from the place described here.
 */
export type RegionalBirdSelection = {
  birdId: string
  whereFound: string
  sources: { title: string; url: string }[]
}

// Checked against primary park, government, museum and regional tourism sources
// on 6 November 2026. These are local occurrence examples, not sightings promises
// or a claim that each species occurs at every stop in a region's suggested focus.
// Images and recordings remain the existing catalogue assets; their recording or
// photography location may differ from the local occurrence described here.
const craterLakes = {
  title: "Queensland Parks — Crater Lakes wildlife",
  url: "https://parks.qld.gov.au/parks/crater-lakes/about/culture",
}
const hastiesSwamp = {
  title: "Queensland Parks — Hasties Swamp wildlife",
  url: "https://parks.qld.gov.au/parks/hasties-swamp/about/culture",
}
const sydneyNature = {
  title: "NSW Environment — Sydney's native biodiversity",
  url: "https://www.environment.nsw.gov.au/about-us/get-involved/sydney-nature/native-biodiversity",
}
const sydneyBirds = {
  title: "NSW Environment — birds in Sydney",
  url: "https://www.environment.nsw.gov.au/about-us/get-involved/sydney-nature/wildlife/birds-in-sydney",
}
const southBruny = {
  title: "Tasmania Parks — South Bruny management plan, Appendix 3 bird records",
  url: "https://parks.tas.gov.au/Documents/South%20Bruny%20National%20Park,%20Waterfall%20Creek%20State%20Reserve,%20Green%20Island%20Nature%20Reserve%20Management%20Plan%202000.pdf#page=66",
}
const victoriaBirdwatching = {
  title: "Parks Victoria — birdwatching locations and species",
  url: "https://www.parks.vic.gov.au/things-to-do/birdwatching",
}
const adelaideParkBirds = {
  title: "City of Adelaide — Rymill Park management plan, native wildlife list",
  url: "https://meetings.cityofadelaide.com.au/Data/Council/201909241800/Agenda/Council%20Meeting%20-%20Agenda%20without%20conf%20-%2024%20September%202019.pdf#page=41",
}
const perthBirds = {
  title: "Destination Perth — birds and where to find them",
  url: "https://www.destinationperth.com.au/blog/post/perths-birds-and-where-to-find-them/",
}
const darwinParkBirds = {
  title: "Northern Territory Government — Charles Darwin National Park fauna list",
  url: "https://dth.nt.gov.au/__data/assets/pdf_file/0005/249044/charlesdarwinpom.pdf#page=59",
}
const tidbinbillaBirds = {
  title: "ACT Government — Tidbinbilla management plan, Appendix 4 bird records",
  url: "https://www.tidbinbilla.act.gov.au/__data/assets/pdf_file/0007/573325/tidbinbilla-plan-of-management-2012.pdf#page=137",
}

export const regionalBirdSelections: Record<string, RegionalBirdSelection[]> = {
  queensland: [
    {
      birdId: "au-victorias-riflebird",
      whereFound: "Rainforest at Crater Lakes National Park on the Atherton Tablelands, within north-eastern Queensland's Wet Tropics.",
      sources: [craterLakes],
    },
    {
      birdId: "au-southern-cassowary",
      whereFound: "Tropical rainforest in Kuranda and Mowbray national parks, north of Cairns. Allow these birds plenty of space.",
      sources: [{ title: "Queensland Parks — Kuranda and Mowbray wildlife", url: "https://parks.qld.gov.au/parks/kuranda-mowbray/about/culture" }],
    },
    {
      birdId: "au-lorikeet",
      whereFound: "Woodland surrounding Hasties Swamp near Atherton, alongside the region's wetland habitats.",
      sources: [hastiesSwamp],
    },
    {
      birdId: "au-laughing-kookaburra",
      whereFound: "The woodland at Hasties Swamp National Park on the Atherton Tablelands.",
      sources: [hastiesSwamp],
    },
  ],
  "new-south-wales": [
    {
      birdId: "au-superb-lyrebird",
      whereFound: "Sheltered rainforest in Royal National Park, south of Sydney, where birds forage through leaf litter.",
      sources: [sydneyNature],
    },
    {
      birdId: "au-fairywren",
      whereFound: "Sydney's sheltered forests and gardens with continuous low shrubs and groundcover.",
      sources: [sydneyNature],
    },
    {
      birdId: "au-laughing-kookaburra",
      whereFound: "Woodland and forest in Cattai National Park, north-west of Sydney.",
      sources: [{ title: "NSW Parks — Cattai National Park wildlife", url: "https://www.nationalparks.nsw.gov.au/visit-a-park/parks/cattai-national-park/learn-more" }],
    },
    {
      birdId: "au-lorikeet",
      whereFound: "Flowering trees in Sydney's gardens and treed neighbourhoods; movements follow available food.",
      sources: [sydneyBirds],
    },
    {
      birdId: "au-australian-magpie",
      whereFound: "Sydney's gardens and open ground near trees, where insects and other small animals provide food.",
      sources: [sydneyBirds],
    },
    {
      birdId: "au-satin-bowerbird",
      whereFound: "Leafy Sydney settings with fruiting trees and nearby cover; NSW Environment includes it among the city's fruit-eating birds.",
      sources: [sydneyBirds],
    },
  ],
  tasmania: [
    {
      birdId: "au-forty-spotted-pardalote",
      whereFound: "White-gum woodland on Bruny Island, one of this Tasmanian endemic's remaining strongholds. Observe quietly from permitted routes.",
      sources: [
        { title: "Tasmanian Government — Forty-spotted Pardalote habitat and distribution", url: "https://www.threatenedspecieslink.tas.gov.au/Pages/Forty-spotted-Pardalote.aspx" },
        { title: "Tasmania Parks — bird records from Bruny Island", url: "https://parks.tas.gov.au/discovery-and-learning/wildlife/birds" },
      ],
    },
    {
      birdId: "au-fairywren",
      whereFound: "Low, sheltered vegetation in South Bruny National Park; the park's bird inventory records this native species.",
      sources: [southBruny],
    },
    {
      birdId: "au-eastern-rosella",
      whereFound: "South Bruny National Park, where it is recorded in the park's bird inventory; look in more open, treed habitats.",
      sources: [southBruny, { title: "Australian Museum — Eastern Rosella habitat", url: "https://australian.museum/learn/animals/birds/eastern-rosella/" }],
    },
    {
      birdId: "au-australian-magpie",
      whereFound: "Open ground near trees on South Bruny; the species is recorded in South Bruny National Park's bird inventory.",
      sources: [southBruny, { title: "Australian Museum — Australian Magpie habitat", url: "https://australian.museum/learn/animals/birds/australian-magpie/" }],
    },
  ],
  victoria: [
    {
      birdId: "au-emu",
      whereFound: "Open ground around Lake Serendip at Serendip Sanctuary near Lara, in the Melbourne–Geelong region.",
      sources: [{ title: "Parks Victoria — wildlife on Serendip Sanctuary walks", url: "https://www.parks.vic.gov.au/places-to-see/parks/serendip-sanctuary/things-to-do/walks-at-serendip-sanctuary" }],
    },
    {
      birdId: "au-eastern-rosella",
      whereFound: "Wattle Park in suburban Melbourne, a separate urban-woodland option from Serendip Sanctuary.",
      sources: [victoriaBirdwatching],
    },
    {
      birdId: "au-lorikeet",
      whereFound: "Wattle Park, Melbourne, where Parks Victoria lists Rainbow Lorikeets among the park's parrots.",
      sources: [victoriaBirdwatching],
    },
    {
      birdId: "au-galah",
      whereFound: "Wattle Park in Melbourne; an option to consider near the city before or after a separate Serendip visit.",
      sources: [victoriaBirdwatching],
    },
  ],
  "south-australia": [
    {
      birdId: "au-fairywren",
      whereFound: "Pangarinda Botanic Garden at Wellington East, in the Lower Murray gateway area on a journey towards the Coorong.",
      sources: [{ title: "Coorong District Council — birds of Pangarinda Botanic Garden", url: "https://www.coorong.sa.gov.au/tourism/nationalconservation-parks/pangarinda" }],
    },
    {
      birdId: "au-australian-magpie",
      whereFound: "Adelaide's Rymill Park / Murlawirrapurka, listed in the council's native wildlife inventory. This is an Adelaide gateway example, not a Coorong lagoon specialist.",
      sources: [adelaideParkBirds],
    },
    {
      birdId: "au-galah",
      whereFound: "Rymill Park / Murlawirrapurka in Adelaide, included in the council's native wildlife inventory; a city-side complement to the Coorong's waterbirds.",
      sources: [adelaideParkBirds],
    },
  ],
  "western-australia": [
    {
      birdId: "au-carnabys-black-cockatoo",
      whereFound: "Woodland in Yanchep National Park, north of Perth, within this cockatoo's south-western Australian range.",
      sources: [perthBirds],
    },
    {
      birdId: "au-splendid-fairywren",
      whereFound: "Shrubby woodland in Yanchep National Park; Destination Perth records the species along the park's woodland walks.",
      sources: [perthBirds],
    },
    {
      birdId: "au-laughing-kookaburra",
      whereFound: "Yellagonga Regional Park around Lake Joondalup and Lake Goollelal, north of Perth. This species was introduced to south-west Western Australia.",
      sources: [perthBirds, { title: "Australian Museum — Laughing Kookaburra introduced range", url: "https://australian.museum/learn/animals/birds/laughing-kookaburra/" }],
    },
  ],
  "northern-territory": [
    {
      birdId: "au-red-tailed-black-cockatoo",
      whereFound: "Woodland and open feeding areas in Kakadu National Park; Parks Australia describes flocks feeding on seeds after fire.",
      sources: [{ title: "Parks Australia — Kakadu's birds", url: "https://kakadu.gov.au/discover/nature/birds/" }],
    },
    {
      birdId: "au-gouldian-finch",
      whereFound: "Recorded in Kakadu National Park's savanna country. Its distribution is patchy and seasonal; a park record is not a routine wetland sighting.",
      sources: [{ title: "Northern Territory Government — Gouldian Finch distribution and ecology", url: "https://cmsexternal.nt.gov.au/__data/assets/pdf_file/0019/206353/gouldian-finch.pdf" }],
    },
    {
      birdId: "au-cockatoo",
      whereFound: "Charles Darwin National Park, close to Darwin city, where the Sulphur-crested Cockatoo is recorded in the park's fauna list.",
      sources: [darwinParkBirds],
    },
    {
      birdId: "au-galah",
      whereFound: "Charles Darwin National Park, on the Darwin side of this regional focus; the park's fauna inventory records Galahs.",
      sources: [darwinParkBirds],
    },
  ],
  "australian-capital-territory": [
    {
      birdId: "au-australian-king-parrot",
      whereFound: "Tidbinbilla Nature Reserve, where the reserve's bird inventory records Australian King-Parrots; consider its forested habitats.",
      sources: [tidbinbillaBirds],
    },
    {
      birdId: "au-superb-lyrebird",
      whereFound: "Wet forest in Tidbinbilla Nature Reserve and around Warks Road in Namadgi National Park.",
      sources: [{ title: "ACT Parks — birdwatching in Tidbinbilla and Namadgi", url: "https://www.parks.act.gov.au/things-to-do/birdwatching" }],
    },
    {
      birdId: "au-crimson-rosella",
      whereFound: "Tidbinbilla Nature Reserve, where Crimson Rosellas are included in the reserve's bird inventory.",
      sources: [tidbinbillaBirds],
    },
    {
      birdId: "au-eastern-rosella",
      whereFound: "Tidbinbilla Nature Reserve's treed, more open habitats; the species is recorded in the reserve's bird inventory.",
      sources: [tidbinbillaBirds, { title: "Australian Museum — Eastern Rosella habitat", url: "https://australian.museum/learn/animals/birds/eastern-rosella/" }],
    },
    {
      birdId: "au-fairywren",
      whereFound: "Low, sheltered vegetation in Tidbinbilla Nature Reserve, which records Superb Fairywrens in its bird inventory.",
      sources: [tidbinbillaBirds],
    },
    {
      birdId: "au-cockatoo",
      whereFound: "Tidbinbilla Nature Reserve, where Sulphur-crested Cockatoos are documented in the reserve's bird inventory.",
      sources: [tidbinbillaBirds],
    },
  ],
  "jervis-bay-territory": [
    {
      birdId: "au-crimson-rosella",
      whereFound: "Blackbutt forest around Green Patch in Booderee National Park, within Jervis Bay Territory.",
      sources: [{ title: "Parks Australia — Crimson Rosellas at Booderee", url: "https://booderee.gov.au/discover/nature/birds/crimson-rosella/" }],
    },
    {
      birdId: "au-australian-king-parrot",
      whereFound: "Booderee's eucalypt forest and the trees around Green Patch day-use area.",
      sources: [{ title: "Parks Australia — Australian King-Parrots at Booderee", url: "https://booderee.gov.au/discover/nature/birds/australian-king-parrot/" }],
    },
    {
      birdId: "au-satin-bowerbird",
      whereFound: "Sheltered, treed areas of Booderee National Park, foraging both in trees and on the ground.",
      sources: [{ title: "Parks Australia — Satin Bowerbirds at Booderee", url: "https://booderee.gov.au/discover/nature/birds/satin-bowerbird/" }],
    },
    {
      birdId: "au-laughing-kookaburra",
      whereFound: "Large trees in Booderee National Park, including the Botanic Gardens.",
      sources: [{ title: "Parks Australia — kookaburras at Booderee", url: "https://booderee.gov.au/discover/nature/birds/kookaburra/" }],
    },
    {
      birdId: "au-lorikeet",
      whereFound: "Green Patch and other parts of Booderee with established flowering trees; their movements respond to flowering.",
      sources: [{ title: "Parks Australia — Rainbow Lorikeets at Booderee", url: "https://booderee.gov.au/discover/nature/birds/rainbow-lorikeet/" }],
    },
  ],
}
