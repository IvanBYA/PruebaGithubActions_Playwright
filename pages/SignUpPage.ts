import { Page, TestInfo, expect } from "@playwright/test";
import { ScreenshotUtils } from "../utils/screenshotUtils";

export class SignUpPage {

    /**
     * Propiedades de la clase SignUpPage
     */
    private readonly page: Page;
    private readonly screenshotUtils: ScreenshotUtils;

    /**
     * Selectores
     */
    private readonly newUserSignUpText = "//h2[normalize-space()='New User Signup!']";
    private readonly nameInput = "input[placeholder='Name']";
    private readonly emailInput = "[data-qa='signup-email']";

    /**
     * Constructor de la clase SignUpPage
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
     * Valida que el texto "New User Signup!" sea visible
     * @date 20/06/2026
     * @author Ivan
     */
    async validateNewUserSignUpTextIsVisible() {
        await expect(this.page.locator(this.newUserSignUpText)).toBeVisible();
        await this.screenshotUtils.take('textNewUserSignUpVisible');
    }

    /**
     * Llena los campos de Name y Email, y valida que los valores sean correctos
     * @param name - Nombre del usuario
     * @param email - Email del usuario
     * @date 20/06/2026
     * @author Ivan
     */
    async fillNameAndEmail(name: string, email: string) {
        await this.page.locator(this.nameInput).fill(name);
        await this.page.locator(this.emailInput).fill(email);
        await expect(this.page.locator(this.nameInput)).toHaveValue(name);
        await expect(this.page.locator(this.emailInput)).toHaveValue(email);
        await this.screenshotUtils.take('nameAndEmailAdded');
    }
}