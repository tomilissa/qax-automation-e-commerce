import { expect } from '@playwright/test';
import { BasePage } from './BasePage';


export class OrderPage extends BasePage {
  constructor(page) {
    super(page);


/* =========================
     Locators
  ========================== */


  this.shippingMessage = page.locator('#delivery_message');
  this.continueBtn = page.getByRole('button', { name: 'Continue' });
  this.termsCheckbox = page.locator('input[name="conditions_to_approve[terms-and-conditions]"]');
  this.confirmOrderBtn = page.getByRole('button', { name: 'Order with an obligation to pay' });
  this.orderConfirmationMsg = page.locator('#content-hook_order_confirmation h3.card-title');
  

  }


  /* =========================
     Actions
  ========================== */

  async selectShippingMethod(userData) {
    await this.fill(this.shippingMessage, userData.shippingMessage);
    await this.doClick(this.continueBtn);
  }

  async selectPaymentMethod(userData) {
    await this.selectRadioOption(userData.paymentMethod);
    await this.check(this.termsCheckbox);
    await this.doClick(this.confirmOrderBtn);
  }


/* =========================
     Assertions
  ========================== */

  async verifyOrderConfirmation() {
    await this.verifyElementContainText(this.orderConfirmationMsg, 'Your order is confirmed');

  }
   
}