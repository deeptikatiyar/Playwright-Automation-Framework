# Playwright Automation Framework (TypeScript + Allure Reporting)

This project is a robust, scalable UI automation framework built using [Playwright](https://playwright.dev/), TypeScript, and integrated with advanced [Allure Reporting](https://docs.qameta.io/allure/). It follows modern best practices for test organization, data management, and reporting clarity.

Built with love, learning, and late-night problem solving ✨

---

## Tech Stack

| Tool/Library       | Purpose                          |
|--------------------|----------------------------------|
| Playwright         | Test automation engine           |
| TypeScript         | Strong typing & code structure   |
| Allure             | Advanced visual test reporting   |
| dotenv             | Secure environment variables     |
| ts-node            | CLI execution for TS scripts     |

---

## Folder Structure Overview

```
├── src/
│   ├── pages/                    # Page Object Model classes
│   ├── fixtures/                 # Custom Playwright test fixtures
│   ├── testData/                 # Static and dynamic test data (.ts + .json)
│   ├── utils/                    # Helper functions and shared logic
│   ├── tests/                    # Organized test specs (login, cart, checkout)
│
├── allure-results/              # Raw results (auto-generated)
├── allure-report/               # Final HTML report (auto-generated)
├── .env                         # Environment-specific credentials
├── playwright.config.ts         # Central Playwright config
├── package.json                 # Automation scripts
```

---

## Setup & Usage

```bash
# 1. Install all dependencies
npm install

# 2. Run all tests (default browser)
npm run test

# 3. Run tests for Chromium with Allure report
npm run allure:report:chromium

# 4. Run tests for Firefox with Allure report
npm run allure:report:firefox

# 5. Open the last generated report
npm run allure:open
```

---

## Allure Reporting Scripts & Folder Usage

### Folder Roles

- **`allure-results/`**: Raw test data saved during test execution (JSON, logs, screenshots).
- **`allure-report/`**: Human-readable HTML report generated from the results above.

### ⚙️ Common Allure Commands

```bash
npm run allure:report          # Clean run + test + report + open
npm run allure:generate        # Clean and generate from latest results
npm run allure:generate:merge  # Merge results without cleaning
npm run allure:open            # Open last generated report
npm run allure:clean           # Remove old allure results/reports
```

---

## Test Data Strategy: `.ts` vs `.json`

This framework supports both `.ts` and `.json` test data sources — each with their strengths.

### Use `.ts` when:
- You want type safety and IntelliSense
- You prefer named exports (`validCustomer1`, `adminUser`, etc.)
- You need logic, reuse, or composition

**Benefits:** Clean, typed, IDE-friendly, reusable.

---

### Use `.json` when:
- You want simple config-style test data
- You prefer externalized, loopable test sets
- You want non-developers to edit test data

**Benefits:** Lightweight, editable, tool-friendly.

---

## Test Structure & Annotations

This framework follows best practices for structuring tests with Playwright.

- `test.describe()` used for logical grouping
- `beforeEach()` only for shared setup
- `afterEach()` used for teardown like `clearCart()`
- Reusable login setup via `standardUserFixture`

### Allure Annotation Helper

```ts
// utils/annotate.ts
export function annotate(testInfo, meta: { tag?: string; severity?: string }) {
  if (meta.tag) testInfo.annotations.push({ type: 'tag', description: meta.tag });
  if (meta.severity) testInfo.annotations.push({ type: 'severity', description: meta.severity });
}
```

---

## Tagged Test Helper: `taggedTest()`

A custom helper to apply tags and Allure metadata:

```ts
import { taggedTest } from '@/utils/tagsTestHelper';

taggedTest('smoke', 'Valid login test', async ({ page }) => {
  // test logic
});
```

- Automatically appends `@smoke` to title
- Annotates with Allure severity and tag

### Supported Tags

| Tag        | Severity    |
|------------|-------------|
| smoke      | critical    |
| regression | normal      |
| sanity     | normal      |
| flaky      | minor       |
| wip        | trivial     |

### Filter with CLI

```bash
npx playwright test --grep "@smoke"
npx playwright test tests/login.spec.ts --grep "@regression"
```

---

## Login Flow Architecture

This framework uses a layered login structure:

`
.env                → envHelper.ts → validUser (userModel.ts)
                        ↓
                  loginHelper.ts → LoginPage with validUser
                        ↓
           standardUserFixture.ts → logs in before each test
                        ↓
                    test file → receives a loggedInPage
`

This cleanly separates config, data, page actions, and test setup.

---

## Author

**Deepti Katiyar**  
Lead QA Engineer. Focused on building clean, reusable, production-ready frameworks with real-world value.

---

## Future Roadmap

- [ ] Merge cross-browser reports into a single matrix report
- [ ] GitHub Actions CI/CD integration
- [ ] API mocking & intercepts
- [ ] Slack/email test notifications
- [ ] Docker compatibility

---

## Personal Note

This framework was built during a season of transition and growth. Every method, tag, and refactor reflects persistence, experience, knowledge
continuous learning and progress.

If you're a hiring manager or collaborator — this isn't just code.  
It's a statement of skill, hunger, and readiness.