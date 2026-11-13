/** CI-only entry for exercising real client forms with synthetic, intercepted HTTP.
 * Never included in Vercel builds. No production authentication bypass is added. */
import { mkdir, copyFile } from 'node:fs/promises'
if (process.env.GITHUB_ACTIONS !== 'true' || process.env.VERCEL || process.env.AVES_BROWSER_FIXTURES !== '1') {
  throw new Error('Browser fixtures require the isolated GitHub Actions build.')
}
await mkdir('app/browser-fixtures/trip-editor', { recursive: true })
await copyFile('tests/browser/fixtures/trip-editor.tsx', 'app/browser-fixtures/trip-editor/page.tsx')
await mkdir('app/browser-fixtures/trip-tools', { recursive: true })
await copyFile('tests/browser/fixtures/trip-tools.tsx', 'app/browser-fixtures/trip-tools/page.tsx')
await mkdir('app/browser-fixtures/bird-album', { recursive: true })
await copyFile('tests/browser/fixtures/bird-album.tsx', 'app/browser-fixtures/bird-album/page.tsx')
await mkdir('app/browser-fixtures/itinerary-editor', { recursive: true })
await copyFile('tests/browser/fixtures/itinerary-editor.tsx', 'app/browser-fixtures/itinerary-editor/page.tsx')
await mkdir('app/browser-fixtures/bird-album-nz', { recursive: true })
await copyFile('tests/browser/fixtures/bird-album-nz.tsx', 'app/browser-fixtures/bird-album-nz/page.tsx')
await mkdir('app/browser-fixtures/bird-collection', { recursive: true })
await copyFile('tests/browser/fixtures/bird-collection.tsx', 'app/browser-fixtures/bird-collection/page.tsx')

await mkdir("app/browser-fixtures/trip-dashboard", { recursive: true })
await copyFile("tests/browser/fixtures/trip-dashboard.tsx", "app/browser-fixtures/trip-dashboard/page.tsx")
