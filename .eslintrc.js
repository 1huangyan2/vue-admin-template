module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended', '@vue/prettier', '@vue/prettier/@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境禁止console
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境禁止debugger
    '@typescript-eslint/no-var-requires': 'off', // 允许使用require
    '@typescript-eslint/no-explicit-any': 'off', // 允许使用any
    'prettier/prettier': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
}
