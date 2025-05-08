import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({ dir: "./", });

const config: Config =
{
  moduleNameMapper:
  {
    "^@/app/(.*)$": "<rootDir>/app/$1",
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/lib/(.*)$": "<rootDir>/lib/$1"
  },
  clearMocks: true,
  coverageProvider: "v8",
  testEnvironment: "jsdom"
};

export default createJestConfig(config);