import { expect, TestInfo, type Locator, type Page } from '@playwright/test';
import { ScreenshotUtils } from '../utils/screenshotUtils';

export class HomePage {

    private readonly page: Page;
    private readonly screenshotUtils: ScreenshotUtils;

    public readonly urlHomePage = "https://automationexercise.com/";
    private readonly titleHomePage = "Automation Exercise";
    private readonly activeLink = "//a[contains(@style,'orange')]";
    private readonly copyrightText = "p[class=pull-left]";

    // Constructor de la clase HomePage
    // Explicacion: El constructor de la clase HomePage recibe dos parámetros, page y testInfo, que son asignados a las propiedades correspondientes de la clase.
    // Además, se crea una instancia de ScreenshotUtils utilizando estos parámetros, lo que permite que los métodos de la clase HomePage puedan utilizar esta utilidad para capturar pantallas durante las pruebas. Esto facilita la organización y reutilización del código relacionado con la captura de pantallas en diferentes partes de las pruebas.
    public constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.screenshotUtils = new ScreenshotUtils(testInfo, page);
    }
    
    /**
     * Metodo para navegar a la página de inicio y verificar su título
     * @date 14/06/2026
     * @author Ivan
     */
    async gotoHomePage() {
        await this.page.goto(this.urlHomePage);
        await expect(this.page).toHaveTitle(this.titleHomePage);
    }

    async isHomePageVisible() {
        await expect(this.page.locator(this.activeLink)).toBeVisible();
        await this.screenshotUtils.take('imgHomePage');
        await this.page.locator(this.copyrightText).scrollIntoViewIfNeeded();
        await expect(this.page.locator(this.copyrightText)).toBeVisible();
        await this.screenshotUtils.take('imgHomePageFooter');
    }
}