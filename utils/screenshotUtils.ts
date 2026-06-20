import { TestInfo, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export class ScreenshotUtils
{
    private static screenshotCounter: number = 0;
    private testId: string;
    private screenshotDir: string;

    constructor(private testInfo: TestInfo, private page: Page) {
        // Extraer el ID del test del nombre del archivo (ej: TC_001 de "TC_001_FillNameAndEmail.spec.ts")
        this.testId = this.extractTestId(testInfo.file);
        
        // Crear la ruta: screenshots/TC_001
        this.screenshotDir = path.join('screenshots', this.testId);
        
        // Crear la carpeta si no existe
        if (!fs.existsSync(this.screenshotDir)) {
            fs.mkdirSync(this.screenshotDir, { recursive: true });
        }

        // Resetear el contador para cada test
        ScreenshotUtils.screenshotCounter = 0;
    }

    /**
     * Metodo para extraer el ID del test a partir del nombre del archivo, en caso de no encontrar un ID con el formato "TC_XXX", se utiliza el nombre del archivo sin extensión como ID.
     * @param filePath La ruta del archivo de test (ej: "tests/WithPom/TC_001_FillNameAndEmail.spec.ts")
     * @returns El ID del test (ej: "TC_001") o el nombre del archivo sin extensión si no se encuentra el ID
     */
    private extractTestId(filePath: string): string {
        const nombreDelArchivo = path.basename(filePath);
        const match = nombreDelArchivo.match(/^(TC_\d+)/);
        
        if (match) {
            return match[1];
        } else {
            // Usar el nombre del archivo sin extensión como ID
            return nombreDelArchivo.replace('.spec.ts', '');
        }
    }

    async take(fileName: string) {
        ScreenshotUtils.screenshotCounter++;
        
        const screenshotNameFormat = `img${ScreenshotUtils.screenshotCounter}_${fileName}`;
        const fullPath = path.join(this.screenshotDir, `${screenshotNameFormat}.png`);

        await this.testInfo.attach('screenshot', {
            body: await this.page.screenshot({ path: fullPath }),
            contentType: 'image/png',
        });
    }
}