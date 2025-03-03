import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  /* Timeout for each test increased to allow for database interactions. */
  timeout: 60000,
  /* Auto-retrying assertions using an "expect" call have a separate timeout, 5 seconds by default.*/
  expect: {
    timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 1 : undefined,
  // Limit the number of failures on CI to save resources
  maxFailures: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"], ["json", { outputFile: "./e2e/test-results.json" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    /* Whether to run browser in headless mode. Defaults to true unless the devtools option is true. */
    headless: true,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:5173",
    /* Whether to record video for each test. Defaults to 'off'. */
    video: "on",

    locale: "es-MX",
  },

  /* Configure projects for major browsers */
  projects: [
    /* {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      outputDir: "./e2e/test-results",
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      outputDir: "./e2e/test-results",
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      outputDir: "./e2e/test-results",
    }, */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    /* {
      name: "Microsoft Edge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    }, */
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    timeout: 120000, // Allow time for the server to start
    reuseExistingServer: !process.env.CI, // Prevents starting a new server if one is running
  },
});
