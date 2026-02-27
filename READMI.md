# 🚀 Playwright Automation Framework

## 📌 Overview

This project is a production-style end-to-end (E2E) automation framework built using **Playwright (JavaScript)** following the **Page Object Model (POM)** design pattern.

It is structured to be scalable, maintainable, and aligned with real-world automation engineering practices.

This repository focuses not only on writing tests, but on demonstrating proper framework architecture and clean automation design.

---

## 🎯 Goals of This Project

- Build a scalable UI automation framework
- Demonstrate clean architecture principles
- Implement reusable authentication via fixtures
- Apply strong locator strategy best practices
- Showcase maintainable and readable test structure
- Simulate production-ready automation design

---

## 🏗 Project Structure

```
project-root/
│
├── pages/
│   ├── BasePage.js
│   ├── LoginPage.js
│   └── DashboardPage.js
│   └── components/
│       └── FlashMessage.js
│
├── tests/
│   └── login.spec.js
│
├── fixtures/
│   ├── flash-message-data.json
│   ├── login-data.json
│   └── test-fixtures.json
│
├── playwright.config.js
└── README.md
```

---

## 🧠 Architecture & Design Decisions

### 1️⃣ Page Object Model (POM)

All UI behavior is encapsulated within page classes.

**Why this matters:**

- Clear separation of concerns
- Reusable page logic
- Cleaner test files
- Easier refactoring
- Reduced duplication

---

### 2️⃣ Base Page Abstraction

Shared UI actions are centralized in a `BasePage` class.

```js
class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path) {
    await this.page.goto(path);
  }

  async click(locator) {
    await locator.click();
  }

  async fill(locator, value) {
    await locator.fill(value);
  }
}

module.exports = BasePage;
```

This ensures:

- DRY principle
- Consistent interaction methods
- Easier scalability

---

### 3️⃣ Custom Authentication Fixture

Instead of repeating login steps in every test, a reusable Playwright fixture is implemented.

```js
const { test: base } = require("@playwright/test");
const LoginPage = require("./pages/LoginPage");

const test = base.extend({
  loggedInUser: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate("/login");
    await loginPage.login("tomsmith", "SuperSecretPassword!");
    await use(page);
  },
});

module.exports = { test };
```

**Benefits:**

- Eliminates duplicated login logic
- Centralizes authentication
- Improves test readability
- Simplifies future changes (API login, storage state, SSO)

---

### 4️⃣ Locator Strategy

This framework prioritizes resilient and accessibility-aligned selectors:

1. `getByRole()`
2. `getByLabel()`
3. `getByText()`
4. CSS/XPath (only when necessary)

Example:

```js
page.getByRole("heading", { name: "Secure Area", exact: true });
```

Using `exact: true` prevents strict mode violations and reduces flaky behavior.

---

## 🧪 Example Test

```js
const { test } = require("../fixtures");

test("User can login successfully", async ({
  loginPage,
  flashMessage,
  loginData,
  flashMessageData,
}) => {
  await loginPage.navigate("/login");
  await loginPage.login(
    loginData.validUser.username,
    loginData.validUser.password,
  );

  await flashMessage.validateMessage(
    flashMessageData.successLogin.alertType,
    flashMessageData.successLogin.alertMessage,
  );

  await flashMessage.close();
});
```

Notice:

- Business-readable structure
- Assertions encapsulated in the page layer

---

## 🚀 Project Setup

### 1. Clone the repository

```
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Install dependencies

```bash
npm install
npx playwright install
```

---

## ▶️ Running Tests

Run all tests:

```bash
npx playwright test
```

Run in headed mode:

```bash
npx playwright test --headed
```

Run in debug mode:

```bash
npx playwright test --debug
```

---

## 📈 Scalability & Future Enhancements

This framework is structured to easily support:

- Storage State authentication
- Environment-based configuration (.env)
- Parallel execution
- Cross-browser testing
- CI/CD integration
- HTML reporting & trace viewer
- API + UI hybrid testing

---

## 🛠 Tech Stack

- Node.js
- Playwright Test
- JavaScript
- Page Object Model
- Custom Fixtures

---

## 💡 What This Project Demonstrates

- Strong Playwright knowledge
- Framework design thinking
- Clean code practices
- Flaky-test prevention awareness
- Enterprise-aligned automation structure
- Scalable architecture mindset

This is not just a test script repository —  
it is a structured automation framework built with long-term maintainability in mind.

---

## 👨‍💻 Author

**George Luis Fermin Martinez**  
QA Automation Engineer

Specializing in:

- Playwright
- Cypress
- WebdriverIO
- Scalable automation frameworks
- End-to-end testing
