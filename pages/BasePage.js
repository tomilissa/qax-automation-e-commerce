import { expect } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
    }

  async navigate(path) {
    await this.page.goto(path);
  }

  async doClick(locator) { 
    await locator.click();
  }

  async fill(locator, value) {
    await locator.fill(value);
  }

  async check(locator) {
    await locator.check();
  }

  async hover(locator) {
    await locator.hover();
  }

  async selectMenuOption(menuOption, subMenuOption) {
        await menuOption.hover();
        await this.doClick(subMenuOption);
  }

  async filterBy(value) {
    const filterRegex = new RegExp(`${value} \\(\\d+\\)`, 'i');
    await this.page.getByRole('link', { name: filterRegex }).click();
  }

  async select(locator, value) {
    await locator.selectOption({ label: value });
  }

  async selectRadioOption(value) {
    const radioRegex = new RegExp(`${value} \\(\\d+\\)`);
    await this.page.getByRole('radio', { name: value, exact: false }).click();
  }

  async selectQuickViewBtn(index = 0) {
    const product = this.productCard.nth(index);
    const quickViewBtn = product.locator('.quick-view');

    if (await this.mobileMenuBtn.isVisible()) {
        await quickViewBtn.dispatchEvent('click');
    } else {
        await product.hover();
        await expect(quickViewBtn).toBeVisible();
        await quickViewBtn.click();
    }
  }



  /* =========================
     Assertions
  ========================== */

  async verifyTitle(expectedTitle) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async verifyElementVisible(locator) {
    await expect(locator).toBeVisible();
  }

  async verifyElementText(locator, expectedText) {
    await expect(locator).toHaveText(expectedText);
  }

  async verifyElementContainText(locator, expectedText) {
    await expect(locator).toContainText(expectedText);
  }

  async verifyElementisDisabled(locator) {
    await expect(locator).toBeDisabled();
  }

  async verifyElementisEnabled(locator) {
    await expect(locator).toBeEnabled();
  }

}
