import globals from 'globals';
import pluginJs from '@eslint/js';
import config from 'eslint-config-prettier';
import plugin from 'eslint-plugin-prettier';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  config,
  {
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error',
    },
  },
];