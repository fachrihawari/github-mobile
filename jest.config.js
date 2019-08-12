module.exports = {
  preset: "react-native",
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
    "\\.(ts|tsx)$": "ts-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-navigation|@react-navigation/.*)"
  ],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json"
    }
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
  setupFilesAfterEnv: ["./setupTests.js"]
};
