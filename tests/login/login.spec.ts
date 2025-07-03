import { expect, test } from '@/fixtures/standardUserFixture';
import { LoginPage } from '@/pages/LoginPage';
import { HeaderMenu } from '@/pages/HeaderMenu';
import { taggedLogin } from '@/utils/taggedLoginHelper';
import { taggedTest } from '@/utils/taggedTestHelper';
import { invalidUser } from '@/testData/userModel';

test.describe('Positive Login & Logout Flows', () => {
  taggedLogin('smoke', 'Login validUserTest - Using POM', async ({ loggedInPage }) => {
    await expect(loggedInPage.locator('.title')).toHaveText('Products');
  });

  taggedLogin('regression', 'Logout flow', async ({ loggedInPage }) => {
    const headerMenu = new HeaderMenu(loggedInPage);
    await expect(loggedInPage.locator('.title')).toHaveText('Products');
    await headerMenu.logout();
    await expect(loggedInPage).toHaveURL('/');
  });
});

test.describe('Negative Login Validations', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  taggedTest('regression', 'Invalid login shows error message', async ({}) => {
    await loginPage.loginWithCredentials(invalidUser.username, invalidUser.password);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  taggedTest('regression', 'Invalid Login test without username', async ({}) => {
    await loginPage.loginWithCredentials('', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      'Epic sadface: Username is required'
    );
  });

  taggedTest('regression', 'Invalid Login test without password', async ({}) => {
    await loginPage.loginWithCredentials('standard_user', '');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      'Epic sadface: Password is required'
    );
  });
});
