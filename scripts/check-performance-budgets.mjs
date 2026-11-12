/** A deterministic transfer proxy; never describe this as measured visitor speed. */
import fs from 'node:fs'
import {spawnSync} from 'node:child_process'
const budget = JSON.parse(fs.readFileSync('content/performance-budgets.json','utf8'))
const result = spawnSync(process.execPath,['scripts/profile-route-bundles.mjs','--output','/tmp/aves-release-bundles.json'],{encoding:'utf8'})
if(result.status !== 0) throw new Error(result.stderr || result.stdout)
const report = JSON.parse(fs.readFileSync('/tmp/aves-release-bundles.json','utf8'))
for (const [route, limit] of Object.entries(budget.initialGzipBytes)) {
  const key = route === '/' ? '/page' : `${route}/page`
  const actual = report.routes.find(row => row.route === key)?.js.gzip
  if (!Number.isSafeInteger(actual) || actual > limit) throw new Error(`${route}: gzip estimate ${actual} exceeds ${limit}`)
  console.log(`${route}: ${actual} / ${limit} estimated gzip bytes`)
}
