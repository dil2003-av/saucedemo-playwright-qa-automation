import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  readonly cartContainer: Locator;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly cartItemPrices: Locator;
  readonly cartItemDescriptions: Locator;

  readonly removeButtons: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartContainer = page.locator('.cart_contents_container');
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.cartItemPrices = page.locator('.inventory_item_price');
    this.cartItemDescriptions = page.locator('.inventory_item_desc');

    this.removeButtons = page.getByRole('button', {
      name: 'Remove',
    });

    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async removeProduct(productName: string) {
    const product = this.cartItems.filter({
      hasText: productName,
    });

    await product.getByRole('button', {
      name: 'Remove',
    }).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}