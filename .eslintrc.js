module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['prettier', 'plugin:react/recommended'],
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
// "off" 或 0 - 关闭规则
// "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
// "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
