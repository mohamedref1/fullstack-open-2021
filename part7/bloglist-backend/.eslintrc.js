module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended', 
    'plugin:prettier/recommended'
  ],
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  'rules': {
    'linebreak-style': [
      'error',
      'unix'
    ],
    'no-undef': 0
  }
}
