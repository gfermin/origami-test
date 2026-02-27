const base = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const FlashMessage = require("../pages/components/FlashMessage");
const DashboardPage = require("../pages/DashboardPage");
const loginData = require("./login-data.json");
const flashMessageData = require("./flash-message-data.json");

exports.test = base.test.extend({
  /**
   * LoginPage fixture.
   *
   * Instantiates and provides a reusable LoginPage object
   * for interacting with the login screen.
   *
   * - page: @Page
   *   - Playwright Page instance injected by the base test
   *   - example: provided automatically by Playwright
   *
   * - return: @void Provides a LoginPage instance to the test context.
   */
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  /**
   * FlashMessage fixture.
   *
   * Instantiates and provides a FlashMessage page object
   * for validating system alert/notification messages.
   *
   * - page: @Page
   *   - Playwright Page instance injected by the base test
   *   - example: await flashMessage.validateMessage("Login successful")
   *
   * - return: @void Provides a FlashMessage instance to the test context.
   */
  flashMessage: async ({ page }, use) => {
    await use(new FlashMessage(page));
  },

  /**
   * DashboardPage fixture.
   *
   * Instantiates and provides a DashboardPage object
   * used for interacting with secure/authenticated areas.
   *
   * - page: @Page
   *   - Playwright Page instance injected by the base test
   *   - example: await dashboardPage.validateSecurePage()
   *
   * - return: @void Provides a DashboardPage instance to the test context.
   */
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  /**
   * loginData fixture.
   *
   * Provides static login test data for authentication scenarios.
   *
   * - example usage:
   *   - loginData.validUser.username
   *   - loginData.validUser.password
   *
   * - return: @void Injects loginData object into the test context.
   */
  loginData: async ({}, use) => {
    await use(loginData);
  },

  /**
   * flashMessageData fixture.
   *
   * Provides expected flash message content for validation assertions.
   *
   * - example usage:
   *   - flashMessageData.successLoginMessage
   *   - flashMessageData.invalidCredentialsMessage
   *
   * - return: @void Injects flashMessageData object into the test context.
   */
  flashMessageData: async ({}, use) => {
    await use(flashMessageData);
  },

  /**
   * loggedInUser fixture.
   *
   * Performs UI authentication using valid credentials
   * and provides an authenticated Page instance.
   *
   * - loginPage: @LoginPage
   *   - Used to navigate and perform login actions
   *   - example: await loginPage.login(username, password)
   *
   * - loginData: @Object
   *   - Provides credential values
   *   - example: loginData.validUser.username
   *
   * - page: @Page
   *   - Playwright Page instance representing the browser session
   *
   * - return: @void Provides an authenticated Page session for secure tests.
   */
  loggedInUser: async ({ loginPage, loginData, page }, use) => {
    await loginPage.navigate("/login");

    await loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password,
    );

    await use(page);
  },
});

exports.expect = base.expect;
