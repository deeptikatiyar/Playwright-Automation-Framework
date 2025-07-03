// src/utils/allureHelper.ts
import { TestInfo } from '@playwright/test';

type AllureMeta = {
  tag?: string;
  severity?: string;
};

export function annotate(testInfo: TestInfo, meta: AllureMeta) {
  if (meta.tag) {
    testInfo.annotations.push({
      type: 'tag',
      description: meta.tag
    });
  }
  if (meta.severity) {
    testInfo.annotations.push({
      type: 'severity',
      description: meta.severity
    });
  }
}
