// src/utils/taggedLoginHelper.ts
import { test as baseTest, TestInfo, Page } from '@/fixtures/standardUserFixture';
import { annotate } from './allureHelper';

export function taggedLogin(
  tag: string,
  title: string,
  testFn: (fixtures: { loggedInPage: Page }, testInfo: TestInfo) => Promise<void>
) {
  baseTest(title + ` @${tag}`, async ({ loggedInPage }, testInfo) => {
    annotate(testInfo, {
      tag,
      severity:
        tag === 'smoke' ? 'critical' :
        tag === 'regression' ? 'normal' :
        tag === 'flaky' ? 'minor' : 'trivial',
    });

    await testFn({ loggedInPage }, testInfo);
  });
}
