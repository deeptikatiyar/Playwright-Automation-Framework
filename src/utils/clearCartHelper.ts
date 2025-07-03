import { Page, expect } from '@playwright/test';

export async function clearCart(page: Page): Promise<void> {
  // Go to cart page
  await page.locator('.shopping_cart_link').click();
  await page.waitForURL('**/cart.html');

  // Remove all items dynamically
  while (await page.locator('button:has-text("Remove")').count() > 0) {
    await page.locator('button:has-text("Remove")').first().click();
  }

  // Return to product list page
  await page.goto('/inventory.html');
  await expect(page.locator('.inventory_item')).toHaveCount(6);
}
