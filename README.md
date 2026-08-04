# Forge-Design

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.14-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/react-^19.1.0-61dafb)
![TypeScript](https://img.shields.io/badge/typescript-~5.7.2-3178c6)

**面向现代 React 应用的企业级 UI 组件库**

[📖 文档](https://hryhhh.github.io/Forge-Design) ·
[🎨 Storybook](https://hryhhh.github.io/Forge-Design) ·
[📦 npm](https://www.npmjs.com/package/forge-design) ·
[🐛 问题反馈](https://github.com/hryhhh/Forge-Design/issues)

</div>

---

## ✨ 特性

- 🎨 **TypeScript 优先** — 完整的类型定义，严格的编译检查
- 🧩 **可组合组件** — 灵活可扩展的组件架构设计
- 🧪 **测试覆盖** — Jest + Testing Library 单元测试保障质量
- 📖 **Storybook 文档** — 交互式文档与示例
- 📦 **Tree-shakeable** — Rollup 优化打包，按需引入
- 🌙 **SCSS 样式** — 模块化 CSS，支持主题定制
- ⚡ **Vite 驱动** — 快速开发体验，支持 HMR

---

## 📦 安装

```bash
# npm
npm install forge-design

# yarn
yarn add forge-design

# pnpm
pnpm add forge-design
```

**Peer Dependencies（需自行安装）：**

```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0"
}
```

---

## 🚀 快速开始

```tsx
import { Button, Menu, Upload } from 'forge-design';
import 'forge-design/style.css';

function App() {
  return (
    <div>
      <Button type="primary">主要按钮</Button>
      <Button size="small">小按钮</Button>
      
      <Menu mode="horizontal">
        <Menu.Item index="0">首页</Menu.Item>
        <Menu.Item index="1">关于</Menu.Item>
      </Menu>

      <Upload action="/api/upload" />
    </div>
  );
}
```

---

## 📚 组件

### Button

多功能按钮组件，支持多种样式和尺寸。

| 属性       | 类型                                          | 默认值      | 说明                |
| ---------- | --------------------------------------------- | ----------- | ------------------- |
| `type`     | `'primary' \| 'secondary' \| 'danger' \| 'link'` | `'primary'` | 按钮类型            |
| `size`     | `'large' \| 'medium' \| 'small'`              | `'medium'`  | 按钮尺寸            |
| `disabled` | `boolean`                                     | `false`     | 是否禁用            |
| `href`     | `string`                                      | `-`         | 链接地址（link 类型） |
| `className`| `string`                                      | `-`         | 自定义样式类名      |

```tsx
import { Button } from 'forge-design';

<>
  <Button type="primary">主要</Button>
  <Button type="secondary">次要</Button>
  <Button type="danger">危险</Button>
  <Button type="link" href="https://example.com">链接</Button>
  <Button size="large">大型</Button>
  <Button size="small">小型</Button>
  <Button disabled>禁用</Button>
</>
```

### Menu

导航菜单组件，支持水平和垂直布局，支持嵌套子菜单。

| 属性                    | 类型                     | 默认值         | 说明              |
| ----------------------- | ------------------------ | -------------- | ----------------- |
| `mode`                  | `'horizontal' \| 'vertical'` | `'horizontal'` | 菜单布局模式      |
| `defaultIndex`          | `string`                 | `'0'`          | 默认激活项        |
| `defaultOpenSubMenus`   | `string[]`               | `[]`           | 默认展开的子菜单  |
| `onSelect`              | `(index: string) => void`| `-`            | 选中项回调        |

```tsx
import { Menu } from 'forge-design';

<Menu mode="horizontal" defaultIndex="0">
  <Menu.Item index="0">首页</Menu.Item>
  <Menu.SubMenu title="产品">
    <Menu.Item index="1">产品一</Menu.Item>
    <Menu.Item index="2">产品二</Menu.Item>
  </Menu.SubMenu>
</Menu>
```

### Upload

文件上传组件，支持拖拽上传、进度显示和预览功能。

| 属性         | 类型                          | 默认值 | 说明                |
| ------------ | ----------------------------- | ------ | ------------------- |
| `action`     | `string \| () => string`      | `-`    | 上传接口地址        |
| `cancelToken`| `AbortController`             | `-`    | 用于取消上传的令牌  |
| `onProgress` | `(percent: number) => void`   | `-`    | 上传进度回调        |

```tsx
import { Upload } from 'forge-design';

<Upload 
  action="https://api.example.com/upload"
  onProgress={(percent) => console.log(percent)}
/>
```

### Form

表单组件，支持受控和非受控模式，内置表单校验。

| 属性              | 类型                    | 默认值 | 说明              |
| ----------------- | ----------------------- | ------ | ----------------- |
| `initialValues`   | `Record<string, any>`   | `{}`   | 初始表单值        |
| `formValues`      | `Record<string, any>`   | `-`    | 受控表单值        |
| `onFinish`        | `(values: any) => void` | `-`    | 提交成功回调      |
| `rules`           | `FormRule[]`            | `-`    | 校验规则          |

```tsx
import { Form } from 'forge-design';

<Form
  initialValues={{ name: '', email: '' }}
  onFinish={(values) => console.log(values)}
  rules={[
    { name: 'name', rules: [{ required: true, message: '请输入姓名' }] },
    { name: 'email', rules: [{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }] }
  ]}
>
  {/* 表单项 */}
</Form>
```

---

## 🛠️ 开发指南

### 环境要求

- Node.js >= 20.0.0
- npm >= 9.0.0

### 本地开发

```bash
# 克隆项目
git clone https://github.com/hryhhh/Forge-Design.git
cd Forge-Design

# 安装依赖
npm install

# 启动 Storybook
npm run storybook

# 运行测试
npm test

# 构建项目
npm run build
```

### 可用脚本

| 命令                       | 说明                       |
| -------------------------- | -------------------------- |
| `npm run dev`              | 启动 Vite 开发服务器       |
| `npm run build`            | 构建生产版本               |
| `npm run build-rollup`     | 仅构建组件库（ES + CJS）   |
| `npm run build-storybook`  | 构建 Storybook 静态站点    |
| `npm run test`             | 运行 Jest 测试套件         |
| `npm run storybook`        | 启动 Storybook 开发服务器  |
| `npm run lint`             | ESLint 检查并自动修复      |
| `npm run format`           | Prettier 格式化代码        |
| `npm run docs`             | 生成 TypeDoc 文档          |

---

## 🏗️ 技术栈

| 类别       | 技术                               |
| ---------- | ---------------------------------- |
| 框架       | React 19 + TypeScript 5.7          |
| 构建       | Rollup（组件库）+ Vite（Storybook）|
| 样式       | SCSS + CSS Modules                 |
| 测试       | Jest + Testing Library             |
| 文档       | Storybook 9 + TypeDoc              |
| 代码质量   | ESLint + Prettier + Husky          |
| CI/CD      | GitHub Actions                     |

---

## 🤝 贡献指南

欢迎各种形式的贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支（`git checkout -b feature/AmazingFeature`）
3. 提交更改（`git commit -m 'feat: Add some AmazingFeature'`）
4. 推送到分支（`git push origin feature/AmazingFeature`）
5. 打开 Pull Request

### 开发规范

- 遵循 TypeScript 严格模式
- 所有组件必须有完整的测试覆盖
- 提交信息遵循 [Conventional Commits](https://conventionalcommits.org/) 规范
- 代码必须通过 ESLint 和 Prettier 检查

---

## 📄 开源协议

[MIT](LICENSE) © [hryhhh](https://github.com/hryhhh)

---

<div align="center">

**由 hryhhh 用 ❤️ 制作**

</div>
