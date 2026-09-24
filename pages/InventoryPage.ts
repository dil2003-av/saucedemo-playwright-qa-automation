import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly productDescriptions: Locator;
  readonly productImages: Locator;

  readonly sortDropdown: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.inventoryContainer = page.locator('.inventory_container');
    this.inventoryItems = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.productDescriptions = page.locator('.inventory_item_desc');
    this.productImages = page.locator('.inventory_item_img img');

    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');

    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async getProductCount() {
    return await this.inventoryItems.count();
  }

  async addProductToCart(productName: string) {
    const product = this.inventoryItems.filter({
      hasText: productName,
    });

    await product.locator('button').click();
  }

  async removeProductFromCart(productName: string) {
    const product = this.inventoryItems.filter({
      hasText: productName,
    });

    await product.locator('button').click();
  }

  async sortProducts(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async openCart() {
    await this.cartLink.click();
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async openProduct(productName: string) {
    await this.page.locator('.inventory_item_name', { hasText: productName }).click();
  }
}