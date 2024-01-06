module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'airbnb-base',
      'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: [
      '@typescript-eslint',
    ],
    rules: {
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  };
  