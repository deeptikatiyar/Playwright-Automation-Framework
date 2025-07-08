import { test } from '@/fixtures/apiContextFixture';
import { expect } from '@playwright/test';

test('Validate email format of all users @api', async ({ apiContext }) => {
  const response = await apiContext.get('/users');

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const users = await response.json();
  expect(Array.isArray(users)).toBeTruthy();
  expect(users.length).toBe(10);

  const emails: string[] = users.map((u: any) => u.email);
  const emailDomains: string[] = [];

  for (const email of emails) {
    // Basic structure checks
    expect(email.includes('@')).toBeTruthy();
    expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/);

    // Extract domain using your original style
    const [, domain] = email.split('@');
    emailDomains.push(domain);
  }

  console.log('📨 Email domains:', emailDomains);
});

test('Check each user email has @ and . characters @regression', async ({ apiContext }) => {
  const response = await apiContext.get('/users');
  expect(response.status()).toBe(200);

  const users = await response.json();
  const emails = users.map((u: any) => u.email);

  for (const email of emails) {
    const hasAt = email.includes('@');
    const hasDot = email.includes('.');
    expect(hasAt && hasDot).toBe(true); // Assert that correct email must contain both
  }
});
