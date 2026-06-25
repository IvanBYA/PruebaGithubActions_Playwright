import { Page, TestInfo, expect } from "@playwright/test";
import { ScreenshotUtils } from "../utils/screenshotUtils";

export class HeaderTagPage {

    /**
     * Propiedades de la clase HeaderTagPage
     */
    private readonly page: Page;
    private readonly screenshotUtils: ScreenshotUtils;

    /**
     * Selectores
     */
    private readonly urlSignUpLogin = "https://automationexercise.com/login";
    private readonly linkSignUpLogin = "//a[contains(text(),'Signup / Login')]";

    /**
     * Constructor de la clase HeaderTagPage
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
     * Metodo para hacer click en el enlace "Signup / Login" y validar que la URL sea la correcta
     * @date 23/06/2026
     * @author Ivan
     */
    async clickOnSignUpLogin() {
        await this.page.locator(this.linkSignUpLogin).click();
        await expect(this.page).toHaveURL(this.urlSignUpLogin)
        await this.page.waitForLoadState('load');
        await this.screenshotUtils.take("ClickOnSignUp")
    }
}