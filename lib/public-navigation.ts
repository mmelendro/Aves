/** Use the existing public registries for navigation and the unified sitemap.
 * Private/auth/API routes stay native and never enter the media allowlist. */
import {
  publicPages,
  publicPageGroups,
  type PublicPageGroup,
} from "@/lib/public-pages";
import {
  publicPages as australianPages,
  publicPageGroups as australianGroups,
} from "@/features/australia/lib/public-pages";
import { sitePath as australiaPath } from "@/features/australia/lib/site-path";

export const publicNavigationPaths = [
  ...new Set([
    ...publicPages.map((page) => page.href),
    ...australianPages.map((page) => australiaPath(page.href)),
  ]),
];

/** One human directory uses the same country inventory as the XML sitemap. */
export const publicNavigationGroups: (Omit<PublicPageGroup, "country"> & {
  country: "colombia" | "australia" | "new-zealand" | null;
})[] = [
  ...publicPageGroups,
  ...australianGroups.map((group) => ({
    ...group,
    country: "australia" as const,
    id: `australia-${group.id}`,
    title: `Australia · ${group.title}`,
    pages: group.pages.map((page) => ({
      ...page,
      href: australiaPath(page.href),
    })),
  })),
];
