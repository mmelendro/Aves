const {test}=require('node:test');
const assert=require('node:assert/strict');
const {createMapCameraMemory,mapCameraKey}=require('./helpers/load-ts.cjs')()('lib/map-camera-memory.ts');
test('background changes can recover the exact camera without mixing country and regional views',()=>{
 const m=createMapCameraMemory(),ni=mapCameraKey('new-zealand','north-island'),au=mapCameraKey('australia','new-south-wales');
 assert.equal(m.recall(ni),undefined);m.remember(ni,{centre:[-39.16,175.63],zoom:11});m.remember(au,{centre:[-34.1,151.05],zoom:10});
 assert.deepEqual(m.recall(ni),{centre:[-39.16,175.63],zoom:11});assert.deepEqual(m.recall(au),{centre:[-34.1,151.05],zoom:10});assert.equal(m.recall(mapCameraKey('new-zealand','rakiura')),undefined);
});
test('camera memory ignores invalid positions and does not expose mutable shared coordinates',()=>{
 const m=createMapCameraMemory(),camera={centre:[-39,175],zoom:9};m.remember('park',camera);camera.centre[0]=0;
 const restored=m.recall('park');restored.centre[0]=10;assert.equal(m.recall('park').centre[0],-39);
 for(const invalid of [{centre:[NaN,175],zoom:9},{centre:[-91,175],zoom:9},{centre:[-39,175],zoom:Infinity},{centre:[-39,175],zoom:15}])m.remember('park',invalid);
 assert.deepEqual(m.recall('park'),{centre:[-39,175],zoom:9});
});
