# 🧪 QAXpert – Playwright Automation Project - TestingYes



Este repositorio contiene una suite de pruebas automatizadas End-to-End (E2E) profesional para la plataforma TestingYes Online Shop. El framework está diseñado bajo estándares de industria para garantizar la calidad en flujos críticos de e-commerce.




## 🏗️ Arquitectura y Patrones
- Page Object Model (POM): Separación clara entre la lógica de las páginas (OrderPage, AccessoriesPage, etc.) y los scripts de prueba.
- Data-Driven Testing: Generación dinámica de datos sintéticos (direcciones, usuarios, productos) mediante una capa de utilidades (dataGenerator.ts).
- Responsive Design Ready: Soporte para ejecución en Desktop y Mobile, con lógica adaptativa para menús colapsables (Hamburger Menu).
- Fluent Steps: Uso de test.step para reportes de ejecución legibles tanto para perfiles técnicos como de negocio.


## 🔥 Flujos de Prueba Automatizados
1. Ciclo Completo de Compra (E2E)
  - Navegación por categorías y subcategorías (Accessories > Home Accessories).
  - Configuración dinámica de productos (cantidad y variantes).
  - Checkout Multistep: Registro de datos personales, direcciones, métodos de envío y pasarela de pago.
  - Validación final de confirmación de orden.
2. Gestión de Usuarios y Seguridad
  - Registro y login dinámico.
  - Persistencia de datos de prueba para auditoría.
  - Validación de mensajes de error en accesos inválidos.
3. Lógica de Catálogo e Inventario
  - Filtrado Avanzado: Validación de filtros por color, composición y stock.
  - Control de Stock: Verificación de que productos sin existencias no permitan la adición al carrito.
  - Cálculo de Precios: Validación lógica de descuentos aplicados vs. precios de lista.


## 🛠️ Requisitos Previos
- Node.js (v16+)
- Playwright


## 📦 Instalación y Configuración
1️⃣ Clonar descargar dependencias

```bash
git clone https://github.com
cd tu-repositorio
```

2️⃣ Instala las dependencias:

```bash
npm install
npx playwright install
```

3️⃣ Instala los navegadores de Playwright

```bash
npx playwright install
```

4️⃣ Ejecutar los tests
```bash
npm test
```
----

## 📱 Soporte Multi-dispositivo
El framework detecta automáticamente el Viewport. Para asegurar la estabilidad en dispositivos móviles, se implementó una lógica de interceptación en la clase HomePage que despliega el menú de navegación solo cuando es necesario (Mobile Mode), evitando fallos por elementos ocultos.

## 📂 Estructura del Proyecto
```text
├── pages/               # Clases de Página (POM)
├── tests/
│   ├── auth.spec.ts     # Registro y Login
│   ├── search.spec.ts   # Búsqueda y Descuentos
│   ├── checkout.spec.ts # Flujo de compra completo
│   └── utils/           # Generador de data dinámica
├── playwright.config.ts # Configuración global y proyectos
└── package.json         # Scripts y dependencias

```

----

## 📦 Package

**El archivo `package.json` define:**
- Dependencias del proyecto (Playwright)
- Scripts para ejecutar comandos comunes
- Metadatos básicos del proyecto

## ▶️ Scripts disponibles

```json
"scripts": {
  "test": "playwright test",
  "install:browsers": "playwright install",
  "test:ui": "playwright test --ui",
  "test:headed": "playwright test --headed"
}
```


### 📖 ¿Qué hace cada script?

## ▶️ Scripts disponibles

| Script | Comando | ¿Para qué sirve? |
|------|--------|------------------|
| `test` | `npm test` | Ejecuta todos los tests en modo headless |
| `test:headed` | `npm run test:headed` | Ejecuta los tests con navegador visible |
| `test:ui` | `npm run test:ui` | Abre el Test Runner UI de Playwright |
| `test:debug` | `npm run test:debug` | Ejecuta los tests en modo debug paso a paso |
| `test:trace` | `npm run test:trace` | Ejecuta tests grabando trace de la ejecución |
| `test:report` | `npm run test:report` | Genera el reporte HTML |
| `show:report` | `npm run show:report` | Abre el último reporte HTML |
| `show:trace` | `npm run show:trace` | Abre el archivo trace.zip |
| `install:browsers` | `npm run install:browsers` | Descarga los navegadores de Playwright |

----


## 📊 Reportes y Debugging

### 📄 Reporte HTML
Genera y visualiza el reporte de ejecución:

```bash
npm run show:report
```
