import type { BirdProfile } from "@/content/birds"
import credits from "@/content/new-zealand-expansion-credits.json"

export const expansionPhotoCredits = credits.photos
export const expansionAudioCredits = credits.recordings

const docBirds = "https://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/"
const ulva = "https://www.doc.govt.nz/parks-and-recreation/places-to-go/southland/places/stewart-island-rakiura/ulva-island-te-wharawhara"

type Species = {
  slug: string
  name: string
  scientific: string
  region: string
  distribution: string
  local: string
  habitat: string
  ebird: string
  guide?: string
  doc?: string
}

// Locations describe known occurrence, not guaranteed sightings or access to nests.
// Island visitor rules and sanctuary access must be checked before travel.
const species: Species[] = [
  {
    slug: "bellbird", name: "Bellbird / Korimako", scientific: "Anthornis melanura",
    region: "South Island, Rakiura & North Island",
    distribution: "A native songbird of forest, scrub and gardens across much of New Zealand, including the South Island and Stewart Island / Rakiura.",
    local: "Listen in Abel Tasman forest and on the daytime walking tracks of Ulva Island / Te Wharawhara near Rakiura.",
    habitat: "Flowering and fruiting trees provide food; birds also take insects through the canopy. Their carrying song can reveal a bird before it comes into view.",
    ebird: "nezbel1", guide: "bellbird", doc: ulva,
  },
  {
    slug: "grey-warbler", name: "Grey Warbler / Riroriro", scientific: "Gerygone igata",
    region: "New Zealand woodland & gardens",
    distribution: "Widespread on the North, South and Stewart Islands wherever trees or shrubs provide cover.",
    local: "Wooded gardens and forest margins in Nelson / Tasman and the West Coast are useful South Island habitats to explore.",
    habitat: "This small insect-eater searches fine foliage in the middle and upper canopy. Listen for its long, delicate song in native bush, shelterbelts and planted parks.",
    ebird: "gryger1", guide: "grey-warbler",
  },
  {
    slug: "kaka", name: "Kākā", scientific: "Nestor meridionalis",
    region: "Native forest; South Island & Rakiura",
    distribution: "Patchily distributed in native forests on both main islands and Rakiura, with important populations in protected forest and island sanctuaries.",
    local: "South Island options include the Rotoiti Nature Recovery Project in Nelson Lakes and the Eglinton Valley in Fiordland; Ulva Island is another established location.",
    habitat: "A forest parrot that feeds on insects, nectar, fruit and seeds. The recording features South Island kākā; the reference photograph shows a bird behind aviary mesh.",
    ebird: "nezkak1", guide: "kaka", doc: `${docBirds}kaka/`,
  },
  {
    slug: "morepork", name: "Morepork / Ruru", scientific: "Ninox novaeseelandiae",
    region: "Forested New Zealand",
    distribution: "Found in forest across much of New Zealand, but scarce in the drier, open eastern South Island.",
    local: "West Coast and Fiordland forest are suitable South Island regions for listening after dark, where public access permits night visits.",
    habitat: "This nocturnal owl hunts insects and small animals around woodland. Listen quietly from established paths; Ulva Island does not permit night visits.",
    ebird: "morepo2", guide: "morepork", doc: `${docBirds}morepork-ruru/`,
  },
  {
    slug: "kereru", name: "New Zealand Pigeon / Kererū", scientific: "Hemiphaga novaeseelandiae",
    region: "North, South & Stewart Islands",
    distribution: "A large native pigeon found from Northland to Stewart Island / Rakiura and on many forested offshore islands.",
    local: "Explore West Coast forest margins or Ulva Island's public daytime tracks for South Island and Rakiura encounters.",
    habitat: "Native forest, regenerating bush and gardens with fruiting trees are important feeding areas. Its heavy wingbeats can be more noticeable than its quiet calls.",
    ebird: "nezpig2", guide: "new-zealand-pigeon", doc: ulva,
  },
  {
    slug: "new-zealand-falcon", name: "New Zealand Falcon / Kārearea", scientific: "Falco novaeseelandiae",
    region: "New Zealand forest & high country",
    distribution: "An endemic falcon with a patchy range on both main islands, occupying forest, hill country and some modified landscapes.",
    local: "Marlborough's hill country and vineyard landscapes, and suitable South Island high-country forest edges, lie within its range.",
    habitat: "Look for a fast aerial hunter over forest edges and open slopes. Keep well away from any defensive bird or nesting area.",
    ebird: "nezfal1", guide: "new-zealand-falcon", doc: `${docBirds}nz-falcon-karearea/`,
  },
  {
    slug: "red-crowned-parakeet", name: "Red-crowned Parakeet / Kākāriki", scientific: "Cyanoramphus novaezelandiae",
    region: "Offshore islands & protected sanctuaries",
    distribution: "Now concentrated on offshore islands and protected sites, with very few birds on the two main islands.",
    local: "Ulva Island / Te Wharawhara near Stewart Island is an established southern location, accessible by boat with island biosecurity precautions.",
    habitat: "Uses forest, scrub and more open island vegetation, often feeding on the ground. Stay on marked paths and allow feeding birds space.",
    ebird: "refpar4", guide: "red-crowned-parakeet-kakariki", doc: ulva,
  },
  {
    slug: "orange-fronted-parakeet", name: "Orange-fronted Parakeet / Kākāriki Karaka", scientific: "Cyanoramphus malherbi",
    region: "Canterbury & selected protected sites",
    distribution: "A very rare endemic parakeet with remnant Canterbury populations and populations established at managed sites.",
    local: "DOC lists the Hawdon and South Hurunui valleys, Blumine Island, Brook Waimārama Sanctuary and protected Anchor Island. Site access varies; these are conservation locations, not promised sightings.",
    habitat: "Mainland birds depend on southern beech forest. Both the reference photograph and this DOC recording feature captive birds; the recording includes a response to playback.",
    ebird: "malpar2", guide: "orange-fronted-parakeet", doc: `${docBirds}nz-parakeet-kakariki/orange-fronted-parakeet/`,
  },
  {
    slug: "south-island-robin", name: "South Island Robin / Toutouwai", scientific: "Petroica australis",
    region: "South Island & Stewart Island",
    distribution: "Patchily distributed in South Island forests, with a distinct Stewart Island subspecies and populations on some protected islands.",
    local: "Forests in Nelson / Tasman and Fiordland are suitable South Island areas; Ulva Island supports the Stewart Island subspecies.",
    habitat: "Favours forest with an open understorey and leaf litter where it can search for invertebrates. Let an inquisitive bird approach on its own and do not offer food.",
    ebird: "nezrob3", guide: "south-island-robin", doc: `${docBirds}nz-robin-toutouwai/`,
  },
  {
    slug: "paradise-shelduck", name: "Paradise Shelduck / Pūtangitangi", scientific: "Tadorna variegata",
    region: "New Zealand lakes, rivers & farmland",
    distribution: "Widespread on the North and South Islands and also present on Stewart Island / Rakiura.",
    local: "Canterbury and Otago high-country lake margins, river flats and pasture are useful places to look; birds also use Christchurch parks.",
    habitat: "Often feeds in open grassland near water. Females have a white head, while males have a dark head; the recording includes the contrasting calls of a pair.",
    ebird: "parshe1", guide: "paradise-shelduck", doc: `${docBirds}paradise-duck-putakitaki/`,
  },
  {
    slug: "rock-wren", name: "Rock Wren / Pīwauwau", scientific: "Xenicus gilviventris",
    region: "South Island alpine country",
    distribution: "Restricted to scattered alpine and subalpine habitats along the Southern Alps and in Kahurangi National Park.",
    local: "Known areas include Fiordland, Mount Aspiring and Aoraki / Mount Cook national parks; suitable walks require current track and alpine-weather checks.",
    habitat: "Search visually across stable rockfalls and low alpine shrubs from established tracks. Its short contact call is easy to miss, and birds should never be drawn out with playback.",
    ebird: "soiwre1", guide: "rock-wren", doc: `${docBirds}rock-wren-tuke/`,
  },
  {
    slug: "south-island-saddleback", name: "South Island Saddleback / Tīeke", scientific: "Philesturnus carunculatus",
    region: "Predator-free southern islands",
    distribution: "Survives in populations established on predator-free islands around the South Island and Stewart Island / Rakiura.",
    local: "Ulva Island near Rakiura and Motuara Island in the Marlborough Sounds offer public visitor options; other conservation islands may have restricted access.",
    habitat: "Forages through low forest vegetation and leaf litter, often betraying its presence with loud calls. This DOC recording features males responding to recorded calls and is for listening away from birds.",
    ebird: "saddle3", guide: "south-island-saddleback", doc: ulva,
  },
  {
    slug: "silvereye", name: "Silvereye / Tauhou", scientific: "Zosterops lateralis",
    region: "Widespread across New Zealand",
    distribution: "Common across the main islands and many offshore islands, from coastal vegetation to wooded hill country.",
    local: "Nelson gardens and orchards, West Coast forest margins and planted South Island parks provide suitable habitat; this recording comes from the Nelson area.",
    habitat: "Small flocks move through foliage in search of insects, fruit and nectar. The white ring around each eye is a useful identification feature.",
    ebird: "silver3", guide: "silvereye", doc: `${docBirds}silvereye-or-wax-eye/`,
  },
  {
    slug: "south-island-tomtit", name: "South Island Tomtit / Miromiro", scientific: "Petroica macrocephala macrocephala",
    region: "South Island forest",
    distribution: "The South Island subspecies of tomtit inhabits native and regenerating forests, especially in the wetter west and south.",
    local: "Look along forest walks around Franz Josef / Waiau and in Fiordland. The photograph was taken at Franz Josef and the recording on Rabbit Island near Nelson.",
    habitat: "Usually watches for invertebrates from a low branch before making a short feeding flight. South Island males have a yellow-orange breast below the black head and chest.",
    ebird: "tomtit1", guide: "tomtit", doc: `${docBirds}tomtit-miromiro/`,
  },
  {
    slug: "western-weka", name: "Western Weka", scientific: "Gallirallus australis australis",
    region: "Western & northern South Island",
    distribution: "This weka subspecies occurs in the Marlborough Sounds, north-west Nelson, the West Coast and parts of Fiordland.",
    local: "Punakaiki and other West Coast forest margins, and parts of the Marlborough Sounds, are established areas within its range.",
    habitat: "A flightless rail of forest edges, scrub, wetlands and rough grassland. Watch patiently from paths and secure food and belongings without feeding the birds.",
    ebird: "weka1", guide: "weka",
  },
  {
    slug: "westland-petrel", name: "Westland Petrel / Tāiko", scientific: "Procellaria westlandica",
    region: "West Coast & South Island seas",
    distribution: "Breeds only near Punakaiki on the West Coast and ranges over seas around the South Island during its breeding season; many birds later migrate to South America.",
    local: "Consider permitted guided viewing near Punakaiki or a responsible pelagic outing from Kaikōura; the reference photo was taken off Kaikōura.",
    habitat: "Nests in coastal forest burrows and feeds offshore. Colonies are sensitive: use authorised access and never search for burrows independently.",
    ebird: "wespet1", guide: "westland-petrel", doc: `${docBirds}westland-petrel-taiko/`,
  },
  {
    slug: "white-heron", name: "White Heron / Kōtuku", scientific: "Ardea alba modesta",
    region: "West Coast breeding colony & wetlands",
    distribution: "Rare in New Zealand, with its only breeding colony near Whataroa in South Westland; birds disperse to wetlands elsewhere after breeding.",
    local: "Ōkārito Lagoon is an important feeding area. The Waitangiroto colony can be visited through an authorised guided hide experience, subject to seasonal access.",
    habitat: "Feeds in shallow lagoons, estuaries and freshwater wetlands. Observe from a distance and follow all colony access rules.",
    ebird: "greegr", guide: "white-heron", doc: `${docBirds}white-heron-kotuku/`,
  },
  {
    slug: "yellow-eyed-penguin", name: "Yellow-eyed Penguin / Hoiho", scientific: "Megadyptes antipodes",
    region: "South-east South Island & southern islands",
    distribution: "Occurs along parts of the south-east South Island, around Stewart Island / Rakiura, and on the Auckland and Campbell islands.",
    local: "The Otago Peninsula and Catlins are mainland regions to research for managed viewing. Check current closures and use designated hides or authorised guided visits.",
    habitat: "Forages at sea and nests in sheltered coastal vegetation. Keep beaches and landing routes clear so penguins can return from the sea without disturbance.",
    ebird: "yeepen1", guide: "yellow-eyed-penguin", doc: `${docBirds}penguins/yellow-eyed-penguin-hoiho/`,
  },
  {
    slug: "yellowhead", name: "Yellowhead / Mohua", scientific: "Mohoua ochrocephala",
    region: "South Island forest & protected islands",
    distribution: "Now confined to scattered southern forests and populations established on predator-free islands.",
    local: "Known South Island areas include the Catlins, the Dart Valley and Fiordland's Eglinton Valley; Ulva Island also supports a restored population.",
    habitat: "An insect-eating forest bird, often associated with southern beech and feeding flocks. Populations are localised, so suitable forest does not guarantee an encounter.",
    ebird: "yellow3", guide: "yellowhead", doc: `${docBirds}yellowhead-mohua/`,
  },
  {
    slug: "australasian-crested-grebe", name: "Australasian Crested Grebe / Kāmana", scientific: "Podiceps cristatus australis",
    region: "South Island lakes",
    distribution: "In New Zealand, this Australasian subspecies is concentrated on South Island lakes, particularly in the Canterbury and Otago high country.",
    local: "Lake Pearson / Moana Rua in Canterbury and Lake Alexandrina in the Mackenzie Basin are established locations; the DOC recording comes from Lake Alexandrina.",
    habitat: "Feeds by diving in freshwater lakes and nests near sheltered shoreline vegetation. Watch from public shore access without approaching floating nests.",
    ebird: "grcgre1", guide: "australasian-crested-grebe", doc: `${docBirds}australasian-crested-grebe-kamana/`,
  },
  {
    slug: "black-stilt", name: "Black Stilt / Kakī", scientific: "Himantopus novaezelandiae",
    region: "Mackenzie Basin & Canterbury wetlands",
    distribution: "A rare endemic wader whose main breeding range is the Mackenzie Basin; some birds move to other wetlands outside the breeding season.",
    local: "The broad Tekapo, Pukaki and Ahuriri river-and-wetland landscapes are key South Island areas. Use public viewpoints and local conservation advice rather than searching nesting riverbeds.",
    habitat: "Feeds in shallow braided rivers, lake edges and wetlands. Adults are black; younger birds can retain considerable white plumage.",
    ebird: "blasti1", guide: "black-stilt", doc: `${docBirds}black-stilt-kaki/`,
  },
  {
    slug: "blue-duck", name: "Blue Duck / Whio", scientific: "Hymenolaimus malacorhynchos",
    region: "Forested mountain rivers",
    distribution: "Patchily distributed along suitable fast-flowing rivers on both main islands, with important South Island populations in protected catchments.",
    local: "DOC lists Kahurangi locations around Gouland Downs on the Heaphy Track and the Flora Stream area; Fiordland also supports whio.",
    habitat: "Specialised for clear, turbulent rivers with boulders and forested banks. Observe from tracks or the bank; this recording includes birds responding to playback, which should not be repeated in the field.",
    ebird: "bluduc1", guide: "blue-duck", doc: "https://www.doc.govt.nz/our-work/whio-forever/whio-locations/",
  },
  {
    slug: "huttons-shearwater", name: "Hutton’s Shearwater / Kaikōura Tītī", scientific: "Puffinus huttoni",
    region: "Kaikōura & eastern South Island seas",
    distribution: "Breeds in the Kaikōura region and is frequently offshore along the eastern South Island during the breeding season; many birds winter around Australia.",
    local: "Kaikōura's public coastal viewpoints and responsible pelagic trips provide viewing opportunities, especially in the breeding season from spring into early autumn.",
    habitat: "Feeds at sea but nests in remote mountain colonies. The recording was made at a burrow entrance; colony locations are not visitor destinations.",
    ebird: "hutshe1", guide: "huttons-shearwater",
  },
  {
    slug: "australasian-bittern", name: "Australasian Bittern / Matuku-hūrepo", scientific: "Botaurus poiciloptilus",
    region: "New Zealand wetlands",
    distribution: "A secretive wetland bird found in New Zealand and elsewhere in Australasia, with South Island populations in Canterbury, the West Coast and Southland.",
    local: "Te Waihora / Lake Ellesmere is a documented Canterbury area. Listen from legal public access points around suitable wetlands without entering reedbeds.",
    habitat: "Depends on freshwater wetlands with dense reeds, raupō and shallow feeding areas. Males give a low booming call, but birds can remain concealed even when nearby.",
    ebird: "ausbit1", guide: "australasian-bittern", doc: "https://www.doc.govt.nz/news/media-releases/2026-media-releases/images-reveal-rare-bittern-nesting-activity-in-canterbury/",
  },
]

export const expansionBirds: BirdProfile[] = species.map(bird => {
  const id = `nz-${bird.slug}`
  const photo = expansionPhotoCredits.find(item => item.id === id)
  const audio = expansionAudioCredits.find(item => item.id === id)
  if (!photo || !audio) throw new Error(`Missing New Zealand media credits: ${id}`)

  return {
    id,
    commonName: bird.name,
    scientificName: bird.scientific,
    primaryRegion: bird.region,
    regionSlug: "",
    distribution: bird.distribution,
    localOccurrence: bird.local,
    habitat: bird.habitat,
    image: photo.image,
    audioFile: audio.path,
    audioLabel: `${audio.title} · Department of Conservation (NZ)`,
    sources: [
      { title: "eBird species guide", url: `https://ebird.org/species/${bird.ebird}` },
      ...(bird.guide ? [{ title: "New Zealand Birds Online", url: `https://www.nzbirdsonline.org.nz/species/${bird.guide}` }] : []),
      ...(bird.doc ? [{ title: "DOC species and visitor guidance", url: bird.doc }] : []),
    ],
    photoCredit: {
      photographer: photo.creator,
      title: `${photo.title} · ${photo.license}`,
      reserve: photo.location,
      instagramPost: photo.sourceUrl,
    },
  }
})
