module.exports = {
  env: {
    browser: true,
    es6: true
  },
  globals: {
    module: 'off',
    require: 'off'
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-case-declarations': 0,
    'no-unused-vars': 1,
    'no-console': 1
  }
};
