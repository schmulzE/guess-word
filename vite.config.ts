import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const viteConfig = defineViteConfig({
  plugins: [react()],
});

const vitestConfig = defineVitestConfig({
  build: {
    rollupOptions: {
      external: [
        '**/*.cy.jsx',
        '**/*.cy.tsx',
        'cypress/',
        'cypress.config.js',
        '**/*.test.jsx',
        '**/*.test.tsx',
        '__tests__/',
        'test/'
      ]
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['**/*.test.tsx', '**/*.test.ts'],
  },
});

export default mergeConfig(viteConfig, vitestConfig);