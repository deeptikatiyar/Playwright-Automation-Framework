# Playwright Automation Framework (TypeScript + Allure Reporting)

A fully functional, end-to-end test automation framework built with [Playwright](https://playwright.dev/) and TypeScript — designed for real-world UI and API testing. Integrated with [Allure Reporting](https://docs.qameta.io/allure/) for beautiful, actionable test insights.

Built with curiosity, resilience, continuous learning, overcoming frustrations and a lot of debugging 

---

## Tech Stack

| Tool/Library | Purpose                        |
| ------------ | ------------------------------ |
| Playwright   | Test automation engine         |
| TypeScript   | Strong typing & code structure |
| Allure       | Visual test reporting          |
| dotenv       | Environment config             |
| ts-node      | CLI execution for TS scripts   |

---

## Project Structure

```bash
├── src/
│   ├── fixtures/
│   │   ├── standardUserFixture.ts         # UI login fixture
│   │   └── apiContextFixture.ts           # API context fixture
│
│   ├── pages/                             # POM for UI tests
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   ├── HeaderMenu.ts
│   │   ├── LoginPage.ts
│   │   └── ProductPage.ts
│
│   ├── testData/                          # Test data (TS + JSON)
│   │   ├── validCustomers.json / .ts
│   │   ├── invalidCustomers.json / .ts
│   │   ├── createPostTestData.json
│   │   ├── invalidPostData.json
│   │   └── userModel.ts
│
│   ├── utils/                             # Reusable helpers
│   │   ├── allureHelper.ts                # Annotates testInfo with tag/severity
│   │   ├── cartHelper.ts                  # Clear cart helper
│   │   ├── envHelper.ts                   # .env parsing
│   │   ├── loginHelper.ts
│   │   ├── jsonReaderHelper.ts            # Reads JSON test data
│   │   ├── createPostHelper.ts            # POST wrapper for API test
│   │   ├── taggedTestHelper.ts            # For UI test tagging
│   │   └── taggedLoginHelper.ts           # For login-tagged tests
│
├── tests/
│   ├── api/                               # API Test specs
│   │   ├── users.spec.ts
│   │   ├── createPost.spec.ts
│   │   ├── countUsersByCompany.spec.ts
│   │   ├── validateGeoCoordinates.spec.ts
│   │   ├── healthCheck.spec.ts
│   ├── login/
│   ├── cart/
│   ├── checkout/
│   └── product/
│
├── .env                                   # Credentials/configs
├── playwright.config.ts                   # Playwright config
├── package.json                           # Scripts & deps
├── tsconfig.json                          # Path aliasing, TypeScript config
├── README.md                              # This file
```

---

## Fixtures Overview

### `standardUserFixture.ts`

Provides a logged-in UI context using a valid user from `.env` and `userModel.ts`.

### `apiContextFixture.ts`

Bootstraps a pre-configured `apiContext` with `baseURL`, headers, and auto-tagging via `testInfo` for API test metadata.

---

## API Testing Support

This framework includes complete API test capabilities:

* Reusable `apiContextFixture` with preconfigured headers and baseURL
* Auto-tagging using test title parsing (`@api`, `@smoke`, `@regression`, etc.)
* `createPostHelper.ts` to abstract `POST` requests
* `.json` driven test data
* Status code checks, response validations, negative flows

# Example

```ts
test('Create a new post @smoke', async ({ apiContext }) => {
  const data = readJsonFile('testData/createPostTestData.json');
  const { response, responseBody } = await createPost(apiContext, data);
  expect(response.status()).toBe(201);
  expect(responseBody).toMatchObject(data);
});
```

---

## Setup & Usage

```bash
# Install all dependencies
npm install

# Run all tests
npm run test

# Generate and open Allure report for Chromium
npm run allure:report:chromium

# Run for Firefox
npm run allure:report:firefox

# Open existing report
npm run allure:open
```

---

## Allure Reporting Scripts

# Folder Roles

* `allure-results/`: Raw test logs
* `allure-report/`: Final HTML visual report

# Commands

```bash
npm run allure:report          # Clean run + test + generate + open
npm run allure:generate        # Just generate report
npm run allure:generate:merge  # Without cleaning previous results
npm run allure:clean           # Clean old results
npm run allure:open            # View existing report
```

---

## Test Data Strategy

# Use `.ts` for:

* Named exports, reuse
* Type safety
* Logical combinations

# Use `.json` for:

* External data injection
* Loops or bulk inputs
* Simpler test contributors

---

# Test Architecture & Annotation

* `test.describe()` for grouping
* `beforeEach()` only when needed
* `afterEach()` for cleanup (e.g., `clearCart()`)
* `standardUserFixture.ts` handles login for UI tests

---

## Tagging & Metadata (UI + API)

# UI Tests

Tagged using the `taggedTest()` or `taggedLogin()` wrappers.

```ts
import { taggedTest } from '@/utils/taggedTestHelper';

taggedTest('smoke', 'Valid login test', async ({ page }) => {
  // test logic
});
```

Adds title `@smoke` and severity `critical`.

# API Tests

Tagging inferred from test title (`@smoke`, `@regression`, etc.) in `apiContextFixture.ts`.

```ts
test('Validate usernames are unique @smoke @api', async ({ apiContext }) => {
  // test logic
});
```

# Supported Tags

| Tag        | Severity | Usage Context |
| ---------- | -------- | ------------- |
| smoke      | critical | UI + API      |
| regression | normal   | UI + API      |
| sanity     | normal   | UI            |
| flaky      | minor    | UI            |
| wip        | trivial  | UI            |

# CLI Filtering

```bash
npx playwright test --grep "@smoke"
npx playwright test tests/api --grep "@regression"
npx playwright test tests/login/login.spec.ts --grep "@smoke"
```

---

## Login Flow Architecture (UI)

```ts
.env                → envHelper.ts → userModel.ts (valid users)
                        ↓
                  loginHelper.ts → LoginPage.ts
                        ↓
           standardUserFixture.ts → logs in automatically
                        ↓
                    test file → receives loggedInPage
```

---

## Author

**Deepti Katiyar**
Lead QA Engineer passionate about building clean, practical automation frameworks that reflect real-world scenarios.

---

## Future Roadmap and Enhancement

* [ ] CI/CD with GitHub Actions
* [ ] API Mocking & Network Intercepts
* [ ] Docker support
* [ ] Slack/email alerts

---

## Final Note

This framework wasn’t just written, it was earned. Through failed test runs, learning retries, and every bit of clarity earned the hard way.

It reflects readiness, real experience, and a deep desire to grow.

If you're reviewing this as a hiring manager, thank you for considering me.
