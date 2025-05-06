import type { Config } from "jest";

const config: Config =
{
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper:
  {
    "^@lib/(.*)$": "<rootDir>/lib/$1",
  }
};

export default config;