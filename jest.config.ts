export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // The file you created to extend jest config and "implement" the jest-dom environment in the jest globals
  transform: {
    "^.+\\.(ts|tsx)?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.app.json",
      }
    ] // process `*.tsx` files with `ts-jest`
  },
//   rootDir: 'src',
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/__mocks__/fileMock.js", // The global stub for weird files
    "\\.(css|less|sass|scss)$": "identity-obj-proxy", // The mock for style related files
    "^@/(.*)$": "<rootDir>/src/$1", // [optional] Are you using aliases?
  },
}
