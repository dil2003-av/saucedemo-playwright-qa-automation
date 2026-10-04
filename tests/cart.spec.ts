import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../test-data/users';

test.describe('Cart Functionality', () => {

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

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
});

  test('TC_CART_001 - Cart page loads successfully', async ({ page }) => {
    const cartPage = new CartPage(page);

    await expect(cartPage.cartContainer).toBeVisible();
    await expect(page).toHaveURL(/cart/);
  });

  test('TC_CART_002 - Added product is displayed in cart', async ({ page }) => {
    const cartPage = new CartPage(page);

    await expect(
      cartPage.cartItemNames.first()
    ).toHaveText('Sauce Labs Backpack');
  });

  test('TC_CART_003 - Cart displays correct product price', async ({ page }) => {
    const cartPage = new CartPage(page);

    await expect(
      cartPage.cartItemPrices.first()
    ).toHaveText('$29.99');
  });

  test('TC_CART_004 - Cart displays product description', async ({ page }) => {
    const cartPage = new CartPage(page);

    await expect(
      cartPage.cartItemDescriptions.first()
    ).toBeVisible();

    await expect(
      cartPage.cartItemDescriptions.first()
    ).not.toBeEmpty();
  });

test('TC_CART_005 - Cart displays correct number of products', async ({ page }) => {
  const cartPage = new CartPage(page);

  await expect(
    cartPage.cartItems
  ).toHaveCount(1);
});

  test('TC_CART_006 - User can remove product from cart', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.removeProduct(
      'Sauce Labs Backpack'
    );

    await expect(
      cartPage.cartItems
    ).toHaveCount(0);
  });

  test('TC_CART_007 - User can continue shopping from cart', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory/);

    await expect(
      page.locator('.inventory_container')
    ).toBeVisible();
  });

  test('TC_CART_008 - User can proceed to checkout', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.checkout();

    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test('TC_CART_009 - Multiple products are displayed correctly in cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await cartPage.continueShopping();

    await inventoryPage.addProductToCart(
      'Sauce Labs Bike Light'
    );

    await inventoryPage.openCart();

    await expect(cartPage.cartItems).toHaveCount(2);

    await expect(cartPage.cartItemNames).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
    ]);
  });

  test('TC_CART_010 - User can remove one product while keeping another product', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await cartPage.continueShopping();

    await inventoryPage.addProductToCart(
      'Sauce Labs Bike Light'
    );

    await inventoryPage.openCart();

    await expect(cartPage.cartItems).toHaveCount(2);

    await cartPage.removeProduct(
      'Sauce Labs Backpack'
    );

    await expect(cartPage.cartItems).toHaveCount(1);

    await expect(
      cartPage.cartItemNames.first()
    ).toHaveText('Sauce Labs Bike Light');
  });

  test('TC_CART_011 - Cart item count matches cart badge count', async ({ page }) => {
    const cartPage = new CartPage(page);

    const cartItemCount = await cartPage.getCartItemCount();

    expect(cartItemCount).toBe(1);

    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText(String(cartItemCount));
  });

  test('TC_CART_012 - Cart retains selected products after navigating back to inventory', async ({ page }) => {
    const cartPage = new CartPage(page);
    const inventoryPage = new InventoryPage(page);

    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory/);

    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('1');

    await inventoryPage.openCart();

    await expect(
      cartPage.cartItemNames.first()
    ).toHaveText('Sauce Labs Backpack');

    await expect(
      cartPage.cartItems
    ).toHaveCount(1);
  });

});