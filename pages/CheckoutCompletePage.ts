
import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;

  readonly completeContainer: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly completeImage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.completeContainer = page.locator('.checkout_complete_container');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.completeImage = page.locator('.pony_express');
    this.backHomeButton = page.getByRole('button', {
      name: 'Back Home',
    });
  }

  async waitForCompletePage() {
    await this.completeContainer.waitFor({
      state: 'visible',
    });
  }

  async backHome() {
    await this.backHomeButton.click();
    await this.page.waitForURL(/inventory/);
  }
}
