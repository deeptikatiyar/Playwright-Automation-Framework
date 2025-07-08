import { expect } from '@playwright/test';
import { test } from '@/fixtures/apiContextFixture';

test.describe('@api User API Tests', () => {
  
  test('Should return all users @smoke', async ({ apiContext }) => {
    const response = await apiContext.get('/users');
    const users = await response.json();
  
    expect(response.status()).toBe(200);
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });
  
  test('Should return user by ID @regression', async ({ apiContext }) => {
    const response = await apiContext.get('/users/1');
    const user = await response.json();
  
    expect(user.id).toBe(1);
    expect(user).toHaveProperty('username');
  });

  test('@regression Should filter user by city', async ({ apiContext }) => {
    const response = await apiContext.get('/users');
    const users = await response.json();

    const filtered = users.filter((user: any) => user.address.city === 'South Christy');

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered[0].name).toBe('Mrs. Dennis Schulist');
  });

  test('Response code validation for failed scenario @regression', async ({ apiContext }) => {
    const invalidId = 9999;
    const apiResponse = await apiContext.get(`/posts/${invalidId}`);
  
    const statusCode = await apiResponse.status();
    expect(statusCode).toBe(404);
  
    const responseBody = await apiResponse.json();
    expect(responseBody).toEqual({});
  });
  

});
