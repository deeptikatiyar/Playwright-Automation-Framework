import { defineConfig, devices } from '@playwright/test';
//import dotenv from 'dotenv'; //no need to import as it is being imported via envHelper below.
import { config as envConfig } from './src/utils/envHelper';
// 👈 import the centralized config
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**This code below to choose workers is only needed if we don't import envHelper. If we are
 * importing it then that helper method will import it automatically */

//dotenv.config(); // Load from .env file

// Determine current environment like ('qa', 'dev', 'local', or 'prod')
//const env = process.env.ENV || 'qa';

// ⚙️ Smart logic to choose how many workers (parallel test runners) to use
// const workers = process.env.WORKERS
//   ? parseInt(process.env.WORKERS, 10) // Use value from .env if WORKERS is set
//   : env === 'dev'
//     ? 4 //  workers for dev environment
//     : env === 'qa'
//       ? 2 // workers for qa environment
//       : 1; // prod gets only 1 (safe default)

/**
 * See https://playwright.dev/docs/test-configuration.
 */


export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  //workers, // ** now dynamically based on ENV
  workers: envConfig.workers,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report',open: 'on-failure' }],
    ['allure-playwright'],
  ],  

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
     baseURL: envConfig.baseURL,
     headless: true,
     screenshot: 'only-on-failure',
     video: 'retain-on-failure',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    //trace: 'on-first-retry',
    trace: 'on',  
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

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
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
