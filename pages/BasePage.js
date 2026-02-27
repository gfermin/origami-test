/**
 * BasePage class.
 *
 * Provides shared reusable UI interaction methods for all page objects.
 * Acts as the parent abstraction layer to enforce DRY principles
 * and centralize common Playwright actions.
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path = "") {
    await this.page.goto(path);
  }

  async fill(locator, value) {
    await locator.fill(value);
  }

  async click(locator) {
    await locator.click();
  }
}

module.exports = BasePage;
