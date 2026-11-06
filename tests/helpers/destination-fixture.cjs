// A launch fixture exercises real registry derivation without enabling a public destination.
const loader = require("./load-ts.cjs")
module.exports = function destinationFixture({ enabled = true } = {}) {
  const original = loader()("content/trip-options.ts")
  const destinationRegistry = {
    ...original.destinationRegistry,
    "test-islands": {
      label: "Test Islands", enabled, consentVersion: "test-islands-updates-v1",
      regions: [{ id: "test-cloud-forest", label: "Test Cloud Forest" }],
    },
  }
  return { ...original, destinationRegistry, ...original.createCountryOptions(destinationRegistry, original.DEFAULT_TRIP_COUNTRY) }
}
