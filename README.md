# Forge-Design

<div align="center">


![Version](https://img.shields.io/badge/version-1.0.7-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/react-^19.1.0-61dafb)
![TypeScript](https://img.shields.io/badge/typescript-~5.7.2-3178c6)

**专为现代 React 应用打造的企业级 UI 组件库**

[📖 文档](https://hryhhh.github.io/Forge-Design) | [🎨 Storybook](https://hryhhh.github.io/Forge-Design) | [🐛 问题反馈](https://github.com/hryhhh/Forge-Design/issues)

</div>

## ✨ 特性

- 🎯 **现代化设计** - 采用 SCSS 模块化样式，支持主题定制
- 📦 **TypeScript 支持** - 完整的类型定义，提供优秀的开发体验
- 🧪 **测试覆盖** - 使用 Jest + Testing Library 确保组件质量
- 📱 **响应式设计** - 适配各种屏幕尺寸，支持移动端和桌面端
- ♿ **无障碍访问** - 遵循 WCAG 标准，确保所有用户都能正常使用
- 🔧 **开箱即用** - 完善的构建工具链和 CI/CD 流程

## 🚀 快速开始

### 📺 在线预览

🌟 **[在线体验 Forge Design](https://hryhhh.github.io/Forge-Design/)** - 访问部署在 GitHub Pages 上的 Storybook 文档


### 安装

```bash
# npm
npm install forge-design --save

# yarn
yarn add forge-design

# pnpm
pnpm add forge-design
```

### 基础使用

```jsx
import { Button, Menu, Upload } from 'forge-design'

function App() {
  return (
    <div>
      <Button type="primary">开始使用</Button>
    </div>
  )
}
```

## 🛠️ 开发指南

### 环境要求

- Node.js >= 20
- React >= 19.1.0
- TypeScript >= 5.7.2

### 本地开发

```bash
# 克隆项目
git clone https://github.com/hryhhh/Forge-Design.git

# 安装依赖
npm install

# 启动开发服务器
npm run storybook

# 运行测试
npm test

# 构建项目
npm run build
```

### 可用脚本

| 命令                | 描述                 |
| ------------------- | -------------------- |
| `npm run dev`       | 启动 Vite 开发服务器 |
| `npm run build`     | 构建生产版本         |
| `npm run test`      | 运行测试套件         |
| `npm run storybook` | 启动 Storybook 文档  |
| `npm run lint`      | 代码检查和格式化     |
| `npm run docs`      | 生成 TypeDoc 文档    |

## 🏗️ 技术栈

- **框架**: React 19 + TypeScript 5.7
- **构建工具**: Vite + Rollup
- **样式**: SCSS + CSS Modules
- **测试**: Jest + Testing Library
- **文档**: Storybook + TypeDoc
- **代码质量**: ESLint + Prettier + Husky
- **CI/CD**: GitHub Actions

## 🤝 贡献指南

欢迎所有形式的贡献！请阅读我的贡献指南：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 开发规范

- 遵循 TypeScript 严格模式
- 所有组件必须有完整的测试覆盖
- 提交信息遵循 [Conventional Commits](https://conventionalcommits.org/)
- 代码必须通过 ESLint 和 Prettier 检查

## 📊 项目状态

![CI](https://github.com/hryhhh/Forge-Design/workflows/CI/badge.svg)
![CD](https://github.com/hryhhh/Forge-Design/workflows/CD/badge.svg)
![NPM Downloads](https://img.shields.io/npm/dm/forge-design)


## 📧 联系我们

- **作者**: hhhhry
- **联系**: [通过 GitHub Issues 联系](https://github.com/hryhhh/Forge-Design/issues)
- **GitHub**: [@hryhhh](https://github.com/hryhhh)

---

<div align="center">


**由  hryhhh 用 ❤️ 制作 | 采用 MIT 许可证**

</div>

