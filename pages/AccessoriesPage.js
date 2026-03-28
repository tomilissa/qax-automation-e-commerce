import { expect } from '@playwright/test';
import { BasePage } from './BasePage';


export class AccessoriesPage extends BasePage {
  constructor(page) {
    super(page);
  
  this.homeAccessoriesPageTitle = 'Home Accessories';
  this.stacioneryPageTitle = 'Stationery';
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

  }


/* =========================
     Actions
  ========================== */
  async filterByType(typeName) {
    const mobileFilterBtn = this.page.locator('#search_filter_toggler');
    const filterPanel = this.page.locator('#search_filters_wrapper');

      // Verificamos si realmente necesitamos el flujo mobile

      
      if (await mobileFilterBtn.isVisible()) {
        await expect(mobileFilterBtn).toBeVisible({ timeout: 7000 });
        await mobileFilterBtn.click({ force: true }); 
      
        await expect(filterPanel).toBeVisible({timeout: 5000});

      // Localizar la sección de type de forma semántica
        const typeSection = filterPanel.locator('section.facet', { hasText: /Paper Type/i }).first();

        await typeSection.click();

        const typeLink = typeSection.getByRole('link', { name: new RegExp(`^${typeName}`, 'i') });

        await typeLink.waitFor({ state: 'visible', timeout: 5000 });
        
        await typeLink.click({ force: true });

         const okButton = filterPanel.getByRole('button', { name: /OK/i });
        await okButton.click();
        
        // Tip de experto: Esperar a que el panel desaparezca para asegurar que el filtro se aplicó
        await expect(filterPanel).toBeHidden();

        } else {
        await this.filterBy(typeName);
        }

      }


  async filterByComposition(compositionName) {
    const mobileFilterBtn = this.page.locator('#search_filter_toggler');
    const filterPanel = this.page.locator('#search_filters_wrapper');

    

    if (await mobileFilterBtn.isVisible({ timeout: 7000 })) {
        await mobileFilterBtn.click({ force: true }); 
      
        await expect(filterPanel).toBeVisible({timeout: 5000});

        const facetComposition = filterPanel.locator('section.facet', { hasText: /Composition/i }).first();
        await facetComposition.click();

        const compositionLink = facetComposition.getByRole('link', { name: new RegExp(`^${compositionName}`, 'i') });
        await compositionLink.waitFor({ state: 'visible', timeout: 5000 });
        await compositionLink.click({ force: true });

        const okButton = filterPanel.getByRole('button', { name: /OK/i });
        await okButton.click();

        await expect(filterPanel).toBeHidden();

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

  async isAtStacioneryPage() {
    await this.verifyTitle(this.stacioneryPageTitle)
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