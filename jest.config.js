/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ["node_modules/(?!axios)"],
  moduleNameMapper: {

      // if your using tsconfig.paths thers is no harm in telling jest
    '@components/(.*)$': '<rootDir>/src/components/$1',
    '@/(.*)$': 'terra-solutions/src/$1',
      
      // mocking assests and styling
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/mocks/fileMock.ts',
    '^.+\\.(css|less|scss|sass)$': 'babel-jest',
    /* mock models and services folder */
    '(assets|models|services)': '<rootDir>/tests/mocks/fileMock.ts',
  },
   // to obtain access to the matchers.
  setupFilesAfterEnv: ['./tests/setupTests.ts'],
      
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jsdom',
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};