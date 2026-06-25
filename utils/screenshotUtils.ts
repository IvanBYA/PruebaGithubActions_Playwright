import { TestInfo, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export class ScreenshotUtils
{
    /**
     * Propiedades de la clase ScreenshotUtils:
     */
    private static screenshotCounter: number = 0;
    private testId: string;
    private screenshotDir: string;

    /**
     * Constructor de la clase ScreenshotUtils.
     * @param page Instancia de Page para interactuar con el navegador
     * @param testInfo Información de la prueba para capturar y adjuntar screenshots
     * @date 23/06/2026
     * @author Ivan
     */
    constructor(private testInfo: TestInfo, private page: Page) {

        // Extraer el ID del test del nombre del archivo (ej: TC_001 de "TC_001_FillNameAndEmail.spec.ts")
        this.testId = this.extractTestId(testInfo.file);
        
        // Crear la ruta: screenshots/TC_001
        this.screenshotDir = path.join('screenshots', this.testId);
        
        // Crear la carpeta si no existe
        if (!fs.existsSync(this.screenshotDir)) {
            fs.mkdirSync(this.screenshotDir, { recursive: true });
        }

        // Resetear el contador para cada test para que cuando creemos el objeto ScreenshotUtils, el contador de capturas de pantalla comience desde 0 para ese test específico.
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

    /**
     * Metodo para tomar una captura de pantalla y adjuntarla al reporte de la prueba.
     * El formato del nombre de la captura será: "imgX_nombreDelArchivo.png", donde X es un contador que se incrementa con cada captura tomada durante la ejecución del test.
     * @date 23/06/2026
     * @author Ivan
     * @param fileName  El nombre descriptivo de la captura de pantalla (ej: "textNewUserSignUpVisible")
     */
    async take(fileName: string) {
        ScreenshotUtils.screenshotCounter++;
        
        // Formatear el nombre de la captura de pantalla con el contador y el nombre del archivo
        // Ejemplo: "img1_textNewUserSignUpVisible.png"
        const screenshotNameFormat = `img${ScreenshotUtils.screenshotCounter}_${fileName}`;

        // Ruta completa de la captura de pantalla
        // Ejemplo: "screenshots/TC_001/img1_textNewUserSignUpVisible.png"
        const fullPath = path.join(this.screenshotDir, `${screenshotNameFormat}.png`);

        await this.testInfo.attach('screenshot', {
            body: await this.page.screenshot({ path: fullPath }),
            contentType: 'image/png',
        });
    }
}