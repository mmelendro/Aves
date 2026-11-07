/**
 * Public destination cards for the main AVES homepage. Adding a card here does
 * not enable account-based trip saving for that country; the shared backend has a
 * separate destination registry. Developing destinations link to an inquiry form.
 */
/** Public destination cards. Developing destinations offer inspiration and a contact-form conversation, not account-based booking. */
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
  status?: "In development"
}

export const destinations: readonly Destination[] = [
  {
    id: "colombia",
    name: "Colombia",
    href: "/colombia",
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
    tagline: "Island birds, mountain landscapes and time to explore",
    description: "Get to know Aotearoa New Zealand: native birdlife, forests and coastlines, with room for food, culture and a gentler pace. Our next destination is taking shape.",
    image: "/images/destinations/kea-new-zealand.jpg",
    imageAlt: "A kea with olive-green feathers perched beside a tree in New Zealand",
    imagePosition: "center 45%",
    bird: "Kea · New Zealand",
    photographer: "Piotr Zurek · CC BY-SA 2.0",
    status: "In development",
  },
]
