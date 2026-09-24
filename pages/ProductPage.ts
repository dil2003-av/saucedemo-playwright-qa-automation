import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly productImage: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productName = page.locator('.inventory_details_name');
    this.productPrice = page.locator('.inventory_details_price');
    this.productDescription = page.locator('.inventory_details_desc');
    this.productImage = page.locator('.inventory_details_img');
    this.addToCartButton = page.getByRole('button', {
      name: 'Add to cart',
    });
    this.removeButton = page.getByRole('button', {
      name: 'Remove',
    });
    this.backToProductsButton = page.getByRole('button', {
      name: 'Back to products',
    });
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async removeFromCart() {
    await this.removeButton.click();
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }
}