module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['./node_modules/', './lib/'],
  modulePathIgnorePatterns: ['./lib/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,}',
    '!**/node_modules/**',
    '!**/__flow__/**',
  ],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 99,
      functions: 99,
      lines: 99,
      statements: 99,
    },
  },
};
