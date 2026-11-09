
import { test, expect } from '@playwright/test';

test.describe('Error Handling Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // TC_ERR_001 - Invalid username
  test('TC_ERR_001 - Verify error message for invalid username', async ({ page }) => {
    await page.locator('#user-name').fill('invalid_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Username and password do not match');
  });

  // TC_ERR_002 - Invalid password
  test('TC_ERR_002 - Verify error message for invalid password', async ({ page }) => {
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('wrong_password');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Username and password do not match');
  });

  // TC_ERR_003 - Empty username
  test('TC_ERR_003 - Verify error message when username is empty', async ({ page }) => {
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Username is required');
  });

  // TC_ERR_004 - Empty password
  test('TC_ERR_004 - Verify error message when password is empty', async ({ page }) => {
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Password is required');
  });

  // TC_ERR_005 - Both fields empty
  test('TC_ERR_005 - Verify error message when both fields are empty', async ({ page }) => {
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Username is required');
  });

  // TC_ERR_006 - Locked out user
  test('TC_ERR_006 - Verify error message for locked out user', async ({ page }) => {
    await page.locator('#user-name').fill('locked_out_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Sorry, this user has been locked out');
  });

  // TC_ERR_007 - Error message visibility
  test('TC_ERR_007 - Verify error message is visible after invalid login', async ({ page }) => {
    await page.locator('#user-name').fill('invalid_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  // TC_ERR_008 - Close error message
  test('TC_ERR_008 - Verify error message can be closed', async ({ page }) => {
    await page.locator('#login-button').click();

    const errorMessage = page.locator('[data-test="error"]');

    await expect(errorMessage).toBeVisible();
    await page.locator('.error-button').click();
    await expect(errorMessage).toBeHidden();
  });

  // TC_ERR_009 - Missing first name
  test('TC_ERR_009 - Verify checkout error when first name is missing', async ({ page }) => {
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('#last-name').fill('Kaushalya');
    await page.locator('#postal-code').fill('80000');
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('First Name is required');
  });

  // TC_ERR_010 - Missing last name
  test('TC_ERR_010 - Verify checkout error when last name is missing', async ({ page }) => {
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('#first-name').fill('Dilmi');
    await page.locator('#postal-code').fill('80000');
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Last Name is required');
  });

  // TC_ERR_011 - Missing postal code
  test('TC_ERR_011 - Verify checkout error when postal code is missing', async ({ page }) => {
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('#first-name').fill('Dilmi');
    await page.locator('#last-name').fill('Kaushalya');
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Postal Code is required');
  });

  // TC_ERR_012 - Invalid URL
  test('TC_ERR_012 - Verify application handles invalid URL', async ({ page }) => {
    await page.goto('/invalid-page');

    await expect(page).toHaveURL(/invalid-page/);
    await expect(page.locator('body')).toBeVisible();
  });

});
