import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmationMessage: Locator;
  readonly errorMessage: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postCode = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.confirmationMessage = page.locator('.checkout_complete_container');
    this.errorMessage = page.locator('[data-test="error"]');
    this.cancelButton = page.locator('#cancel')
  }

  async fillCustomerInfo(first: string, last: string, code: string): Promise<void> {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postCode.fill(code);
  }

  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
  }

  async confirmOrder(): Promise<void> {
    await this.finishButton.click();
  }

  async verifyOrderComplete(): Promise<void> {
    await expect(this.confirmationMessage).toBeVisible();
    await expect(this.confirmationMessage).toContainText('Thank you for your order!');
  }

  async verifyErrorMessage(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedText);
  }

  async cancelCheckout(): Promise<void> {
    await expect(this.cancelButton).toBeVisible();
    await this.cancelButton.click();
  }
}
