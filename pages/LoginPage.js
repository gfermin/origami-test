const BasePage = require("./BasePage");

/**
 * LoginPage class.
 *
 * Represents the authentication page.
 * Encapsulates login-related locators and behaviors,
 * providing reusable methods for credential input
 * and authentication actions.
 */
class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async enterUserName(username) {
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password) {
    await this.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.click(this.loginButton);
  }

  async login(username, password) {
    await this.enterUserName(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}

module.exports = LoginPage;
