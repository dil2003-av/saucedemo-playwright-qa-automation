import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { users } from '../test-data/users';

test.describe('Checkout Information Functionality', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.navigate();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await inventoryPage.addProductToCart(
      'Sauce Labs Backpack'
    );

    await inventoryPage.openCart();

    await cartPage.checkout();
  });

  test('TC_CHECKOUT_INFO_001 - Checkout information page loads successfully', async ({ page }) => {
    const checkoutPage = new CheckoutInformationPage(page);

    await expect(
      checkoutPage.checkoutContainer
    ).toBeVisible();

    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test('TC_CHECKOUT_INFO_002 - First name field is displayed', async ({ page }) => {
    const checkoutPage = new CheckoutInformationPage(page);

    await expect(
      checkoutPage.firstNameInput
    ).toBeVisible();
  });

  test('TC_CHECKOUT_INFO_003 - Last name field is displayed', async ({ page }) => {
    const checkoutPage = new CheckoutInformationPage(page);

    await expect(
      checkoutPage.lastNameInput
    ).toBeVisible();
  });

  test('TC_CHECKOUT_INFO_004 - Postal code field is displayed', async ({ page }) => {
    const checkoutPage = new CheckoutInformationPage(page);

    await expect(
      checkoutPage.postalCodeInput
    ).toBeVisible();
  });

  test('TC_CHECKOUT_INFO_005 - User can enter valid checkout information', async ({ page }) => {
    const checkoutPage = new CheckoutInformationPage(page);

    await checkoutPage.enterCustomerInformation(
      'Dilmi',
      'Kaushalya',
      '80000'
    );

    await expect(
      checkoutPage.firstNameInput
    ).toHaveValue('Dilmi');

    await expect(
      checkoutPage.lastNameInput
    ).toHaveValue('Kaushalya');

    await expect(
      checkoutPage.postalCodeInput
    ).toHaveValue('80000');
  });

  test('TC_CHECKOUT_INFO_006 - User can continue with valid checkout information', async ({ page }) => {
    const checkoutPage = new CheckoutInformationPage(page);

    await checkoutPage.enterCustomerInformation(
      'Dilmi',
      'Kaushalya',
      '80000'
    );

    await checkoutPage.continueToOverview();

    await expect(page).toHaveURL(/checkout-step-two/);
  });

  test('TC_CHECKOUT_INFO_007 - Error is displayed when first name is empty', async ({ page }) => {
    const checkoutPage = new CheckoutInformationPage(page);

    await checkoutPage.enterCustomerInformation(
      '',
      'Kaushalya',
      '80000'
    );

    await checkoutPage.continueToOverview();

    await expect(
      checkoutPage.errorMessage
    ).toBeVisible();

    await expect(
      checkoutPage.errorMessage
    ).toContainText('First Name is required');
  });

  test('TC_CHECKOUT_INFO_008 - Error is displayed when last name is empty', async ({ page }) => {
    const checkoutPage = new CheckoutInformationPage(page);

    await checkoutPage.enterCustomerInformation(
      'Dilmi',
      '',
      '80000'
    );

    await checkoutPage.continueToOverview();

    await expect(
      checkoutPage.errorMessage
    ).toBeVisible();

    await expect(
      checkoutPage.errorMessage
    ).toContainText('Last Name is required');
  });

  test('TC_CHECKOUT_INFO_009 - Error is displayed when postal code is empty', async ({ page }) => {
    const checkoutPage = new CheckoutInformationPage(page);

    await checkoutPage.enterCustomerInformation(
      'Dilmi',
      'Kaushalya',
      ''
    );

    await checkoutPage.continueToOverview();

    await expect(
      checkoutPage.errorMessage
    ).toBeVisible();

    await expect(
      checkoutPage.errorMessage
    ).toContainText('Postal Code is required');
  });

  test('TC_CHECKOUT_INFO_010 - Cancel button returns user to cart', async ({ page }) => {
    const checkoutPage = new CheckoutInformationPage(page);

    await checkoutPage.cancelCheckout();

    await expect(page).toHaveURL(/cart/);
  });

});