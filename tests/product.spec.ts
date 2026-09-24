import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductPage } from '../pages/ProductPage';
import { users } from '../test-data/users';

test.describe('Product Functionality', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await inventoryPage.openProduct('Sauce Labs Backpack');
  });

  test('TC_PROD_001 - Product details page loads successfully', async ({ page }) => {
    const productPage = new ProductPage(page);

    await expect(productPage.productName).toHaveText(
      'Sauce Labs Backpack'
    );

    await expect(page).toHaveURL(/inventory-item/);
  });

    test('TC_PROD_002 - Product price is displayed', async ({ page }) => {
    const productPage = new ProductPage(page);

    await expect(productPage.productPrice).toBeVisible();
    await expect(productPage.productPrice).toHaveText('$29.99');
  });

  test('TC_PROD_003 - Product description is displayed', async ({ page }) => {
    const productPage = new ProductPage(page);

    await expect(productPage.productDescription).toBeVisible();
    await expect(productPage.productDescription).not.toBeEmpty();
  });

  test('TC_PROD_004 - Product image is displayed', async ({ page }) => {
    const productPage = new ProductPage(page);

    await expect(productPage.productImage).toBeVisible();
  });

  test('TC_PROD_005 - Add to cart button is displayed', async ({ page }) => {
    const productPage = new ProductPage(page);

    await expect(productPage.addToCartButton).toBeVisible();
  });

  test('TC_PROD_006 - User can add product to cart', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.addToCart();

    await expect(productPage.removeButton).toBeVisible();
  });

  test('TC_PROD_007 - Add to cart button changes to Remove', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.addToCart();

    await expect(productPage.removeButton).toHaveText('Remove');
  });

  test('TC_PROD_008 - User can remove product from cart', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.addToCart();
    await productPage.removeFromCart();

    await expect(productPage.addToCartButton).toBeVisible();
  });

  test('TC_PROD_009 - Back to products button is displayed', async ({ page }) => {
    const productPage = new ProductPage(page);

    await expect(productPage.backToProductsButton).toBeVisible();
  });

  test('TC_PROD_010 - User can navigate back to products', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.backToProducts();

    await expect(page).toHaveURL(/inventory/);
  });

  test('TC_PROD_011 - Product name is not empty', async ({ page }) => {
    const productPage = new ProductPage(page);

    const productName = await productPage.productName.textContent();

    expect(productName?.trim()).not.toBe('');
  });

  test('TC_PROD_012 - Product price has valid currency format', async ({ page }) => {
    const productPage = new ProductPage(page);

    const price = await productPage.productPrice.textContent();

    expect(price).toMatch(/^\$\d+\.\d{2}$/);
  });

  test('TC_PROD_013 - Product description is not empty', async ({ page }) => {
    const productPage = new ProductPage(page);

    const description =
      await productPage.productDescription.textContent();

    expect(description?.trim()).not.toBe('');
  });

  test('TC_PROD_014 - Product image has valid source', async ({ page }) => {
    const productPage = new ProductPage(page);

    const imageSource =
      await productPage.productImage.getAttribute('src');

    expect(imageSource).not.toBeNull();
    expect(imageSource).not.toBe('');
  });

  test('TC_PROD_015 - Product page URL contains product identifier', async ({ page }) => {
    await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);
  });

});