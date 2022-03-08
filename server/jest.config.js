//const { pathsToModuleNameMapper } = require("ts-jest");
//const { compilerOptions } = require("./tsconfig");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  //roots: ["<rootDir>/src/", "../client/"],
  //moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  //moduleNameMapper: {
  //  "client/src/(.*)$": "../client/src/$1",
  //},
};
