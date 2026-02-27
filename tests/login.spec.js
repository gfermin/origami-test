const { test, expect } = require("../fixtures/test-fixtures");

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

test("User attempt to login with invalid credentials", async ({
  loginPage,
  flashMessage,
  loginData,
  flashMessageData,
}) => {
  await loginPage.navigate("/login");
  await loginPage.login(
    loginData.invalidUser.username,
    loginData.invalidUser.password,
  );

  await flashMessage.validateMessage(
    flashMessageData.invalidUsername.alertType,
    flashMessageData.invalidUsername.alertMessage,
  );

  await flashMessage.close();
});

test("User attempt to login without credentials", async ({
  loginPage,
  flashMessage,
  flashMessageData,
}) => {
  await loginPage.navigate("/login");
  await loginPage.clickLoginButton();

  await flashMessage.validateMessage(
    flashMessageData.invalidUsername.alertType,
    flashMessageData.invalidUsername.alertMessage,
  );

  await flashMessage.close();
});

test("User attempt to login without username", async ({
  loginPage,
  flashMessage,
  loginData,
  flashMessageData,
}) => {
  await loginPage.navigate("/login");
  await loginPage.enterPassword(loginData.validUser.password);
  await loginPage.clickLoginButton();

  await flashMessage.validateMessage(
    flashMessageData.invalidUsername.alertType,
    flashMessageData.invalidUsername.alertMessage,
  );

  await flashMessage.close();
});

test("User attempt to login without password", async ({
  loginPage,
  flashMessage,
  loginData,
  flashMessageData,
}) => {
  await loginPage.navigate("/login");
  await loginPage.enterUserName(loginData.validUser.username);
  await loginPage.clickLoginButton();

  await flashMessage.validateMessage(
    flashMessageData.invalidPassword.alertType,
    flashMessageData.invalidPassword.alertMessage,
  );

  await flashMessage.close();
});

test("User can successfully logout", async ({
  loggedInUser,
  flashMessage,
  flashMessageData,
  dashboardPage,
}) => {
  await expect(loggedInUser).toHaveURL(/secure/);

  await dashboardPage.validateSecurePage();
  await dashboardPage.clickLogOutButton();

  await flashMessage.validateMessage(
    flashMessageData.successLogout.alertType,
    flashMessageData.successLogout.alertMessage,
  );

  await flashMessage.close();
});
