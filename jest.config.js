module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'lcov',
    'text-summary',
    'cobertura',
  ],
  moduleNameMapper: {
    /* Handle CSS imports (with CSS modules)\
                                https://jestjs.io/docs/webpack#mocking-css-modules */
    '\\.css$': 'identity-obj-proxy',
    /* Handle image imports
                                https://jestjs.io/docs/webpack#handling-static-assets */
    '\\.(jpg|jpeg|png|gif|svg|mp3)$': '<rootDir>/__mocks__/fileMock.js',

    /* Jest aliases to match once in TS config */
    "^@assets(.*)$": "<rootDir>/public/assets$1",
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@contexts(.*)$": "<rootDir>/src/contexts$1",
    "^@data(.*)$": "<rootDir>/src/data$1",
    "^@hooks(.*)$": "<rootDir>/src/hooks$1",
    "^@mocks(.*)$": "<rootDir>/__mocks__$1",
    "^@test-utils(.*)$": "<rootDir>/test-utils$1",
    "^@types(.*)$": "<rootDir>/src/types$1",
    "^@utils(.*)$": "<rootDir>/src/utils$1",
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
