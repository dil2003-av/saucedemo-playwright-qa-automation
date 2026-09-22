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

});