import { test, expect } from '@/fixtures/standardUserFixture';
import { ProductPage } from '@/pages/ProductPage';
import { taggedLogin } from '@/utils/taggedLoginHelper';
import { readCsvFile } from '@/utils/csvReaderHelper';
import path from 'path';

const invalidSortOptions = readCsvFile(
  path.join('src', 'testData', 'invalidSortOptions.csv')
);

test.describe('Negative Product Sorting Tests (CSV)', () => {
  for (const row of invalidSortOptions) {
    taggedLogin( 'regression', `Handle invalid sorting option: "${row.sortOption}"`,
      async ({ loggedInPage }) => {
        const productPage = new ProductPage(loggedInPage);

        await productPage.waitForPageToLoad();

        let errorCaught = false;

        try {
          await productPage.sortBy(row.sortOption);
        } catch (e) {
          const err = e as Error;
          console.warn(
            `Expected failure for invalid sort option "${row.sortOption}": ${err.message}`
          );
          errorCaught = true;
        }

        expect(errorCaught).toBe(true); //  Validate that error is correct and test throws an error intead of failing
      }
    );
  }
});