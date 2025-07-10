import { test } from '@/fixtures/apiContextFixture';
import { expect } from '@playwright/test';
import { createPost } from '@/utils/createPostHelper';
import { readJsonFile } from '@/utils/jsonReaderHelper';
import { writeJsonFile } from '@/utils/writeJsonFileHelper';

test(' @api Create a user and store the ID', async ({ apiContext }) => {
  const newUser = readJsonFile<any>('testData/createPostTestData.json');

  const { responseBody } = await createPost(apiContext, newUser);

  expect(responseBody.id).toBeDefined();

  writeJsonFile('testOutput/lastCreatedUser.json', {
    id: responseBody.id,
    userId: responseBody.userId,
    title: responseBody.title,
    body: responseBody.body
  });

  console.log(`User created with Id: ${responseBody.id}`);
});
