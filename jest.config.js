module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'html',
    'text-summary',
  ],
  moduleNameMapper: {
    /* Handle CSS imports (with CSS modules)\
                                https://jestjs.io/docs/webpack#mocking-css-modules */
    '\\.css$': 'identity-obj-proxy',
    /* Handle image imports
                                https://jestjs.io/docs/webpack#handling-static-assets */
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: [
    './jest.setup.js',
  ],
  testEnvironment: 'jsdom',
  testRegex: '(src)/.*\\.test\\.(js|jsx|ts|tsx)',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [ 'babel-jest', { presets: [ 'next/babel' ] } ],
  },

};
