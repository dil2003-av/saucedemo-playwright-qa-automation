import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

test.describe('Login Functionality', () => {

  test('TC_LOGIN_001 - Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await expect(page).toHaveURL(/inventory/);
  });

  test('TC_LOGIN_002 - Login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
      users.invalid.username,
      users.invalid.password
    );

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('TC_LOGIN_003 - Login with locked account', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
      users.lockedOut.username,
      users.lockedOut.password
    );

    await expect(loginPage.errorMessage).toContainText(
      'locked out'
    );
  });

  test('TC_LOGIN_004 - Login with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('TC_LOGIN_005 - Login page UI elements are visible', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
});

test('TC_LOGIN_006 - Password is masked', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
});

test('TC_LOGIN_007 - Invalid username with valid password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await loginPage.login(
    'invalid_user',
    users.standard.password
  );

  await expect(loginPage.errorMessage).toBeVisible();
});

test('TC_LOGIN_008 - Valid username with invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await loginPage.login(
    users.standard.username,
    'wrong_password'
  );

  await expect(loginPage.errorMessage).toBeVisible();
});

test('TC_LOGIN_009 - Login button is enabled', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await expect(loginPage.loginButton).toBeEnabled();
});

test('TC_LOGIN_010 - User can logout successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await expect(page).toHaveURL(/inventory/);

  await loginPage.logout();

  await expect(page).toHaveURL(/\/$/);
  await expect(loginPage.loginButton).toBeVisible();
});

});