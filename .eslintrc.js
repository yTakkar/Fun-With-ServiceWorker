module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true
  },
  'extends': ['eslint:recommended'],
  "parserOptions": {
    "ecmaVersion": 2017,
    sourceType: 'module'
  },
  'rules': {
    'indent': [
      'error', 2
    ],
    'quotes': [
      'error', 'single'
    ],
    'semi': [
      'error', 'never'
    ],
    'no-console': 'off',
    'no-ternary': 0,
    'no-nested-ternary': 0,
    'multiline-ternary': 0
  }
};
