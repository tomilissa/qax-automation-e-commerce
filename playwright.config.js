import { defineConfig, devices } from '@playwright/test';

const ENV = process.env.ENV || 'qa';
const environments = {
  qa: 'http://www.testingyes.com/onlineshop/',
  prod: 'http://www.testingyes.com/onlineshop/'
};

// ✅ VALIDACIÓN DEL AMBIENTE
if (!environments[ENV]) {
  throw new Error(`❌ Ambiente "${ENV}" no soportado. Usa: ${Object.keys(environments).join(', ')}`);
}
console.log(`🚀 Ejecutando tests en el ambiente: ${ENV} (${environments[ENV]})`);

export default defineConfig({
  // 📂 Carpeta donde están los tests
  testDir: './tests',

  // ⏱️ Timeout por test (60 segundos)
  timeout: 60 * 1000,

  // ⚡ Ejecutar tests en paralelo
  fullyParallel: true,

   // 👷 Workers (hilos de ejecución)
  // En QA usa todos los cores disponibles
  // En PROD limitamos para estabilidad
  workers: ENV === 'prod' ? 2 : undefined,

  // 🔁 Reintentos globales
  retries: ENV === 'prod' ? 1 : 0,

  reporter: 'html',
  use: {
    // 🌐 URL base del sitio a probar
    baseURL: environments[ENV],
    ignoreHTTPSErrors: true,
    
    // 📸 Captura de pantalla en fallos
    screenshot: 'only-on-failure',
    
    // 🎬 Video solo en fallos (ahorra espacio)
    video: 'retain-on-failure',
    
    // 📊 Trace solo en fallo (para debugging)
    trace: 'on-first-retry',
    
  },

  // 🧪 Projects (Desktop + Mobile)
  projects: [
    // ===== DESKTOP =====
    {
      name: 'Desktop Chrome',
      retries: 0,
      use: {
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'Desktop Firefox',
      retries: 1,
      use: {
        ...devices['Desktop Firefox']
      }
    },

    // ===== MOBILE =====
    {
      name: 'Mobile Chrome',
      retries: 1,
      use: {
        ...devices['Pixel 5']
      }
    },
    {
      name: 'Mobile Safari',
      retries: 2, // móviles suelen ser más inestables
      use: {
        ...devices['iPhone 13']
      }
    },
    {
      name: 'Ipad Safari',
      retries: 1, // móviles suelen ser más inestables
      use: {
        ...devices['iPad Pro 11']
      }
    },
        {
      name: 'Android Chrome',
      retries: 2, // móviles suelen ser más inestables
      use: {
        ...devices['Galaxy A55']
      }
    }
  ]
});

