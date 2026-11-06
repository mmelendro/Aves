/** Public destination cards. Add a country only after its site and shared-account catalogue are ready. */
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
]
