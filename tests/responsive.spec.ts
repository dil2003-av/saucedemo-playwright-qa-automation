
import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'Desktop', width: 1920, height: 1080 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Mobile', width: 375, height: 667 },
];

test.describe('Responsive Testing - SauceDemo', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // TC_RESP_001 - Login page responsive on Desktop
  test('TC_RESP_001 - Verify login page on Desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
  });

  // TC_RESP_002 - Login page responsive on Tablet
  test('TC_RESP_002 - Verify login page on Tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
  });

  // TC_RESP_003 - Login page responsive on Mobile
  test('TC_RESP_003 - Verify login page on Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
  });

  // TC_RESP_004 - Verify login form does not overflow
  test('TC_RESP_004 - Verify login page has no horizontal overflow', async ({ page }) => {
    for (const viewport of viewports) {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth >
          document.documentElement.clientWidth;
      });

      expect(hasOverflow, `${viewport.name} viewport should not overflow`).toBe(false);
    }
  });

  // TC_RESP_005 - Inventory page responsive on Desktop
  test('TC_RESP_005 - Verify inventory page on Desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  // TC_RESP_006 - Inventory page responsive on Tablet
  test('TC_RESP_006 - Verify inventory page on Tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('.inventory_item').first()).toBeVisible();
  });

  // TC_RESP_007 - Inventory page responsive on Mobile
  test('TC_RESP_007 - Verify inventory page on Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('.inventory_item').first()).toBeVisible();
  });

  // TC_RESP_008 - Verify product images on Mobile
  test('TC_RESP_008 - Verify product images on Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    const productImages = page.locator('.inventory_item_img img');

    await expect(productImages.first()).toBeVisible();
    await expect(productImages).toHaveCount(6);
  });

  // TC_RESP_009 - Verify menu button on Mobile
  test('TC_RESP_009 - Verify menu button on Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page.locator('#react-burger-menu-btn')).toBeVisible();
    await page.locator('#react-burger-menu-btn').click();

    await expect(page.locator('.bm-menu-wrap')).toBeVisible();
  });

  // TC_RESP_010 - Verify cart page on Mobile
  test('TC_RESP_010 - Verify cart page on Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await page.locator('.shopping_cart_link').click();

    await expect(page).toHaveURL(/cart.html/);
    await expect(page.locator('.cart_list')).toBeVisible();
  });

});
