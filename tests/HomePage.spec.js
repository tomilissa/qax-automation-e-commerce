import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AccessoriesPage } from '../pages/AccessoriesPage';


test.describe('Buscar productos', () => {

  const partialproductName = 'Mug';
  const completeProductName = 'Mug Today is a good day';

  let homePage;
  let accessoriesPage; 

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    accessoriesPage = new AccessoriesPage(page);
    
    await homePage.navigate('');
    await homePage.isAtHomePage();
    });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Buscar productos por nombre parcial', async ({ }) => {

      await test.step('Buscar productos por nombre parcial', async () => {
          await homePage.searchForProduct(partialproductName)
        });

      await test.step('Verificar que los resultados contengan la palabra buscada', async () => {
          await homePage.verifyAllResultsContain(partialproductName);
        });    

    });

    test('Buscar producto seleccionando una sugerencia del desplegable', async ({ }) => {

      await test.step('Seleccionar sugerencia del deplegable', async () => {
           await homePage.selectFromSearchDropdown(partialproductName, completeProductName); 
        });
        

      await test.step('Verificar que el resultado contenga la palabra buscada', async () => {
            await homePage.verifySelectedResultContains(completeProductName);
        });    

    });

    test('Validar que el descuento del producto se aplica correctamente', async ({ }) => {
      
      await test.step('Hacer click en botón "Quick View"', async () => {
          await accessoriesPage.selectQuickViewBtn(1);
        });

      await test.step('Verificar que el descuento se aplica correctamente', async () => {
          await homePage.validateDiscountCalculation();
          
        });    

    });    

});        