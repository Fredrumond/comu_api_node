module.exports = {
  bail: true,
  clearMocks: true,
  coverageDirectory: './coverage/',
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.test.js?(x)',
    '**/tests/**/*.spec.js?(x)'
  ]
}
