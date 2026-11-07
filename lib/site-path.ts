/**
 * URL helpers for the root AVES application, which has no /australia base path.
 * sitePath keeps existing paths unchanged. canonicalUrl builds the preferred
 * public https://aves.bio address used by search metadata, even in a local preview.
 */
export const sitePath = (path: string) => path
export const canonicalUrl = (path = "/") => new URL(path, "https://aves.bio").href
