import * as fs from 'fs';
import * as path from 'path';

const browser = process.argv[2] || 'Unknown Browser';

const allureResultsPath = path.join(process.cwd(), 'allure-results');
fs.mkdirSync(allureResultsPath, { recursive: true });

const envDetails = [
  `Environment=Local`,
  `Browser=${browser}`,
  `BaseURL=https://www.saucedemo.com`,
  `OS=${process.platform}`,
  `Tester=Deepti Katiyar`,
  `Playwright Version=${require('playwright/package.json').version}`
];

fs.writeFileSync(
  path.join(allureResultsPath, 'environment.properties'),
  envDetails.join('\n')
);

console.log(`✅ environment.properties created for browser: ${browser}`);
