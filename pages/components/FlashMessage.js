const { expect } = require("@playwright/test");

/**
 * FlashMessage class.
 *
 * Represents the flash notification component displayed
 * after certain user actions (e.g., login success/failure).
 * Encapsulates validation logic for message type, content,
 * visibility, and dismissal behavior.
 */
class FlashMessage {
  constructor(page) {
    this.page = page;
    this.flash = page.locator("#flash");
    this.closeButton = this.flash.locator(".close");
  }

  async validateType(expectedType) {
    await expect(this.flash).toHaveClass(new RegExp(`flash ${expectedType}`));
  }

  async validateText(expectedText) {
    await expect(this.flash).toContainText(expectedText);
  }

  async validateMessage(expectedType, expectedText) {
    await expect(this.flash).toBeVisible();
    await this.validateType(expectedType);
    await this.validateText(expectedText);
  }

  async close() {
    if (await this.flash.isVisible()) {
      await this.closeButton.click();
      await expect(this.flash).toBeHidden();
    }
  }
}

module.exports = FlashMessage;
