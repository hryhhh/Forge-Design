# Forge-Design 项目 Agent 指南

## 项目概述

**Forge-Design** 是一个发布到 npm 的 React 组件库，当前为纯前端仓库，无后端服务。

- **GitHub**: https://github.com/hryhhh/Forge-Design
- **文档**: https://hryhhh.github.io/Forge-Design
- **npm**: https://www.npmjs.com/package/forge-design
- **当前版本**: 1.0.14

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript 5.7 |
| 构建 | Rollup（组件库 ES + CJS 打包）+ Vite（Storybook/开发预览） |
| 样式 | SCSS + CSS Modules，变量集中在 `src/styles/_variables.scss` |
| 测试 | Jest + Testing Library（单元测试）；Playwright + Vitest（Storybook 浏览器测试） |
| 文档 | Storybook 9 + TypeDoc |
| 代码质量 | ESLint Flat Config + Prettier + Husky |
| CI/CD | GitHub Actions（CI + CD + Release） |

---

## 目录结构

```
Forge-Design/
├── src/
│   ├── index.tsx              # 组件库入口，统一导出所有组件
│   ├── main.tsx               # Vite 开发入口
│   ├── App.tsx                # Storybook 预览页面（含 mock 数据，硬编码 jsonplaceholder）
│   ├── setupTests.ts          # Jest 全局 setup
│   ├── components/
│   │   ├── Button/            # 按钮组件
│   │   │   ├── Button.tsx     # 主组件，支持 primary/secondary/danger/link
│   │   │   ├── types.ts       # 枚举 ButtonSize / ButtonType
│   │   │   ├── _style.scss    # SCSS 样式
│   │   │   ├── index.tsx      # 重导出
│   │   │   └── button.stories.tsx
│   │   ├── Menu/              # 导航菜单组件
│   │   │   ├── menu.tsx       # Menu 主组件，Context Provider
│   │   │   ├── menuItem.tsx   # MenuItem 子组件
│   │   │   ├── subMenu.tsx    # SubMenu 子组件
│   │   │   ├── context.ts     # React Context（IMenuContext）
│   │   │   └── _style.scss
│   │   ├── Upload/            # 文件上传组件
│   │   │   ├── Upload.tsx     # 主组件，拖拽/点击上传
│   │   │   ├── useUpload.ts   # 上传逻辑 Hook
│   │   │   ├── uploadService.ts # 封装 axios 上传请求
│   │   │   ├── utils.ts       # 文件校验、预览工具函数
│   │   │   ├── type.ts        # UploadFile / UploadProps 等类型
│   │   │   └── _style.scss
│   │   └── Form/              # 表单组件（不完整）
│   │       ├── Form.tsx       # 主组件，支持受控/非受控
│   │       ├── useForm.ts     # Hook（未被 Form.tsx 引用，历史遗留）
│   │       ├── formContext.ts # React Context（命名不一致，应为 PascalCase）
│   │       ├── type.ts        # FormValues / FormRule / FormProps
│   │       └── _style.scss    # 空文件
│   └── styles/
│       ├── _variables.scss    # 全局 SCSS 变量（颜色/字号/间距）
│       ├── _rebot.scss        # 基础 reset（仿 Bootstrap 风格）
│       └── index.scss         # 统一入口，导入 variables + rebot + 各组件样式
├── .storybook/
│   ├── main.ts                # Storybook 配置
│   └── preview.ts             # 全局预览（导入样式、Font Awesome）
├── package.json
├── tsconfig.json / tsconfig.app.json / tsconfig.build.json / tsconfig.node.json
├── rollup.config.js           # 组件库打包（ES + CJS）
├── vite.config.ts             # Vite/Storybook 配置
├── jest.config.ts             # Jest 测试配置
├── vitest.workspace.ts        # Vitest Storybook 浏览器测试
├── typedoc.json               # TypeDoc 文档生成配置
└── .github/workflows/
    ├── ci.yml                 # CI：lint + test + build
    ├── cd.yml                 # CD：测试通过自动发版到 npm + GitHub Pages
    └── release.yml            # 手动/Tag 触发 Release
```

---

## 当前组件清单

| 组件 | 状态 | 备注 |
|------|------|------|
| Button | ✅ 完整 | 4种类型、3种尺寸，支持 link 模式，测试覆盖 |
| Menu | ✅ 完整 | 水平/垂直模式，支持 SubMenu 嵌套，测试覆盖 |
| Upload | ✅ 完整 | 拖拽上传，进度/取消/预览，action 可为函数或 URL |
| Form | ⚠️ 不完整 | useForm.ts 未被引用；缺少 FormItem 子组件；_style.scss 为空 |

---

## 构建 & 测试命令

```bash
npm run dev          # Vite 开发服务器（供 Storybook 使用）
npm run build        # 完整构建：clean → rollup 打包 → storybook build
npm run test         # Jest 单元测试（src/components/**/*.test.tsx）
npm run storybook    # 启动 Storybook（端口 6006）
npm run lint         # ESLint + Prettier
npm run docs         # 生成 TypeDoc Markdown 文档（输出到 docs/）
```

---

## 构建输出说明

Rollup 打包入口为 `src/index.tsx`，`tsconfig.build.json` 排除了测试/storybook/开发文件：
- `build/index.js` — ES Module
- `build/index.cjs.js` — CommonJS
- `build/index.d.ts` — 类型声明

peerDependencies（react/react-dom）在 Rollup 中被 external，产物不内嵌 React。

---

## 样式约定

- 组件样式 SCSS 文件统一命名为 `_style.scss`（partial 前缀）
- 全局变量通过 `@use '../../styles/_variables.scss' as *` 引入
- `index.scss` 统一导入所有组件样式，由 rollup-plugin-postcss 提取为 CSS

---

## 测试约定

- 测试文件命名：`<Component>.test.tsx`
- 框架：Jest + @testing-library/react，jsdom 环境
- 样式模块通过 `identity-obj-proxy` mock
- Storybook 组件可用 Vitest + Playwright 做浏览器级测试

---

## 开发规范

- TypeScript strict mode，禁止 `noUnusedLocals` / `noUnusedParameters`
- ESLint 使用 Flat Config，开启 react-hooks 和 react-refresh 规则
- 提交信息遵循 Conventional Commits（Husky pre-commit 校验）
- 新增组件必须包含：tsx、_style.scss、index.tsx、type.ts、.test.tsx、.stories.tsx
- 所有导出类型必须在 `src/index.tsx` 中统一 re-export

---

## 已知问题与改进项

### P0 — 阻塞性/功能性缺陷

#### 1. Form 组件不完整
- `useForm.ts` 独立存在但从未被 `Form.tsx` 引用，属于遗留代码
- 缺少 `FormItem` 子组件，Form 组件无法单独使用
- `formContext.ts` 命名与其他组件（`context.ts`、`types.ts`）风格不一致
- `_style.scss` 为空文件
- **建议**：补全 FormItem 子组件，删除无用的 `useForm.ts`，统一命名

#### 2. App.tsx 硬编码外部 API
- 直接调用 `https://jsonplaceholder.typicode.com/photos`，存在网络依赖和 CORS 限制
- Upload 组件的 `action` 默认值也指向 jsonplaceholder
- **建议**：添加 `.env` 配置，将 API 地址从环境变量读取，后续接入 NestJS 后端

---

### P1 — 依赖与配置问题

#### 3. 冗余依赖
- `ts-jest` 在 devDependencies 中，但 `jest.config.ts` 使用的是 `babel-jest`，`ts-jest` 从未被使用
- `@types/axios` 与 axios 官方类型冲突（axios >= 0.22 已内置类型）
- `@types/node-sass` 和 `@types/sass` 冲突，项目实际使用的是 Dart Sass（`sass` 包）
- **建议**：删除 `ts-jest`、`@types/node-sass`、`@types/sass`，删除 `@types/axios`

#### 4. tsconfig 配置不一致
- `tsconfig.app.json` 和 `tsconfig.node.json` 中 `esModuleInterop`、`allowSyntheticDefaultImports` 重复声明
- `noUncheckedSideEffectImports` 在 app 中为 `true`，在 node 中未声明（默认 true，但应显式统一）
- `forceConsistentCasingInFileNames` 在 app 中为 `false`，与其他配置风格不一致
- **建议**：收敛到 `tsconfig.json` 的 `compilerOptions`，减少冗余配置

#### 5. Storybook MDX 插件版本声明为 `latest`
- `.storybook/main.ts` 中 `@storybook/addon-mdx-gfm` 使用 `latest`，其余依赖均有版本锁定
- **建议**：锁定具体版本，与其余依赖保持一致

---

### P2 — 质量与可维护性

#### 6. 组件库文档与版本不同步
- `welcome.stories.tsx` 中硬编码了版本 badge（`v1.0.4`），与当前 `package.json` 的 `1.0.14` 不一致
- **建议**：从 `package.json` 读取版本动态渲染

#### 7. 缺少组件组合测试
- 现有测试均为单个组件隔离测试，没有测试 Button + Form、Menu + Form 等组合场景
- **建议**：补充集成测试，验证组件组合行为的正确性

#### 8. CI/CD 未覆盖后端（为未来 NestJS 做准备）
- 当前 CI 只测试前端，后端代码（`server/`）未来加入后需单独 CI 流程
- **建议**：提前在 CI 中预留后端测试 step，使用 `paths` 过滤触发范围

#### 9. 无 E2E 测试
- 目前只有单元测试和 Storybook 浏览器测试，没有端到端测试
- **建议**：后续接入后端后，使用 Playwright 编写关键流程的 E2E 测试

---

### P3 — 结构与设计

#### 10. 项目结构规划
- 当前为纯前端，后端升级建议采用子目录结构而非 monorepo（降低复杂度）：
  ```
  Forge-Design/
  ├── server/              # NestJS 后端
  ├── src/                 # 现有前端组件库（保持不变）
  └── package.json         # 根 package.json，使用 npm workspaces 或 scripts 管理
  ```
- **建议**：使用 `package.json` 中的 `workspaces` 字段管理前后端，或分别维护独立的 `package.json`

#### 11. FormContext 文件路径引用错误
- `Form.tsx` 中 import 路径为 `'./FormContext'`，但实际文件名为 `formContext.ts`（大小写不一致）
- Linux 文件系统大小写敏感，此 import 会导致运行时错误
- **建议**：统一文件名为 `FormContext.ts`，修正 import 路径

---

## 后端升级规划（NestJS）

### 目标
新增 NestJS 后端（`server/` 目录），提供：

1. **Upload API** — `POST /api/upload`，替代 jsonplaceholder mock，返回 `{ url, fileName, size }`
2. **Form API** — `POST /api/form/submit`，表单数据持久化
3. **Components Metadata API** — `GET /api/components`，动态组件配置

### 后端技术选型
- NestJS（Node.js 框架）
- `multer` 处理文件上传
- SQLite（轻量，无需额外数据库服务）
- CORS 中间件

### 开发时代理
- 通过 Vite proxy（`vite.config.ts`）将 `/api` 转发到 NestJS 服务（默认 `http://localhost:3000`）

---

## 文件引用规则

- 阅读/修改 `src/components/Button/**` 时，遵守 AGENTS.md 的组件开发规范
- 阅读/修改 `src/components/Form/**` 时，注意上述 P0 和 P3 中的问题
- 所有 `server/` 目录下的新代码遵循 NestJS 约定模块结构

---

## 本次更新记录（2025-08-03）

### 已完成项

| # | 改进项 | 操作 |
|---|--------|------|
| 2 | 移除冗余依赖 | `ts-jest`、`@types/axios`、`@types/node-sass`、`@types/sass`、`@storybook/addon-mdx-gfm` |
| 3 | 修复 tsconfig | 删除 `tsconfig.app.json` 中 `forceConsistentCasingInFileNames: false`；`tsconfig.node.json` 补充 `allowSyntheticDefaultImports`、`global.d.ts` |
| 4 | 修复 App.tsx 硬编码 | 引入 `VITE_API_BASE_URL`、`VITE_UPLOAD_ACTION` 环境变量， fallback 保留 jsonplaceholder |
| 5 | 移除未使用插件 | 删除 `.storybook/main.ts` 中未引用的 `@storybook/addon-mdx-gfm` |
| 6 | 修复大小写问题 | `formContext.ts` → `FormContext.ts`（与 import 路径一致） |
| 7 | 添加类型声明 | `global.d.ts` 补充 `/// <reference types="vite/client" />` |

### 验证结果
- `npx tsc -p tsconfig.app.json --noEmit` ✅
- `npx tsc -p tsconfig.node.json --noEmit` ✅
- `npx tsc -p tsconfig.build.json --noEmit` ✅
- `npx eslint "src/**/*.{js,ts,tsx}"` ✅
- `npx prettier --check` ✅

### 新增文件
- `.env.local` — 本地开发环境变量（VITE_API_BASE_URL、VITE_UPLOAD_ACTION）
- 已在 `.gitignore` 中添加 `.env.local`

### 后续待办
- [ ] Form 组件补全（FormItem 子组件、样式）
- [ ] NestJS 后端搭建（server/）
- [ ] 后端 API 对接前端组件
