import { Page, Locator } from '@playwright/test';
import { User } from '../testData/userModel';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly productsTitle: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.productsTitle = page.locator('.title');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto(): Promise<void> {
    try {
      await this.page.goto('/', {
        waitUntil: 'load',
        timeout: 10000,
      });
    } catch (error: any) {
      console.error('Site unreachable:', error.message);
      throw new Error('SauceDemo site not reachable');
    }
  }

  async login(user: User): Promise<void> {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
    await this.page.waitForURL('**/inventory.html');
  }

  async loginWithCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}