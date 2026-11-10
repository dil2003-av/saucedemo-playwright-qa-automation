import { test, expect } from '@playwright/test';

test.describe('End-to-End Testing - SauceDemo', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory.html/);
  });

  // TC_E2E_001 - Verify successful login
  test('TC_E2E_001 - Verify user can login successfully', async ({ page }) => {
    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  // TC_E2E_002 - Verify inventory products are displayed
  test('TC_E2E_002 - Verify all inventory products are displayed', async ({ page }) => {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  // TC_E2E_003 - Verify product details navigation
  test('TC_E2E_003 - Verify user can view product details', async ({ page }) => {
    await page.locator('.inventory_item_name').first().click();

    await expect(page).toHaveURL(/inventory-item.html/);
    await expect(page.locator('div.inventory_details')).toBeVisible();
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    await expect(page.locator('.inventory_details_price')).toBeVisible();
  });

  // TC_E2E_004 - Verify user can add product to cart
  test('TC_E2E_004 - Verify user can add a product to cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  // TC_E2E_005 - Verify cart contains selected product
  test('TC_E2E_005 - Verify selected product appears in cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();

    await expect(page).toHaveURL(/cart.html/);
    // Fixed strict mode issue using .first()
    await expect(page.locator('.inventory_item_name').first())
      .toHaveText('Sauce Labs Backpack');
  });

  // TC_E2E_006 - Verify user can remove product from cart
  test('TC_E2E_006 - Verify user can remove product from cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });

  // TC_E2E_007 - Verify checkout information page
  test('TC_E2E_007 - Verify checkout information page', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();

    await expect(page).toHaveURL(/checkout-step-one.html/);
    await expect(page.locator('#first-name')).toBeVisible();
    await expect(page.locator('#last-name')).toBeVisible();
    await expect(page.locator('#postal-code')).toBeVisible();
  });

  // TC_E2E_008 - Verify checkout overview
  test('TC_E2E_008 - Verify checkout overview page', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('#first-name').fill('Dilmi');
    await page.locator('#last-name').fill('Kaushalya');
    await page.locator('#postal-code').fill('80000');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page.locator('.summary_info')).toBeVisible();
    await expect(page.locator('.inventory_item_name').first())
      .toHaveText('Sauce Labs Backpack');
  });

  // TC_E2E_009 - Verify order completion
  test('TC_E2E_009 - Verify user can complete an order', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('#first-name').fill('Dilmi');
    await page.locator('#last-name').fill('Kaushalya');
    await page.locator('#postal-code').fill('80000');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-two.html/);

    await page.locator('[data-test="finish"]').click();

    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.locator('.complete-header'))
      .toHaveText('Thank you for your order!');
  });

  // TC_E2E_010 - Verify user can return to inventory after order
  test('TC_E2E_010 - Verify user can return to inventory after order', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('#first-name').fill('Dilmi');
    await page.locator('#last-name').fill('Kaushalya');
    await page.locator('#postal-code').fill('80000');
    await page.locator('[data-test="continue"]').click();

    await page.locator('[data-test="finish"]').click();
    await page.locator('[data-test="back-to-products"]').click();

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  // TC_E2E_011 - Verify menu logout
  test('TC_E2E_011 - Verify user can logout successfully', async ({ page }) => {
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();

    await expect(page).toHaveURL('/');
    await expect(page.locator('#login-button')).toBeVisible();
  });

  // TC_E2E_012 - Verify complete shopping flow with multiple products
  test('TC_E2E_012 - Verify user can purchase multiple products', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    await page.locator('.shopping_cart_link').click();

    await expect(page.locator('.cart_item')).toHaveCount(2);
    await page.locator('[data-test="checkout"]').click();

    await page.locator('#first-name').fill('Dilmi');
    await page.locator('#last-name').fill('Kaushalya');
    await page.locator('#postal-code').fill('80000');
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('.cart_item')).toHaveCount(2);

    await page.locator('[data-test="finish"]').click();

    await expect(page.locator('.complete-header'))
      .toHaveText('Thank you for your order!');
  });

});