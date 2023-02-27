export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  modulePathIgnorePatterns: ['<rootDir>/database'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/../jest.setup.ts'],
};
