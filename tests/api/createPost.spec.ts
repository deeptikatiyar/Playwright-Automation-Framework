import { test} from '@/fixtures/apiContextFixture'; // Using apiContext fixture
import { expect } from '@playwright/test'
import { readJsonFile } from '@/utils/jsonReaderHelper';
import { createPost } from '@/utils/createPostHelper';

test('Create a new post with post request @smoke', async ({ apiContext }) => {
  const postData = readJsonFile<any>('testData/createPostTestData.json');
  const { response, responseBody } = await createPost(apiContext, postData);

  expect(responseBody).toMatchObject(postData);
  expect(responseBody.id).toBeDefined();
  expect(response.status()).toBe(201);

  console.log('New post created:', responseBody);
});

test('Error validation with invalid data @regression', async ({ apiContext }) => {
  const invalidPostData = readJsonFile<any>('testData/invalidPostData.json');
  const { response, responseBody } = await createPost(apiContext, invalidPostData);

  // JSONPlaceholder still returns 201. Replace with correct error with real applications
  expect(response.status()).toBe(201); 
  console.log('ResponseBody: ', responseBody);
  console.log('ResponseStatus: ', response.status());
});
