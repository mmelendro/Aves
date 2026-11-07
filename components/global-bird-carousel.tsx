/**
 * Small wrapper choosing the global bird selection for the main homepage.
 * Photo, audio, details and portrait sizing are implemented in HomepageBirdCarousel.
 */
import HomepageBirdCarousel from "@/components/homepage-bird-carousel"
import { globalBirds } from "@/content/global-birds"

export default function GlobalBirdCarousel() {
  return <div className="mx-auto w-full min-w-0 max-w-xl">
    <HomepageBirdCarousel birds={globalBirds} autoPlay={false} className="max-w-xl" />
    <p className="mt-3 text-center text-sm leading-6 text-gray-600">A few voices from Colombia, Australia and New Zealand. Choose a bird, listen and follow your curiosity.</p>
  </div>
}
