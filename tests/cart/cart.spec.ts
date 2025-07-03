import { test, expect } from '@/fixtures/standardUserFixture';
import { CartPage } from '@/pages/CartPage';
import { ProductPage } from '@/pages/ProductPage';
import { clearCart } from '@/utils/clearCartHelper';
import { taggedLogin } from '@/utils/taggedLoginHelper';  // Use loggedIn helper

test.describe('Cart Functionality Tests', () => {
  test.afterEach(async ({ loggedInPage }) => {
    await clearCart(loggedInPage);
  });

  taggedLogin('regression', 'Verify add to cart and remove one item', async ({ loggedInPage }) => {
    const cartPage = new CartPage(loggedInPage);

    await cartPage.addDefaultProductToCart();
    await cartPage.goToCart();
    await cartPage.verifyItemInCart();
    await cartPage.assertItemCount(1);

    await cartPage.removeItem();
    await cartPage.verifyCartIsEmpty();
  });

  taggedLogin('regression', 'Add all products to cart and verify count equals total product count', async ({ loggedInPage }) => {
    const cartPage = new CartPage(loggedInPage);
    const productPage = new ProductPage(loggedInPage);

    const expectedCount = await productPage.getProductCount();

    await cartPage.addAllProductsToCart();
    await cartPage.goToCart();
    await cartPage.verifyItemInCart();
    await cartPage.assertItemCount(expectedCount);
  });
});
