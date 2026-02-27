const BasePage = require("./BasePage");
const { expect } = require("@playwright/test");

/**
 * DashboardPage class.
 *
 * Represents the authenticated Secure Area page.
 * Encapsulates locators and behaviors related to
 * post-login validation and logout functionality.
 */
class DashboardPage extends BasePage {
  constructor(page) {
    super(page);

    this.secureAreaHeader = page.getByRole("heading", {
      name: "Secure Area",
      exact: true,
    });
    this.logOutButton = page.getByRole("link", { name: "Logout", exact: true });
  }

  async validateSecurePage() {
    await expect(this.secureAreaHeader).toBeVisible();
    await expect(this.logOutButton).toBeVisible();
  }

  async clickLogOutButton() {
    await this.click(this.logOutButton);
  }
}

module.exports = DashboardPage;
