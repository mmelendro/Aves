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
    ...["colombia", "australia", "new-zealand"].map(country => `/species/reference?country=${country}`),
    ...publicPages.map((page) => page.href),
    ...australianPages.map((page) => australiaPath(page.href)),
  ]),
];

/** One human directory uses the same country inventory as the XML sitemap. */
export const publicNavigationGroups: (Omit<PublicPageGroup, "country"> & {
  country: "colombia" | "australia" | "new-zealand" | null;
})[] = [
  { id: "species-inventories", title: "Country species inventories", country: null, pages: ["colombia", "australia", "new-zealand"].map(country => ({ href: `/species/reference?country=${country}`, label: `${country === "new-zealand" ? "New Zealand" : country === "colombia" ? "Colombia" : "Australia"} national bird inventory` })) },
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
