import { expect } from '@playwright/test';
import { BasePage } from './BasePage';


export class HomePage extends BasePage {
  constructor(page) {
    super(page);
  
  this.homePageTitle = 'My e-commerce';


/* =========================
     Locators
  ========================== */
  
  this.singInBtn = page.locator('a[title="Log in to your customer account"]');
  this.signOutBtn = page.getByRole('link', { name: /Sign out/i });
  this.searchBox = page.getByRole('textbox', { name: 'Search' });
  this.productTitles = page.locator('.product-title a');
  this.itemName = page.locator('h1[itemprop="name"]');
  this.modal = page.locator('.modal-content');
  this.regularPrice = this.modal.locator('.regular-price');
  this.discountPercentage = this.modal.locator('.discount-percentage');
  this.discountedPrice = this.modal.locator('.current-price [itemprop="price"]');
  this.mobileMenuBtn = this.page.locator('#menu-icon');
  this.mobileViewPersonalAccountBtn = this.page.locator('a.account');


  }


  /* =========================
     Actions
  ========================== */

  async clickOnSignIn() {
    await this.doClick(this.singInBtn);
}

  async clickOnSignOut() {
    if (await this.mobileMenuBtn.isVisible()) {
    await this.doClick(this.mobileViewPersonalAccountBtn);
    await this.signOutBtn.scrollIntoViewIfNeeded();
    await this.doClick(this.signOutBtn);
    } else {
      await this.doClick(this.signOutBtn);
    }
  
}  
    
  async selectMainMenuOption(menuOption, subMenuOption) {

    const menuLocator = this.page.getByRole('link', { name: menuOption, exact: true });
    const subMenuLocator = this.page.getByRole('link', { name: subMenuOption, exact: true });
    
    if (await this.mobileMenuBtn.isVisible()) {
        await this.mobileMenuBtn.click();
        
        const expanderLocator = this.page
            .locator('#mobile_top_menu_wrapper')
            .locator('li')
            .filter({ hasText: menuOption })
            .locator('.navbar-toggler')
            .first();

        await expanderLocator.click();
        await subMenuLocator.click({ force: true });
    } else {
        await this.selectMenuOption(menuLocator, subMenuLocator);
    }
  }

  async searchForProduct(productName) {
        await this.fill(this.searchBox, productName);
        await this.searchBox.press('Enter');
    }
    
  async selectFromSearchDropdown(productName, optionText) {
        await this.fill(this.searchBox, productName);
        const suggestions = this.page.locator('ul.ui-autocomplete span.product');
    
        await expect(this.page.locator('ul.ui-autocomplete')).toBeVisible();

        await suggestions.filter({ hasText: optionText }).click();
    }  
    
    


/* =========================
     Assertions
  ========================== */
  
  async isAtHomePage() {
    await this.verifyTitle(this.homePageTitle)
  }

  async verifyAllResultsContain(keyword) {
        const count = await this.productTitles.count();
        expect(count, 'No se encontraron productos con esa palabra').toBeGreaterThan(0);
        
        for (let i = 0; i < count; i++) {
        await expect(this.productTitles.nth(i)).toContainText(keyword, { ignoreCase: true });
      }
    }
  
  async verifySelectedResultContains(keyword) {
        await expect(this.itemName).toContainText(keyword, { ignoreCase: true }); 
    }

  async validateDiscountCalculation() {
  const regularPriceText = await this.regularPrice.innerText(); 
  const discountText = await this.discountPercentage.innerText(); 
  const discountedPriceText = await this.discountedPrice.innerText();

  const regularPrice = parseFloat(regularPriceText.replace(/[^0-9.]/g, ''));
  const discountPercent = parseFloat(discountText.replace(/[^0-9.]/g, ''));
  const actualDiscountedPrice = parseFloat(discountedPriceText.replace(/[^0-9.]/g, ''));

  const expectedPrice = regularPrice * (1 - discountPercent / 100);

  expect(actualDiscountedPrice).toBeCloseTo(expectedPrice, 2);

  }  
  
}
