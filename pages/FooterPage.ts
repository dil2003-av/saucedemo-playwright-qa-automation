
import { Page, Locator } from '@playwright/test';

export class FooterPage {
  readonly page: Page;
  readonly footer: Locator;
  readonly copyrightText: Locator;
  readonly socialLinks: Locator;
  readonly xLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedinLink: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.footer = page.locator('.footer');
    this.copyrightText = page.locator('.footer_copy');
    this.socialLinks = page.locator('.social a');

    this.xLink = this.socialLinks.filter({ hasText: 'X' });
    this.facebookLink = this.socialLinks.filter({ hasText: 'Facebook' });
    this.linkedinLink = this.socialLinks.filter({ hasText: 'LinkedIn' });
  }

  async waitForFooter() {
    await this.footer.waitFor({ state: 'visible' });
  }
}
