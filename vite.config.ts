import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import * as child from 'child_process';
import { webdriverio } from '@vitest/browser-webdriverio'

const commitHash = child.execSync('git rev-parse --short HEAD').toString().trim()

// https://vite.dev/config/
export default defineConfig({
  base: '',
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
  server: {
    host: '0.0.0.0',
  },
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          globals: true,
          hideSkippedTests: true,
          environment: 'jsdom', // use 'node' for backend
          // .spec. files will be moved to browser tests ( .aat. )
          include: ['src/**/*.{test,spec}.ts'],
          coverage: {
            include: ['src'],
            exclude: [
              '**/.DS_Store',
              '**/*.d.ts',
              'src/main.tsx',
              'src/components/game/GameCellDemo.tsx',
              'src/__mocks__/*'
            ],
            reporter: ['text', 'html'],
          },
          setupFiles: ['./src/vitest.setup.ts'],
        },
      },
      {
        test: {
          name: 'browser',
//           globals: true,
          hideSkippedTests: true,
//           environment: 'jsdom', // use 'node' for backend
          include: ['src/**/*.aat.ts'],
//           coverage: {
//             exclude: [
//               '**/*.d.ts',
//               'src/main.tsx',
//               'src/components/game/GameCellDemo.tsx',
//               'src/__mocks__/*'
//             ],
//             reporter: ['text', 'html'],
//           },
//   ??        setupFiles: ['./src/vitest.setup.ts'],
          browser: {
            provider: webdriverio(),
            enabled: true,
            // at least one instance is required
            instances: [
              { browser: 'chrome' },
            ],
          },
        },
      },
    ]
  },
})
