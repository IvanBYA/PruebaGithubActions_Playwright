# Documentación del Framework de Automatización - Playwright

## 📋 Resumen General

Este es un **Framework de Automatización de Pruebas End-to-End (E2E)** construido con **Playwright** y **TypeScript**. El framework implementa el patrón de diseño **Page Object Model (POM)** para mejorar la mantenibilidad, reutilización y escalabilidad de las pruebas automatizadas.

---

## 🎯 Funcionalidades Principales

### 1. **Playwright - Framework de Testing E2E**
- **Versión**: 1.60.0
- **Características**:
  - Automatización de navegadores web (Chromium, Firefox, WebKit)
  - Soporte para pruebas paralelas
  - Manejo avanzado de esperas y timeouts
  - Trazabilidad con traces automáticas en reintentos fallidos
  - API moderna y flexible para interacción con el navegador

### 2. **Page Object Model (POM)** ✨
El framework implementa el patrón POM para organizar y reutilizar el código de automatización:

**Estructura de Páginas** (`pages/`):
```
pages/
├── HomePage.ts          - Encapsula elementos y métodos de la página de inicio
├── SignUpPage.ts        - Elementos y funcionalidades de registro
└── HeaderTagPage.ts     - Componentes compartidos del encabezado
```

**Ventajas del POM implementado**:
- ✅ **Encapsulación**: Todos los selectores y métodos están centralizados
- ✅ **Reutilización**: Las páginas se pueden reutilizar en múltiples tests
- ✅ **Mantenibilidad**: Los cambios en la UI se hacen en un único lugar
- ✅ **Legibilidad**: Los tests son más legibles y expresivos

**Ejemplo de implementación**:
```typescript
export class HomePage {
    private readonly page: Page;
    private readonly activeLink = "//a[contains(@style,'orange')]";
    
    async gotoHomePage() {
        await this.page.goto(this.urlHomePage);
        await expect(this.page).toHaveTitle(this.titleHomePage);
    }
}
```

### 3. **Allure Reports** 📊
Sistema avanzado de reportes de pruebas:
- **Versión**: 3.6.0 (allure-playwright)
- **Características**:
  - Reportes visuales y detallados de ejecuciones
  - Historial de pruebas y tendencias
  - Categorización de fallos
  - Métricas de duración y reintentos
  - Dashboard interactivo con widgets

**Comandos disponibles**:
```bash
# Generar reportes Allure
npm run allure:generate

# Abrir el reporte en el navegador
npm run allure:open

# Ejecutar todas las pruebas y generar reporte completo
npm run full-test
```

**Datos generados** (`allure-results/` y `allure-report/`):
- JSON con resultados de cada test
- Historial de ejecuciones
- Tendencias de duración y reintentos
- Anexos de pantallas capturadas
- Datos para análisis y trazabilidad

### 4. **Sistema de Captura de Screenshots** 📸
Utilidad personalizada para gestionar screenshots organizados por test:

**Características**:
- 📁 **Organización automática**: Las screenshots se guardan en carpetas por ID de test
- 🔢 **Numeración secuencial**: Cada screenshot se numera automáticamente (img1_, img2_, etc.)
- 🏷️ **Nombres descriptivos**: Combinación de número + nombre del screenshot
- 📍 **Integración con Allure**: Los screenshots se adjuntan automáticamente a los reportes

**Estructura de carpetas de screenshots**:
```
screenshots/
├── TC_001/              - Screenshots del test TC_001
│   ├── img1_HomePage.png
│   ├── img2_SignUp.png
│   └── img3_Confirmation.png
├── TC_002/              - Screenshots del test TC_002
│   ├── img1_HomePage.png
│   └── img2_Error.png
└── FillNameAndEmail/    - Screenshots de tests con nombres genéricos
    ├── img1_*.png
    └── img2_*.png
```

**Uso en los tests**:
```typescript
async isHomePageVisible() {
    await expect(this.page.locator(this.activeLink)).toBeVisible();
    await this.screenshotUtils.take('imgHomePage');  // Se guarda en screenshots/TC_001/
}
```

**Clase ScreenshotUtils** (`utils/screenshotUtils.ts`):
- Extrae automáticamente el ID del test del nombre del archivo
- Crea carpetas si no existen
- Reinicia el contador para cada test
- Adjunta screenshots al reporte de Allure

### 5. **Generación de Datos Aleatorios** 🎲
- **Librería**: @faker-js/faker (v10.4.0)
- **Uso**: Generación de nombres, emails, direcciones y otros datos para pruebas
- **Beneficio**: Mayor cobertura de datos y pruebas más robustas

### 6. **Soporte Multi-Navegador** 🌐
Las pruebas se ejecutan en múltiples navegadores:

**Navegadores configurados**:
- ✅ **Chromium** (basado en Chrome/Edge)
- ✅ **Firefox**
- ✅ **WebKit** (Safari)

**Configuración** (`playwright.config.ts`):
```typescript
projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
]
```

### 7. **Reportes HTML Integrados** 📄
- Reportes HTML generados automáticamente por Playwright
- Ubicados en `playwright-report/`
- Incluyen información detallada de ejecuciones y fallos
- Accesibles en navegador web

### 8. **Ejecución Paralela y Reintentos**
- **Ejecución paralela**: Los tests se ejecutan en paralelo por defecto
- **Reintentos**: Configurables por entorno (2 reintentos en CI)
- **Trazas automáticas**: Se generan traces en el primer reintento fallido (`trace: 'on-first-retry'`)

### 9. **TypeScript** 🔷
- Tipado estático para mayor seguridad
- Mejor autocompletado en IDEs
- Compilación a JavaScript antes de ejecutar
- Configuración de TypeScript en `tsconfig.json`

---

## 🗂️ Estructura del Proyecto

```
mi-proyecto-playwright/
│
├── 📄 package.json              - Dependencias y scripts
├── 📄 playwright.config.ts      - Configuración del framework
├── 📄 tsconfig.json             - Configuración de TypeScript
│
├── 📁 pages/                    - Page Object Model
│   ├── HomePage.ts
│   ├── SignUpPage.ts
│   └── HeaderTagPage.ts
│
├── 📁 tests/                    - Archivos de prueba
│   ├── WithPom/                 - Tests usando POM
│   │   ├── FillNameAndEmail.spec.ts
│   │   ├── NoFillNameAndEmail.spec.ts
│   │   └── TC_*.spec.ts
│   └── WithoutPom/              - Tests sin POM (para comparación)
│       └── TC_001_FillNameAndEmail.spec.ts
│
├── 📁 utils/                    - Utilidades compartidas
│   └── screenshotUtils.ts       - Gestión de screenshots
│
├── 📁 screenshots/              - Capturas de pantalla organizadas por test
│   ├── TC_001/
│   ├── TC_002/
│   ├── TC_003/
│   ├── FillNameAndEmail/
│   └── NoFillNameAndEmail/
│
├── 📁 allure-results/           - Resultados crudos para Allure
│   └── *.json
│
├── 📁 allure-report/            - Reporte visual de Allure
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   ├── data/
│   ├── history/
│   ├── widgets/
│   └── export/
│
├── 📁 playwright-report/        - Reporte HTML de Playwright
│   └── index.html
│
└── 📁 test-results/             - Resultados temporales de ejecuciones
```

---

## 🚀 Scripts Disponibles

```bash
# Ejecutar tests con POM (recomendado)
npm run run-tests-WithPom

# Generar reporte Allure
npm run allure:generate

# Abrir el reporte Allure en el navegador
npm run allure:open

# Ejecutar todo: tests + generar reporte + abrir en navegador
npm run full-test
```

---

## 💡 Ventajas del Framework

| Aspecto | Ventaja |
|--------|---------|
| **Mantenibilidad** | POM centraliza selectores y métodos |
| **Reutilización** | Páginas y utilidades compartidas entre tests |
| **Reportes** | Allure proporciona análisis detallado y trazabilidad |
| **Evidencia** | Screenshots automáticos organizados por test |
| **Confiabilidad** | Reintentos automáticos y trazas de fallos |
| **Escalabilidad** | Ejecución paralela en múltiples navegadores |
| **Datos Dinámicos** | Faker para generar datos aleatorios realistas |

---

## 🔍 Mejores Prácticas Implementadas

1. ✅ **Patrón Page Object Model**: Encapsulación de elementos y métodos
2. ✅ **Separación de capas**: Tests, páginas, utilidades claramente separadas
3. ✅ **Tipado con TypeScript**: Mayor seguridad y mantenibilidad
4. ✅ **Screenshots organizados**: Fácil identificación de evidencia visual
5. ✅ **Reportes detallados**: Trazabilidad completa de ejecuciones
6. ✅ **Reutilización de código**: Clases base y utilidades compartidas
7. ✅ **Ejecución paralela**: Optimización de tiempo de ejecución

---

## 📊 Ejemplo de Flujo Completo

```typescript
// 1. Importar la página (POM)
import { HomePage } from '../pages/HomePage';

// 2. Crear instancia de la página
const homePage = new HomePage(page, testInfo);

// 3. Usar métodos encapsulados
await homePage.gotoHomePage();
await homePage.isHomePageVisible();  // Incluye screenshot automático

// 4. Resultado: Screenshot guardado en: screenshots/TC_001/img1_imgHomePage.png
// 5. Reporte Allure generado con evidencia incluida
```

---

## 🎓 Conclusión

Este framework de Playwright proporciona una solución completa y profesional para automatización de pruebas E2E con:
- ✨ Código limpio y mantenible (POM)
- 📊 Reportes avanzados (Allure)
- 📸 Gestión automática de evidencia
- 🌐 Soporte multi-navegador
- 🔄 Ejecución confiable con reintentos

**Ideal para**:
- Pruebas de regresión
- Validación de funcionalidades críticas
- Documentación de comportamiento de aplicaciones
- Integración con pipelines CI/CD
