/** Build web renditions of already-published, credited photographs. Originals,
 * their rights records and authored focal points are never overwritten. */
import { readFile, writeFile, mkdir } from "node:fs/promises"
import { existsSync, readFileSync } from "node:fs"
import { resolve, dirname, extname, join, sep } from "node:path"
import { createHash } from "node:crypto"
import ts from "typescript"
import sharp from "sharp"

const root = process.cwd(), cache = new Map()
function dataModule(path) {
  const candidate = resolve(root, path)
  const file = existsSync(candidate) ? candidate : [".ts", ".json"].map(ext => candidate + ext).find(existsSync)
  if (!file || !file.startsWith(root + sep)) throw Error(`Unknown public data module: ${path}`)
  if (cache.has(file)) return cache.get(file)
  if (file.endsWith(".json")) return JSON.parse(readFileSync(file, "utf8"))
  const output = {}; cache.set(file, output)
  const code = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText
  new Function("require", "exports", code)(name => {
    if (name.startsWith("@/")) return dataModule(name.slice(2))
    if (name.startsWith(".")) return dataModule(resolve(dirname(file), name))
    throw Error(`Unexpected public-data dependency: ${name}`)
  }, output)
  return output
}
const { destinationBirds } = dataModule("content/destination-birds.ts")
const { placeGalleryPhotos } = dataModule("lib/place-gallery.ts")
const sources = [...new Set([...Object.values(destinationBirds).flatMap(birds => birds.map(bird => bird.image)), ...placeGalleryPhotos.map(photo => photo.src)])].sort()
const directory = join(root, "public/images/renditions")
await mkdir(directory, { recursive: true })
sharp.concurrency(2)
const manifest = { version: 1, format: "webp", images: {} }
const recipeSha256 = createHash("sha256").update(await readFile(new URL(import.meta.url))).digest("hex")
const provenance = { generator: "scripts/generate-responsive-photos.mjs", recipeSha256, sharp: sharp.versions.sharp, policy: { widths: [160, 640, 1280], quality: 82, crop: false, enlarge: false }, images: [] }
// Reuse only bytes matching this exact recipe, source and output digest.
// A warm developer build checks the artifacts instead of recompressing them.
let prior = null
try { prior = JSON.parse(await readFile(join(root, "docs/audit/photo-renditions-2026-11-13.json"), "utf8")) } catch { /* First generation. */ }
const known = prior?.recipeSha256 === recipeSha256 && prior?.sharp === sharp.versions.sharp && JSON.stringify(prior.policy) === JSON.stringify(provenance.policy)
  ? new Map(prior.images.flatMap(image => image.variants.map(variant => [`${image.sourceSha256}:${variant.width}`, variant]))) : new Map()
const emitted = new Map()
for (const src of sources) {
  if (typeof src !== "string" || !src.startsWith("/") || src.startsWith("//") || ![".png", ".jpg", ".jpeg", ".webp"].includes(extname(src).toLowerCase())) continue
  const input = resolve(root, "public", src.slice(1))
  if (!input.startsWith(join(root, "public") + sep)) throw Error("Invalid public photo path")
  const original = await readFile(input), sourceSha256 = createHash("sha256").update(original).digest("hex")
  const metadata = await sharp(original).metadata()
  const width = metadata.autoOrient?.width || metadata.width, height = metadata.autoOrient?.height || metadata.height
  if (!width || !height || metadata.pages > 1) throw Error(`Unsupported public photograph: ${src}`)
  const widths = [...new Set([160, 640, 1280].map(target => Math.min(target, width)))].sort((a, b) => a - b)
  const variants = [], evidence = []
  for (const requestedWidth of widths) {
    const key = `${sourceSha256}:${requestedWidth}`
    let rendition = emitted.get(key)
    if (!rendition) {
      const cached = known.get(key)
      if (cached && /^\/images\/renditions\/[a-f0-9]{20}-\d+\.webp$/.test(cached.src)) {
        try {
          const data = await readFile(join(root, "public", cached.src.slice(1)))
          const metadata = await sharp(data).metadata()
          if (createHash("sha256").update(data).digest("hex") === cached.sha256 && metadata.width === cached.width && metadata.height === cached.height) rendition = cached
        } catch { /* Missing or damaged derivative is rebuilt from the original. */ }
      }
    }
    if (!rendition) {
      const { data, info } = await sharp(original).autoOrient().resize({ width: requestedWidth, withoutEnlargement: true }).webp({ quality: 82, effort: 4 }).toBuffer({ resolveWithObject: true })
      const outputSha256 = createHash("sha256").update(data).digest("hex")
      const name = `${outputSha256.slice(0, 20)}-${info.width}.webp`
      await writeFile(join(directory, name), data)
      rendition = { src: `/images/renditions/${name}`, width: info.width, height: info.height, bytes: data.length, sha256: outputSha256 }
    }
    emitted.set(key, rendition)
    variants.push({ src: rendition.src, width: rendition.width })
    evidence.push(rendition)
  }
  manifest.images[src] = { width, height, variants }
  provenance.images.push({ source: src, sourceSha256, sourceBytes: original.length, variants: evidence })
  if (provenance.images.length % 25 === 0) console.log(`Prepared ${provenance.images.length} credited photos`)
}
const manifestPath = join(root, "content/photo-renditions.json")
const auditPath = join(root, "docs/audit/photo-renditions-2026-11-13.json")
const manifestText = JSON.stringify(manifest, null, 2) + "\n"
const auditText = JSON.stringify(provenance, null, 2) + "\n"
if (process.argv.includes("--check")) {
  if (await readFile(manifestPath, "utf8") !== manifestText || await readFile(auditPath, "utf8") !== auditText) throw Error("Photo sources or rendition recipes changed. Run node scripts/generate-responsive-photos.mjs and commit its manifests before building.")
} else {
  await writeFile(manifestPath, manifestText)
  await writeFile(auditPath, auditText)
}
console.log(JSON.stringify({ photos: provenance.images.length, uniqueFiles: emitted.size, bytes: [...emitted.values()].reduce((sum, image) => sum + image.bytes, 0) }))
