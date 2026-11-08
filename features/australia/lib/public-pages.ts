/**
 * Hand-maintained public Australian page directory for navigation/sitemaps.
 * Private account/admin endpoints do not belong in this discovery list. Omitting a
 * page from a sitemap is not an access-control mechanism.
 */

// Public, canonical page paths only; exclude private tools and redirect aliases.
// Keep paths unprefixed: framework helpers supply each site's base path.
export type PublicPageGroup = { id: string; title: string; pages: { href: string; label: string }[] }

export const publicPageGroups: PublicPageGroup[] = [
  {
    id: "start", title: "Start Exploring",
    pages: [
      { href: "/", label: "Australia Home" },
      { href: "/aves-explorer", label: "Explore the Regions" },
      { href: "/species", label: "Australian Birdlife" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/contact", label: "Plan My Trip" },
    ],
  },
  {
    id: "regions", title: "Australian Regions",
    pages: [
      { href: "/regions/queensland", label: "Queensland" },
      { href: "/regions/new-south-wales", label: "New South Wales" },
      { href: "/regions/tasmania", label: "Tasmania" },
      { href: "/regions/victoria", label: "Victoria" },
      { href: "/regions/south-australia", label: "South Australia" },
      { href: "/regions/western-australia", label: "Western Australia" },
      { href: "/regions/northern-territory", label: "Northern Territory" },
      { href: "/regions/australian-capital-territory", label: "Australian Capital Territory" },
      { href: "/regions/jervis-bay-territory", label: "Jervis Bay Territory" },
    ],
  },
  {
    id: "experiences", title: "Birding Experiences",
    pages: [
      { href: "/tours", label: "Birding Experiences" },
      { href: "/tours/adventure", label: "Adventure Tours" },
      { href: "/tours/vision", label: "Vision Tours" },
      { href: "/tours/elevate", label: "Elevate Tours" },
      { href: "/tours/souls", label: "Souls Tours" },
    ],
  },
  {
    id: "about", title: "About AVES",
    pages: [
      { href: "/about", label: "About AVES Australia" },
      { href: "/team", label: "Our Team" },
      { href: "/about/partners", label: "Our Connections" },
      { href: "/about/b-corp", label: "Our B Corp Journey" },
      { href: "/conservation", label: "Responsible Birding" },
    ],
  },
  {
    id: "planning", title: "Reading & Planning",
    pages: [
      { href: "/blog", label: "Australian Notes" },
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

/**
 * Flatten grouped entries for consumers that need one list of public pages.
 */
export const publicPages = publicPageGroups.flatMap(group => group.pages)
