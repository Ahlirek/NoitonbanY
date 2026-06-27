import globals from 'globals';
import pluginjs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginjest from 'eslint-plugin-jest';

/** @type {import('eslint').linter.config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageoptions: {
      globals: globals.browser,
      parseroptions: {
        ecmaversion: 'latest',
        sourcetype: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  pluginjs.configs.recommended,
  // ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },

  {
    files: ['**/*.test.{ts,tsx,js,jsx}'],
    languageoptions: {
      globals: {
        ...globals.jest,
        parser: tsparser,
        parseroptions: {
          project: './tsconfig.json',
        },
      },
    },
    plugins: {
      jest: pluginjest,
    },
    rules: {
      ...pluginjest.configs.recommended.rules,
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
    },
  },

  {
    ignores: ['**/node_modules/**', 'dist/', 'build/', 'coverage/'],
  },
];

