import type { GuideMapCue } from "@/lib/guide-map-cue"
import styles from "./resizable-discovery-pair.module.css"
/** A non-interactive miniature; its containing button owns the single action. */
export default function GuideMapThumbnail({map}:{map:GuideMapCue}) {
  // eslint-disable-next-line @next/next/no-img-element -- A fixed 36px decorative miniature belongs to the labelled containing control.
  return <span className={styles.mapThumbnail} aria-hidden="true"><img src={map.image} alt="" width={36} height={36} loading="lazy"/></span>
}
