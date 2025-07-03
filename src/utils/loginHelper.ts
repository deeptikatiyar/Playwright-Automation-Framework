  import { Page } from '@playwright/test';
  import { LoginPage } from '../pages/LoginPage';
  import { validUser } from '../testData/userModel';

  export async function loginAsValidUser(page: Page): Promise<void> {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser);
  }
