import { expect } from '@playwright/test';
import { BasePage } from './BasePage';


export class AccessoriesPage extends BasePage {
  constructor(page) {
    super(page);
  
  this.homeAccessoriesPageTitle = 'Home Accessories';
  this.productQuantity = 1;



/* =========================
     Locators
  ========================== */
  this.activeFiltersBlock = page.locator('#js-active-search-filters');
  this.filterItem = page.locator('li.filter-block');
  this.productCard = page.locator('.product-miniature');
  this.quickView = this.productCard.getByRole('link', { name: ' Quick view' }).first();
  this.quickViewModal = page.locator('.modal-content'); 
  this.stockStatus = page.locator('#product-availability');
  this.addToCartBtn =  page.getByRole('button', { name: ' Add to cart' });
  this.quantityInput = page.locator('#quantity_wanted');
  this.productName = page.locator('.product-name');
  this.productPrice = page.locator('.product-price');  
  this.cartQuantity = page.locator('span:has-text("Quantity:") strong');
  this.checkOutBtn = page.getByRole('link', { name: ' Proceed to checkout' });
  this.finalcheckOutBtn = page.getByRole('link', { name: 'Proceed to checkout' });
  this.productAddedMessage = page.getByRole('heading', { name: /Product successfully added/i });
  this.mobileMenuBtn = page.locator('#menu-icon');
  this.filterOKMobileBtn = page.locator('.btn.btn-secondary.ok');

  }


  /* =========================
     Actions
  ========================== */
  async filterByColor(colorName) {
    const mobileFilterBtn = this.page.locator('#search_filter_toggler');
    const filterPanel = this.page.locator('#search_filters_wrapper');

    let isMobile = false;
    try {
        await mobileFilterBtn.waitFor({ state: 'visible', timeout: 2000 });
        isMobile = true;
    } catch (e) {
        isMobile = false;
    }

    if (isMobile) {
        await mobileFilterBtn.click();
        await filterPanel.waitFor({ state: 'visible', timeout: 5000 });

        const expander = filterPanel
            .locator('.facet')
            .filter({ hasText: /Color/i })
            .locator('.navbar-toggler, .facet-title')
            .filter({ visible: true })
            .first();

        if (await expander.isVisible()) {
            await expander.click();
            await this.page.waitForTimeout(500); 
        }

        const colorLink = filterPanel
            .getByRole('link', { name: new RegExp(colorName, 'i') })
            .filter({ visible: true }) // Aseguramos que sea el link de Mobile
            .first();
        
        await colorLink.click({ force: true });
        await this.filterOKMobileBtn.click();
    } else {
        await this.filterBy(colorName);
      }

  }
  
  async filterByComposition(compositionName) {
    const mobileFilterBtn = this.page.locator('#search_filter_toggler');
    const filterPanel = this.page.locator('#search_filters_wrapper');

    let isMobile = false;
    try {
        await mobileFilterBtn.waitFor({ state: 'visible', timeout: 2000 });
        isMobile = true;
    } catch (e) {
        isMobile = false;
    }

    if (isMobile) {
        await mobileFilterBtn.click();
        await filterPanel.waitFor({ state: 'visible', timeout: 5000 });

        const expander = filterPanel
            .locator('.facet')
            .filter({ hasText: /Composition/i })
            .locator('.navbar-toggler, .facet-title')
            .filter({ visible: true })
            .first();

        if (await expander.isVisible()) {
            await expander.click();
            await this.page.waitForTimeout(500); 
        }

        const compositionLink = filterPanel
            .getByRole('link', { name: new RegExp(compositionName, 'i') })
            .filter({ visible: true })
            .first();
        
        await compositionLink.click({ force: true });
        await this.filterOKMobileBtn.click();
    } else {
        await this.filterBy(compositionName);
      }

  }

  async setQuantityandAddToCart() {
    await this.quantityInput.fill(this.productQuantity.toString());
    await this.doClick(this.addToCartBtn);
  }

  async proceedToCheckout() {
    await this.doClick(this.checkOutBtn);
  }

  async finalcheckout() {
    await this.doClick(this.finalcheckOutBtn);
  }



/* =========================
     Assertions
  ========================== */
  
  async isAtAccessoriesPage() {
    await this.verifyTitle(this.homeAccessoriesPageTitle)
  }

  async verifyFilterIsActive(filterName, urlKeyword) {
    const mobileFilterBtn = this.page.locator('#search_filter_toggler');
    if (await mobileFilterBtn.isVisible()) {
        await expect(this.page).toHaveURL(new RegExp(urlKeyword, 'i'));
    } else {
        const filterChip = this.page.locator('.filter-block').filter({ hasText: filterName });
        await expect(filterChip).toBeVisible();
    }
}

  async verifyCompositionFilterIsActive(compositionName) {
    await this.verifyElementVisible(this.activeFiltersBlock);
    const expectedText = new RegExp(`Composition:\\s*${compositionName}`, 'i');
    await this.verifyElementText(this.filterItem, expectedText);
  }

  async verifyProductHasNoStock() {
    await expect(this.quickViewModal).toBeVisible();
    await expect(this.stockStatus).toBeVisible();
    await expect(this.stockStatus).toContainText('Out-of-Stock');
    await expect(this.addToCartBtn).toBeDisabled(); 
  }

  async verifyProductHasStock() {
    await expect(this.quickViewModal).toBeVisible();
    await expect(this.addToCartBtn).toBeEnabled();
  }

  async verifyProducAddedSuccessfully() {
    await expect(this.productAddedMessage).toBeVisible();
    await expect(this.productName).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.cartQuantity).toHaveText(this.productQuantity.toString());
  }
    
}