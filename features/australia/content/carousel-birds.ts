/** Share the maintained Australian catalogue between country and global viewers. */
import { birdData } from "./birds"
import type { BirdProfile } from "@/content/birds"
import { sitePath } from "../lib/site-path"
export function asAustralianBird(bird: BirdProfile): BirdProfile {
  return {
    ...bird, image: sitePath(bird.image),
    audioFile: bird.audioFile ? sitePath(bird.audioFile) : undefined,
    regionHref: "/australia/regions/" + bird.regionSlug,
    audioCreditHref: "/australia/credits#audio-" + bird.id,
    photoCredit: { ...bird.photoCredit,
      teamLink: bird.photoCredit.teamLink ? sitePath(bird.photoCredit.teamLink) : undefined,
      reserveLink: bird.photoCredit.reserveLink ? sitePath(bird.photoCredit.reserveLink) : undefined,
    },
  }
}
export const australianBirds = birdData.map(asAustralianBird)
