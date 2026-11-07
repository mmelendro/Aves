/**
 * The curated directory of public AVES/Colombia/NZ pages.
 * Both the human-readable site map and search-engine sitemap use this list.
 * Private account routes and old redirect aliases do not belong in the directory.
 * flatMap at the end turns the grouped lists into one flat list of page entries.
 */
// Public, canonical page paths only; exclude private tools and redirect aliases.
// Keep paths unprefixed: framework helpers supply each site's base path.
export type PublicPageGroup = { id: string; title: string; pages: { href: string; label: string }[] }

export const publicPageGroups: PublicPageGroup[] = [
  {
    id: "new-zealand", title: "Discover New Zealand",
    pages: [{ href: "/new-zealand", label: "New Zealand — In Development" }],
  },
  {
    id: "start", title: "AVES & Colombia",
    pages: [
      { href: "/", label: "AVES Home — All Destinations" },
      { href: "/colombia", label: "Colombia Home" },
      { href: "/aves-explorer", label: "Explore the Regions" },
      { href: "/species", label: "Colombian Birdlife" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/contact", label: "Plan My Colombia Trip" },
    ],
  },
  {
    id: "regions", title: "Colombian Regions",
    pages: [
      { href: "/regions/pacific", label: "Pacific" },
      { href: "/regions/western-andes", label: "Western Andes" },
      { href: "/regions/central-andes", label: "Central Andes" },
      { href: "/regions/eastern-andes", label: "Eastern Andes" },
      { href: "/regions/cauca-valley", label: "Cauca Valley" },
      { href: "/regions/magdalena-valley", label: "Magdalena Valley" },
      { href: "/regions/caribbean", label: "Caribbean" },
      { href: "/regions/sierra-nevada-de-santa-marta", label: "Sierra Nevada de Santa Marta" },
      { href: "/regions/llanos", label: "Llanos" },
      { href: "/regions/amazonia", label: "Amazonia" },
      { href: "/regions/colombian-massif", label: "Colombian Massif" },
    ],
  },
  {
    id: "experiences", title: "Colombia Birding Experiences",
    pages: [
      { href: "/tours", label: "Birding Experiences" },
      { href: "/tours/adventure", label: "Adventure Tours" },
      { href: "/tours/vision", label: "Vision Tours" },
      { href: "/tours/elevate", label: "Elevate Tours" },
      { href: "/tours/souls", label: "Souls Tours" },
      { href: "/tours/adventure/sierra-nevada", label: "Sierra Nevada Birding Experience" },
    ],
  },
  {
    id: "about", title: "About AVES Colombia",
    pages: [
      { href: "/about", label: "About AVES Colombia" },
      { href: "/team", label: "Our Team" },
      { href: "/about/partners", label: "Our Partners" },
      { href: "/about/b-corp", label: "Our B Corp Journey" },
      { href: "/conservation", label: "Responsible Birding" },
    ],
  },
  {
    id: "planning", title: "Colombia Reading & Planning",
    pages: [
      { href: "/blog", label: "Birding Blog" },
      { href: "/blog/hummingbird-vision-journey", label: "Hummingbird Sanctuaries" },
      { href: "/blog/sierra-nevada-indigenous-birding", label: "Sierra Nevada Birding" },
      { href: "/blog/paramo-manizales-thornbill", label: "Páramo & Cloud Forests" },
      { href: "/blog/choco-toucan-expedition", label: "Chocó Birding" },
      { href: "/resources", label: "Birding Resources" },
      { href: "/travel-tips", label: "Travel Tips" },
    ],
  },
  {
    id: "information", title: "Website Information",
    pages: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/cookies", label: "Cookies" },
      { href: "/credits", label: "Photo & Sound Credits" },
      { href: "/site-map", label: "Site Map" },
    ],
  },
]

export const publicPages = publicPageGroups.flatMap(group => group.pages)
