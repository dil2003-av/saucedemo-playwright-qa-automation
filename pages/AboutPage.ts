
import { Page, Locator } from '@playwright/test';

export class AboutPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly aboutLink: Locator;
  readonly sidebar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.aboutLink = page.locator('#about_sidebar_link');
    this.sidebar = page.locator('.bm-menu-wrap');
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async clickAbout() {
    await this.aboutLink.click();
  }

  async navigateToAbout() {
    await this.openMenu();
    await this.clickAbout();
  }
}
