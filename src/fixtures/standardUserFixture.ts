// src/fixtures/standardUserFixture.ts
import { test as base, expect, Page, TestInfo } from '@playwright/test';
import { loginAsValidUser } from '../utils/loginHelper';

export type MyFixtures = {
  loggedInPage: Page;
};

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    await loginAsValidUser(page);
    await use(page);
  },
});

export { expect, TestInfo, Page };
