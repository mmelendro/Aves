import type { GuideMapCue } from "@/lib/guide-map-cue"
import styles from "./resizable-discovery-pair.module.css"
/** A non-interactive miniature; its containing button owns the single action. */
export default function GuideMapThumbnail({map}:{map:GuideMapCue}) {
  return <span className={styles.mapThumbnail} aria-hidden="true"><img src={map.image} alt="" width={36} height={36} loading="lazy"/>{map.selectedPath && <svg viewBox={map.viewBox} focusable="false"><path d={map.selectedPath} fill="#065f46"/>{map.point && <circle cx={map.point[0]} cy={map.point[1]} r="15" fill="#065f46"/>}</svg>}</span>
}
