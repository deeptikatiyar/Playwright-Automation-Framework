import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly removeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.removeButton = page.locator('button:has-text("Remove")');
    
  }

  async addDefaultProductToCart(): Promise<void> {
    await this.addProductToCartByName('Sauce Labs Backpack');
  }

  async addProductToCartByName(productName: string): Promise<void> {
    const product = this.page.locator('.inventory_item').filter({
      has: this.page.locator(`.inventory_item_name:text-is("${productName.trim()}")`)
    });

    await expect(product).toHaveCount(1);
    await product.locator('button:has-text("Add to cart")').click();
  }

  async addAllProductsToCart(): Promise<void> {
    const count = await this.page.locator('.inventory_item').count();
  
    for (let i = 0; i < count; i++) {
      const item = this.page.locator('.inventory_item').nth(i);
      const button = item.locator('button:has-text("Add to cart")');
      
      if (
        (await button.isVisible()) &&
        (await button.innerText()) === 'Add to cart'
      ) {
        await button.scrollIntoViewIfNeeded();
        await button.click();
      }        
    }
  }
  
  async goToCart(): Promise<void> {
    await expect(this.cartIcon).toBeVisible();
    await this.cartIcon.click();
    await this.page.waitForURL('**/cart.html');
  }

  async verifyItemInCart(): Promise<void> {
    await expect(this.cartItems.first()).toBeVisible(); // or use count > 0
  }   

  async assertItemCount(expectedCount: number): Promise<void> {
    const items = await this.page.locator('.cart_item');
    await expect(items).toHaveCount(expectedCount);
  }
  

  async proceedToCheckout(): Promise<void> {
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
  }

  async removeItem(): Promise<void> {
    await expect(this.removeButton).toBeVisible();
    await this.removeButton.click();
  }

  async removeProductByName(productName: string): Promise<void> {
    const product = this.page.locator('.cart_item').filter({
      has: this.page.locator(`.inventory_item_name:text-is("${productName.trim()}")`)
    });
  
    const removeBtn = product.locator('button:has-text("Remove")');
    await expect(removeBtn).toBeVisible();
    await removeBtn.click();
  }  

  async verifyCartIsEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }

 
}
