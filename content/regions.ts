export type Region = {
  id: string
  state: string
  name: string
  landscape: string
  category: "Rainforest" | "Coast & bush" | "Island wilds"
  image: string
  alt: string
  description: string
  detail: string
  source: string
}

export const regions: Region[] = [
  {
    id: "queensland", state: "Queensland", name: "Into the green", landscape: "The Wet Tropics",
    category: "Rainforest", image: "/images/queensland.jpg", alt: "Rainforest in tropical Queensland",
    description: "Follow your curiosity into the rainforest, where every layer holds another reason to pause.",
    detail: "The Wet Tropics is a starting point for a rainforest-focused journey. Tell us about the birds, habitats and pace that interest you. Routes, guides, access and dates will be discussed individually before any arrangements are confirmed.",
    source: "https://www.wettropics.gov.au/",
  },
  {
    id: "new-south-wales", state: "New South Wales", name: "A wilder kind of blue", landscape: "Coast, bush & mountains",
    category: "Coast & bush", image: "/images/new-south-wales.jpg", alt: "A natural landscape in New South Wales",
    description: "From eucalyptus country to the edge of the ocean. A fresh perspective, closer than you think.",
    detail: "New South Wales offers a starting point for exploring coastal, woodland and mountain habitats. Share where you will be based and how much time you have, and we can discuss a custom inquiry around your interests. Specific trips are still being developed.",
    source: "https://www.nationalparks.nsw.gov.au/things-to-do/birdwatching-and-wildlife-encounters",
  },
  {
    id: "tasmania", state: "Tasmania", name: "Take the slow way", landscape: "An island apart",
    category: "Island wilds", image: "/images/tasmania.jpg", alt: "A wild natural landscape in Tasmania",
    description: "Cool forests, open shores and time to notice the details. Let the island set the rhythm.",
    detail: "Tasmania is an inspiration for a slower journey through island habitats. Let us know your preferred season, pace and birding interests. Availability and itinerary details will be confirmed personally; this is not a scheduled tour or a promise of wildlife sightings.",
    source: "https://www.discovertasmania.com.au/",
  },
]
