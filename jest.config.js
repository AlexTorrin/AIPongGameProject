module.exports = {
  projects: [
    {
      displayName: 'shared',
      preset: 'ts-jest',
      testEnvironment: 'node',
      rootDir: 'shared',
      testMatch: ['<rootDir>/src/**/__tests__/**/*.ts', '<rootDir>/src/**/*.spec.ts'],
    },
    {
      displayName: 'server',
      preset: 'ts-jest',
      testEnvironment: 'node',
      rootDir: 'server',
      testMatch: ['<rootDir>/src/**/__tests__/**/*.ts', '<rootDir>/src/**/*.spec.ts'],
    },
    {
      displayName: 'client',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      rootDir: 'client',
      testMatch: ['<rootDir>/src/**/__tests__/**/*.ts', '<rootDir>/src/**/*.spec.ts'],
    },
  ],
};