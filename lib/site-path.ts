export const sitePath = (path: string) => path
export const canonicalUrl = (path = "/") => new URL(path, "https://aves.bio").href
