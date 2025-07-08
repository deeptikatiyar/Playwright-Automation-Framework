import { Page, Locator, expect } from '@playwright/test';

export class HeaderMenu {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async logout(): Promise<void> {
    await expect(this.menuButton).toBeVisible();
    await this.menuButton.scrollIntoViewIfNeeded(); 
    await this.menuButton.click();
    
    await expect(this.logoutLink).toBeVisible();
    await this.logoutLink.click();
  }
}
