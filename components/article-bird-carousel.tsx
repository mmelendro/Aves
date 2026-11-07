/**
 * Connects an article topic to birds already in the shared Colombia catalogue.
 * The ID lists are editorial selections, not complete regional checklists.
 * The common carousel supplies the photo, call, controls and species details.
 */
import ColombiaHeroExplorer from "@/components/colombia-hero-explorer"
import HomepageBirdCarousel from "@/components/homepage-bird-carousel"
import { birdData, type BirdProfile } from "@/content/birds"

const articleBirdIds = {
  paramo: [
    "co-rainbow-bearded-thornbill",
    "co-black-billed-mountain-toucan",
    "co-chestnut-crowned-antpitta",
    "co-andean-motmot",
  ],
  hummingbirds: [
    "co-green-bearded-helmetcrest",
    "co-rainbow-bearded-thornbill",
    "co-velvet-purple-coronet",
  ],
  choco: [
    "co-choco-toucan",
    "co-velvet-purple-coronet",
    "co-yellow-throated-toucan",
  ],
  sierra: [
    "co-vermilion-cardinal",
    "co-santa-marta-brushfinch",
    "co-santa-marta-parakeet",
    "co-white-tailed-starfrontlet",
    "co-scaled-dove",
  ],
} as const

type ArticleBirdSelection = keyof typeof articleBirdIds

// Resolve IDs once when the module loads. Missing catalogue IDs fail loudly during build/render
// rather than silently showing an unrelated bird in an article.
const articleBirds = Object.fromEntries(
  Object.entries(articleBirdIds).map(([article, ids]) => [
    article,
    ids.map((id): BirdProfile => {
      const bird = birdData.find((entry) => entry.id === id)
      if (!bird) throw new Error(`Missing article bird: ${id}`)
      // This article features the Pacific part of the toucan's wider range.
      return article === "choco" && id === "co-yellow-throated-toucan"
        ? { ...bird, primaryRegion: "Pacific", regionSlug: "pacific" }
        : bird
    }),
  ]),
) as Record<ArticleBirdSelection, BirdProfile[]>

export default function ArticleBirdCarousel({ article }: { article: ArticleBirdSelection }) {
  return (
    <ColombiaHeroExplorer initialBird={articleBirds[article][0]} media={<div className="not-prose min-w-0">
      <HomepageBirdCarousel birds={articleBirds[article]} autoPlay={false} className="max-w-2xl" />
      <p className="mt-4 text-center text-sm text-gray-600">
        Choose a bird to explore its range and habitat. Recordings are available where shown.
      </p>
    </div>} />
  )
}
