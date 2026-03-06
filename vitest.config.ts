import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { webdriverio } from '@vitest/browser-webdriverio'

// https://vite.dev/config/
export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          globals: true,
          hideSkippedTests: true,
          environment: 'jsdom', // use 'node' for backend
          // @ts-expect-error // error TS2769: No overload matches this call
          coverage: {
            include: ['src'],
            reporter: ['text', 'html'],
          },
          setupFiles: ['./src/vitest.setup.ts'],
        },
      },
      {
        test: {
          include: ['src/**/*.aat.tsx'],
          name: 'aat',
          browser: {
            enabled: true,
            provider: webdriverio(),
            headless: true,
            viewport: { width: 800, height: 600 },
            // https://vitest.dev/guide/browser/webdriverio
            instances: [
              { browser: 'chrome' },
            ],
          },
          printConsoleTrace: true,
          setupFiles: ['./src/vitest.set-browser.ts'],
        },
      }
    ]
  },
  cacheDir: '.vite-cache', // to persist optimisations
  optimizeDeps: {
    include: ['react/jsx-dev-runtime']
  }
})
