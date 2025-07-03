import { test, expect } from '@/fixtures/standardUserFixture';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { taggedLogin } from '@/utils/taggedLoginHelper';
import { invalidCustomersData } from '@/testData/invalidCustomerTestData';
import { readJsonFile } from '@/utils/jsonReaderHelper'; // JSON reader

//  Import JSON test data
import path from 'path';
const invalidCustomersFromJson = readJsonFile<any[]>(
  path.join('testData', 'invalidCustomers.json')
);

//  Combine .ts and .json based test data
const allInvalidCustomers = [...invalidCustomersData, ...invalidCustomersFromJson];

test.describe('Negative Checkout Form Validations (TS + JSON Data-Driven)', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    const cartPage = new CartPage(loggedInPage);
    await cartPage.addDefaultProductToCart();
    await cartPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  //  Data-driven loop from both sources
  for (const { scenario, data, expectedError } of allInvalidCustomers) {
    taggedLogin('regression', `Validation: ${scenario}`, async ({ loggedInPage }) => {
      const checkoutPage = new CheckoutPage(loggedInPage);
      await checkoutPage.fillCustomerInfo(data.firstName, data.lastName, data.zip);
      await checkoutPage.continueToOverview();
      await checkoutPage.verifyErrorMessage(expectedError);
    });
  }

  test('Cancel checkout returns to cart', async ({ loggedInPage }) => {
    const checkoutPage = new CheckoutPage(loggedInPage);
    await checkoutPage.fillCustomerInfo('Deepti', 'Singh', '123WP');
    await checkoutPage.cancelCheckout();
    await expect(loggedInPage).toHaveURL('/cart.html');
  });
});
