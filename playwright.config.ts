import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./tests/browser",
  timeout: 45_000,
  globalTimeout: 20 * 60_000,
  expect: { timeout: 12_000 },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 2,
  reporter: [["list"], ["json", { outputFile: "test-results/browser-results.json" }]],
  use: { baseURL: "http://127.0.0.1:3100", colorScheme: "light", reducedMotion: "reduce", screenshot: "only-on-failure", trace: "retain-on-failure" },
  webServer: { command: "node node_modules/next/dist/bin/next start --port 3100 --hostname 127.0.0.1", url: "http://127.0.0.1:3100", reuseExistingServer: false, timeout: 60_000, env: { VERCEL_ENV: "preview" } },
  projects: [
    { name: "phone-320", use: { browserName: "chromium", viewport: {width:320,height:740}, isMobile:true,hasTouch:true } },
    { name: "phone-390", use: { browserName: "chromium", viewport: {width:390,height:844}, isMobile:true,hasTouch:true } },
    { name: "landscape", use: { browserName: "chromium", viewport: {width:844,height:390}, isMobile:true,hasTouch:true } },
    { name: "tablet", use: { browserName: "chromium", viewport: {width:768,height:1024}, isMobile:true,hasTouch:true } },
    { name: "desktop", use: { browserName: "chromium", viewport: {width:1365,height:900} } },
    { name: "firefox", use: { browserName: "firefox", viewport: {width:1365,height:900} } },
  ],
})
