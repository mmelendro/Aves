/**
 * Public destination cards for the main AVES homepage. Adding a card here does
 * not enable account-based trip saving for that country; the shared backend has a
 * separate destination registry. New Zealand currently offers a private planning
 * beta, not confirmed bookings. Optional map metadata adds a homepage map link.
 */
/** Labels use SVG coordinates; country geometry always comes from Natural Earth. */
export interface Destination {
  id: string
  name: string
  href: `/${string}`
  tagline: string
  description: string
  image: string
  imageAlt: string
  imagePosition: string
  imageScale?: number
  bird: string
  photographer: string
  worldMap?: { countryCode: string; x: number; y: number; width: number }
}

export const destinations: readonly Destination[] = [
  {
    id: "colombia",
    name: "Colombia",
    href: "/colombia",
    worldMap: { countryCode: "COL", x: 155, y: 330, width: 185 },
    tagline: "From the high Andes to the Amazon",
    description: "Hummingbirds in the mountains, toucans in the forest and a remarkable variety of places to explore. Discover Colombia’s regions and plan your own birding journey.",
    image: "/images/green-bearded-helmetcrest.png",
    imageAlt: "Green-bearded Helmetcrest perched on a yellow frailejón flower",
    imagePosition: "center 10%",
    imageScale: 1.17,
    bird: "Green-bearded Helmetcrest · Colombia",
    photographer: "Nicolás Rozo",
  },
  {
    id: "australia",
    name: "Australia",
    href: "/australia",
    worldMap: { countryCode: "AUS", x: 640, y: 405, width: 185 },
    tagline: "Ancient forests, wild coasts and open country",
    description: "Fairywrens, cockatoos and encounters found nowhere else. Explore Australia’s regions, find your inspiration and help shape a personal birding adventure.",
    image: "/images/destinations/splendid-fairywren.jpg",
    imageAlt: "A blue male Splendid Fairywren photographed in Denmark, Western Australia",
    imagePosition: "center 48%",
    bird: "Splendid Fairywren · Western Australia",
    photographer: "BaroBert · CC BY-SA 3.0",
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    href: "/new-zealand",
    worldMap: { countryCode: "NZL", x: 772, y: 492, width: 220 },
    tagline: "Island birds, mountain landscapes and time to explore",
    description: "Get to know Aotearoa New Zealand: native birdlife, forests and coastlines, with room for food, culture and a gentler pace.",
    image: "/images/destinations/kea-new-zealand.jpg",
    imageAlt: "A kea with olive-green feathers perched beside a tree in New Zealand",
    imagePosition: "center 45%",
    bird: "Kea · New Zealand",
    photographer: "Piotr Zurek · CC BY-SA 2.0",
  },
]
