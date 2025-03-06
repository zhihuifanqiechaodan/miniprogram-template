import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    ignores: [
      'node_modules',
      'miniprogram/components/mp-weixin',
      'miniprogram/miniprogram_npm',
      'typings/types/**',
      '.prettierrc.cjs',
      'switch-env.js',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        wx: true,
        App: true,
        Page: true,
        getCurrentPages: true,
        getApp: true,
        Component: true,
        requirePlugin: true,
        requireMiniProgram: true,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
