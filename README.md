# Forge-Design

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.14-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/react-^19.1.0-61dafb)
![TypeScript](https://img.shields.io/badge/typescript-~5.7.2-3178c6)

**A modern React component library for building enterprise-grade applications**

[📖 Documentation](https://hryhhh.github.io/Forge-Design) ·
[🎨 Storybook](https://hryhhh.github.io/Forge-Design) ·
[📦 npm](https://www.npmjs.com/package/forge-design) ·
[🐛 Issues](https://github.com/hryhhh/Forge-Design/issues)

</div>

---

## ✨ Features

- 🎨 **TypeScript First** — Full type coverage with strict mode
- 🧩 **Composable Components** — Flexible and extensible component architecture
- 🧪 **Well Tested** — Jest + Testing Library for unit tests
- 📖 **Storybook Docs** — Interactive documentation and examples
- 📦 **Tree-shakeable** — Optimized bundle with Rollup
- 🌙 **SCSS Styles** — Modular CSS with customizable themes
- ⚡ **Vite Powered** — Fast development with HMR

---

## 📦 Installation

```bash
# npm
npm install forge-design

# yarn
yarn add forge-design

# pnpm
pnpm add forge-design
```

**Peer Dependencies:**

```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0"
}
```

---

## 🚀 Quick Start

```tsx
import { Button, Menu, Upload } from 'forge-design';
import 'forge-design/style.css';

function App() {
  return (
    <div>
      <Button type="primary">Primary Button</Button>
      <Button size="small">Small Button</Button>
      
      <Menu mode="horizontal">
        <Menu.Item index="0">Home</Menu.Item>
        <Menu.Item index="1">About</Menu.Item>
      </Menu>

      <Upload action="/api/upload" />
    </div>
  );
}
```

---

## 📚 Components

### Button

A versatile button component supporting multiple styles and sizes.

| Prop       | Type                                    | Default    | Description          |
| ---------- | --------------------------------------- | ---------- | -------------------- |
| `type`     | `'primary' \| 'secondary' \| 'danger' \| 'link'` | `'primary'` | Button type          |
| `size`     | `'large' \| 'medium' \| 'small'`        | `'medium'` | Button size          |
| `disabled` | `boolean`                               | `false`    | Disabled state       |
| `href`     | `string`                                | `-`        | Link URL (for link type) |
| `className`| `string`                                | `-`        | Custom CSS class     |

```tsx
import { Button } from 'forge-design';

<>
  <Button type="primary">Primary</Button>
  <Button type="secondary">Secondary</Button>
  <Button type="danger">Danger</Button>
  <Button type="link" href="https://example.com">Link</Button>
  <Button size="large">Large</Button>
  <Button size="small">Small</Button>
  <Button disabled>Disabled</Button>
</>
```

### Menu

Navigation menu supporting horizontal and vertical layouts with nested submenus.

| Prop               | Type                                      | Default         | Description              |
| ------------------ | ----------------------------------------- | --------------- | ------------------------ |
| `mode`             | `'horizontal' \| 'vertical'`              | `'horizontal'`  | Menu layout mode         |
| `defaultIndex`     | `string`                                  | `'0'`           | Default active item      |
| `defaultOpenSubMenus` | `string[]`                             | `[]`            | Default open submenus    |
| `onSelect`         | `(index: string) => void`                 | `-`             | Callback on item select  |

```tsx
import { Menu } from 'forge-design';

<Menu mode="horizontal" defaultIndex="0">
  <Menu.Item index="0">Home</Menu.Item>
  <Menu.SubMenu title="Products">
    <Menu.Item index="1">Product 1</Menu.Item>
    <Menu.Item index="2">Product 2</Menu.Item>
  </Menu.SubMenu>
</Menu>
```

### Upload

File upload component with drag & drop support, progress tracking, and preview.

| Prop         | Type                              | Default | Description                    |
| ------------ | --------------------------------- | ------- | ------------------------------ |
| `action`     | `string \| () => string`          | `-`     | Upload endpoint URL            |
| `cancelToken`| `AbortController`                 | `-`     | Token for canceling upload     |
| `onProgress` | `(percent: number) => void`       | `-`     | Progress callback              |

```tsx
import { Upload } from 'forge-design';

<Upload 
  action="https://api.example.com/upload"
  onProgress={(percent) => console.log(percent)}
/>
```

### Form

Form component supporting controlled and uncontrolled modes with validation.

| Prop               | Type                    | Default | Description                  |
| ------------------ | ----------------------- | ------- | ---------------------------- |
| `initialValues`    | `Record<string, any>`   | `{}`    | Initial form values          |
| `formValues`       | `Record<string, any>`   | `-`     | Controlled form values       |
| `onFinish`         | `(values: any) => void` | `-`     | Submit callback              |
| `rules`            | `FormRule[]`            | `-`     | Validation rules             |

```tsx
import { Form } from 'forge-design';

<Form
  initialValues={{ name: '', email: '' }}
  onFinish={(values) => console.log(values)}
  rules={[
    { name: 'name', rules: [{ required: true, message: 'Name is required' }] },
    { name: 'email', rules: [{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }] }
  ]}
>
  {/* Form fields */}
</Form>
```

---

## 🛠️ Development

### Prerequisites

- Node.js >= 20.0.0
- npm >= 9.0.0

### Setup

```bash
# Clone repository
git clone https://github.com/hryhhh/Forge-Design.git
cd Forge-Design

# Install dependencies
npm install

# Start Storybook
npm run storybook

# Run tests
npm test

# Build library
npm run build
```

### Available Scripts

| Script              | Description                           |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Start Vite dev server                 |
| `npm run build`     | Build library and Storybook           |
| `npm run build-rollup` | Build library only (ES + CJS)      |
| `npm run build-storybook` | Build Storybook static site     |
| `npm run test`      | Run Jest test suite                   |
| `npm run storybook` | Start Storybook dev server            |
| `npm run lint`      | Run ESLint with auto-fix              |
| `npm run format`    | Format code with Prettier             |
| `npm run docs`      | Generate TypeDoc documentation        |

---

## 🏗️ Tech Stack

| Category     | Technology                           |
| ------------ | ------------------------------------ |
| Framework    | React 19 + TypeScript 5.7            |
| Build        | Rollup (library) + Vite (Storybook)  |
| Styling      | SCSS + CSS Modules                   |
| Testing      | Jest + Testing Library               |
| Docs         | Storybook 9 + TypeDoc                |
| Quality      | ESLint + Prettier + Husky            |
| CI/CD        | GitHub Actions                       |

---

## 📄 License

[MIT](LICENSE) © [hryhhh](https://github.com/hryhhh)

---

<div align="center">

**Made with ❤️ by hryhhh**

</div>
