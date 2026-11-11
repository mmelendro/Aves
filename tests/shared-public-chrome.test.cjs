const { test } = require("node:test")
const assert = require("node:assert/strict")
const { componentHarness, find, nodes } = require("./helpers/component-harness.cjs")

function header(path, country, selection = null) {
  return componentHarness("components/new-zealand-header.tsx", "NewZealandHeader", { country }, { mocks: {
    "next/navigation": { usePathname: () => path },
    "@/components/header-landscape-context": { useHeaderLandscape: () => ({ selection }) },
  } }).render()
}

test("public chrome uses direct-route geography and follows cross-country explorer selection", () => {
  const direct = header("/australia/regions/new-south-wales", "global")
  const contour = find(direct, node => node.type === "HeaderContour")
  assert.equal(contour.props.country, "australia")
  assert.equal(contour.props.regionId, "new-south-wales")
  const selected = header("/australia", "global", { country: "new-zealand", regionId: "south-island", placeId: "mountains" })
  const selectedContour = find(selected, node => node.type === "HeaderContour")
  assert.equal(selectedContour.props.country, "new-zealand")
  assert.equal(selectedContour.props.placeId, "mountains")
  assert.equal(find(selected, node => node.type?.name === "BrandMark").props.country, "new-zealand")
  const world = header("/australia", "global", { country: "global" })
  assert.equal(find(world, node => node.type?.name === "BrandMark").props.country, "global")
  const editorial = header("/australia/about", "australia", { country: "colombia", regionId: "caribbean" })
  assert.equal(find(editorial, node => node.type === "HeaderContour").props.country, "australia")
})

test("unselected world header has a world title and accessible site tree entry", () => {
  const tree = header("/", "global")
  assert.ok(nodes(tree).some(node => JSON.stringify(node.props.children) === '["AVES ","Explore the world"]'))
  assert.equal(find(tree, node => node.type === "HeaderContour").props.country, "global")
  const mobile = find(tree, node => node.type === "nav" && node.props["aria-label"] === "Mobile navigation")
  assert.ok(find(mobile, node => node.props.href === "/site-map"))
})

test("Australian explorer delegates to shared public header and country-aware footer", () => {
  const tree = componentHarness("features/australia/components/explorer-navigation.tsx", "ExplorerHeader", {}).render()
  assert.equal(tree.type.name, "NewZealandHeader")
  assert.equal(tree.props.country, "global")
  for (const country of ["australia", "colombia", "new-zealand", "global"]) {
    const footer = componentHarness("features/australia/components/explorer-navigation.tsx", "ExplorerFooter", {}, { mocks: {
      "./header-landscape-context": { useHeaderLandscape: () => ({ selection: { country } }) },
    } }).render()
    assert.equal(footer.type.name, country === "australia" ? "Footer" : "GlobalFooter")
    if (country !== "australia") assert.equal(footer.props.country, country)
  }
})
