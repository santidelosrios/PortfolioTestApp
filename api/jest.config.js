module.exports = {
    setupFiles: ['./test/setupEnvironment.js'],
    transform: {
      '^.+\\.ts?$': 'babel-jest',
    },
    moduleNameMapper: {
      '^@repositories/(.*)$': '<rootDir>/src/repositories/$1',
      '^@clients/(.*)$': '<rootDir>/src/clients/$1',
      '^@transformers/(.*)$': '<rootDir>/src/transformers/$1',
      '^@src/(.*)$': '<rootDir>/src/$1',
      '^@tests/(.*)$': '<rootDir>/tests/$1',
    },
  };