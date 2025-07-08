/*To validate that each user object returned from /users has valid geo coordinates (latitude and longitude) 
in address.geo. */

import { test } from '@/fixtures/apiContextFixture';
import { expect } from '@playwright/test';

test('@regression Validate all users have geo coordinates', async ({ apiContext }) => {
  const response = await apiContext.get('/users');
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const users = await response.json();

  for (const user of users) {
    const { lat, lng } = user.address.geo;

    expect(lat).toBeTruthy();
    expect(lng).toBeTruthy();

    expect(typeof lat).toBe('string');  //asserting if the datatype is string
    expect(typeof lng).toBe('string');

    expect(!isNaN(Number(lat))).toBeTruthy(); //asserting if it's numerically correct even if it's string
    expect(!isNaN(Number(lng))).toBeTruthy();

    console.log(`${user.name} has coordinates lat: ${lat}, lng: ${lng}`);
  }
});
