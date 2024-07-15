module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
};
