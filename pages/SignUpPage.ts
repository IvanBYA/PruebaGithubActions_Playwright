import { Page, TestInfo, expect } from "@playwright/test";
import { ScreenshotUtils } from "../utils/screenshotUtils";

export class SignUpPage {

    private readonly page: Page;
    private readonly screenshotUtils: ScreenshotUtils;

    private readonly newUserSignUpText = "//h2[normalize-space()='New User Signup!']";
    private readonly nameInput = "input[placeholder='Name']";
    private readonly emailInput = "[data-qa='signup-email']";

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