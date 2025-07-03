import { test, expect } from '@/fixtures/standardUserFixture';
import { ProductPage } from '@/pages/ProductPage';
import { taggedLogin } from '@/utils/taggedLoginHelper';  // Use login helper

test.describe('Product Sorting Tests', () => {
  taggedLogin('regression', 'Verify product sorting A to Z', async ({ loggedInPage }) => {
    const productPage = new ProductPage(loggedInPage);

    await productPage.waitForPageToLoad();
    await productPage.sortBy('az');

    const names = await productPage.getAllProductNames();
    expect(names[0]).toContain('Sauce Labs Backpack');
  });

  taggedLogin('regression', 'Verify product sorting Z to A', async ({ loggedInPage }) => {
    const productPage = new ProductPage(loggedInPage);

    await productPage.waitForPageToLoad();
    await productPage.sortBy('za');

    const names = await productPage.getAllProductNames();
    expect(names[0]).toContain('Test.allTheThings() T-Shirt (Red)');
  });
});
