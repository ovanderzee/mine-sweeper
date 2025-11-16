import { defineConfig } from 'vitest/config'
import { webdriverio } from '@vitest/browser-webdriverio'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.aat.tsx'],
    browser: {
      enabled: true,
      provider: webdriverio(),
      // https://vitest.dev/guide/browser/webdriverio
      instances: [
      { browser: 'chrome' },
//       { browser: 'firefox' },
//       { browser: 'safari' },
      ],
    },
  },
})
