const { test } = require("node:test")
const assert = require("node:assert/strict")
const { existsSync } = require("node:fs")
const { resolve } = require("node:path")
const load = require("./helpers/load-ts.cjs")()
const { nzChecklistPhotos } = load("content/new-zealand-checklist-photos.ts")
const { newZealandCarouselBirds } = load("content/new-zealand-carousel.ts")
const { newZealandChecklist, featuredNzBirdId } = load("content/new-zealand-checklist.ts")

test("every existing NZ photograph joins one living checklist species with its original credit and file", () => {
  assert.equal(nzChecklistPhotos.size, 31)
  for (const bird of newZealandCarouselBirds) {
    const id = featuredNzBirdId(bird.scientificName)
    const photo = nzChecklistPhotos.get(id)
    assert.equal(photo.bird.id, bird.id)
    assert.ok(newZealandChecklist.some(entry => entry.id === id))
    assert.ok(existsSync(resolve(__dirname, "../public" + photo.bird.image)))
    for (const field of ["creator", "location", "title", "license", "modifications"]) assert.ok(photo.credit[field], `${bird.id}: ${field}`)
    for (const field of ["sourceUrl", "licenseUrl"]) assert.ok(["http:", "https:"].includes(new URL(photo.credit[field]).protocol))
  }
})

test("subspecies match their parent without inventing photographs for missing species", () => {
  const subspecies = newZealandCarouselBirds.filter(bird => bird.scientificName.split(/\s+/).length > 2)
  assert.ok(subspecies.length > 0)
  for (const bird of subspecies) {
    const photo = nzChecklistPhotos.get(featuredNzBirdId(bird.scientificName))
    assert.equal(photo.bird.scientificName, bird.scientificName)
  }
  assert.equal(newZealandChecklist.filter(bird => !nzChecklistPhotos.has(bird.id)).length, 346)
  assert.equal(nzChecklistPhotos.get("unknown"), undefined)
})
