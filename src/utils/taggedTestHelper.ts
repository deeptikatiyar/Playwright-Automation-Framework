// src/utils/taggedBaseHelper.ts
import { test as baseTest, TestInfo } from '@playwright/test';
import { annotate } from './allureHelper';

export function taggedTest(
  tag: string,
  title: string,
  testFn: (fixtures: { page: any }, testInfo: TestInfo) => Promise<void>
) {
  baseTest(title + ` @${tag}`, async ({ page }, testInfo) => {
    annotate(testInfo, {
      tag,
      severity:
        tag === 'smoke' ? 'critical' :
        tag === 'regression' ? 'normal' :
        tag === 'flaky' ? 'minor' : 'trivial',
    });

    await testFn({ page }, testInfo);
  });
}
