const {test}=require('node:test'),assert=require('node:assert/strict');
const {albumLinksValid,albumSchema}=require('./helpers/load-ts.cjs')()('lib/bird-album.ts');
const entry='f4fa711d-3730-49df-8c5b-bd90394b428f',photo='b13b0801-1c6d-41d4-94da-12e3adeebf13';
const bird={id:'a13b0801-1c6d-41d4-94da-12e3adeebf13',speciesId:'co-test',state:'observed',date:'2026-11-13',regionId:'',notes:'Owner entered identification',deleted:false};
const previous={version:1,birds:[bird]},linked={version:1,birds:[{...bird,journalEntryId:entry,photoId:photo,photoCredit:'Original creator'}]},options={entries:[{id:entry,title:'Original journal entry'}],photos:[{id:photo,entryId:entry,caption:'Owner photo',creator:'Original creator'}]};
test('new journal/photo links require active same-trip options and exact attribution',()=>{
 assert.ok(albumSchema.safeParse(linked).success);assert.ok(albumLinksValid(linked,previous,options));
 assert.equal(albumLinksValid(linked,previous,{entries:[],photos:[]}),false);
 assert.equal(albumLinksValid(linked,previous,{...options,photos:[{...options.photos[0],entryId:photo}]}),false);
 assert.equal(albumLinksValid({...linked,birds:[{...linked.birds[0],photoCredit:'Changed attribution'}]},previous,options),false);
 assert.equal(albumSchema.safeParse({version:1,birds:[{...bird,photoId:photo}]}).success,false);
 assert.equal(linked.birds[0].state,'observed');assert.equal(Object.hasOwn(linked.birds[0],'verified'),false);
});
test('removed links retain their original credit and can be cleared without deleting records',()=>{
 assert.ok(albumLinksValid(linked,linked,{entries:[],photos:[]}));
 assert.ok(albumLinksValid(previous,linked,{entries:[],photos:[]}));
 assert.equal(linked.birds[0].photoCredit,'Original creator');assert.equal(previous.birds[0].notes,'Owner entered identification');
});
