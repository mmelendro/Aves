const { test } = require('node:test')
const assert = require('node:assert/strict')
const { componentHarness, nodes, find } = require('./helpers/component-harness.cjs')
const routes = {
  blog: 'BlogPage', tours: 'ToursPage', team: 'TeamPage', conservation: 'ConservationPage',
  'how-it-works': 'HowItWorksPage', privacy: 'PrivacyPage', terms: 'TermsPage', cookies: 'CookiesPage',
}
const mocks = {
  '@/components/navigation-header': { NavigationHeader: 'NavigationHeader' },
  '@/components/footer': { Footer: 'Footer' },
  '@/components/colombia-hero-explorer': { __esModule: true, default: 'ColombiaHeroExplorer' },
  '@/components/tour-comparison': { __esModule: true, default: 'TourComparison' },
  '@/components/team-carousel': { TeamCarousel: 'TeamCarousel' },
  '@/components/optimized-image': { __esModule: true, default: 'OptimizedImage' },
  '@/components/cookie-management-button': { CookieManagementButton: 'CookieManagementButton' },
}
for (const [route, name] of Object.entries(routes)) {
  test(`${route} exposes one skip target and shared heading inside public chrome`, () => {
    const tree = componentHarness(`app/${route}/page.tsx`, "default", {}, { mocks }).render()
    const all = nodes(tree)
    const mains = all.filter(node => node.type === 'main')
    assert.equal(mains.length, 1)
    assert.equal(mains[0].props.id, 'main-content')
    assert.equal(mains[0].props.tabIndex, -1)
    assert.equal(all.filter(node => node.type === 'NavigationHeader').length, 1)
    assert.equal(all.filter(node => node.type === 'Footer').length, 1)
    assert.equal(nodes(mains[0]).filter(node => ['PageHeading', 'PageIntroduction'].includes(node.type?.name)).length, 1)
    assert.ok(!nodes(mains[0]).some(node => ['NavigationHeader', 'Footer'].includes(node.type)))
    if (['blog','tours'].includes(route)) find(mains[0], node => node.type === 'ColombiaHeroExplorer')
    if (route === 'cookies') find(mains[0], node => node.type === 'CookieManagementButton')
  })
}
test('custom and standard introductions share the same single h1 renderer', () => {
  const tree = componentHarness('components/page-introduction.tsx', 'PageIntroduction', {title:'A title',description:'A description',eyebrow:'AVES'}).render()
  const heading = find(tree, node => node.type?.name === 'PageHeading')
  const rendered = componentHarness('components/page-introduction.tsx', 'PageHeading', heading.props).render()
  const titles = nodes(rendered).filter(node => node.type === 'h1')
  assert.equal(titles.length, 1)
  assert.equal(titles[0].props.children, 'A title')
  assert.match(titles[0].props.className, /text-emerald-950/)
})
