module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'plugin:react/recommended',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'react/jsx-uses-react': 2,
    'jsx-a11y/anchor-is-valid': [0, { aspects: ['noHref', 'invalidHref'] }],
    'eslint no-script-url': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': [0, { ignoreRestArgs: false }],
  },
};
// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//   },
//   extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true,
//     },
//     ecmaVersion: 12,
//     sourceType: 'module',
//   },
//   plugins: ['react', '@typescript-eslint'],
//   rules: {
//     'no-unused-vars': 0,
//     '@typescript-eslint/no-unused-vars': 0,
//     'react/jsx-uses-react': 2,
//     'jsx-a11y/anchor-is-valid': [0, { aspects: ['noHref', 'invalidHref'] }],
//     'eslint no-script-url': 0,
//     '@typescript-eslint/explicit-module-boundary-types': 0,
//     '@typescript-eslint/no-explicit-any': [0, { ignoreRestArgs: false }],
//   },
// };
