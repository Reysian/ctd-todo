import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    // Generated with ChatGPT to add plugins object that was missing by default
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    extends: [
      js.configs.recommended,
      react.configs.recommended, // Generated with ChatGPT to apply react lint rules
      react.configs['jsx-runtime'], // Generated with ChatGPT to apply jsx lint rules
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'react/prop-types': 'off',
    },
  },
]);
