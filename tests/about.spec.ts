
import { test, expect } from '@playwright/test';
import { AboutPage } from '../pages/AboutPage';

test.describe('About Navigation Tests', () => {

  let aboutPage: AboutPage;

  test.beforeEach(async ({ page }) => {

    // Login to SauceDemo
    await page.goto('/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Verify successful login
    await expect(page.locator('.inventory_container')).toBeVisible();

    aboutPage = new AboutPage(page);
  });

  test('TC_ABOUT_001 - Verify menu button is displayed', async ({ page }) => {

    await expect(aboutPage.menuButton).toBeVisible();

  });

  test('TC_ABOUT_002 - Verify sidebar menu opens successfully', async ({ page }) => {

    await aboutPage.openMenu();

    await expect(aboutPage.sidebar).toBeVisible();

  });

  test('TC_ABOUT_003 - Verify About link is displayed in sidebar', async ({ page }) => {

    await aboutPage.openMenu();

    await expect(aboutPage.aboutLink).toBeVisible();

  });

  test('TC_ABOUT_004 - Verify About link has correct URL', async ({ page }) => {

    await aboutPage.openMenu();

    await expect(aboutPage.aboutLink).toHaveAttribute(
      'href',
      'https://saucelabs.com/'
    );

  });

  test('TC_ABOUT_005 - Verify About link is enabled', async ({ page }) => {

    await aboutPage.openMenu();

    await expect(aboutPage.aboutLink).toBeEnabled();

  });

  test('TC_ABOUT_006 - Verify About link navigation', async ({ page }) => {

    await aboutPage.openMenu();

    await Promise.all([
      page.waitForURL(/saucelabs\.com/),
      aboutPage.clickAbout()
    ]);

    await expect(page).toHaveURL(/saucelabs\.com/);

  });

  test('TC_ABOUT_007 - Verify external page title', async ({ page }) => {

    await aboutPage.navigateToAbout();

    await expect(page).toHaveTitle(/sauce labs/i);

  });

  test('TC_ABOUT_008 - Verify external page is visible', async ({ page }) => {

    await aboutPage.navigateToAbout();

    await expect(page.locator('body')).toBeVisible();

  });


test('TC_ABOUT_009 - Verify external page loads successfully', async ({ page }) => {

  await aboutPage.navigateToAbout();

  await page.waitForLoadState('load');

  await expect(page.locator('body')).toBeVisible();

  const readyState = await page.evaluate(() => document.readyState);

  expect(['interactive', 'complete']).toContain(readyState);

});


  test('TC_ABOUT_010 - Verify browser back navigation', async ({ page }) => {

    await aboutPage.navigateToAbout();

    await expect(page).toHaveURL(/saucelabs\.com/);

    await page.goBack();

    await expect(page).toHaveURL(/inventory\.html/);

    await expect(page.locator('.inventory_container')).toBeVisible();

  });

});
