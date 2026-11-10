const {test}=require('node:test')
const assert=require('node:assert/strict')
const load=require('./helpers/load-ts.cjs')()
const {syntheticPlannerPreviewAllowed:allowed}=load('lib/synthetic-planner-preview.ts')
test('synthetic planner UI route is off in production and only enabled on its exact preview branch',()=>{
 assert.equal(allowed({VERCEL_ENV:'preview',VERCEL_GIT_COMMIT_REF:'test/private-place-notes-ui'}),true)
 for(const env of [{},{VERCEL_ENV:'production',VERCEL_GIT_COMMIT_REF:'test/private-place-notes-ui'},{VERCEL_ENV:'development',VERCEL_GIT_COMMIT_REF:'test/private-place-notes-ui'},{VERCEL_ENV:'preview',VERCEL_GIT_COMMIT_REF:'australia/preview'}])assert.equal(allowed(env),false)
})
