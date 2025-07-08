
import { TestInfo } from '@playwright/test';

type AllureMeta = {
  tag?: string;
  severity?: string;
};

export function annotate(testInfo: TestInfo, meta: AllureMeta) {   //annotate pushes metadata like tag and severity into testInfo.annotations();
  if (meta.tag) {
    testInfo.annotations.push({    //Playwright's native annotation system
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
