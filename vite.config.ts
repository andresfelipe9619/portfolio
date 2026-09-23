import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';
import { sentryVitePlugin } from '@sentry/vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  build: {
    // 'hidden' still emits maps (so Sentry can symbolicate stack traces like a
    // grown-up) but omits the //# sourceMappingURL comment, so browsers never go
    // looking for them. The plugin below then deletes them after upload, which
    // means our source stays ours instead of being a curl away.
    sourcemap: 'hidden',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          sentry: ['@sentry/react'],
          motion: ['motion'],
          i18n: [
            'i18next',
            'react-i18next',
            'i18next-browser-languagedetector',
          ],
        },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      sourcemaps: {
        filesToDeleteAfterUpload: ['./dist/**/*.map'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    // e2e/ belongs to Playwright, which has its own runner and a real browser.
    exclude: ['node_modules/**', 'dist/**', 'e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: [
        'src/pages/**/*.tsx',
        'src/components/**/*.tsx',
        'src/hooks/**/*.{ts,tsx}',
        'src/lib/**/*.{ts,tsx}',
      ],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/test/**'],
      // A ratchet, not a trophy: set to what the suite actually achieves today
      // so coverage can only go up. Raise these numbers as tests land; never
      // lower them to make a red build green.
      //
      // The headline number is dragged down by src/components/magicui, which is
      // vendored canvas/WebGL animation code that jsdom cannot meaningfully
      // execute — testing it here would buy confidence that isn't real. Those
      // components are covered by the Playwright suite instead, where an actual
      // browser runs them. First-party code sits around 51%.
      thresholds: {
        statements: 32,
        branches: 30,
        functions: 34,
        lines: 32,
      },
    },
  },
});
