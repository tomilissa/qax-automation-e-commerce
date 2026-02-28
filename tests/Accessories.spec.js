import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { AccessoriesPage } from '../pages/AccessoriesPage';
import { OrderPage } from '../pages/OrderPage';
import * as Utils from './utils/dataGenerator';

  test.describe('Navegación, selección y compra de un producto', () => {

  let homePage; 
  let accessoriesPage;
  let loginPage;
  let userData;
  let orderPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    accessoriesPage = new AccessoriesPage(page);
    loginPage = new LoginPage(page);
    orderPage = new OrderPage(page);

    const randomLocation = Utils.generateRandomLocation();
    
    userData = {
        firstName: Utils.generateRandomFirstName(),
        lastName: Utils.generateRandomLastName(),
        email: Utils.generateRandomEmail(),
        password: Utils.generateRandomPassword(),
        birthDay: Utils.generateRandomBirthday(),
        address: randomLocation.address,
        zipCode: randomLocation.zipCode,
        city: randomLocation.city,
        state: randomLocation.state,
        shippingMessage: 'Please deliver between 9 AM and 5 PM.',
        paymentMethod: 'Pay by bank wire',

    };

    Utils.saveUserData(
        userData.firstName, 
        userData.lastName, 
        userData.email, 
        userData.password
    );

    await homePage.navigate('');
    await homePage.isAtHomePage();
    });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Navegar y filtrar productos', async ({ }) => {

      await test.step('Seleccionar Accessories > Home Accessories del menu principal', async () => {
          await homePage.selectMainMenuOption('Accessories', 'Home Accessories');
        });

      await test.step('Verificar que se abre página de Home Accessories', async () => {
          await accessoriesPage.isAtAccessoriesPage();
        });

      await test.step('Filtrar por color de producto (Black)', async () => {
          await accessoriesPage.filterByColor('Black');
        });
        
      await test.step('Verificar que el filtro por color se aplicó correctamente', async () => {
          await accessoriesPage.verifyFilterIsActive('Black', 'color-black');
        });

     });   

    test('Verificar que los productos sin stock no se pueden añadir al carrito', async ({ }) => {

      await test.step('Seleccionar Accessories > Home Accessories del menu principal', async () => {
          await homePage.selectMainMenuOption('Accessories', 'Home Accessories');
        });

      await test.step('Verificar que se abre página de Home Accessories', async () => {
          await accessoriesPage.isAtAccessoriesPage();
        });

      await test.step('Filtrar por tipo de producto (Ceramic)', async () => {
          await accessoriesPage.filterByComposition('Ceramic');
        });
        
      await test.step('Verificar que el filtro por tipo de producto se aplicó correctamente', async () => {
          await accessoriesPage.verifyFilterIsActive('Ceramic', 'Composition-Ceramic');
        });

      await test.step('Hacer click en botón "Quick View"', async () => {
          await accessoriesPage.selectQuickViewBtn(0);
        });

      await test.step('Verificar que el producto no tiene stock', async () => {
          await accessoriesPage.verifyProductHasNoStock();
        });  
        
    });

    test('Agregar productos con stock al carrito', async ({ }) => {

      await test.step('Seleccionar Accessories > Home Accessories del menu principal', async () => {
          await homePage.selectMainMenuOption('Accessories', 'Home Accessories');
        });

      await test.step('Verificar que se abre página de Home Accessories', async () => {
          await accessoriesPage.isAtAccessoriesPage();
        });

      await test.step('Filtrar por tipo de producto (Ceramic)', async () => {
          await accessoriesPage.filterByComposition('Ceramic');
        });
        
      await test.step('Verificar que el filtro por tipo de producto se aplicó correctamente', async () => {
          await accessoriesPage.verifyFilterIsActive('Ceramic', 'Composition-Ceramic');
        });

      await test.step('Hacer click en botón "Quick View"', async () => {
          await accessoriesPage.selectQuickViewBtn(3);
        });

      await test.step('Verificar que el producto tiene stock', async () => {
          await accessoriesPage.verifyProductHasStock();
        });
        
      await test.step('Modificar la cantidad y agregar producto al carrito', async () => {
          await accessoriesPage.setQuantityandAddToCart();
        });

      await test.step('Validar que el nombre, precio y cantidad sean visibles', async () => {
          await accessoriesPage.verifyProducAddedSuccessfully();
        });

      await test.step('Seleccionar boton "Proceed to checkout"', async () => {  
          await accessoriesPage.proceedToCheckout();
        });

      await test.step('Volver a seleccionar "Proceed to checkout"', async () => {  
          await accessoriesPage.finalcheckout();
        });
        
      await test.step('Completar personal information', async () => {
          await loginPage.fillPersonalData(userData);
        });

      await test.step('Completar addresses information', async () => {
          await loginPage.fillLocationData(userData);
        });
        
      await test.step('Seleccionar método de envío y detallar mensaje ', async () => {
          await orderPage.selectShippingMethod(userData);
        });

      await test.step('Seleccionar método de pago', async () => {
          await orderPage.selectPaymentMethod(userData);
        });

      await test.step('Validar que la orden de pago está confirmada', async () => {  
          await orderPage.verifyOrderConfirmation();
        });

    });   

});