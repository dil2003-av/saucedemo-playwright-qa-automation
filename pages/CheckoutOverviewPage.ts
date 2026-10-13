
import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;

  readonly checkoutSummary: Locator;
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly itemQuantities: Locator;

  readonly paymentInformation: Locator;
  readonly shippingInformation: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;

  readonly cancelButton: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.checkoutSummary = page.locator('.checkout_summary_container');
    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.itemQuantities = page.locator('.cart_quantity');

    this.paymentInformation = page.locator('.summary_info').getByText('Payment Information');
    this.shippingInformation = page.locator('.summary_info').getByText('Shipping Information');

    this.itemTotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');

    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
  }

  async waitForOverview() {
    await this.checkoutSummary.waitFor({ state: 'visible' });
    await this.cartItems.first().waitFor({ state: 'visible' });
  }

  async getItemCount() {
    return await this.cartItems.count();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }
}
