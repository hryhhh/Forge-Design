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
import 'forge-design/build/index.css'

function App() {
  return (
    <div>
      <Button type="primary">开始使用</Button>
    </div>
  )
}
```

## 🧩 组件概览

### Button 按钮

功能完整的按钮组件，支持多种类型、尺寸和状态

```jsx
import { Button, ButtonType, ButtonSize } from 'forge-design'

<Button type={ButtonType.Primary} size={ButtonSize.Large}>
  主要按钮
</Button>
<Button type={ButtonType.Danger} disabled>
  危险按钮
</Button>
<Button type={ButtonType.Link} href="https://example.com">
  链接按钮
</Button>
```

### Menu 菜单

灵活的导航菜单，支持水平/垂直布局和子菜单

```jsx
import { Menu } from 'forge-design'

<Menu mode="horizontal" defaultSelectedKeys={['home']}>
  <Menu.Item key="home">首页</Menu.Item>
  <Menu.Item key="products">产品</Menu.Item>
  <Menu.SubMenu key="solutions" title="解决方案">
    <Menu.Item key="enterprise">企业版</Menu.Item>
    <Menu.Item key="personal">个人版</Menu.Item>
  </Menu.SubMenu>
</Menu>
```

### Upload 上传

功能完整的文件上传组件，支持拖拽、预览和进度显示

```jsx
import { Upload } from 'forge-design'

const handleUpload = async (file) => {
  // 自定义上传逻辑
  return await uploadToServer(file)
}

<Upload 
  action={handleUpload}
  onProgress={(fileName, progress) => {
    console.log(`${fileName}: ${progress}%`)
  }}
/>
```

### Form 表单

表单组件集合，提供完整的表单解决方案（开发中）

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

## 📄 API 文档

### Button Props

| 属性       | 类型         | 默认值    | 描述                     |
| ---------- | ------------ | --------- | ------------------------ |
| `type`     | `ButtonType` | `primary` | 按钮类型                 |
| `size`     | `ButtonSize` | `medium`  | 按钮尺寸                 |
| `disabled` | `boolean`    | `false`   | 是否禁用                 |
| `href`     | `string`     | -         | 链接地址（仅 link 类型） |
| `onClick`  | `function`   | -         | 点击事件回调             |

### Menu Props

| 属性                  | 类型                     | 默认值       | 描述         |
| --------------------- | ------------------------ | ------------ | ------------ |
| `mode`                | `horizontal \| vertical` | `horizontal` | 菜单模式     |
| `defaultSelectedKeys` | `string[]`               | `[]`         | 默认选中项   |
| `onSelect`            | `function`               | -            | 选择事件回调 |

### Upload Props

| 属性          | 类型                 | 默认值 | 描述                     |
| ------------- | -------------------- | ------ | ------------------------ |
| `action`      | `string \| function` | -      | 上传地址或自定义上传函数 |
| `onProgress`  | `function`           | -      | 上传进度回调             |
| `cancelToken` | `CancelTokenSource`  | -      | 取消令牌                 |

## 🤝 贡献指南

我们欢迎所有形式的贡献！请阅读我们的贡献指南：

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

## 📜 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解版本更新历史。

## 📧 联系我们

- **作者**: hhhhry
- **联系**: [通过 GitHub Issues 联系](https://github.com/hryhhh/Forge-Design/issues)
- **GitHub**: [@hryhhh](https://github.com/hryhhh)

## 📄 许可证

本项目基于 [MIT 许可证](./LICENSE) 开源。

---

<div align="center">


**由  hryhhh 用 ❤️ 制作 | 采用 MIT 许可证**

</div>

