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
