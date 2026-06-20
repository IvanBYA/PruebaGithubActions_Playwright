import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomePage } from '../../pages/HomePage';
import { HeaderTagPage } from '../../pages/HeaderTagPage';
import { SignUpPage } from '../../pages/SignUpPage';

test("TC_001_Fill Name And Email", async ({ page }, testInfo) => {

  // Generar datos aleatorios
  const objetoTestData = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10, memorable: false }),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
  };

  // Instanciar las clases mediante objetos
  const homePage = new HomePage(page, testInfo);
  const headerTagPage = new HeaderTagPage(page, testInfo);
  const signUpPage = new SignUpPage(page, testInfo);

  /* STEP 1 */
  await test.step(`Visit the URL: ${homePage.urlHomePage}`, async () => {
    await homePage.gotoHomePage();
  });

  /* STEP 2 */
  await test.step(`Validate if the Home Page is visible successfully`, async () => {
    await homePage.isHomePageVisible();
  });

  /* STEP 3 */
  await test.step('Click on SignUp Button', async () => {
    await headerTagPage.clickOnSignUpLogin();
  })

  /* STEP 4 */
  await test.step('Validate if exist the text "New User Signup!"', async () => {
    await signUpPage.validateNewUserSignUpTextIsVisible();
  })


  /* STEP 5 */
  await test.step('Fill Name and Email', async () => {
    await signUpPage.fillNameAndEmail(objetoTestData.name, objetoTestData.email);
  })
});

