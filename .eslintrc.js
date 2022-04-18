module.exports = {
  env: {
    node: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-duplicate-imports': 'error',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'error',
    'default-case': 'error',
    'no-empty-function': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-useless-return': 'error',
    'no-useless-concat': 'error',
    'no-unneeded-ternary': 'error',
    'no-param-reassign': 'error',
    'no-multi-assign': 'error',
    'no-lonely-if': 'error',
    'no-return-assign': 'error'
  }
}
