import { Page, TestInfo, expect } from "@playwright/test";
import { ScreenshotUtils } from "../utils/screenshotUtils";

export class HeaderTagPage {

    private readonly page: Page;
    private readonly testInfo: TestInfo;
    private readonly screenshotUtils: ScreenshotUtils;

    private readonly urlSignUpLogin = "https://automationexercise.com/login";
    private readonly linkSignUpLogin = "//a[contains(text(),'Signup / Login')]";

    public constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.screenshotUtils = new ScreenshotUtils(testInfo, page);
    }

    async clickOnSignUpLogin() {
        await this.page.locator(this.linkSignUpLogin).click();
        await expect(this.page).toHaveURL(this.urlSignUpLogin)
        await this.page.waitForLoadState('load');
        await this.screenshotUtils.take("ClickOnSignUp")
    }
}