
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { FooterPage } from '../pages/FooterPage';
import { users } from '../test-data/users';

test.describe('Footer Functionality', () => {

  let footerPage: FooterPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await inventoryPage.waitForInventoryProducts();

    footerPage = new FooterPage(page);
    await footerPage.waitForFooter();
  });

  test('TC_FOOTER_001 - Footer is displayed', async () => {
    await expect(footerPage.footer).toBeVisible();
  });

  test('TC_FOOTER_002 - Copyright text is displayed', async () => {
    await expect(footerPage.copyrightText).toBeVisible();
  });

  test('TC_FOOTER_003 - Copyright text contains Sauce Labs', async () => {
    await expect(footerPage.copyrightText).toContainText('Sauce Labs');
  });

  test('TC_FOOTER_004 - Social media section is displayed', async () => {
    await expect(footerPage.socialLinks.first()).toBeVisible();
  });

  test('TC_FOOTER_005 - X link is displayed', async () => {
    await expect(footerPage.xLink).toBeVisible();
  });

  test('TC_FOOTER_006 - Facebook link is displayed', async () => {
    await expect(footerPage.facebookLink).toBeVisible();
  });

  test('TC_FOOTER_007 - LinkedIn link is displayed', async () => {
    await expect(footerPage.linkedinLink).toBeVisible();
  });

  test('TC_FOOTER_008 - X link has a valid destination', async () => {
    await expect(footerPage.xLink).toHaveAttribute(
      'href',
      'https://x.com/saucelabs'
    );
  });

  test('TC_FOOTER_009 - Facebook link has a valid destination', async () => {
    await expect(footerPage.facebookLink).toHaveAttribute(
      'href',
      /facebook\.com/
    );
  });

  test('TC_FOOTER_010 - LinkedIn link has a valid destination', async () => {
    await expect(footerPage.linkedinLink).toHaveAttribute(
      'href',
      /linkedin\.com/
    );
  });

});
