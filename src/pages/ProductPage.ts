import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.inventoryItems = page.locator('.inventory_item')
  }

  async waitForPageToLoad(): Promise<void> {
    await this.page.waitForURL('**/inventory.html');
    await expect(this.page.locator('.title')).toHaveText('Products');
  }

  async sortBy(option: string): Promise<void> {
    await expect(this.sortDropdown).toBeVisible();
    await this.sortDropdown.selectOption(option);
  }

  async getAllProductNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

  async getAllProductPricesAsNumbers(): Promise<number[]> {
    const priceTexts = await this.productPrices.allTextContents();
    return priceTexts.map(p => parseFloat(p.replace('$', '')));
  }
  

  async getProductCount(): Promise<number> {
    return await this.inventoryItems.count();
  }
}