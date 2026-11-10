import type { ComponentProps } from "react"
/** Public URLs already include their destination prefix. Native anchors preserve
 * cross-application navigation and the host player's paused handoff. */
export default function PublicLink({href,children,...props}:ComponentProps<"a">){return <a href={href} {...props}>{children}</a>}
