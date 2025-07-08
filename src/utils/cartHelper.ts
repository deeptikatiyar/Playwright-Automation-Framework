import { Page } from '@playwright/test';

export async function addProductToCart(page: Page, productName: string) {
  const productLocator = page.locator('.inventory_item').filter({ hasText: productName });
  await productLocator.locator('button:has-text("Add to cart")').click();
}

export async function addMultipleProductsToCart(page: Page, productNames: string[]) {
  for (const name of productNames) {
    await addProductToCart(page, name);
  }
}

export async function addAllProductsToCart(page: Page) {
  const addButtons = page.locator('button:has-text("Add to cart")');
  const count = await addButtons.count();
  for (let i = 0; i < count; i++) {
    await addButtons.nth(i).click();
  }
}

export async function goToCartPage(page: Page) {
  await page.click('.shopping_cart_link');
}
