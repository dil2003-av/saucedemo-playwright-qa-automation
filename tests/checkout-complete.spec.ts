
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { users } from '../test-data/users';

test.describe('Checkout Complete Functionality', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInformationPage(page);
    const overviewPage = new CheckoutOverviewPage(page);

    await loginPage.navigate();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await inventoryPage.waitForInventoryProducts();

    await inventoryPage.addProductToCart(
      'Sauce Labs Backpack'
    );

    await inventoryPage.openCart();
    await cartPage.waitForCartItems();

    await cartPage.checkout();

    await checkoutInfoPage.enterCustomerInformation(
      'Dilmi',
      'Kaushalya',
      '80000'
    );

    await checkoutInfoPage.continueToOverview();
    await overviewPage.waitForOverview();

    await overviewPage.finishCheckout();

    const completePage = new CheckoutCompletePage(page);
    await completePage.waitForCompletePage();
  });

  test('TC_COMPLETE_001 - Checkout complete page loads successfully', async ({ page }) => {
    const completePage = new CheckoutCompletePage(page);

    await expect(completePage.completeContainer).toBeVisible();
    await expect(page).toHaveURL(/checkout-complete/);
  });

  test('TC_COMPLETE_002 - Order confirmation heading is displayed', async ({ page }) => {
    const completePage = new CheckoutCompletePage(page);

    await expect(completePage.completeHeader).toBeVisible();
  });

  test('TC_COMPLETE_003 - Correct order confirmation message is displayed', async ({ page }) => {
    const completePage = new CheckoutCompletePage(page);

    await expect(completePage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('TC_COMPLETE_004 - Order completion message is displayed', async ({ page }) => {
    const completePage = new CheckoutCompletePage(page);

    await expect(completePage.completeText).toContainText(
      'Your order has been dispatched'
    );
  });

  test('TC_COMPLETE_005 - Confirmation image is visible', async ({ page }) => {
    const completePage = new CheckoutCompletePage(page);

    await expect(completePage.completeImage).toBeVisible();
  });

test('TC_COMPLETE_006 - Confirmation image has a valid source', async ({ page }) => {
  const completePage = new CheckoutCompletePage(page);

  await expect(completePage.completeImage).toHaveAttribute(
    'src',
    /checkmark/
  );
});

  test('TC_COMPLETE_007 - Back Home button is displayed', async ({ page }) => {
    const completePage = new CheckoutCompletePage(page);

    await expect(completePage.backHomeButton).toBeVisible();
  });

  test('TC_COMPLETE_008 - Back Home button is enabled', async ({ page }) => {
    const completePage = new CheckoutCompletePage(page);

    await expect(completePage.backHomeButton).toBeEnabled();
  });

  test('TC_COMPLETE_009 - User can return to inventory using Back Home', async ({ page }) => {
    const completePage = new CheckoutCompletePage(page);

    await completePage.backHome();

    await expect(page.locator('.inventory_container')).toBeVisible();
  });

  test('TC_COMPLETE_010 - Inventory page URL is displayed after Back Home', async ({ page }) => {
    const completePage = new CheckoutCompletePage(page);

    await completePage.backHome();

    await expect(page).toHaveURL(/inventory/);
  });

  test('TC_COMPLETE_011 - Completed order does not remain in cart', async ({ page }) => {
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });

  test('TC_COMPLETE_012 - Completed order page does not display checkout buttons', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Finish' })
    ).toHaveCount(0);

    await expect(
      page.getByRole('button', { name: 'Checkout' })
    ).toHaveCount(0);
  });

  test('TC_COMPLETE_013 - Completed order page does not display cart items', async ({ page }) => {
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });

  test('TC_COMPLETE_014 - User can see the confirmation message after page reload', async ({ page }) => {
    await page.reload();

    const completePage = new CheckoutCompletePage(page);

    await expect(completePage.completeHeader).toHaveText(
      'Thank you for your order!'
    );
  });

  test('TC_COMPLETE_015 - Back Home navigation clears the completed checkout view', async ({ page }) => {
    const completePage = new CheckoutCompletePage(page);

    await completePage.backHome();

    await expect(completePage.completeContainer).toBeHidden();
    await expect(page.locator('.inventory_container')).toBeVisible();
  });

});
