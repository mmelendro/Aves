const {test}=require('node:test');
const assert=require('node:assert/strict');
const {dateLabel}=require('./helpers/load-ts.cjs')()('components/account/account-api.ts');
test('calendar dates retain their day in NZ summer and winter and other viewer zones',()=>{
 const previous=process.env.TZ;
 try{
  for(const zone of ['Pacific/Auckland','Australia/Sydney','UTC','America/Vancouver']){
   process.env.TZ=zone;
   assert.equal(dateLabel('2026-11-13'),'13 Nov 2026');
   assert.equal(dateLabel('2026-06-13'),'13 June 2026');
   assert.equal(dateLabel('2026-02-30'),'Not specified');
  }
  process.env.TZ='Pacific/Auckland';assert.equal(dateLabel('2026-11-13T12:00:00Z'),'14 Nov 2026');
  process.env.TZ='UTC';assert.equal(dateLabel('2026-11-13T12:00:00Z'),'13 Nov 2026');
 }finally{if(previous===undefined)delete process.env.TZ;else process.env.TZ=previous;}
});
