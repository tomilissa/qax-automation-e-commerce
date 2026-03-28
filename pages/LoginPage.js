import { expect } from '@playwright/test';
import { BasePage } from './BasePage';


export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  
this.loginPageTitle = 'Login';

/* =========================
     Locators
  ========================== */
  
  this.createNewAccount = page.getByRole('link', { name: 'No account? Create one here' });
  this.socialTitle = page.getByRole('radio', { name: 'Mr.' });
  this.firstName = page.locator('input[name="firstname"]');
  this.lastName = page.locator('input[name="lastname"]');
  this.email = page.locator('#customer-form input[name="email"]');
  this.password = page.locator('input[name="password"]').first();
  this.birthDay = page.getByRole('textbox', { name: 'MM/DD/YYYY' });
  this.agreeTermsCheckbox = page.getByRole('checkbox', { name: 'I agree to the terms and' });
  this.saveBtn = page.getByRole('button', { name: 'Save' });
  this.signInBtn = page.getByRole('button', { name: 'Sign in' });
  this.signInEmail = page.locator('#login-form input[name="email"]')
  this.signInPassword = page.locator('#login-form input[name="password"]');
  this.showBtn = page.getByRole('button', { name: 'Show' });
  this.address = page.locator('input[name="address1"]');
  this.zipCode = page.locator('input[name="postcode"]');
  this.city = page.locator('input[name="city"]');
  this.state = page.locator('select[name="id_state"]');
  this.continueBtn = page.getByRole('button', { name: 'Continue' });
  this.signOutBtn = page.getByRole('link', { name: /Sign out/i }).first();
  this.userNameDisplay = page.locator('a.account span');
  this.authErrorMessage = page.locator('li.alert-danger');
  this.mobileMenuBtn = page.locator('#menu-icon');
  this.mobileViewPersonalAccountBtn = page.locator('a.account');


  }


  /* =========================
     Actions
  ========================== */

  async clickOnCreateAccount() {
        await this.doClick(this.createNewAccount)
    }

  
  async fillRegistrationForm(userData) {
    await this.check(this.socialTitle);
    await this.fill(this.firstName, userData.firstName);
    await this.fill(this.lastName, userData.lastName);
    await this.fill(this.email, userData.email);
    await this.fill(this.password, userData.password);
    await this.fill(this.birthDay, userData.birthDay);
    await this.check(this.agreeTermsCheckbox);
    await this.doClick(this.saveBtn);

  }

  async fillPersonalData(userData) {
    await this.check(this.socialTitle);
    await this.fill(this.firstName, userData.firstName);
    await this.fill(this.lastName, userData.lastName);
    await this.fill(this.email, userData.email);
    await this.fill(this.password, userData.password);
    await this.fill(this.birthDay, userData.birthDay);
    await this.check(this.agreeTermsCheckbox);
    await this.doClick(this.continueBtn);

  }

  async fillLocationData(userData) {
    await this.fill(this.address, userData.address);
    await this.fill(this.zipCode, userData.zipCode);
    await this.fill(this.city, userData.city);
    await this.select(this.state, userData.state);
    await this.doClick(this.continueBtn);
  }

  async fillSignInForm(userData) {
    await this.fill(this.signInEmail, userData.email);
    await this.fill(this.signInPassword, userData.password);

    await this.doClick(this.signInBtn);

  }

  async clickOnContinue() {
        await this.doClick(this.continueBtn)
    }



/* =========================
     Assertions
  ========================== */
  
  async isAtLoginPage() {
        await this.verifyTitle(this.loginPageTitle);
  }

  async isRegistrationOk(userData) {
        if (await this.mobileMenuBtn.isVisible()) {
        await this.mobileMenuBtn.click();
        await this.verifyElementVisible(this.mobileViewPersonalAccountBtn);
    } else {
        await this.verifyElementVisible(this.signOutBtn);
        await this.verifyElementVisible(this.userNameDisplay);
        const expectedFullName = `${userData.firstName} ${userData.lastName}`;
        await this.verifyElementText(this.userNameDisplay, expectedFullName);   
    }
  }

  async isSignInOk(userData) {
    if (await this.mobileMenuBtn.isVisible()) {
        await this.mobileMenuBtn.click();
        await this.verifyElementVisible(this.mobileViewPersonalAccountBtn);
    } else {
        await this.verifyElementVisible(this.signOutBtn);
        await this.verifyElementVisible(this.userNameDisplay);
        const expectedFullName = `${userData.firstName} ${userData.lastName}`;
        await this.verifyElementText(this.userNameDisplay, expectedFullName);   
    }
  }
  async isSignInFailed() {
        await this.verifyElementVisible(this.authErrorMessage);
  }

}
