// tests/_sandbox/mockInventoryExperiment.spec.ts

import { test, expect } from '@playwright/test';

/**
 * Objective— API Mocking for Inventory (Not Functional)
 *
 * This test mocks the inventory API response using route.fulfill().
 * However, SauceDemo.com does not fetch product data from an API,it renders static HTML.
 * So, even though the API is mocked, the UI still shows the default products.
 *
 * Findings:
 * page.route + route.fulfill is useful for mocking APIs in real-world apps
 * where the frontend fetches data dynamically via HTTP calls when backend is not ready.
 */

test.skip('Mock product inventory response (experiment)', async ({ page }) => {
  await page.route('**/inventory.json', async route => {
    const mockedResponse = {
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 1,
          name: 'Mocked Product',
          price: 99.99,
          description: 'This product is mocked for testing.'
        }
      ])
    };
    await route.fulfill(mockedResponse);
  });

  // Perform login to access inventory page
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Navigate to inventory
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Assertion will fail as the page still shows static products
  const productTitles = page.locator('.inventory_item_name');
  await expect(productTitles.first()).toHaveText('Mocked Product');
});
