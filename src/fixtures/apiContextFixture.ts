import { test as base, APIRequestContext } from '@playwright/test';
import { config } from '@/utils/envHelper';
import { annotate } from '@/utils/allureHelper';

export const test = base.extend<{
  apiContext: APIRequestContext;
}>({
  apiContext: async ({ playwright }, use, testInfo) => {
    const title = testInfo.title.toLowerCase();

    let tag = 'api';
    let severity = 'normal';

    switch (true) {
      case title.includes('@smoke'):
        tag = 'smoke';
        severity = 'critical';
        break;
      case title.includes('@regression'):
        tag = 'regression';
        severity = 'normal';
        break;
      case title.includes('@flaky'):
        tag = 'flaky';
        severity = 'minor';
        break;
      default:
        tag = 'api';
        severity = 'normal';
    }

    annotate(testInfo, { tag, severity });

    const requestContext = await playwright.request.newContext({
      baseURL: config.apiBaseURL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });

    await use(requestContext);
  }
});
