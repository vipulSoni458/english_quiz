export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/**/*.test.tsx"],
  testPathIgnorePatterns: ["/node_modules/"],
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: [
    "node_modules",
    "src/database",
    "src/test",
    "src/types",
  ],
  reporters: ["default", "jest-junit"],
  globals: { "ts-jest": { diagnostics: false } },
  transform: {},
};