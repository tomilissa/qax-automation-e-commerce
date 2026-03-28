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
    const isMobile = await this.mobileMenuBtn.isVisible();

    if (isMobile) {
        // 1. Abrir el menú
        await this.mobileMenuBtn.click();
        await this.page.waitForTimeout(500); // Espera bruta para que el DOM se asiente

        // 2. FORZAR el click por JavaScript (Evaluate)
        // Buscamos el link que contiene el texto y le disparamos el click al ancestro que expande
        await this.page.evaluate((option) => {
            const links = Array.from(document.querySelectorAll('#mobile_top_menu_wrapper a'));
            const target = links.find(el => el.textContent.trim().includes(option));
            if (target) {
                const toggler = target.closest('li').querySelector('.navbar-toggler');
                if (toggler) toggler.click();
            }
        }, menuOption);

        // 3. Click directo al submenú usando el texto
        const subMenu = this.page.locator('#mobile_top_menu_wrapper a', { hasText: subMenuOption }).first();
        await expect(subMenu).toBeVisible({ timeout: 5000 });
        await subMenu.click({ force: true });
    } else {
        // Desktop: Vamos a lo seguro
        await this.page.getByRole('link', { name: menuOption, exact: true }).first().hover();
        await this.page.getByRole('link', { name: subMenuOption, exact: true }).first().click();
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
