module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/bin/',
    '<rootDir>/.wireit/'
  ]
};
