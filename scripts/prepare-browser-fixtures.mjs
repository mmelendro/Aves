/** CI-only entry for exercising real client forms with synthetic, intercepted HTTP.
 * Never included in Vercel builds. No production authentication bypass is added. */
import { mkdir, copyFile } from 'node:fs/promises'
if (process.env.GITHUB_ACTIONS !== 'true' || process.env.VERCEL || process.env.AVES_BROWSER_FIXTURES !== '1') {
  throw new Error('Browser fixtures require the isolated GitHub Actions build.')
}
await mkdir('app/browser-fixtures/trip-editor', { recursive: true })
await copyFile('tests/browser/fixtures/trip-editor.tsx', 'app/browser-fixtures/trip-editor/page.tsx')
