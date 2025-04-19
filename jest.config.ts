import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",

  // 配置 Babel 转换 TypeScript 和 JSX
  transform: {
    "^.+\\.tsx?$": "babel-jest", // 使用 babel-jest 转换 TypeScript 和 JSX
  },

  // 如果你需要处理 CSS 文件等，可以使用 moduleNameMapper
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  // 其他配置项可以根据需要解开注释并进行设置
};

export default config;
