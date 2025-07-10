import { test } from '@/fixtures/apiContextFixture';
import { expect } from '@playwright/test';
import { readJsonFile } from '@/utils/jsonReaderHelper';

test(' @api Mock verify created user from file', async () => {
  const savedUser = readJsonFile<any>('testOutput/lastCreatedUser.json');

  // expected mock structure 
  const expectedUser = {
    userId: 101,
    title: 'Playwright is awesome',
    body: 'Learning building blocks!'
  };

  expect(savedUser).toMatchObject(expectedUser);
  expect(savedUser.id).toBeDefined();

  console.log(`Mock verified saved user: ${savedUser.id}`);
});