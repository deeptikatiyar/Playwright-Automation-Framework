import { test } from '@/fixtures/apiContextFixture';
import { expect } from '@playwright/test';

test('Get all users and validate the user object structure @smoke', async ({ apiContext }) => {
  const apiResponse = await apiContext.get('/users');

  expect(apiResponse.status()).toBe(200);
  expect(apiResponse.ok()).toBeTruthy();

  const responseBody = await apiResponse.json();

  expect(Array.isArray(responseBody)).toBeTruthy();
  expect(responseBody.length).toBe(10);

  for (const user of responseBody) {
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user.address).toHaveProperty('city');
  }
});

test('Validate response for a single user @regression', async ({ apiContext }) => {
  const apiResponse = await apiContext.get('/users/1');

  expect(apiResponse.status()).toBe(200);
  expect(apiResponse.ok()).toBeTruthy();

  const response = await apiResponse.json();
  expect(response).not.toBeNull();
  expect(typeof response).toBe('object');
  expect(response).toHaveProperty('id', 1);
  expect(typeof response.name).toBe('string');
});

test('Get users from South Christy @regression', async ({ apiContext }) => {
  const apiResponse = await apiContext.get('/users');

  expect(apiResponse.status()).toBe(200);
  expect(apiResponse.ok()).toBeTruthy();

  const userData = await apiResponse.json();
  const southChristyResidents = userData
    .filter((user: any) => user.address.city === 'South Christy')
    .map((user: any) => user.name);

  console.log('Residents are:', southChristyResidents);
  expect(southChristyResidents.length).toBeGreaterThan(0);
  for (const name of southChristyResidents) {
    expect(typeof name).toBe('string');
    expect(name.length).toBeGreaterThan(0);
  }
});

test('Validate all usernames are unique @api', async ({ apiContext }) => {
  const apiResponse = await apiContext.get('/users');

  expect(apiResponse.status()).toBe(200);
  expect(apiResponse.ok()).toBeTruthy();

  const userData = await apiResponse.json();
  const usernames = userData.map((user: any) => user.username);
  const uniqueUsernames = new Set(usernames);

  console.log('All Usernames:', usernames);
  console.log('Unique Usernames:', [...uniqueUsernames]);

  expect(uniqueUsernames.size).toBe(usernames.length);
});
