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
  
    try {
      await this.sortDropdown.selectOption(option, { timeout: 3000 });
    } catch (e: unknown) {
      const error = e as Error;
      console.warn(`Invalid option "${option}". Skipping-reason- ${error.message}`);
      throw error; //  Re-throws the error so test can fail intentionally
    }
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

  async clickProductByName(productName: string): Promise<void> {
    const product = this.page.locator(`.inventory_item_name:text-is("${productName.trim()}")`);
    await expect(product).toHaveCount(1);
    await product.click();
  }

  async getProductDetails(): Promise<{ name: string; price: number }[]> {
    const count = await this.inventoryItems.count();
    const result = [];
    
    for (let i = 0; i < count; i++) {
      const item = this.inventoryItems.nth(i);
      const name = await item.locator('.inventory_item_name').textContent();
      const priceText = await item.locator('.inventory_item_price').textContent();
      const price = parseFloat(priceText?.replace('$', '') || '0');
      result.push({ name: name?.trim() || '', price });
    }
    return result;
  }
}