import { test, expect } from '@/fixtures/standardUserFixture';
import { LoginPage } from '@/pages/LoginPage';
import { ProductPage } from '@/pages/ProductPage';
import { taggedLogin } from '@/utils/taggedLoginHelper';  // Use login helper

test.describe('Product Sorting Tests', () => {
  taggedLogin('regression', 'Verify product sorting A to Z', async ({ loggedInPage }) => {
    const productPage = new ProductPage(loggedInPage);

    await productPage.waitForPageToLoad();
    await productPage.sortBy('az');

    const names = await productPage.getAllProductNames();
    expect(names[0]).toContain('Sauce Labs Backpack');
    const sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
  });

  taggedLogin('regression', 'Verify product sorting Z to A', async ({ loggedInPage }) => {
    const productPage = new ProductPage(loggedInPage);

    await productPage.waitForPageToLoad();
    await productPage.sortBy('za');

    const names = await productPage.getAllProductNames();
    expect(names[0]).toContain('Test.allTheThings() T-Shirt (Red)');
    const sortedNames = [...names].sort().reverse();
    expect(names).toEqual(sortedNames);
  });

  taggedLogin('regression', 'Verify Product Sorting by price Descending', async ({loggedInPage}) => {
    const productPage = new ProductPage(loggedInPage);

    await productPage.waitForPageToLoad();
    await productPage.sortBy('Price (high to low)');

    const productPrices = await productPage.getAllProductPricesAsNumbers();
    expect(productPrices[0]).toBe(49.99);

    // Assert verify full list is sorted in descending order
    const sortedPrices = [...productPrices].sort((a, b) => b - a);
    expect(productPrices).toEqual(sortedPrices);
  });

  taggedLogin('regression', 'Verify Product Sorting by price Ascending', async ({loggedInPage}) => {
    const productPage = new ProductPage(loggedInPage);

    await productPage.waitForPageToLoad();
    await productPage.sortBy('Price (low to high)');

    const productPrices = await productPage.getAllProductPricesAsNumbers();
    expect(productPrices[0]).toBe(7.99);

    // Assert verify full list is sorted in ascending order
    const sortedPrices = [...productPrices].sort((a, b) => a - b);
    expect(productPrices).toEqual(sortedPrices);

    const products = await productPage.getProductDetails();
    expect(products).toContainEqual({ name: 'Sauce Labs Onesie', price: 7.99 })
  });

});


