import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../test-data/users';

test.describe('Inventory Functionality', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );
  });

  test('TC_INV_001 - Inventory page loads successfully', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await expect(inventoryPage.inventoryContainer).toBeVisible();
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC_INV_002 - All products are displayed', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await expect(inventoryPage.inventoryItems.first()).toBeVisible();

    const productCount =
      await inventoryPage.getProductCount();

    expect(productCount).toBe(6);
  });

  test('TC_INV_003 - Product names are displayed', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await expect(
      inventoryPage.productNames.first()
    ).toBeVisible();

    const productCount =
      await inventoryPage.productNames.count();

    expect(productCount).toBe(6);
  });

  test('TC_INV_004 - Product prices are displayed', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    const productCount =
      await inventoryPage.productPrices.count();

    expect(productCount).toBe(6);

    await expect(
      inventoryPage.productPrices.first()
    ).toBeVisible();
  });

  test('TC_INV_005 - Product descriptions are displayed', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    const productCount =
      await inventoryPage.productDescriptions.count();

    expect(productCount).toBe(6);

    await expect(
      inventoryPage.productDescriptions.first()
    ).toBeVisible();
  });

  test('TC_INV_006 - Product images are displayed', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Wait until the inventory is loaded
    await expect(
      inventoryPage.inventoryContainer
    ).toBeVisible();

    // Verify all six product images are present
    await expect(
      inventoryPage.productImages
    ).toHaveCount(6);

    // Verify the first image is visible
    await expect(
      inventoryPage.productImages.first()
    ).toBeVisible();
  });

  test('TC_INV_007 - User can add a product to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addProductToCart(
      'Sauce Labs Backpack'
    );

    await expect(
      inventoryPage.cartBadge
    ).toHaveText('1');
  });

  test('TC_INV_008 - User can add multiple products to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addProductToCart(
      'Sauce Labs Backpack'
    );

    await inventoryPage.addProductToCart(
      'Sauce Labs Bike Light'
    );

    await expect(
      inventoryPage.cartBadge
    ).toHaveText('2');
  });

  test('TC_INV_009 - User can remove a product from cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addProductToCart(
      'Sauce Labs Backpack'
    );

    await expect(
      inventoryPage.cartBadge
    ).toHaveText('1');

    await inventoryPage.removeProductFromCart(
      'Sauce Labs Backpack'
    );

    await expect(
      inventoryPage.cartBadge
    ).toBeHidden();
  });

  test('TC_INV_010 - User can open cart from inventory', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart/);
  });

  test('TC_INV_011 - User can logout from inventory', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.logout();

    await expect(page).toHaveURL(/\/$/);
  });

  test('TC_INV_012 - User can sort products A to Z', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortProducts('az');

    const names =
      await inventoryPage.productNames.allTextContents();

    expect(names).toEqual(
      [...names].sort()
    );
  });

  test('TC_INV_013 - User can sort products Z to A', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortProducts('za');

    const names =
      await inventoryPage.productNames.allTextContents();

    expect(names).toEqual(
      [...names].sort().reverse()
    );
  });

  test('TC_INV_014 - User can sort products by price low to high', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortProducts('lohi');

    const prices =
      await inventoryPage.productPrices.allTextContents();

    const numericPrices = prices.map(price =>
      Number(price.replace('$', ''))
    );

    expect(numericPrices).toEqual(
      [...numericPrices].sort((a, b) => a - b)
    );
  });

  test('TC_INV_015 - User can sort products by price high to low', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortProducts('hilo');

    const prices =
      await inventoryPage.productPrices.allTextContents();

    const numericPrices = prices.map(price =>
      Number(price.replace('$', ''))
    );

    expect(numericPrices).toEqual(
      [...numericPrices].sort((a, b) => b - a)
    );
  });

  test('TC_INV_016 - User can open product details', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.openProduct(
      'Sauce Labs Backpack'
    );

    await expect(page).toHaveURL(/inventory-item/);
  });

  test('TC_INV_017 - Add to Cart button changes to Remove', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    const product =
      inventoryPage.inventoryItems.filter({
        hasText: 'Sauce Labs Backpack',
      });

    await expect(
      product.getByRole('button', {
        name: 'Add to cart',
      })
    ).toBeVisible();

    await inventoryPage.addProductToCart(
      'Sauce Labs Backpack'
    );

    await expect(
      product.getByRole('button', {
        name: 'Remove',
      })
    ).toBeVisible();
  });

});