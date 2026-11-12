const {test}=require('node:test'),assert=require('node:assert/strict')
const {sourceFreshness}=require('./helpers/load-ts.cjs')()('lib/source-freshness.ts')
test('source checks distinguish missing/future/invalid dates and an overdue reference',()=>{
 const now=Date.parse('2026-11-13T00:00:00Z')
 assert.equal(sourceFreshness('2026-11-13',now),'reviewed')
 assert.equal(sourceFreshness('2026-11-13',Date.parse('2026-11-12T19:00:00Z')),'reviewed')
 assert.equal(sourceFreshness('2026-07-01',now),'review-due')
 for(const date of ['','2026-11-14','2026-02-30','2026-1-1'])assert.equal(sourceFreshness(date,now),'unknown')
})
