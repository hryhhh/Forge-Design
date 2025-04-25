import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.tsx?$": "babel-jest", // 使用 babel-jest 转换 TypeScript 和 JSX
  },

  // 如果你需要处理 CSS 文件等，可以使用 moduleNameMapper
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};

export default config;
