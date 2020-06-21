module.exports = {
  preset: '@marko/jest',
  browser: true,
  collectCoverageFrom: [
    "**/*.js"
],
  moduleNameMapper: {
    "@\/(.*)$": "<rootDir>/src/$1",
    },
    verbose: true
}
