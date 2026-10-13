
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { users } from '../test-data/users';

test.describe('Checkout Overview Functionality', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInformationPage(page);

    await loginPage.navigate();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await inventoryPage.waitForInventoryProducts();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.waitForCartItems();
    await cartPage.checkout();

    await checkoutInfoPage.enterCustomerInformation(
      'Dilmi',
      'Kaushalya',
      '80000'
    );

    await checkoutInfoPage.continueToOverview();

    const overviewPage = new CheckoutOverviewPage(page);
    await overviewPage.waitForOverview();

    await expect(page).toHaveURL(/checkout-step-two/);
  });

  test('TC_OVERVIEW_001 - Overview page loads successfully', async ({ page }) => {
    const overviewPage = new CheckoutOverviewPage(page);

    await expect(overviewPage.checkoutSummary).toBeVisible();
    await expect(page).toHaveURL(/checkout-step-two/);
  });

  test('TC_OVERVIEW_002 - Selected product is displayed', async ({ page }) => {
    const overviewPage = new CheckoutOverviewPage(page);

    await expect(overviewPage.itemNames).toContainText('Sauce Labs Backpack');
  });

  test('TC_OVERVIEW_003 - Product price is displayed', async ({ page }) => {
    const overviewPage = new CheckoutOverviewPage(page);

    await expect(overviewPage.itemPrices.first()).toBeVisible();
    await expect(overviewPage.itemPrices.first()).toHaveText('$29.99');
  });

  test('TC_OVERVIEW_004 - Product quantity is displayed', async ({ page }) => {
    const overviewPage = new CheckoutOverviewPage(page);

    await expect(overviewPage.itemQuantities.first()).toHaveText('1');
  });

  test('TC_OVERVIEW_005 - Correct number of products is displayed', async ({ page }) => {
    const overviewPage = new CheckoutOverviewPage(page);

    await expect(overviewPage.cartItems).toHaveCount(1);
  });

  test('TC_OVERVIEW_006 - Payment information heading is displayed', async ({ page }) => {
    const overviewPage = new CheckoutOverviewPage(page);

    await expect(overviewPage.paymentInformation).toBeVisible();
  });

  test('TC_OVERVIEW_007 - Payment method is displayed', async ({ page }) => {
    await expect(page.locator('.summary_value_label').first()).toBeVisible();
    await expect(page.locator('.summary_value_label').first()).toHaveText('SauceCard #31337');
  });

  test('TC_OVERVIEW_008 - Shipping information heading is displayed', async ({ page }) => {
    const overviewPage = new CheckoutOverviewPage(page);

    await expect(overviewPage.shippingInformation).toBeVisible();
  });

  test('TC_OVERVIEW_009 - Shipping method is displayed', async ({ page }) => {
    await expect(page.locator('.summary_value_label').nth(1)).toBeVisible();
    await expect(page.locator('.summary_value_label').nth(1)).toHaveText('Free Pony Express Delivery!');
  });

  test('TC_OVERVIEW_010 - Item total is displayed correctly', async ({ page }) => {
    const overviewPage = new CheckoutOverviewPage(page);

    await expect(overviewPage.itemTotal).toHaveText('Item total: $29.99');
  });

  test('TC_OVERVIEW_011 - Tax amount is displayed', async ({ page }) => {
    const overviewPage = new CheckoutOverviewPage(page);

    await expect(overviewPage.tax).toBeVisible();
    await expect(overviewPage.tax).toContainText('Tax: $');
  });

  test('TC_OVERVIEW_012 - Total amount includes tax', async ({ page }) => {
    const overviewPage = new CheckoutOverviewPage(page);

    await expect(overviewPage.total).toBeVisible();

    const itemTotalText = await overviewPage.itemTotal.textContent();
    const taxText = await overviewPage.tax.textContent();
    const totalText = await overviewPage.total.textContent();

    const itemTotal = Number(itemTotalText?.replace('Item total: $', ''));
    const tax = Number(taxText?.replace('Tax: $', ''));
    const total = Number(totalText?.replace('Total: $', ''));

    expect(total).toBeCloseTo(itemTotal + tax, 2);
  });

  test('TC_OVERVIEW_013 - Cancel button is displayed', async ({ page }) => {
    const overviewPage = new CheckoutOverviewPage(page);

    await expect(overviewPage.cancelButton).toBeVisible();
  });

  test('TC_OVERVIEW_014 - Finish button is displayed', async ({ page }) => {
    const overviewPage = new CheckoutOverviewPage(page);

    await expect(overviewPage.finishButton).toBeVisible();
  });

  test('TC_OVERVIEW_015 - Cancel returns user to inventory', async ({ page }) => {
    const overviewPage = new CheckoutOverviewPage(page);

    await overviewPage.cancelCheckout();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.inventory_container')).toBeVisible();
  });
});
