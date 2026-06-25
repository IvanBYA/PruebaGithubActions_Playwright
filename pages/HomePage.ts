import { expect, TestInfo, type Locator, type Page } from '@playwright/test';
import { ScreenshotUtils } from '../utils/screenshotUtils';

export class HomePage {

    /**
     * Propiedades de la clase HomePage
     */
    private readonly page: Page;
    private readonly screenshotUtils: ScreenshotUtils;

    /**
     * Selectores
     */
    public  readonly urlHomePage = "https://automationexercise.com/";
    private readonly titleHomePage = "Automation Exercise";
    private readonly activeLink = "//a[contains(@style,'orange')]";
    private readonly copyrightText = "p[class=pull-left]";

    /**
     * Constructor de la clase HomePage
     * @param page Instancia de Page para interactuar con el navegador
     * @param testInfo Información de la prueba para capturar y adjuntar screenshots
     * @date 23/06/2026
     * @author Ivan
     */
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

    /**
     * Metodo para validar si la página de inicio es visible
     * @date 14/06/2026
     * @author Ivan
     */
    async isHomePageVisible() {
        await expect(this.page.locator(this.activeLink)).toBeVisible();
        await this.screenshotUtils.take('imgHomePage');
        await this.page.locator(this.copyrightText).scrollIntoViewIfNeeded();
        await expect(this.page.locator(this.copyrightText)).toBeVisible();
        await this.screenshotUtils.take('imgHomePageFooter');
    }
}