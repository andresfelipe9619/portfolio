import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

const googleConfig = compat.extends('eslint-config-google').map((config) => {
  if (config.rules) {
    delete config.rules['valid-jsdoc'];
    delete config.rules['require-jsdoc'];
  }
  return config;
});

export default tseslint.config(
  globalIgnores(['dist', 'coverage', 'playwright-report', 'test-results']),
  ...googleConfig,
  {
    // Every suppression has to name the rule it's suppressing — a bare
    // eslint-disable switches off every rule, including ones that don't exist
    // yet. AGENTS.md promises this is enforced; this is what enforces it.
    // Applies to every linted file, config and tests included.
    plugins: { '@eslint-community/eslint-comments': eslintComments },
    rules: {
      '@eslint-community/eslint-comments/no-unlimited-disable': 'error',
      '@eslint-community/eslint-comments/no-duplicate-disable': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'valid-jsdoc': 'off',
      'require-jsdoc': 'off',
      'spaced-comment': ['error', 'always', { markers: ['/'] }],
      // Forgotten debug logs are the fastest way to look unserious to the
      // exact audience that opens DevTools on a portfolio. warn/error stay.
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
    },
  },
  {
    // Tests get to shout into the console and reach for `any` when mocking.
    files: ['**/*.test.{ts,tsx}', 'src/test/**/*.{ts,tsx}', 'e2e/**/*.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  prettier,
);
