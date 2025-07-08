import { test } from '@/fixtures/apiContextFixture';
import { expect } from '@playwright/test';

test('Count number of users in each company @regression', async ({ apiContext }) => {
  const response = await apiContext.get('/users');

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const users = await response.json();
  const companyCount: Record<string, number> = {};

  for (const user of users) {
    const companyName = user.company.name;
    companyCount[companyName] = (companyCount[companyName] || 0) + 1;
  }

  console.log('Users per company:', companyCount);

  // Assert there is at least one company counted
  expect(Object.keys(companyCount).length).toBeGreaterThan(0);
});
