
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { FooterPage } from '../pages/FooterPage';
import { users } from '../test-data/users';

test.describe('Footer Functionality', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await inventoryPage.waitForInventoryProducts();

    const footerPage = new FooterPage(page);
    await footerPage.waitForFooter();
  });

  test('TC_FOOTER_001 - Footer is displayed', async ({ page }) => {
    const footerPage = new FooterPage(page);

    await expect(footerPage.footer).toBeVisible();
  });

  test('TC_FOOTER_002 - Copyright text is displayed', async ({ page }) => {
    const footerPage = new FooterPage(page);

    await expect(footerPage.copyrightText).toBeVisible();
  });

  test('TC_FOOTER_003 - Copyright text contains Sauce Labs', async ({ page }) => {
    const footerPage = new FooterPage(page);

    await expect(footerPage.copyrightText).toContainText('Sauce Labs');
  });

  test('TC_FOOTER_004 - Social media section is displayed', async ({ page }) => {
    const footerPage = new FooterPage(page);

    await expect(footerPage.socialLinks).toBeVisible();
  });

  test('TC_FOOTER_005 - Twitter link is displayed', async ({ page }) => {
    const footerPage = new FooterPage(page);

    await expect(footerPage.twitterLink).toBeVisible();
  });

  test('TC_FOOTER_006 - Facebook link is displayed', async ({ page }) => {
    const footerPage = new FooterPage(page);

    await expect(footerPage.facebookLink).toBeVisible();
  });

  test('TC_FOOTER_007 - LinkedIn link is displayed', async ({ page }) => {
    const footerPage = new FooterPage(page);

    await expect(footerPage.linkedinLink).toBeVisible();
  });

  test('TC_FOOTER_008 - Twitter link has a valid destination', async ({ page }) => {
    const footerPage = new FooterPage(page);

    await expect(footerPage.twitterLink).toHaveAttribute(
      'href',
      /x\.com|twitter\.com/
    );
  });

  test('TC_FOOTER_009 - Facebook link has a valid destination', async ({ page }) => {
    const footerPage = new FooterPage(page);

    await expect(footerPage.facebookLink).toHaveAttribute(
      'href',
      /facebook\.com/
    );
  });

  test('TC_FOOTER_010 - LinkedIn link has a valid destination', async ({ page }) => {
    const footerPage = new FooterPage(page);

    await expect(footerPage.linkedinLink).toHaveAttribute(
      'href',
      /linkedin\.com/
    );
  });

});
