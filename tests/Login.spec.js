import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import * as Utils from './utils/dataGenerator';
import { LoginPage } from '../pages/LoginPage';

  test.describe('Create user & Login', () => {

  let homePage; 
  let loginPage;
  let userData;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    
    userData = {
        firstName: Utils.generateRandomFirstName(),
        lastName: Utils.generateRandomLastName(),
        email: Utils.generateRandomEmail(),
        password: Utils.generateRandomPassword(),
        birthDay: Utils.generateRandomBirthday(),
    };

    Utils.saveUserData(userData.firstName, userData.lastName, userData.email, userData.password);
    
    await homePage.navigate('');
    await homePage.isAtHomePage();
    });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Crear nuevo usuario & Sign In en el e-commerce', async ({ }) => {

      await test.step('Click en botón de Sign In', async () => {
          await homePage.clickOnSignIn();
        });

      await test.step('Verificar que se abre página de Sign In', async () => {
          await loginPage.isAtLoginPage();
        });

      await test.step('Click en botón de Create Account', async () => {
          await loginPage.clickOnCreateAccount();
        });

      await test.step('Completar formulario de registro', async () => {
          await loginPage.fillRegistrationForm(userData);
        });

      await test.step('Validar mensaje de creación exitosa', async () => {
          await loginPage.isRegistrationOk(userData);
        });

      await test.step('Click en botón de Sign Out ', async () => {
          await homePage.clickOnSignOut();
        });

      await test.step('Click en botón de Sign In', async () => {
          await homePage.clickOnSignIn();
        });

      await test.step('Verificar que se abre página de Sign In', async () => {
          await loginPage.isAtLoginPage();
        });

      await test.step('Completar formulario de login', async () => {
          await loginPage.fillSignInForm(userData);
        });

      await test.step('Validar mensaje de login exitoso', async () => {
          await loginPage.isSignInOk(userData);
        });

    });
    
    test('Validar mensaje de error de login con credenciales inválidas', async ({ }) => {

      await test.step('Click en botón de Sign In', async () => {
          await homePage.clickOnSignIn();
        });

      await test.step('Verificar que se abre página de Sign In', async () => {
          await loginPage.isAtLoginPage();
        });

      await test.step('Completar formulario de login', async () => {
          await loginPage.fillSignInForm(userData);
        });

      await test.step('Validar mensaje de error de login con credenciales inválidas', async () => {
          await loginPage.isSignInFailed();
        });    

    });

});