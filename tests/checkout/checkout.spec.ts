import { test, expect } from '@/fixtures/standardUserFixture';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { ProductPage } from '@/pages/ProductPage';
import { clearCart } from '@/utils/clearCartHelper';
import { taggedLogin } from '@/utils/taggedLoginHelper';
import { readJsonFile } from '@/utils/jsonReaderHelper';
import { Customer } from '@/testData/validCustomerInfo';

const jsonCustomers: Customer[] = readJsonFile<Customer[]>('testData/validCustomers.json');

test.describe('Positive Checkout Flow Tests (Data-Driven from JSON)', () => {
  test.afterEach(async ({ loggedInPage }) => {
    await clearCart(loggedInPage);
  });

  jsonCustomers.forEach((customer, index) => {
    taggedLogin('regression', `Checkout success with JSON Customer ${index + 1}`, async ({ loggedInPage }) => {
      const cartPage = new CartPage(loggedInPage);
      await cartPage.addDefaultProductToCart();
      await cartPage.goToCart();
      await cartPage.verifyItemInCart();
      await cartPage.assertItemCount(1);
      await cartPage.proceedToCheckout();

      const checkoutPage = new CheckoutPage(loggedInPage);
      await checkoutPage.fillCustomerInfo(customer.firstName, customer.lastName, customer.zip);
      await checkoutPage.continueToOverview();
      await checkoutPage.confirmOrder();
      await checkoutPage.verifyOrderComplete();
    });
  });
});

test.describe('Special Checkout Flow Scenarios', () => {
  taggedLogin('regression', 'Add Product By Name', async ({ loggedInPage }) => {
    const cartPage = new CartPage(loggedInPage);
    await cartPage.addProductToCartByName('Sauce Labs Backpack');
    await cartPage.goToCart();
    await cartPage.verifyItemInCart();
    await cartPage.assertItemCount(1);
    await cartPage.proceedToCheckout();

    const checkoutPage = new CheckoutPage(loggedInPage);
    await checkoutPage.fillCustomerInfo(jsonCustomers[1].firstName, jsonCustomers[1].lastName, jsonCustomers[1].zip);
    await checkoutPage.continueToOverview();
    await checkoutPage.confirmOrder();
    await checkoutPage.verifyOrderComplete();
  });

  taggedLogin('regression', 'Add all products to cart and checkout', async ({ loggedInPage }) => {
    const productPage = new ProductPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);

    const expectedCount = await productPage.getProductCount();
    await cartPage.addAllProductsToCart();
    await cartPage.goToCart();
    await cartPage.verifyItemInCart();
    await cartPage.assertItemCount(expectedCount);
    await cartPage.proceedToCheckout();

    const checkoutPage = new CheckoutPage(loggedInPage);
    await checkoutPage.fillCustomerInfo(jsonCustomers[2].firstName, jsonCustomers[2].lastName, jsonCustomers[2].zip);
    await checkoutPage.continueToOverview();
    await checkoutPage.confirmOrder();
    await checkoutPage.verifyOrderComplete();
  });

  taggedLogin('regression', 'Add and Remove product and checkout flow', async ({ loggedInPage }) => {
    const cartPage = new CartPage(loggedInPage);
    await cartPage.addProductToCartByName('Sauce Labs Backpack');
    await cartPage.addProductToCartByName('Sauce Labs Fleece Jacket');
    await cartPage.addProductToCartByName('Sauce Labs Onesie');
    await cartPage.goToCart();
    await cartPage.assertItemCount(3);
    await cartPage.removeProductByName('Sauce Labs Fleece Jacket');
    await cartPage.assertItemCount(2);
    await cartPage.verifyItemInCart();
    await cartPage.proceedToCheckout();

    const checkoutPage = new CheckoutPage(loggedInPage);
    await checkoutPage.fillCustomerInfo(jsonCustomers[0].firstName, jsonCustomers[0].lastName, jsonCustomers[0].zip);
    await checkoutPage.continueToOverview();
    await checkoutPage.confirmOrder();
    await checkoutPage.verifyOrderComplete();
  });
});
