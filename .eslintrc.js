module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Parses TypeScript
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // TypeScript rules
  ],
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // Force `interface`
    '@typescript-eslint/no-explicit-any': 'warn', // Optional: discourage `any`
  },
  env: {
    node: true, // Enable Node.js global variables
  },
};