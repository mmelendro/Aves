import type { BirdProfile } from "@/content/birds"
import credits from "@/content/new-zealand-supplement-credits.json"

export const newZealandSupplementPhotoCredits = credits.images

export const newZealandSupplementBirds: BirdProfile[] = [
  {
    id: "nz-extra-rifleman",
    commonName: "Tītipounamu / Rifleman",
    scientificName: "Acanthisitta chloris",
    primaryRegion: "South Island forests",
    regionSlug: "",
    distribution: "Native forests on the North and South Islands of New Zealand.",
    localOccurrence: "Look through South Island native forest, including the beech forests of the Greenstone and Caples valleys. Take time to watch the branches; sightings vary.",
    habitat: "Native forest, including beech forest. This tiny insect-eater moves through the trees as it searches for food.",
    image: "/images/new-zealand/nz-extra-rifleman.webp",
    audioFile: "/audio/nz-extra-rifleman.mp3",
    audioLabel: "Rifleman calls, Akaroa, South Island · Connor Sydney (Squid)",
    sources: [
      { title: "eBird — Rifleman", url: "https://ebird.org/species/riflem1" },
      { title: "DOC — Rifleman / titipounamu", url: "https://www.doc.govt.nz/our-work/national-predator-control-programme/monitoring-results-for-native-species/rifleman-titipounamu/" },
      { title: "DOC — Greenstone and Caples natural history", url: "https://www.doc.govt.nz/parks-and-recreation/places-to-go/otago/places/greenstone-and-caples-conservation-areas/things-to-do/greenstone-and-caples-tracks/natural-history/" },
    ],
    photoCredit: {
      photographer: "Christopher Stephens",
      title: "Acanthisitta chloris chloris 112601837 · CC BY-SA 4.0",
      reserve: "South Island, New Zealand",
      instagramPost: "https://commons.wikimedia.org/wiki/File:Acanthisitta_chloris_chloris_112601837.jpg",
    },
  },
]
