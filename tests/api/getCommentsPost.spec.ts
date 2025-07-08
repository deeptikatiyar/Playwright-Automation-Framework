import { test } from '@/fixtures/apiContextFixture';
import { expect } from '@playwright/test';

test('Validate comments for post ID 1 @api', async ({ apiContext }) => {
  const response = await apiContext.get('/posts/1/comments');

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const comments = await response.json();
  expect(Array.isArray(comments)).toBeTruthy();

  for (const comment of comments) {
    expect(comment).toHaveProperty('postId', 1);
    expect(typeof comment.postId).toBe('number');

    expect(comment).toHaveProperty('name');
    expect(typeof comment.name).toBe('string');

    expect(comment).toHaveProperty('email');
    expect(typeof comment.email).toBe('string');

    expect(comment).toHaveProperty('body');
  }
});
