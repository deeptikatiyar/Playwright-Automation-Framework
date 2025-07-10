import { test } from '@/fixtures/apiContextFixture';
import { expect } from '@playwright/test'
import { createPost } from '@/utils/createPostHelper';
import { readJsonFile } from '@/utils/jsonReaderHelper';

const samplePost = readJsonFile<any>('testData/createPostTestData.json');

test('Create and then retrieve post by ID', async ({ apiContext }) => {
  const { responseBody } = await createPost(apiContext, samplePost);
  const postId = responseBody.id;

  const getResponse = await apiContext.get(`/posts/${postId}`);
  const getPost = await getResponse.json();

  expect(getResponse.ok()).toBeTruthy();
  expect(getPost.title).toBe(samplePost.title);
  expect(getPost.body).toBe(samplePost.body);
  expect(getPost.userId).toBe(samplePost.userId);

  console.log(` Post retrieved: ID=${postId}`);
});
