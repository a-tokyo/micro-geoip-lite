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
      branches: 90,
      functions: 98,
      lines: 90,
      statements: 90,
    },
  },
};
