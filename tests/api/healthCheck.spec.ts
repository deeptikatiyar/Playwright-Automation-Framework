import { test } from '@/fixtures/apiContextFixture';
import { expect } from '@playwright/test'

test('Health check: Validate /posts API is reachable and returns expected structure @smoke', async ({ apiContext }) => {
  const response = await apiContext.get('/posts');

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  console.log('Inventory Response:', responseBody.length);

  expect(Array.isArray(responseBody)).toBeTruthy();
  expect(responseBody.length).toBeGreaterThan(0);

  const firstPost = responseBody[0];
  expect(firstPost).toHaveProperty('id');
  expect(firstPost).toHaveProperty('title');
});
