import { expect } from '@playwright/test';
import { test } from '@/fixtures/apiContextFixture';

test('Verify user name from API appears correctly in UI', async ({ apiContext, page }) => {
  const apiResponse = await apiContext.get('/users/1');
  const user = await apiResponse.json();
  const expectedName = user.name;

  // Local mock page
  await page.goto('http://localhost:3000/profile.html'); // match the URL from `serve`

  const displayedName = await page.locator('#profile-name').innerText();
  expect(displayedName).toBe(expectedName);

  });
  
