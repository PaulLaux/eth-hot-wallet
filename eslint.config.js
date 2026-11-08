import js from '@eslint/js';
import react from 'eslint-plugin-react';
import globals from 'globals';

export default [
  { ignores: ['build/', 'docs/', 'app/vendor/', 'app/public/'] },
  js.configs.recommended,
  react.configs.flat.recommended,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node, ...globals.vitest } },
    settings: { react: { version: 'detect' } },
    rules: {
      'no-unused-vars': ['error', { ignoreRestSiblings: true }],
      'require-yield': 'off',
    },
  },
];
