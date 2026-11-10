import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { MenuPage } from '../pages/MenuPage';
import { users } from '../test-data/users';

test.describe('Menu / Sidebar Functionality', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await inventoryPage.waitForInventoryProducts();
  });

  test('TC_MENU_001 - Menu button is displayed', async ({ page }) => {
    const menuPage = new MenuPage(page);

    await expect(menuPage.menuButton).toBeVisible();
  });

  test('TC_MENU_002 - Menu button is enabled', async ({ page }) => {
    const menuPage = new MenuPage(page);

    await expect(menuPage.menuButton).toBeEnabled();
  });

  test('TC_MENU_003 - User can open the sidebar menu', async ({ page }) => {
    const menuPage = new MenuPage(page);

    await menuPage.openMenu();

    await expect(menuPage.sidebar).toBeVisible();
  });

  test('TC_MENU_004 - Close button is displayed when menu is open', async ({ page }) => {
    const menuPage = new MenuPage(page);

    await menuPage.openMenu();

    await expect(menuPage.closeMenuButton).toBeVisible();
  });

  test('TC_MENU_005 - User can close the sidebar menu', async ({ page }) => {
    const menuPage = new MenuPage(page);

    await menuPage.openMenu();
    await menuPage.closeMenu();

    await expect(menuPage.sidebar).toBeHidden();
  });

  test('TC_MENU_006 - All Items link is displayed', async ({ page }) => {
    const menuPage = new MenuPage(page);

    await menuPage.openMenu();

    await expect(menuPage.allItemsLink).toBeVisible();
  });

  test('TC_MENU_007 - All Items link navigates to inventory page', async ({ page }) => {
    const menuPage = new MenuPage(page);

    await menuPage.openMenu();
    await menuPage.navigateToAllItems();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.inventory_container')).toBeVisible();
  });

  test('TC_MENU_008 - About link is displayed', async ({ page }) => {
    const menuPage = new MenuPage(page);

    await menuPage.openMenu();

    await expect(menuPage.aboutLink).toBeVisible();
  });

  test('TC_MENU_009 - About link has the correct destination', async ({ page }) => {
    const menuPage = new MenuPage(page);

    await menuPage.openMenu();

    await expect(menuPage.aboutLink).toHaveAttribute(
      'href',
      /saucelabs\.com/
    );
  });

  test('TC_MENU_010 - Logout link is displayed', async ({ page }) => {
    const menuPage = new MenuPage(page);

    await menuPage.openMenu();

    await expect(menuPage.logoutLink).toBeVisible();
  });

  test('TC_MENU_011 - User can logout using sidebar menu', async ({ page }) => {
    const menuPage = new MenuPage(page);

    await menuPage.openMenu();
    await menuPage.logout();

    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    await expect(page).toHaveURL('/');
  });

  test('TC_MENU_012 - Reset App State link is displayed', async ({ page }) => {
    const menuPage = new MenuPage(page);

    await menuPage.openMenu();

    await expect(menuPage.resetAppStateLink).toBeVisible();
  });

  test('TC_MENU_013 - Reset App State clears the cart badge', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const menuPage = new MenuPage(page);

    await inventoryPage.addProductToCart('Sauce Labs Backpack');

    await expect(inventoryPage.cartBadge).toHaveText('1');

    await menuPage.openMenu();
    await menuPage.resetAppState();

    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('TC_MENU_014 - Reset App State resets the product button', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const menuPage = new MenuPage(page);

    await inventoryPage.addProductToCart('Sauce Labs Backpack');

    await menuPage.openMenu();
    await menuPage.resetAppState();

    // Reload page to ensure the DOM reflects the reset app state
    await page.reload();

    const backpack = inventoryPage.inventoryItems.filter({
      hasText: 'Sauce Labs Backpack',
    });

    await expect(
      backpack.getByRole('button', { name: 'Add to cart' })
    ).toBeVisible();
  });

  test('TC_MENU_015 - Sidebar menu can be opened again after closing', async ({ page }) => {
    const menuPage = new MenuPage(page);

    await menuPage.openMenu();
    await menuPage.closeMenu();

    await menuPage.openMenu();

    await expect(menuPage.sidebar).toBeVisible();
  });

});