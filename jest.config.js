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
      branches: 20,
      functions: 70,
      lines: 30,
      statements: 30,
    },
  },
};
